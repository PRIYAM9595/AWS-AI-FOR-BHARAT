import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Zap,
  CheckCircle
} from "lucide-react";

export default function SkillGapPage() {
  const [skillGapsData, setSkillGapsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkillGaps = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/skill-gap`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setSkillGapsData(data);
      } catch (error) {
        console.error("Failed to fetch skill gaps:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkillGaps();
  }, []);

  const getPriorityColor = (p) => {
    switch (p.toLowerCase()) {
      case "high":
        return "bg-red-500/10 border border-red-500/20 text-red-400";
      case "medium":
        return "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400";
      default:
        return "bg-blue-500/10 border border-blue-500/20 text-blue-400";
    }
  };

  const getNumericalCurrent = (level) => {
    if (level === 'Beginner') return 20;
    if (level === 'Intermediate') return 50;
    if (level === 'Advanced') return 80;
    return 0;
  };

  const getNumericalTarget = (level) => {
    if (level === 'Intermediate') return 60;
    if (level === 'Advanced') return 85;
    if (level === 'Expert') return 100;
    return 80;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
        <p className="text-gray-400">Gemini is mapping your skill deficits...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400 mb-2">
            Skill Gap Detonation
          </h1>
          <p className="text-gray-400">
            Target Role: <span className="text-white font-medium">{skillGapsData?.targetRole}</span>
          </p>
        </div>

        <Link
          to="/app/learning-navigator"
          className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-xl transition-colors font-medium flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-emerald-400" /> Start Learning Path
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Critical Gaps", value: skillGapsData?.gaps.filter(g => g.importance === "High").length || 0, icon: AlertTriangle, color: "text-red-400" },
          { title: "Medium Priority", value: skillGapsData?.gaps.filter(g => g.importance === "Medium").length || 0, icon: Target, color: "text-yellow-400" },
          { title: "Est. Time to Close", value: "3 Months", icon: TrendingUp, color: "text-blue-400" },
          { title: "Job Match Score", value: "72%", icon: CheckCircle, color: "text-emerald-400" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <Icon className={`w-6 h-6 mb-3 ${s.color}`} />
              <h3 className="text-2xl font-bold mb-1 text-white">{s.value}</h3>
              <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{s.title}</p>
            </div>
          );
        })}
      </div>

      {/* Detailed Gaps Matrix */}
      <div>
        <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Identified Discrepancies</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {skillGapsData?.gaps?.map((gap, i) => {
            const currentPercentage = getNumericalCurrent(gap.currentLevel);
            const targetPercentage = getNumericalTarget(gap.targetLevel);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{gap.skill}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2.5 py-1 rounded-sm uppercase tracking-wide font-semibold ${getPriorityColor(gap.importance)}`}>
                        {gap.importance} Priority
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/app/learning-navigator"
                    className="text-gray-400 hover:text-white flex items-center gap-1.5 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm"
                    title="Generate Curriculum"
                  >
                    Resolve <ArrowRight className="w-4 w-4" />
                  </Link>
                </div>

                {/* Progress Visual */}
                <div className="mt-4 bg-[#1A1A1A] rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                    <span>{gap.currentLevel} (You)</span>
                    <span>{gap.targetLevel} (Req)</span>
                  </div>

                  <div className="w-full h-2.5 bg-gray-800 rounded-full relative mt-3 mb-2">
                    {/* Target Mark */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-white rounded-full z-20 shadow-[0_0_10px_white]"
                      style={{ left: `${targetPercentage}%` }}
                    />
                    {/* Current Fill */}
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: `${currentPercentage}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full relative z-10"
                    />
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Deficit: Requires roughly {(targetPercentage - currentPercentage) / 10} weeks of focused study.
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-12 bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl text-center">
        <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-white">Let's close these gaps.</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Gemini can generate a step-by-step curriculum specifically designed to bridge the chasm between your current state and target role expectations.
        </p>
        <Link
          to="/app/learning-navigator"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
        >
          Generate Curriculum <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
// Stub for BookOpen icon which I missed importing directly, declaring here to prevent error
import { BookOpen } from "lucide-react";