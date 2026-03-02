import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from "multer";
import { createRequire } from "module";
import fs from "fs";
import path from "path";

const require = createRequire(import.meta.url);
const pdfParseModule = require("pdf-parse");
const pdfParse = typeof pdfParseModule === "function" ? pdfParseModule : pdfParseModule?.default;
const PDFParseClass = pdfParseModule?.PDFParse;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "super_secret_dummy_key_123";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const PYTHON_API_URL = (process.env.PYTHON_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const KNOWN_COMPROMISED_KEY = "REVOKED_PUBLIC_KEY_DO_NOT_USE";

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const geminiModelCandidates = [...new Set([
  GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash"
])].filter(Boolean);
let activeGeminiModel = geminiModelCandidates[0] || null;
let aiGenerationDisabled = false;
let aiDisableReason = "";
const normalizeKey = (value) => String(value || "").trim().replace(/^['"]|['"]$/g, "");
const sanitizedApiKey = normalizeKey(GEMINI_API_KEY);

if (!genAI) {
  console.warn("GEMINI_API_KEY not set. Weekly planner will use fallback responses.");
}

if (!sanitizedApiKey) {
  aiGenerationDisabled = true;
  aiDisableReason = "AI generation disabled: GEMINI_API_KEY is missing.";
  console.warn(aiDisableReason);
} else if (sanitizedApiKey === KNOWN_COMPROMISED_KEY) {
  aiGenerationDisabled = true;
  aiDisableReason = "AI generation disabled: known compromised API key detected. Rotate key immediately.";
  console.error(aiDisableReason);
} else if (sanitizedApiKey.toLowerCase().includes("replace_with") || sanitizedApiKey.toLowerCase().includes("your_key")) {
  aiGenerationDisabled = true;
  aiDisableReason = "AI generation disabled: placeholder key detected in GEMINI_API_KEY.";
  console.warn(aiDisableReason);
}

const isModelNotFoundError = (error) => {
  const text = String(error?.message || "");
  return error?.status === 404 || text.includes("is not found") || text.includes("404");
};

const isForbiddenKeyError = (error) => {
  const text = String(error?.message || "").toLowerCase();
  return error?.status === 403 || text.includes("api key was reported as leaked") || text.includes("forbidden");
};

const generateGeminiContent = async (content) => {
  if (!genAI || !activeGeminiModel || !sanitizedApiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  if (aiGenerationDisabled) {
    throw new Error(aiDisableReason || "AI generation temporarily disabled due to key/auth issue.");
  }

  const orderedModels = [activeGeminiModel, ...geminiModelCandidates.filter((m) => m !== activeGeminiModel)];
  let lastError = null;

  for (const modelName of orderedModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: "application/json" }
      });
      const result = await model.generateContent(content);
      activeGeminiModel = modelName;
      return result;
    } catch (error) {
      lastError = error;
      if (isForbiddenKeyError(error)) {
        aiGenerationDisabled = true;
        aiDisableReason = "AI generation disabled because API key is invalid/revoked/leaked. Update GEMINI_API_KEY.";
        console.error(aiDisableReason);
        throw new Error(aiDisableReason);
      }

      if (!isModelNotFoundError(error)) {
        throw error;
      }
    }
  }

  throw lastError || new Error("No compatible Gemini model available for this API key.");
};

const parsePdfBuffer = async (buffer) => {
  if (typeof pdfParse === "function") {
    const data = await pdfParse(buffer);
    return data?.text || "";
  }

  if (typeof PDFParseClass === "function") {
    const parser = new PDFParseClass({ data: buffer });
    try {
      const result = await parser.getText();
      return result?.text || "";
    } finally {
      if (typeof parser.destroy === "function") {
        await parser.destroy();
      }
    }
  }

  throw new Error("No compatible PDF parser function found.");
};

const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors());
app.use(express.json());

// File-backed User DB
const dataDir = path.join(process.cwd(), "data");
const usersFilePath = path.join(dataDir, "users.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, "[]", "utf-8");
}

const loadUsers = () => {
  try {
    const fileData = fs.readFileSync(usersFilePath, "utf-8");
    const parsed = JSON.parse(fileData);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
};

const users = loadUsers();

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, resumeBase64, resumeText, ...safeUser } = user;
  return safeUser;
};

// --- AUTHENTICATION ROUTES ---

