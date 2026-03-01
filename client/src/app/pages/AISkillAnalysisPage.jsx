import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain, Code, Database, Cloud, ArrowRight, Award, Target, AlertCircle, TrendingUp, Loader2, Sparkles
} from "lucide-react";

import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip
} from "recharts";

export default function AISkillAnalysisPage() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/skill-analysis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setAnalysisData(data);
      } catch (error) {
        console.error("Failed to fetch analysis data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalysisData();
  }, []);

  const stats = [
    { label: "Overall Score", value: "78/100", change: "+12 pts", icon: Target, color: "text-blue-400" },
    { label: "Skills Evaluated", value: "24", change: "8 categories", icon: Brain, color: "text-purple-400" },
    { label: "Core Strengths", value: analysisData?.strengths?.length || "0", change: "Above average", icon: Award, color: "text-emerald-400" },
    { label: "Critical Gaps", value: analysisData?.weaknesses?.length || "0", change: "Needs attention", icon: AlertCircle, color: "text-orange-400" },
  ];

  const skillCategories = [
    {
      category: "Frontend",
      icon: Code,
      color: "text-blue-400",
      skills: [
        { name: "React", level: 85 },
        { name: "TypeScript", level: 70 },
        { name: "CSS", level: 90 },
      ],
    },
    {
      category: "Backend",
      icon: Brain,
      color: "text-purple-400",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express", level: 75 },
        { name: "GraphQL", level: 45 },
      ],
    },
    {
      category: "Database",
      icon: Database,
      color: "text-emerald-400",
      skills: [
        { name: "PostgreSQL", level: 70 },
        { name: "MongoDB", level: 60 },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      color: "text-orange-400",
      skills: [
        { name: "AWS", level: 55 },
        { name: "Docker", level: 50 },
      ],
    },
  ];

  const radarData = [
    { subject: "Frontend", value: 78 },
    { subject: "Backend", value: 72 },
    { subject: "Database", value: 61 },
    { subject: "Cloud", value: 49 },
    { subject: "System Design", value: 55 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
        <p className="text-gray-400">Gemini is analyzing your technical profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          AI Skill Analysis
        </h1>
        <p className="text-gray-400">
          A deep dive into your technical proficiencies, powered by Gemini.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full flex items-center gap-1 font-medium border border-emerald-400/20">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-1">{stat.value}</h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" /> Skill Distribution Overlay
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Radar
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="#3B82F6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-br from-purple-900/20 to-[#0A0A0A] border border-purple-500/20 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-purple-400" /> Executive Summary
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {analysisData?.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2 text-sm"><Award className="w-4 h-4" /> Top Strengths</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {analysisData?.strengths?.map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-orange-400 font-semibold mb-2 flex items-center gap-2 text-sm"><AlertCircle className="w-4 h-4" /> Key Weaknesses</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {analysisData?.weaknesses?.map((w, i) => <li key={i}>• {w}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b border-white/10 pb-4">Taxonomy Breakdown</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-white/5 ${cat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{cat.category}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, j) => (
                    <div key={j}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-500 font-mono">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 text-center backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-3 text-white">
            Ready to bridge the gap?
          </h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Gemini has identified {analysisData?.weaknesses?.length || 0} critical areas for improvement. Review your skill gaps to generate a targeted learning roadmap.
          </p>
          <Link
            to="/app/skill-gap"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
          >
            Review Skill Gaps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}