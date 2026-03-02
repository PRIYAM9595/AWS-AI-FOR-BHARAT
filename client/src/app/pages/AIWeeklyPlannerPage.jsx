import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postJson } from "../lib/api";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Loader2,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const quickPrompts = [
  "Backend + System Design sprint",
  "React interview prep with projects",
  "Cloud + DevOps execution week",
  "Data structures + problem solving",
  "AI/ML portfolio acceleration"
];

export default function AIWeeklyPlannerPage() {
  const { user } = useAuth();
  const [plannerData, setPlannerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [userPrompt, setUserPrompt] = useState("");
  const [error, setError] = useState("");

  const localFallbackPlan = (focusText) => ({
    weekOf: "Current Week",
    focusArea: focusText || "Core Technical Growth",
    weeklyGoal: "Ship one measurable skill improvement by end of week.",
    whyThisWeek: "Build consistency and turn concepts into deliverables.",
    intensity: "Medium",
    successMetrics: [
      "Complete all focus blocks",
      "Publish one artifact",
      "Close one skill gap"
    ],
    plan: [
      { day: "Mon", task: "Review one core concept and summarize notes.", duration: "1h", priority: "High", type: "Learn", outcome: "Structured concept notes" },
      { day: "Wed", task: "Build one hands-on mini exercise from that concept.", duration: "1.5h", priority: "High", type: "Build", outcome: "Working mini project chunk" },
      { day: "Fri", task: "Revise weak points and document improvements.", duration: "1h", priority: "Medium", type: "Review", outcome: "Weekly retrospective" }
    ]
  });

  const toShortDay = (dayValue) => {
    const dayMap = {
      monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun",
      mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun"
    };
    const key = String(dayValue || "").trim().toLowerCase();
    return dayMap[key] || "Mon";
  };

  const normalizePlanPayload = (raw) => {
    const rows = Array.isArray(raw?.plan) ? raw.plan : Array.isArray(raw?.tasks) ? raw.tasks : [];
    const plan = rows.map((task, index) => ({
      day: toShortDay(task?.day || task?.weekday || "Mon"),
      task: task?.task || task?.title || `Study Session ${index + 1}`,
      duration: task?.duration || task?.time || "1h",
      priority: task?.priority || "Medium",
      type: task?.type || "Learn",
      outcome: task?.outcome || "Session completed with notes"
    }));

    return {
      weekOf: raw?.weekOf || raw?.week || "Current Week",
      focusArea: raw?.focusArea || raw?.focus || "Skill Development",
      weeklyGoal: raw?.weeklyGoal || "Complete focused execution blocks this week.",
      whyThisWeek: raw?.whyThisWeek || "This plan balances consistency and impact.",
      intensity: raw?.intensity || "Medium",
      successMetrics: Array.isArray(raw?.successMetrics) ? raw.successMetrics : ["Complete planned sessions"],
      plan
    };
  };

  const generatePlan = async () => {
    setError("");
    setIsLoading(true);
    try {
      const data = await postJson("/api/gemini/weekly-planner", {
        userId: user?.id,
        userPrompt: userPrompt.trim() || "I want to improve my general tech skills this week"
      });
      const normalized = normalizePlanPayload(data);
      setPlannerData(normalized.plan.length ? normalized : localFallbackPlan(userPrompt.trim()));
    } catch (err) {
      setError(err.message || "Failed to generate weekly plan.");
      setPlannerData(localFallbackPlan(userPrompt.trim()));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id && user?.hasResume) {
      generatePlan();
    }
  }, [user?.id, user?.hasResume]);

  const weeklyTasks = plannerData?.plan || [];
  const currentTasks = weeklyTasks.filter((task) => task.day === selectedDay);
  const visibleTasks = currentTasks;
  const dayTaskCount = useMemo(
    () =>
      weekDays.reduce((acc, day) => {
        acc[day] = weeklyTasks.filter((task) => task.day === day).length;
        return acc;
      }, {}),
    [weeklyTasks]
  );

  const completionScore = useMemo(() => {
    if (!weeklyTasks.length) return 0;
    const highPriority = weeklyTasks.filter((t) => String(t.priority).toLowerCase() === "high").length;
    return Math.min(100, Math.round(40 + ((highPriority / weeklyTasks.length) * 60)));
  }, [weeklyTasks]);

  const getStatusIcon = (index) => {
    if (index === 0) return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (index === 1) return <Rocket className="w-5 h-5 text-blue-500" />;
    return <Circle className="w-5 h-5 text-gray-600" />;
  };

  const priorityClass = (priority) => {
    const p = String(priority || "").toLowerCase();
    if (p === "high") return "text-red-300 bg-red-500/10 border-red-500/20";
    if (p === "low") return "text-cyan-300 bg-cyan-500/10 border-cyan-500/20";
    return "text-amber-300 bg-amber-500/10 border-amber-500/20";
  };

  if (isLoading && !plannerData) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-400">AI is building your strategy sprint...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-[#0A0A0A] text-white">
      <div className="bg-gradient-to-r from-blue-700/20 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-6 md:p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Weekly Command Center</h1>
            <p className="text-gray-300">Adaptive plan for {plannerData?.weekOf || "this week"}</p>
            <p className="text-blue-300 mt-2 font-medium">Focus: {plannerData?.focusArea || "Skill Growth"}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <MetricCard icon={Target} label="Execution Score" value={`${completionScore}%`} />
            <MetricCard icon={Flame} label="Intensity" value={plannerData?.intensity || "Medium"} />
            <MetricCard icon={Calendar} label="Weekly Tasks" value={String(weeklyTasks.length)} />
            <MetricCard icon={TrendingUp} label="Momentum" value={weeklyTasks.length > 2 ? "Strong" : "Building"} />
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <label className="block text-sm text-gray-300">Tell AI what outcome you want this week</label>
        <div className="flex gap-3">
          <input
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") generatePlan();
            }}
            placeholder="e.g. I want to crack backend interviews with 2 mock rounds"
            className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
          />
          <button
            onClick={generatePlan}
            disabled={isLoading}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Regenerate
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                setUserPrompt(prompt);
                setTimeout(() => generatePlan(), 0);
              }}
              className="text-xs px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-3">Strategy Brief</h2>
          <p className="text-gray-300 mb-2"><span className="text-gray-400">Goal:</span> {plannerData?.weeklyGoal}</p>
          <p className="text-gray-300"><span className="text-gray-400">Why now:</span> {plannerData?.whyThisWeek}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-3">Success Metrics</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {(plannerData?.successMetrics || []).map((metric, i) => (
              <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />{metric}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {weekDays.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`min-w-[90px] px-4 py-3 rounded-xl border text-left transition ${
              selectedDay === day
                ? "bg-blue-600 border-blue-500 shadow-lg shadow-blue-900/30"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <p className="font-semibold">{day}</p>
            <p className={`text-xs ${selectedDay === day ? "text-blue-100" : "text-gray-400"}`}>
              {dayTaskCount[day] || 0} task{dayTaskCount[day] === 1 ? "" : "s"}
            </p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{selectedDay} Plan</h2>
        <p className="text-sm text-gray-400">
          {visibleTasks.length > 0 ? `${visibleTasks.length} focused block(s)` : "No block scheduled"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {visibleTasks.length > 0 ? visibleTasks.map((task, index) => (
          <motion.div
            key={`${task.day}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">{getStatusIcon(index)}<span className="text-sm text-gray-400">{task.day}</span></div>
              <span className={`text-xs px-2 py-1 rounded-full border ${priorityClass(task.priority)}`}>{task.priority}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{task.task}</h3>
            <div className="text-sm text-gray-400 mb-2 flex items-center gap-2"><Clock className="w-4 h-4" />{task.duration} | {task.type}</div>
            <p className="text-sm text-cyan-300">Outcome: {task.outcome}</p>
          </motion.div>
        )) : (
          <div className="col-span-2 text-center py-12 text-gray-400 bg-white/5 border border-white/10 rounded-2xl">No tasks available for {selectedDay}. Click another day or regenerate your week.</div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 pt-2">
        <Link
          to="/app/progress-analytics"
          className="p-5 border border-white/10 rounded-2xl bg-white/5 flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-emerald-400">Track Weekly Delta</h3>
            <p className="text-sm text-gray-400">Compare planned vs executed progress.</p>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-400" />
        </Link>
        <button
          onClick={generatePlan}
          className="p-5 border border-white/10 rounded-2xl bg-white/5 flex justify-between items-center text-left"
        >
          <div>
            <h3 className="font-bold text-blue-400">Re-Strategize Week</h3>
            <p className="text-sm text-gray-400">Ask AI for a new tactical plan.</p>
          </div>
          <Sparkles className="w-5 h-5 text-blue-400" />
        </button>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-white/10 border border-white/10 p-3">
      <Icon className="w-4 h-4 text-blue-300 mb-1" />
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}