// Register Route
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { id: Date.now().toString(), name, email, password, hasResume: false };
  users.push(newUser);
  saveUsers(users);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: "1h" });

  res.status(201).json({ token, user: sanitizeUser(newUser) });
});

// Login Route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token, user: sanitizeUser(user) });
});

// Upload Resume Route (Real with Multer)
app.post("/api/auth/upload-resume", upload.single("resume"), async (req, res) => {
  const { userId } = req.body;
  const userIndex = users.findIndex(u => u.id === userId);

  let parsedText = "";
  if (req.file) {
    try {
      if (req.file.mimetype === "application/pdf") {
        parsedText = await parsePdfBuffer(req.file.buffer);
      } else {
        parsedText = req.file.buffer.toString('utf-8');
      }
    } catch (e) {
      console.error("Failed to parse resume", e);
    }
  }

  if (userIndex === -1) {
    if (req.file) {
      users.push({
        id: userId || "dummy_id",
        name: "Explorer",
        email: "dummy@test.com",
        hasResume: true,
        resumeBase64: req.file.buffer.toString("base64"),
        resumeMimeType: req.file.mimetype,
        resumeText: parsedText
      });
      saveUsers(users);
    }
    return res.json({ success: true, message: "Resume uploaded without auth" });
  }

  if (req.file) {
    users[userIndex].hasResume = true;
    users[userIndex].resumeBase64 = req.file.buffer.toString("base64");
    users[userIndex].resumeMimeType = req.file.mimetype;
    users[userIndex].resumeText = parsedText;
    saveUsers(users);
  }

  res.json({ success: true, user: sanitizeUser(users[userIndex]) });
});

// --- HELPER FUNCTION ---
const extractSkills = (text) => {
  // Very basic mock extraction logic to get an array of skills
  const popularSkills = ["react", "node.js", "javascript", "typescript", "aws", "docker", "kubernetes", "python", "java", "sql", "graphql", "mongodb"];
  const found = [];
  if (!text) return ["React", "JavaScript"]; // fallback
  const lowerText = text.toLowerCase();
  popularSkills.forEach(skill => {
    if (lowerText.includes(skill)) found.push(skill);
  });
  return found.length > 0 ? found : ["JavaScript"];
};

const fallbackWeeklyPlan = (userPrompt) => ({
  weekOf: "Current Week",
  focusArea: userPrompt || "General Technical Growth",
  weeklyGoal: "Ship one measurable skill improvement by end of week.",
  whyThisWeek: "Build consistency and convert concepts into execution.",
  intensity: "Medium",
  successMetrics: [
    "Complete all focus blocks",
    "Publish one artifact (notes/code/post)",
    "Close one identified skill gap"
  ],
  plan: [
    { day: "Monday", task: "Review one core concept and summarize key takeaways.", duration: "1h", priority: "High", type: "Learn", outcome: "Structured concept notes" },
    { day: "Wednesday", task: "Build a small practice task related to your focus area.", duration: "1.5h", priority: "High", type: "Build", outcome: "Working mini project chunk" },
    { day: "Friday", task: "Reflect on what improved and define next week's target.", duration: "1h", priority: "Medium", type: "Review", outcome: "Weekly retrospective" }
  ]
});

const fallbackLearningPath = (role, skills = []) => {
  const normalizedSkills = skills.length > 0 ? skills : ["javascript", "react", "node.js"];
  const cards = [
    {
      id: "fallback-1",
      title: "Frontend Performance Foundations",
      description: "Strengthen rendering, code-splitting, and optimization for production apps.",
      timeToComplete: "4 hours",
      difficulty: "Intermediate",
      skillsCovered: "react, performance, frontend",
      matchScore: 0.82,
      resources: [{ type: "video", url: "https://www.youtube.com/results?search_query=react+performance+optimization" }]
    },
    {
      id: "fallback-2",
      title: "Backend API Reliability",
      description: "Learn API design patterns, validation, and resilient error handling.",
      timeToComplete: "5 hours",
      difficulty: "Intermediate",
      skillsCovered: "node.js, api, backend",
      matchScore: 0.78,
      resources: [{ type: "video", url: "https://www.youtube.com/results?search_query=nodejs+api+best+practices" }]
    },
    {
      id: "fallback-3",
      title: "Cloud Deployment Basics",
      description: "Deploy a full-stack app with CI/CD and environment configuration.",
      timeToComplete: "6 hours",
      difficulty: "Beginner",
      skillsCovered: "cloud, ci/cd, deployment",
      matchScore: 0.74,
      resources: [{ type: "video", url: "https://www.youtube.com/results?search_query=cloud+deployment+ci+cd+tutorial" }]
    }
  ];

  return {
    role: role || "Target Role",
    query: normalizedSkills.join(" "),
    learningPath: cards
  };
};

