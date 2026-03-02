import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "super_secret_dummy_key_123";

const genAI = new GoogleGenerativeAI("AIzaSyBrFhIzYDrLHTIf7BekFVisHHwc0AST2UY");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});

const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors());
app.use(express.json());

// Dummy User DB
const users = [];

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

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: "1h" });

  // Exclude password from response
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({ token, user: userWithoutPassword });
});

// Login Route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

// Upload Resume Route (Real with Multer)
app.post("/api/auth/upload-resume", upload.single("resume"), (req, res) => {
  const { userId } = req.body;
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    if (req.file) {
      // Just mock it so we can test without registering
      users.push({ id: userId || "dummy_id", name: "Explorer", email: "dummy@test.com", hasResume: true, resumeBuffer: req.file.buffer, resumeMimeType: req.file.mimetype });
    }
    return res.json({ success: true, message: "Resume uploaded without auth" });
  }

  if (req.file) {
    users[userIndex].hasResume = true;
    users[userIndex].resumeBuffer = req.file.buffer;
    users[userIndex].resumeMimeType = req.file.mimetype;
  }

  res.json({ success: true, user: users[userIndex] });
});

// --- GEMINI REAL ROUTES ---

const generateFromResume = async (userId, prompt) => {
  const user = users.find(u => u.id === (userId || 'dummy_id'));
  if (!user || !user.resumeBuffer) {
    // Return dummy data if no resume uploaded so the app doesn't crash completely during testing
    // Ideally we throw an error here, but for smooth UX fallback we'll let it pass
    throw new Error("No resume found. Please upload a resume.");
  }

  const filePart = {
    inlineData: {
      data: user.resumeBuffer.toString("base64"),
      mimeType: user.resumeMimeType
    }
  };

  const result = await model.generateContent([prompt, filePart]);
  return JSON.parse(result.response.text());
};

// Real Learning Navigator API
app.post("/api/gemini/learning-navigator", async (req, res) => {
  const { userId, role } = req.body;
  const prompt = `Based on the provided resume, acting as an expert career advisor, create a personalized learning navigator path for the role of ${role || "Senior Full-Stack Developer"}.
  The response must be in strict JSON format matching this schema:
  {
    "role": "Role Title",
    "learningPath": [
      {
        "id": 1,
        "title": "Module Title",
        "description": "Short description of what to learn based on gaps in the resume",
        "timeToComplete": "X weeks",
        "resources": ["Resource 1", "Resource 2"]
      }
    ]
  }
  Provide exactly 3 to 4 recommended modules.
  `;
  try {
    const data = await generateFromResume(userId, prompt);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Real Career Simulation API
app.post("/api/gemini/career-simulation", async (req, res) => {
  const { userId, role } = req.body;
  const prompt = `Based on the provided resume, create a realistic career simulation and scenario for a ${role || "Frontend Developer"}.
  The response must be in strict JSON format matching this schema:
  {
    "role": "${role || "Frontend Developer"}",
    "simulation": {
      "scenario": "A 1-2 sentence description of a high-stakes project or work situation.",
      "challenges": ["Challenge 1", "Challenge 2", "Challenge 3"],
      "successMetrics": ["Metric 1", "Metric 2", "Metric 3"],
      "estimatedImpact": "A 1 sentence description of the career impact if successful."
    }
  }
  Make it highly specific to the skills found in the resume.
  `;
  try {
    const data = await generateFromResume(userId, prompt);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Real Dashboard API
app.post("/api/gemini/dashboard", async (req, res) => {
  const { userId } = req.body;
  const prompt = `Analyze the provided resume and return some personalized dashboard statistics and insights.
  The response must be in strict JSON format matching this schema:
  {
    "stats": {
      "skillScore": "XX%",
      "skillTrend": "+X%",
      "aiReadiness": "XX%",
      "aiReadinessTrend": "+X%",
      "achievements": "X",
      "achievementsTrend": "+X",
      "streak": "X Days",
      "streakTrend": "🔥"
    },
    "insights": {
      "message": "A 2 sentence encouraging message about what they should focus on next based on their resume."
    },
    "activity": [
      { "id": 1, "type": "analysis", "title": "Completed Skill Gap Analysis", "time": "1 hour ago" },
      { "id": 2, "type": "upload", "title": "Updated Resume Profile", "time": "4 hours ago" },
      { "id": 3, "type": "learning", "title": "Finished 'React Patterns'", "time": "2 days ago" }
    ]
  }
  Generate realistic values. For activity, just keep the demo activity items. For insights and stats, infer realistic scores based on the resume quality.
  `;
  try {
    const data = await generateFromResume(userId, prompt);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Real AI Skill Analysis API
app.post("/api/gemini/skill-analysis", async (req, res) => {
  const { userId } = req.body;
  const prompt = `Analyze the provided resume and perform a deep skill analysis.
  The response must be in strict JSON format matching this schema:
  {
    "summary": "A 2-3 sentence executive summary of the candidate's technical profile.",
    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
    "weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
    "recommendations": ["Recommendation 1", "Recommendation 2"]
  }
  Extract actual technical skills from the resume. If none are found, state that.
  `;
  try {
    const data = await generateFromResume(userId, prompt);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Real Skill Gap API
app.post("/api/gemini/skill-gap", async (req, res) => {
  const { userId } = req.body;
  const prompt = `Analyze the provided resume and identify skill gaps for a Senior or Staff level position.
  The response must be in strict JSON format matching this schema:
  {
    "targetRole": "Identified Next Level Role (e.g. Senior Frontend Engineer)",
    "gaps": [
      { "skill": "Skill Name", "currentLevel": "Beginner|Intermediate|Advanced", "targetLevel": "Intermediate|Advanced|Expert", "importance": "High|Medium|Low" }
    ]
  }
  Provide 3-4 specific skill gaps.
  `;
  try {
    const data = await generateFromResume(userId, prompt);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Real Progress Analytics API
app.post("/api/gemini/progress-analytics", async (req, res) => {
  const { userId } = req.body;
  const prompt = `Analyze the provided resume's timeline and experience to generate estimated historical progress analytics.
  The response must be in strict JSON format matching this schema:
  {
    "overallProgress": XX,
    "chartData": [
      { "month": "Jan", "score": XX },
      { "month": "Feb", "score": XX },
      { "month": "Mar", "score": XX },
      { "month": "Apr", "score": XX }
    ],
    "topSkillGain": "Skill name (+XX%)"
  }
  Invent a plausible recent 4-month progression trend based on the skills in the resume.
  `;
  try {
    const data = await generateFromResume(userId, prompt);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Real AI Weekly Planner API
app.post("/api/gemini/weekly-planner", async (req, res) => {
  const { userId } = req.body;
  const prompt = `Based on the provided resume and the likely skill gaps, generate a 3-task weekly study plan.
  The response must be in strict JSON format matching this schema:
  {
    "weekOf": "Current Week",
    "focusArea": "A specific technical area derived from the resume gaps",
    "plan": [
      { "day": "Monday", "task": "Specific task description", "duration": "1h" },
      { "day": "Wednesday", "task": "Specific task description", "duration": "2h" },
      { "day": "Friday", "task": "Specific task description", "duration": "1.5h" }
    ]
  }
  `;
  try {
    const data = await generateFromResume(userId, prompt);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
