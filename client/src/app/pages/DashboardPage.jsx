import { Target, TrendingUp, Award, Zap, ArrowRight, Activity, BookOpen, GraduationCap, Loader2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { postJson } from "../lib/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(" ")[0] : "Explorer";

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await postJson("/api/gemini/dashboard", { userId: user?.id });
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id, user?.hasResume]);

  const statsGridData = dashboardData ? [
    { title: "Skill Score", value: dashboardData.stats.skillScore, icon: Target, trend: dashboardData.stats.skillTrend, color: "text-blue-400" },
    { title: "AI Readiness", value: dashboardData.stats.aiReadiness, icon: TrendingUp, trend: dashboardData.stats.aiReadinessTrend, color: "text-emerald-400" },
    { title: "Achievements", value: dashboardData.stats.achievements, icon: Award, trend: dashboardData.stats.achievementsTrend, color: "text-purple-400" },
    { title: "Active Streak", value: dashboardData.stats.streak, icon: Zap, trend: dashboardData.stats.streakTrend, color: "text-orange-400" }
  ] : [];

  const quickActions = [
    { title: "Career Simulation", desc: "Forecast your trajectory", link: "/app/career-simulation", icon: TrendingUp },
    { title: "Learning Navigator", desc: "View AI curriculum", link: "/app/learning-navigator", icon: BookOpen },
    { title: "Analyze Skills", desc: "Identify critical gaps", link: "/app/skill-gap", icon: Target },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-400">AI is assembling your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-[#0A0A0A] text-white">
      {/* Welcome Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{userName}</span> 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Your career trajectory is looking strong. Let's keep the momentum going.
          </p>
        </div>
        <Link
          to="/app/learning-navigator"
          className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-yellow-400" /> Resume Learning
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {statsGridData.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
              <Icon className={`w-8 h-8 mb-4 ${stat.color}`} />
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-gray-400 mt-1 uppercase tracking-wide font-semibold">{stat.title}</p>
                </div>
                <span className="text-sm font-medium px-2 py-1 bg-white/10 rounded-lg text-emerald-400">
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">

          {/* Quick Actions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" /> AI Quick Actions
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => {
                const ActionIcon = action.icon;
                return (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={i}>
                    <Link
                      to={action.link}
                      className="block p-5 rounded-xl bg-[#0F0F0F] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group h-full"
                    >
                      <ActionIcon className="w-6 h-6 text-gray-400 mb-3 group-hover:text-blue-400 transition-colors" />
                      <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                      <p className="text-xs text-gray-500 mb-4">{action.desc}</p>
                      <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Launch <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-blue-900/20 to-[#0A0A0A] border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md pb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
              <Zap className="w-5 h-5 text-blue-400" /> AI Career Insights
            </h2>
            <p className="text-gray-300 leading-relaxed font-medium">
              {dashboardData?.insights?.message}
            </p>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-full">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" /> Recent Activity
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent before:hidden">
              {dashboardData?.activity?.map((act) => (
                <div key={act.id} className="flex gap-4 items-start">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.type === 'analysis' ? 'bg-blue-500/20 text-blue-400' :
                    act.type === 'upload' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                    {act.type === 'analysis' ? <Target className="w-5 h-5" /> :
                      act.type === 'upload' ? <Upload className="w-5 h-5" /> :
                        <GraduationCap className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{act.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
