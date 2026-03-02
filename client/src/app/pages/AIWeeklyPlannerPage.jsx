import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Calendar, Clock, CheckCircle2, Circle, Play, ChevronRight, Sparkles, Loader2, ArrowRight
} from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AIWeeklyPlannerPage() {
  const { user } = useAuth();
  const [plannerData, setPlannerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Mon");

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/weekly-planner`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user?.id })
        });
        const data = await response.json();
        setPlannerData(data);
      } catch (error) {
        console.error("Failed to fetch planner data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanner();
  }, []);

  const getStatusIcon = (status) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (status === "in-progress") return <Play className="w-5 h-5 text-blue-500" />;
    return <Circle className="w-5 h-5 text-gray-600" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-400">Gemini is structuring your optimal week...</p>
      </div>
    );
  }

  // Map API plan to the selected day. For mock purposes, using the array returned.
  const currentTasks = plannerData?.plan || [];

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-sm text-blue-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 border border-blue-500/20 bg-blue-500/10 px-3 py-1 rounded-full w-max">
            <Sparkles className="h-4 w-4" /> AI Generated Schedule
          </p>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-1">
            Weekly Attack Plan
          </h1>
          <p className="text-gray-400">
            Focus: <span className="font-medium text-white">{plannerData?.focusArea || "Skill Development"}</span>
          </p>
        </div>
      </motion.div>

      {/* Day selector */}
      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
        {weekDays.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`min-w-[80px] px-5 py-4 rounded-2xl border transition-all ${isSelected
                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              <div className="font-bold text-lg">{day}</div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mt-1">
                {isSelected ? 'Active' : 'Pending'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tasks Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" /> {selectedDay} Itinerary
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {currentTasks.length > 0 ? (
            currentTasks.map((task, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-6 border border-white/10 rounded-2xl bg-[#0F0F0F] flex flex-col justify-between hover:border-gray-600 transition-colors group"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    {getStatusIcon(i === 0 ? "completed" : i === 1 ? "in-progress" : "pending")}
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-lg mb-2 text-white group-hover:text-blue-400 transition-colors">{task.task}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                      <span className="flex items-center gap-1.5 font-medium px-3 py-1 bg-white/5 rounded-lg">
                        <Clock className="h-4 w-4" /> {task.duration} Block
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md">
                        {task.day}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-12 bg-white/5 border border-white/10 rounded-2xl">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-20" />
              Rest day scheduled. No tasks queued.
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4 pt-4">
        <Link
          to="/app/progress-analytics"
          className="p-6 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-emerald-500/50 flex justify-between items-center group transition-all"
        >
          <div>
            <h3 className="font-bold text-lg text-emerald-400 mb-1">Track Progress</h3>
            <p className="text-sm text-gray-400">
              View your execution metrics.
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:translate-x-2 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

        <button
          className="p-6 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-blue-500/50 flex justify-between items-center group transition-all text-left"
        >
          <div>
            <h3 className="font-bold text-lg text-blue-400 mb-1">Regenerate Plan</h3>
            <p className="text-sm text-gray-400">
              Force Gemini to recalculate your week.
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-180 transition-all duration-500">
            <Sparkles className="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  );
}