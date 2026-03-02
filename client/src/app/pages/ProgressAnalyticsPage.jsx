import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { postJson } from "../lib/api";
import {
  Target, TrendingUp, Award, Zap, ArrowRight, Loader2
} from "lucide-react";

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area
} from "recharts";

export default function ProgressAnalyticsPage() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await postJson("/api/gemini/progress-analytics", { userId: user?.id });
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const progressData = analyticsData?.chartData || [
    { month: "Jan", score: 62 },
    { month: "Feb", score: 65 },
    { month: "Mar", score: 68 },
    { month: "Apr", score: 72 }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-400">AI is compiling your analytics...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          Progress Analytics
        </h1>
        <p className="text-gray-400">
          Track your skill growth trajectory and behavioral performance.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Net Score", value: `+${analyticsData?.overallProgress || 0}`, icon: TrendingUp, color: "text-emerald-400" },
          { title: "Top Gain", value: analyticsData?.topSkillGain || "N/A", icon: Target, color: "text-blue-400" },
          { title: "Skills Validated", value: "12", icon: Award, color: "text-purple-400" },
          { title: "Current Streak", value: "24 Days", icon: Zap, color: "text-orange-400" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md relative overflow-hidden group"
            >
              <Icon className={`w-8 h-8 mb-4 ${s.color}`} />
              <h3 className="text-2xl font-bold mb-1 text-white">{s.value}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{s.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Line */}
        <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" /> Historical Score
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" /> Milestones Reached
          </h2>

          <div className="space-y-4">
            {[
              { text: "Mastered React Hooks in under 2 weeks", icon: Award, color: "text-purple-400", bg: "bg-purple-400/10" },
              { text: "Overcame 'System Design' deficit by 15%", icon: Target, color: "text-blue-400", bg: "bg-blue-400/10" },
              { text: "Consistency streak: 24 days straight", icon: Zap, color: "text-orange-400", bg: "bg-orange-400/10" },
              { text: "Analyzed resume for Senior roles", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" }
            ].map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={i} whileHover={{ x: 5 }} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                  <div className={`p-3 rounded-xl ${a.bg} ${a.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-300">{a.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="bg-gradient-to-br from-blue-900/30 to-transparent border border-blue-500/20 p-8 rounded-3xl text-center"
      >
        <h3 className="text-2xl font-bold mb-3 text-white">Compound your growth</h3>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          You are currently outperforming 68% of users in your cohort. Let AI generate your optimal schedule for this week to maintain momentum.
        </p>
        <Link
          to="/app/weekly-planner"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
        >
          View Weekly Planner <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
