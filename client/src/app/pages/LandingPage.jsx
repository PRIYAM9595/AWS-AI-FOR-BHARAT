import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Brain,
  TrendingUp,
  Sparkles,
  Zap,
  Globe,
  GitBranch,
  Award,
  ChevronRight
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30 overflow-hidden font-sans">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen opacity-40" />
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] mix-blend-screen opacity-30" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
            SkillGPS
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="text-gray-400 hover:text-white font-medium transition-colors hidden md:block">
            Sign In
          </Link>
          <Link
            to="/register"
            className="group block relative px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-medium transition-all"
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              Get Started
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 py-32 md:py-48 text-center max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            SkillGPS v2.0 - Next-Gen Career Navigation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
          >
            Navigate your career with <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
              artificial intelligence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl max-w-2xl mb-12"
          >
            Stop guessing your next move. Upload your resume, let AI AI analyze your skill gaps, and get personalized roadmaps with predictive salary simulations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/25 group"
            >
              Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The ultimate toolkit for growth</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to map out your software engineering career trajectory, powered by state-of-the-art language models.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  key={i}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group cursor-default"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${f.color} bg-opacity-10 border border-white/5`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-[#0A0A0A]"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-t-[3rem] p-12 md:p-20 text-center relative z-10 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to accelerate?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">Join thousands of developers using SkillGPS to crack the code to higher compensation and better roles.</p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Unlock Your Potential <span className="p-1 bg-black text-white rounded-full ml-2"><ChevronRight className="w-4 h-4" /></span>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-sm text-gray-600 relative z-10 bg-[#0A0A0A]">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-gray-600" />
          <span className="font-bold tracking-tight">SkillGPS</span>
        </div>
        <p>© 2026 SkillGPS AI. All rights strictly reserved.</p>
      </footer>
    </div>
  );
}

const features = [
  { icon: Brain, title: "AI Analysis", description: "Upload your resume and let AI pinpoint your strengths and uncover critical skill gaps compared to your target role.", color: "from-blue-600 to-blue-400" },
  { icon: Target, title: "Gap Detection", description: "A crystal clear mapping of what you know versus what top companies are actively recruiting for right now.", color: "from-purple-600 to-purple-400" },
  { icon: TrendingUp, title: "Smart Roadmaps", description: "Dynamically generated, step-by-step learning modules focusing only on the skills that move the needle.", color: "from-emerald-600 to-emerald-400" },
  { icon: Globe, title: "Market Insights", description: "Real-time parsing of global tech employment trends ensuring your skills stay relevant tomorrow.", color: "from-orange-600 to-orange-400" },
  { icon: GitBranch, title: "Career Simulation", description: "Adjust parameters like YOEs and frameworks to predict exact salary bands and trajectory probability.", color: "from-pink-600 to-pink-400" },
  { icon: Award, title: "Job Readiness", description: "Live tracking of your technical and behavioral readiness, gamified to keep you pushing forward.", color: "from-yellow-600 to-yellow-400" },
];