import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Target,
  Plus,
  Minus,
  ArrowRight,
  Briefcase,
  Sparkles,
  Loader2,
  AlertTriangle
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const availableSkills = [
  "React", "Node.js", "TypeScript", "AWS", "Docker",
  "Kubernetes", "GraphQL", "System Design", "Python", "Go"
];

export default function CareerSimulationPage() {
  const [selectedSkills, setSelectedSkills] = useState(["React", "Node.js"]);
  const [experienceYears, setExperienceYears] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/career-simulation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "Frontend Developer" }),
      });
      const data = await response.json();
      setSimulationResult(data);
    } catch (error) {
      console.error("Simulation failed", error);
    } finally {
      setIsSimulating(false);
    }
  };

  const baseSalary = 85000;
  const projectedSalary = Math.round(
    baseSalary * (1 + selectedSkills.length * 0.08 + experienceYears * 0.05)
  );

  const projectionData = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    salary: Math.round(baseSalary * (1 + (selectedSkills.length + i * 0.3) * 0.08 + (experienceYears + i / 12) * 0.05)),
  }));

  return (
    <div className="p-6 space-y-8 min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen opacity-40" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 mb-2">
              Career Trajectory Sandbox
            </h1>
            <p className="text-gray-400">
              Adjust your parameters to see AI-driven salary forecasts and career scenarios.
            </p>
          </div>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all disabled:opacity-70"
          >
            {isSimulating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {isSimulating ? "Running AI Simulation..." : "Run AI Simulation"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-1 space-y-6">

            {/* Real-time Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                <DollarSign className="w-6 h-6 text-emerald-400 mb-2" />
                <h2 className="text-2xl font-bold">${(projectedSalary / 1000).toFixed(1)}k</h2>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-1">Projected Salary</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
                <h2 className="text-2xl font-bold">{Math.min(99, selectedSkills.length * 8 + 40)}%</h2>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-1">Market Demand</p>
              </div>
            </div>

            {/* Experience Slider */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-semibold text-lg">Experience Level</h3>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg">
                  {experienceYears} YOE
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Skill Selector */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Toggle Skills</h3>
                <button onClick={() => setSelectedSkills([])} className="text-xs text-gray-400 hover:text-white transition-colors">Clear All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border flex items-center gap-1 ${active
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                        }`}
                    >
                      {active ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Visualization & AI Output Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Chart Area */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md h-[400px] flex flex-col">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" /> 12-Month Compensation Trajectory
              </h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                    <XAxis dataKey="month" stroke="#ffffff66" tick={{ fill: '#ffffff66', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis
                      stroke="#ffffff66"
                      tick={{ fill: '#ffffff66', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#10b981' }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Projected Salary']}
                    />
                    <Area type="monotone" dataKey="salary" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSalary)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Simulation Result Area */}
            <AnimatePresence mode="wait">
              {simulationResult && !isSimulating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-6 rounded-2xl backdrop-blur-md"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 mt-1">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        AI Scenario: {simulationResult.role}
                        <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-blue-500/20 text-blue-300 rounded">Generated</span>
                      </h3>
                      <p className="text-gray-300 mt-2 leading-relaxed">{simulationResult.simulation.scenario}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-orange-400 uppercase tracking-wide mb-3">
                        <AlertTriangle className="w-4 h-4" /> Core Challenges
                      </h4>
                      <ul className="space-y-2">
                        {simulationResult.simulation.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300 bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <span className="text-orange-500/50 block mt-0.5">•</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-3">
                        <TrendingUp className="w-4 h-4" /> Success Metrics
                      </h4>
                      <ul className="space-y-2">
                        {simulationResult.simulation.successMetrics.map((m, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300 bg-black/20 p-2.5 rounded-lg border border-white/5">
                            <span className="text-emerald-500/50 block mt-0.5">•</span> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
                    <p className="text-sm">
                      <strong className="text-purple-400">Estimated Outcome: </strong>
                      <span className="text-gray-300">{simulationResult.simulation.estimatedImpact}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}