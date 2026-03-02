import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { postJson } from "../lib/api";
import {
  DollarSign,
  TrendingUp,
  Target,
  Plus,
  Minus,
  Briefcase,
  Sparkles,
  Loader2,
  AlertTriangle,
  Layers,
  Building2,
  ShieldCheck
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";

const availableSkills = [
  "React", "Node.js", "TypeScript", "AWS", "Docker",
  "Kubernetes", "GraphQL", "System Design", "Python", "Go",
  "Machine Learning", "Data Engineering", "CI/CD", "Figma", "Product Strategy"
];

const defaultProfessions = [
  "Software Engineer",
  "Data Scientist",
  "Cloud Engineer",
  "DevOps Engineer",
  "Cybersecurity Analyst",
  "Product Manager",
  "UI/UX Designer",
  "QA Automation Engineer"
];

const formatINR = (value) => `INR ${Number(value || 0).toLocaleString("en-IN")}`;

export default function CareerSimulationPage() {
  const { user } = useAuth();
  const [selectedSkills, setSelectedSkills] = useState(["React", "Node.js"]);
  const [experienceYears, setExperienceYears] = useState(3);
  const [selectedProfession, setSelectedProfession] = useState("Software Engineer");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [error, setError] = useState("");

  const professionOptions = simulationResult?.availableProfessions?.length
    ? simulationResult.availableProfessions
    : defaultProfessions;

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const runSimulation = async () => {
    setError("");
    setIsSimulating(true);
    try {
      const data = await postJson("/api/gemini/career-simulation", {
        userId: user?.id,
        role: selectedProfession,
        selectedSkills,
        experienceYears
      });
      setSimulationResult(data);
    } catch (err) {
      setError(err.message || "Simulation failed");
    } finally {
      setIsSimulating(false);
    }
  };

  const fallbackProjectionData = useMemo(() => {
    const baseSalary = 780000 + selectedSkills.length * 25000 + experienceYears * 40000;
    return Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      salary: Math.round(baseSalary * (1 + i * 0.012)),
    }));
  }, [selectedSkills.length, experienceYears]);

  const projectionData = Array.isArray(simulationResult?.salaryProjection) && simulationResult.salaryProjection.length
    ? simulationResult.salaryProjection
    : fallbackProjectionData;

  const benchmarkData = Array.isArray(simulationResult?.marketBenchmarks)
    ? simulationResult.marketBenchmarks
    : [];

  const currentSalary = simulationResult?.meta?.salaryNowINR || projectionData[0]?.salary || 0;
  const salary3Year = simulationResult?.meta?.salary3YearINR || projectionData[projectionData.length - 1]?.salary || 0;
  const confidence = simulationResult?.meta?.confidence || 60;
  const demandScore = simulationResult?.meta?.demandScore || 6;

  return (
    <div className="p-6 space-y-8 min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen opacity-40" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col xl:flex-row justify-between gap-4 xl:items-end">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 mb-2">
              Career Intelligence Lab
            </h1>
            <p className="text-gray-400">
              Profession-wise simulation, INR salary outlook, role details, and market benchmark in one view.
            </p>
          </div>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all disabled:opacity-70"
          >
            {isSimulating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {isSimulating ? "Simulating..." : "Run Career Simulation"}
          </button>
        </div>

        {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div> : null}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Choose Profession</p>
                <select
                  value={selectedProfession}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                  className="w-full bg-black/30 border border-white/15 rounded-lg px-3 py-2 text-sm"
                >
                  {professionOptions.map((profession) => (
                    <option key={profession} value={profession} className="bg-[#111]">
                      {profession}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <p className="text-xs uppercase tracking-wider text-gray-500">Experience</p>
                  <span className="text-emerald-300 text-sm font-semibold">{experienceYears} years</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Skill Switchboard</h3>
                <button onClick={() => setSelectedSkills([])} className="text-xs text-gray-400 hover:text-white">Clear</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border flex items-center gap-1 ${active
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

          <div className="xl:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={DollarSign} title="Current Simulated" value={formatINR(currentSalary)} color="text-emerald-300" />
              <StatCard icon={TrendingUp} title="3-Year Projection" value={formatINR(salary3Year)} color="text-blue-300" />
              <StatCard icon={ShieldCheck} title="Confidence" value={`${confidence}%`} color="text-purple-300" />
              <StatCard icon={Target} title="Demand Score" value={`${demandScore}/10`} color="text-orange-300" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md h-[360px] flex flex-col">
                <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" /> 12-Month INR Salary Projection
                </h3>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                      <XAxis dataKey="month" stroke="#ffffff66" tick={{ fill: "#ffffff66", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis
                        stroke="#ffffff66"
                        tick={{ fill: "#ffffff66", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${Math.round(value / 100000) / 10}L`}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1a1a1a", borderColor: "#333", borderRadius: "8px", color: "#fff" }}
                        formatter={(value) => [formatINR(value), "Projected Salary"]}
                      />
                      <Area type="monotone" dataKey="salary" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSalary)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md h-[360px] flex flex-col">
                <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" /> Profession Market Benchmark
                </h3>
                <div className="flex-1">
                  {benchmarkData.length ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={benchmarkData} margin={{ top: 8, right: 8, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                        <XAxis dataKey="role" stroke="#ffffff66" tick={{ fill: "#ffffff66", fontSize: 10 }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={60} />
                        <YAxis stroke="#ffffff66" tick={{ fill: "#ffffff66", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 100000) / 10}L`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1a1a1a", borderColor: "#333", borderRadius: "8px", color: "#fff" }}
                          formatter={(value, name) => [formatINR(value), name === "salaryNowINR" ? "Now" : "3-Year"]}
                        />
                        <Legend />
                        <Bar dataKey="salaryNowINR" name="Now" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="salary3YearINR" name="3-Year" fill="#34D399" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full rounded-xl border border-white/10 bg-black/20 flex items-center justify-center text-sm text-gray-400">
                      Run simulation to load profession benchmarks.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {simulationResult && !isSimulating ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-6 rounded-2xl backdrop-blur-md space-y-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 mt-1">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">AI Scenario: {simulationResult?.role}</h3>
                      <p className="text-gray-300 mt-2 leading-relaxed">{simulationResult?.simulation?.scenario}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoBox title="Role Overview" icon={Briefcase} items={[simulationResult?.professionDetails?.overview]} />
                    <InfoBox title="Industries" icon={Building2} items={simulationResult?.professionDetails?.industries || []} />
                    <InfoBox title="Top Certifications" icon={ShieldCheck} items={simulationResult?.professionDetails?.certifications || []} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <ListBlock title="Core Challenges" color="text-orange-400" icon={AlertTriangle} values={simulationResult?.simulation?.challenges || []} />
                    <ListBlock title="Success Metrics" color="text-emerald-400" icon={TrendingUp} values={simulationResult?.simulation?.successMetrics || []} />
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    <MetricMini label="AWS Path" value={formatINR(simulationResult?.meta?.pathComparison?.awsPathSalaryINR || 0)} tone="text-emerald-300" />
                    <MetricMini label="Data/AI Path" value={formatINR(simulationResult?.meta?.pathComparison?.dataSciencePathSalaryINR || 0)} tone="text-blue-300" />
                    <MetricMini label="AWS vs Data/AI" value={`${simulationResult?.meta?.pathComparison?.awsVsDataSciencePct || 0}%`} tone="text-purple-300" />
                  </div>

                  <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                    <p className="text-sm">
                      <strong className="text-purple-400">Estimated Outcome: </strong>
                      <span className="text-gray-300">{simulationResult?.simulation?.estimatedImpact}</span>
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
      <Icon className={`w-5 h-5 mb-2 ${color}`} />
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-1">{title}</p>
    </div>
  );
}

function MetricMini({ label, value, tone }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className={`text-sm font-semibold ${tone}`}>{value}</p>
    </div>
  );
}

function InfoBox({ title, icon: Icon, items }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-300 mb-3 flex items-center gap-2">
        <Icon className="w-4 h-4" /> {title}
      </h4>
      <ul className="space-y-2 text-sm text-gray-300">
        {(items || []).map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">-</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListBlock({ title, values, color, icon: Icon }) {
  return (
    <div>
      <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide mb-3 ${color}`}>
        <Icon className="w-4 h-4" /> {title}
      </h4>
      <ul className="space-y-2">
        {values.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 bg-black/20 p-2.5 rounded-lg border border-white/5">
            <span className="text-gray-500 mt-0.5">-</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