const fallbackDashboard = (extracted = []) => {
  const score = Math.min(100, 40 + (extracted.length * 10));
  return {
    stats: {
      skillScore: `${score}%`,
      skillTrend: "+5%",
      aiReadiness: "80%",
      aiReadinessTrend: "+4%",
      achievements: "7",
      achievementsTrend: "+1",
      streak: "3 Days",
      streakTrend: "+7"
    },
    insights: {
      message: `Your resume highlights ${extracted.join(", ")}. We recommend focusing on expanding into complementary advanced frameworks.`
    },
    activity: [
      { id: 1, type: "upload", title: "Resume Parsed", time: "Just now" },
      { id: 2, type: "analysis", title: "Skill Profile Updated", time: "2 min ago" }
    ]
  };
};

const titleCaseSkill = (skill) =>
  String(skill || "")
    .split(/[.\s/-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const fallbackSkillAnalysis = (extracted = []) => {
  const normalized = extracted.length ? extracted : ["javascript", "react"];
  const strengths = normalized.slice(0, 4).map(titleCaseSkill);
  const weaknesses = ["System Design", "Cloud Architecture", "Testing Strategy"].filter(
    (item) => !strengths.includes(item)
  );
  const baseScore = Math.max(45, Math.min(92, 52 + normalized.length * 6));

  return {
    summary: `Your profile is strongest in ${strengths.join(", ")}. The next growth leap is structured architecture thinking and production-grade delivery practices.`,
    strengths,
    weaknesses: weaknesses.slice(0, 3),
    recommendations: [
      "Build one end-to-end project with tests, CI, and deployment.",
      "Practice system design patterns and tradeoff analysis twice per week.",
      "Document architecture decisions for each project to improve clarity."
    ],
    stats: {
      overallScore: baseScore,
      skillsEvaluated: normalized.length,
      strengthsCount: strengths.length,
      weaknessesCount: Math.min(3, weaknesses.length)
    },
    radar: [
      { subject: "Frontend", value: normalized.some((s) => s.includes("react")) ? 78 : 62 },
      { subject: "Backend", value: normalized.some((s) => s.includes("node") || s.includes("python") || s.includes("java")) ? 74 : 58 },
      { subject: "Database", value: normalized.some((s) => s.includes("sql") || s.includes("mongodb")) ? 69 : 52 },
      { subject: "Cloud", value: normalized.some((s) => s.includes("aws") || s.includes("kubernetes") || s.includes("docker")) ? 66 : 45 },
      { subject: "System Design", value: 54 }
    ],
    categories: [
      {
        category: "Core Skills",
        skills: strengths.map((name, i) => ({ name, level: Math.max(55, 82 - i * 6) }))
      },
      {
        category: "Growth Areas",
        skills: weaknesses.slice(0, 3).map((name, i) => ({ name, level: 42 + i * 7 }))
      }
    ]
  };
};

const fallbackSkillGap = (extracted = []) => {
  const normalized = extracted.length ? extracted : ["javascript", "react"];
  const primaryRole = normalized.some((s) => s.includes("python") || s.includes("java")) ? "AI/Backend Engineer" : "Full-Stack Engineer";
  const baseGaps = [
    { skill: "System Architecture", currentLevel: "Intermediate", targetLevel: "Advanced", importance: "High", weeks: 5 },
    { skill: "Cloud Deployment", currentLevel: "Beginner", targetLevel: "Intermediate", importance: "High", weeks: 4 },
    { skill: "Testing & Reliability", currentLevel: "Beginner", targetLevel: "Advanced", importance: "Medium", weeks: 6 }
  ];

  const skillDrivenGaps = normalized.slice(0, 2).map((skill, idx) => ({
    skill: `${titleCaseSkill(skill)} Optimization`,
    currentLevel: "Intermediate",
    targetLevel: "Advanced",
    importance: idx === 0 ? "High" : "Medium",
    weeks: idx === 0 ? 3 : 2
  }));

  const gaps = [...baseGaps, ...skillDrivenGaps].slice(0, 5);
  const totalWeeks = gaps.reduce((sum, g) => sum + (Number(g.weeks) || 0), 0);
  const highCount = gaps.filter((g) => String(g.importance).toLowerCase() === "high").length;
  const jobMatchScore = Math.max(55, Math.min(90, 72 - highCount * 4 + normalized.length * 2));

  return {
    targetRole: primaryRole,
    summary: `Closing ${highCount} high-priority gaps can significantly improve interview and role-readiness.`,
    estimatedWeeks: totalWeeks,
    jobMatchScore,
    gaps
  };
};

const safeJsonParse = (text) => {
  const cleaned = String(text || "").replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const candidate = cleaned.match(/\{[\s\S]*\}/)?.[0];
    if (!candidate) return null;
    try {
      return JSON.parse(candidate);
    } catch {
      return null;
    }
  }
};

// --- GEMINI REAL ROUTES ---

const generateFromResume = async (userId, prompt) => {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const user = users.find(u => u.id === (userId || 'dummy_id'));
  if (!user || !user.resumeBase64) {
    // Return dummy data if no resume uploaded so the app doesn't crash completely during testing
    // Ideally we throw an error here, but for smooth UX fallback we'll let it pass
    throw new Error("No resume found. Please upload a resume.");
  }

  const filePart = {
    inlineData: {
      data: user.resumeBase64,
      mimeType: user.resumeMimeType
    }
  };

  const result = await generateGeminiContent([prompt, filePart]);
  return JSON.parse(result.response.text());
};

// Real Learning Navigator API using Python FastApi Server
app.post("/api/gemini/learning-navigator", async (req, res) => {
  const { userId, role, searchQuery, difficulty = "Any", maxResults = 6, currentSkills = [] } = req.body;
  const user = users.find(u => u.id === (userId || 'dummy_id'));
  const resumeSkills = extractSkills(user?.resumeText);
  const mergedSkills = [...new Set([...resumeSkills, ...currentSkills])];

  try {
    const response = await fetch(`${PYTHON_API_URL}/api/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        extracted_skills: mergedSkills,
        target_role: role,
        search_query: searchQuery,
        difficulty,
        max_results: maxResults
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Python recommendation service failed: ${response.status} ${detail}`);
    }

    const recommendationData = await response.json();
    const recommendations = Array.isArray(recommendationData.recommendations) ? recommendationData.recommendations : [];
    const learningPath = recommendations.map(rec => ({
      id: rec.course_id,
      title: rec.title,
      description: `Watch this ${rec.difficulty} level course covering ${rec.skills_covered}.`,
      timeToComplete: `${rec.duration_hours} hours`,
      difficulty: rec.difficulty,
      skillsCovered: rec.skills_covered,
      matchScore: typeof rec.match_score === "number" ? rec.match_score : 0,
      resources: [
        {
          type: "video",
          url: rec.url
        }
      ]
    }));

    res.json({
      role: role || "Target Role",
      query: recommendationData.query || "",
      learningPath: learningPath
    });
  } catch (error) {
    console.error("Failed to reach Python recommendation engine:", error);
    res.json(fallbackLearningPath(role, mergedSkills));
  }
});

