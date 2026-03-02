import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Award,
  TrendingUp,
  Zap,
  Play,
  Sparkles,
  Loader2,
  BookOpen
} from "lucide-react";

export default function LearningNavigatorPage() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiRoadmap, setAiRoadmap] = useState(null);

  const generateRoadmap = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/learning-navigator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          role: "Senior Full-Stack Developer",
          currentSkills: ["React", "JavaScript"]
        }),
      });
      const data = await response.json();
      setAiRoadmap(data);
    } catch (error) {
      console.error("Failed to fetch AI roadmap", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen opacity-40 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                AI Learning Navigator
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Your dynamically generated, personalized curriculum to reach your next career milestone.
            </p>
          </div>

          <button
            onClick={generateRoadmap}
            disabled={isGenerating}
            className="whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating AI Path...</>
            ) : (
              <><Zap className="w-5 h-5 fill-current" /> Regenerate Curriculum</>
            )}
          </button>
        </div>

        {/* AI Generated Content */}
        <AnimatePresence mode="wait">
          {!aiRoadmap && !isGenerating ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
            >
              <Sparkles className="w-16 h-16 text-gray-500 mb-4 opacity-50" />
              <h2 className="text-xl font-medium mb-2">No active path generated</h2>
              <p className="text-gray-400 mb-6">Click regenerate to build a custom curriculum based on your profile.</p>
              <button
                onClick={generateRoadmap}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-medium border border-white/10"
              >
                Start AI Analysis
              </button>
            </motion.div>
          ) : null}

          {isGenerating ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-32 flex flex-col items-center justify-center space-y-4"
            >
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full border-t-blue-500 animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              <p className="text-blue-400 font-medium text-lg animate-pulse">Gemini is analyzing your skills...</p>
            </motion.div>
          ) : null}

          {aiRoadmap && !isGenerating ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Progress Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Target Role", value: aiRoadmap.role, icon: Award, color: "text-purple-400" },
                  { title: "Modules", value: aiRoadmap.learningPath.length.toString(), icon: BookOpen, color: "text-blue-400" },
                  { title: "Est. Time", value: "12 Weeks", icon: Zap, color: "text-amber-400" },
                  { title: "Progress", value: "0%", icon: TrendingUp, color: "text-green-400" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                      className="border border-white/10 p-5 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
                    >
                      <Icon className={`w-8 h-8 mb-3 ${s.color}`} />
                      <h3 className="text-xl font-bold truncate">{s.value}</h3>
                      <p className="text-sm text-gray-400">{s.title}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Roadmap List */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Play className="w-6 h-6 text-blue-400" /> Your Custom Execution Plan
                </h2>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-7 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  {aiRoadmap.learningPath.map((module, i) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                      whileHover={{ scale: 1.01 }}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#0A0A0A] bg-white/10 group-hover:bg-blue-500/20 text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                        <span className="font-bold text-lg">{i + 1}</span>
                      </div>

                      {/* Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:border-blue-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-xl text-white">{module.title}</h3>
                          <span className="text-xs font-medium px-2.5 py-1 bg-white/10 rounded-full text-blue-300">
                            {module.timeToComplete}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{module.description}</p>

                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Recommended Resources:</p>
                          <ul className="space-y-1">
                            {module.resources.map((res, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2 text-gray-300">
                                <BookOpen className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                <span>{res}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Circle className="w-4 h-4" /> Not Started
                          </span>
                          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 group-hover:underline">
                            Start Module <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}