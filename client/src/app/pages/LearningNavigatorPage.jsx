import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { postJson } from "../lib/api";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Filter,
  Loader2,
  Search,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";

const DIFFICULTY_OPTIONS = ["Any", "Beginner", "Intermediate", "Advanced"];

export default function LearningNavigatorPage() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiRoadmap, setAiRoadmap] = useState(null);
  const [error, setError] = useState("");

  const [role, setRole] = useState("Senior Full-Stack Developer");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("Any");
  const [maxResults, setMaxResults] = useState(6);
  const [localFilter, setLocalFilter] = useState("");

  const normalizeRoadmap = (rawData) => {
    const rawPath = Array.isArray(rawData?.learningPath) ? rawData.learningPath : [];
    const learningPath = rawPath.map((module, idx) => ({
      id: module.id || idx + 1,
      title: module.title || "Recommended Course",
      description: module.description || "Recommended by the SkillGPS recommendation model.",
      timeToComplete: module.timeToComplete || "Self-paced",
      difficulty: module.difficulty || "Mixed",
      skillsCovered: module.skillsCovered || module.skills_covered || "General",
      matchScore: typeof module.matchScore === "number" ? module.matchScore : Number(module.match_score || 0),
      resources: Array.isArray(module.resources) ? module.resources : []
    }));

    return {
      role: rawData?.role || role,
      query: rawData?.query || "",
      learningPath
    };
  };

  const localFallbackRoadmap = () => ({
    role,
    query: searchQuery || "",
    learningPath: [
      {
        id: "local-1",
        title: "System Design Interview Prep",
        description: "Core distributed systems and scalability fundamentals.",
        timeToComplete: "4 hours",
        difficulty: "Intermediate",
        skillsCovered: "system design, scalability",
        matchScore: 0.8,
        resources: [{ type: "video", url: "https://www.youtube.com/results?search_query=system+design+interview+prep" }]
      },
      {
        id: "local-2",
        title: "Node.js API Architecture",
        description: "Design robust backend APIs with validation and error handling.",
        timeToComplete: "5 hours",
        difficulty: "Intermediate",
        skillsCovered: "node.js, api, backend",
        matchScore: 0.76,
        resources: [{ type: "video", url: "https://www.youtube.com/results?search_query=nodejs+api+architecture" }]
      }
    ]
  });

  const generateRoadmap = async (customQuery) => {
    setError("");
    setIsGenerating(true);
    try {
      const data = await postJson("/api/gemini/learning-navigator", {
        userId: user?.id,
        role,
        searchQuery: customQuery !== undefined ? customQuery : searchQuery,
        difficulty,
        maxResults,
        currentSkills: []
      });
      const normalized = normalizeRoadmap(data);
      setAiRoadmap(normalized.learningPath.length ? normalized : localFallbackRoadmap());
    } catch (err) {
      setError(err.message || "Failed to generate learning roadmap.");
      setAiRoadmap(localFallbackRoadmap());
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      generateRoadmap("");
    }
  }, [user?.id]);

  const filteredPath = useMemo(() => {
    const rows = aiRoadmap?.learningPath || [];
    if (!localFilter.trim()) return rows;
    const q = localFilter.toLowerCase();
    return rows.filter((course) =>
      `${course.title} ${course.skillsCovered} ${course.description}`.toLowerCase().includes(q)
    );
  }, [aiRoadmap, localFilter]);

  const topSkills = useMemo(() => {
    const skillsText = (aiRoadmap?.learningPath || []).map((c) => c.skillsCovered).join(",");
    return [...new Set(skillsText.split(",").map((s) => s.trim()).filter(Boolean))].slice(0, 8);
  }, [aiRoadmap]);

  return (
    <div className="p-6 md:p-8 space-y-6 min-h-screen bg-[#0A0A0A] text-white">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Learning Navigator</h1>
            <p className="text-gray-400 mt-1">Search courses with your recommendation model and build a focused plan.</p>
          </div>
          <button
            onClick={() => generateRoadmap()}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 disabled:opacity-70"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />} Refresh Recommendations
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Target role"
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm"
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                generateRoadmap();
              }
            }}
            placeholder="Search topic (e.g. system design)"
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm"
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm"
          >
            {DIFFICULTY_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              min="2"
              max="12"
              value={maxResults}
              onChange={(e) => setMaxResults(Number(e.target.value) || 6)}
              className="w-24 bg-black/30 border border-white/10 rounded-xl px-3 py-3 text-sm"
            />
            <button
              onClick={() => generateRoadmap()}
              disabled={isGenerating}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" /> Find Courses
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-xl px-4 py-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <input
            value={localFilter}
            onChange={(e) => setLocalFilter(e.target.value)}
            placeholder="Filter current results quickly"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {topSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => { setSearchQuery(skill); generateRoadmap(skill); }}
                className="text-xs px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
              >
                {skill}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

      {isGenerating && !aiRoadmap ? (
        <div className="py-20 flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <p className="text-gray-400">Running recommendation model...</p>
        </div>
      ) : null}

      {isGenerating && aiRoadmap ? (
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          Updating recommendations...
        </div>
      ) : null}

      <AnimatePresence>
        {aiRoadmap ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Target Role" value={aiRoadmap.role} icon={Award} color="text-purple-400" />
              <StatCard label="Courses" value={String(filteredPath.length)} icon={BookOpen} color="text-blue-400" />
              <StatCard label="Model Query" value={aiRoadmap.query || "default"} icon={Sparkles} color="text-cyan-400" />
              <StatCard label="Avg Match" value={`${Math.round((filteredPath.reduce((a, c) => a + (c.matchScore || 0), 0) / Math.max(1, filteredPath.length)) * 100)}%`} icon={TrendingUp} color="text-emerald-400" />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {filteredPath.map((course) => (
                <div key={course.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {(course.matchScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">{course.difficulty}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300">{course.timeToComplete}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-300">{course.skillsCovered}</span>
                  </div>
                  {course.resources[0]?.url ? (
                    <a
                      href={course.resources[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                    >
                      Open Course <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>

            {filteredPath.length === 0 ? (
              <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl text-gray-400">No course matched this filter. Try another query.</div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <Icon className={`w-6 h-6 mb-2 ${color}`} />
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-semibold truncate">{value}</p>
    </div>
  );
}