// Career Simulation API (Python model first, fallback local)
app.post("/api/gemini/career-simulation", async (req, res) => {
  const { userId, role, selectedSkills = [], experienceYears = 0 } = req.body;
  const user = users.find(u => u.id === (userId || 'dummy_id'));
  const resumeSkills = extractSkills(user?.resumeText);

  try {
    const response = await fetch(`${PYTHON_API_URL}/api/career-simulation-model`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: role || "Software Engineer",
        selected_skills: Array.isArray(selectedSkills) ? selectedSkills : [],
        experience_years: Number.isFinite(Number(experienceYears)) ? Number(experienceYears) : 0,
        resume_skills: resumeSkills
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Python simulation service failed: ${response.status} ${detail}`);
    }

    const simulationPayload = await response.json();
    return res.json(simulationPayload);
  } catch (error) {
    const skills = [...new Set([...resumeSkills, ...(Array.isArray(selectedSkills) ? selectedSkills : [])])].join(", ");
    console.error("Career simulation Python fallback in use:", error.message);
    return res.json({
      role: role || "Target Role",
      simulation: {
        scenario: `You are leveraging your background in ${skills || 'tech'} to build a high-performance system.`,
        challenges: ["Strict deadlines", "Migrating legacy code", "Adopting new frameworks"],
        successMetrics: ["Deployment automation", "Reduced error rates", "Faster sprint delivery"],
        estimatedImpact: "Strong likelihood of project ownership and rapid career progression."
      },
      meta: {
        experienceYears: Number.isFinite(Number(experienceYears)) ? Number(experienceYears) : 0,
        skillsConsidered: (Array.isArray(selectedSkills) ? selectedSkills : []).slice(0, 5),
        confidence: 60
      },
      milestones: [],
      salaryProjection: []
    });
  }
});

// Dynamic Dashboard API
app.post("/api/gemini/dashboard", async (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === (userId || 'dummy_id'));
  const extracted = extractSkills(user?.resumeText);

  if (!genAI || !user?.resumeText) {
    return res.json(fallbackDashboard(extracted));
  }

  const prompt = `You are building a concise career dashboard from resume text.
Return strict JSON only with this schema:
{
  "stats": {
    "skillScore": "75%",
    "skillTrend": "+5%",
    "aiReadiness": "70%",
    "aiReadinessTrend": "+3%",
    "achievements": "6",
    "achievementsTrend": "+1",
    "streak": "4 Days",
    "streakTrend": "+2"
  },
  "insights": {
    "message": "2 sentence personalized insight from resume"
  },
  "activity": [
    { "id": 1, "type": "upload", "title": "Resume Parsed", "time": "Just now" },
    { "id": 2, "type": "analysis", "title": "Skill Profile Updated", "time": "2 min ago" }
  ]
}

Resume text:
${user.resumeText.slice(0, 12000)}`;

  try {
    const result = await generateGeminiContent(prompt);
    const parsed = safeJsonParse(result.response.text());
    if (!parsed?.stats || !parsed?.insights) {
      return res.json(fallbackDashboard(extracted));
    }
    return res.json(parsed);
  } catch {
    return res.json(fallbackDashboard(extracted));
  }
});

// Dynamic AI Skill Analysis API
app.post("/api/gemini/skill-analysis", async (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === (userId || 'dummy_id'));
  const extracted = extractSkills(user?.resumeText);
  const fallback = fallbackSkillAnalysis(extracted);

  if (!user?.resumeText || !genAI) {
    return res.json(fallback);
  }

  const prompt = `Analyze this resume and return strict JSON only.
Schema:
{
  "summary": "string",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "recommendations": ["string"],
  "stats": {
    "overallScore": number,
    "skillsEvaluated": number,
    "strengthsCount": number,
    "weaknessesCount": number
  },
  "radar": [
    { "subject": "Frontend", "value": number },
    { "subject": "Backend", "value": number },
    { "subject": "Database", "value": number },
    { "subject": "Cloud", "value": number },
    { "subject": "System Design", "value": number }
  ],
  "categories": [
    { "category": "string", "skills": [{ "name": "string", "level": number }] }
  ]
}
Constraints:
- Keep level/value scores between 1 and 100.
- strengths and weaknesses max 5 each.
- categories max 4.
- recommendations max 4 concise bullets.
Resume text:
${user.resumeText.slice(0, 12000)}`;

  try {
    const result = await generateGeminiContent(prompt);
    const parsed = safeJsonParse(result.response.text());
    if (!parsed || typeof parsed !== "object") {
      return res.json(fallback);
    }

    return res.json({
      ...fallback,
      ...parsed,
      strengths: Array.isArray(parsed.strengths) && parsed.strengths.length ? parsed.strengths : fallback.strengths,
      weaknesses: Array.isArray(parsed.weaknesses) && parsed.weaknesses.length ? parsed.weaknesses : fallback.weaknesses,
      recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length ? parsed.recommendations : fallback.recommendations,
      radar: Array.isArray(parsed.radar) && parsed.radar.length ? parsed.radar : fallback.radar,
      categories: Array.isArray(parsed.categories) && parsed.categories.length ? parsed.categories : fallback.categories
    });
  } catch {
    return res.json(fallback);
  }
});

// Dynamic Skill Gap API
app.post("/api/gemini/skill-gap", async (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === (userId || 'dummy_id'));
  const extracted = extractSkills(user?.resumeText);
  const fallback = fallbackSkillGap(extracted);

  if (!user?.resumeText || !genAI) {
    return res.json(fallback);
  }

  const prompt = `From this resume, produce a role-aligned skill gap report. Return strict JSON only.
Schema:
{
  "targetRole": "string",
  "summary": "string",
  "estimatedWeeks": number,
  "jobMatchScore": number,
  "gaps": [
    {
      "skill": "string",
      "currentLevel": "Beginner|Intermediate|Advanced|Expert",
      "targetLevel": "Intermediate|Advanced|Expert",
      "importance": "High|Medium|Low",
      "weeks": number
    }
  ]
}
Constraints:
- gaps should be 3 to 6 items.
- weeks should be integer 1 to 12.
- jobMatchScore should be integer 1 to 100.
Resume text:
${user.resumeText.slice(0, 12000)}`;

  try {
    const result = await generateGeminiContent(prompt);
    const parsed = safeJsonParse(result.response.text());
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.gaps)) {
      return res.json(fallback);
    }

    return res.json({
      ...fallback,
      ...parsed,
      gaps: parsed.gaps.map((gap, idx) => ({
        skill: gap?.skill || fallback.gaps[idx % fallback.gaps.length].skill,
        currentLevel: gap?.currentLevel || "Intermediate",
        targetLevel: gap?.targetLevel || "Advanced",
        importance: gap?.importance || "Medium",
        weeks: Number.isFinite(Number(gap?.weeks)) ? Number(gap.weeks) : 3
      }))
    });
  } catch {
    return res.json(fallback);
  }
});

// Deterministic Progress Analytics API
app.post("/api/gemini/progress-analytics", (req, res) => {
  res.json({
    overallProgress: 12,
    chartData: [
      { "month": "M1", "score": 30 },
      { "month": "M2", "score": 35 },
      { "month": "M3", "score": 40 },
      { "month": "M4", "score": 42 }
    ],
    topSkillGain: "Core Fundamentals (+12%)"
  });
});

app.get("/api/health/ai", (_req, res) => {
  res.json({
    aiEnabled: !aiGenerationDisabled,
    reason: aiGenerationDisabled ? aiDisableReason : "AI generation is available.",
    activeModel: activeGeminiModel,
    candidateModels: geminiModelCandidates,
    pythonApiUrl: PYTHON_API_URL
  });
});

// Real AI Weekly Planner API using Gemini Prompting
app.post("/api/gemini/weekly-planner", async (req, res) => {
  const { userId, userPrompt } = req.body;
  const user = users.find(u => u.id === (userId || 'dummy_id'));
  const skills = extractSkills(user?.resumeText).join(", ");

  if (!genAI) {
    return res.json(fallbackWeeklyPlan(userPrompt));
  }

  const prompt = `Based on a user with these skills: ${skills}. 
  The user has provided this current focus prompt: "${userPrompt || "I want to improve my general tech skills this week"}".
  Generate a high-quality weekly execution plan for this user.
  The response must be in strict JSON format matching this schema:
  {
    "weekOf": "Current Week",
    "focusArea": "A concise focus area based on their prompt",
    "weeklyGoal": "One measurable weekly goal",
    "whyThisWeek": "Short reason this plan is right now",
    "intensity": "Low|Medium|High",
    "successMetrics": ["metric 1", "metric 2", "metric 3"],
    "plan": [
      { "day": "Monday", "task": "Specific task description", "duration": "1h", "priority": "High|Medium|Low", "type": "Learn|Build|Review|Interview", "outcome": "Specific output for this session" },
      { "day": "Wednesday", "task": "Specific task description", "duration": "2h", "priority": "High|Medium|Low", "type": "Learn|Build|Review|Interview", "outcome": "Specific output for this session" },
      { "day": "Friday", "task": "Specific task description", "duration": "1.5h", "priority": "High|Medium|Low", "type": "Learn|Build|Review|Interview", "outcome": "Specific output for this session" }
    ]
  }
  Keep it practical and concise. Make sure your JSON is clean and strictly conforms to the schema.
  `;
  try {
    const result = await generateGeminiContent(prompt);
    const parsed = safeJsonParse(result.response.text());

    if (!parsed || !Array.isArray(parsed.plan)) {
      return res.json(fallbackWeeklyPlan(userPrompt));
    }

    return res.json(parsed);
  } catch (error) {
    console.warn("Weekly planner fallback in use:", error.message);
    res.json(fallbackWeeklyPlan(userPrompt));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

