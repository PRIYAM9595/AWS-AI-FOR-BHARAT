import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Github,
  Linkedin,
  CheckCircle,
  Sparkles,
  ArrowRight,
  X,
  Loader2,
  AlertCircle
} from "lucide-react";

export default function ResumeUploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { uploadResume, user } = useAuth();

  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [githubConnected, setGithubConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // If redirect contained an alert, let's show it
  const alertMsg = location.state?.alert;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (uploadedFile) {
      setIsUploading(true);
      try {
        await uploadResume(uploadedFile);
        // Redirect to dashboard where the user can now browse
        navigate("/app/dashboard");
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute bottom-[0%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-40" />
      </div>

      <motion.div
        className="z-10 w-full max-w-3xl space-y-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20"
          >
            <Sparkles className="w-4 h-4" />
            Step 1 of your SkillGPS Journey
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Build Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">AI Profile</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Upload your resume and connect your profiles to unlock your personalized Dashboard, Learning Navigator, and Career Simulations.
          </p>
        </div>

        {alertMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 max-w-xl mx-auto"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{alertMsg}</p>
          </motion.div>
        )}

        {/* Upload Area */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-3xl shadow-2xl">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative flex flex-col items-center justify-center p-12 text-center rounded-[1.35rem] transition-all duration-300 min-h-[300px]
              ${dragActive
                ? "bg-blue-500/10 border-2 border-dashed border-blue-400"
                : "bg-white/5 border border-dashed border-white/20 hover:border-white/30 hover:bg-white/10"
              }
            `}
          >
            <AnimatePresence mode="wait">
              {uploadedFile ? (
                <motion.div
                  key="uploaded"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-white truncate max-w-[250px]">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium border-0 cursor-pointer"
                  >
                    <X className="w-4 h-4" /> Remove File
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="upload-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 mb-6 rounded-full bg-blue-500/10 flex items-center justify-center transition-colors">
                    <Upload className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Drag & drop your resume</h3>
                  <p className="text-gray-400 mb-6 max-w-sm">
                    Supports PDF, DOCX, and TXT files. Your data is private and securely encrypted.
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    id="resume"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileInput}
                  />
                  <label
                    htmlFor="resume"
                    className="cursor-pointer bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-white/10"
                  >
                    Browse Files
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* External Connections */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setGithubConnected(!githubConnected)}
            className={`
              flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left
              ${githubConnected
                ? "bg-green-500/10 border-green-500/30 text-white"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            <div className="flex gap-4 items-center">
              <Github className={`w-8 h-8 ${githubConnected ? "text-green-400" : ""}`} />
              <div className="py-1">
                <p className="font-semibold text-lg leading-none mb-1">GitHub</p>
                <p className="text-sm opacity-70">Sync repos & commits</p>
              </div>
            </div>
            {githubConnected && <CheckCircle className="w-6 h-6 text-green-400" />}
          </button>

          <button
            onClick={() => setLinkedinConnected(!linkedinConnected)}
            className={`
              flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left
              ${linkedinConnected
                ? "bg-blue-500/10 border-blue-500/30 text-white"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            <div className="flex gap-4 items-center">
              <Linkedin className={`w-8 h-8 ${linkedinConnected ? "text-blue-400" : ""}`} />
              <div className="py-1">
                <p className="font-semibold text-lg leading-none mb-1">LinkedIn</p>
                <p className="text-sm opacity-70">Import employment history</p>
              </div>
            </div>
            {linkedinConnected && <CheckCircle className="w-6 h-6 text-blue-400" />}
          </button>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: uploadedFile ? 1.02 : 1 }}
          whileTap={{ scale: uploadedFile ? 0.98 : 1 }}
          disabled={!uploadedFile || isUploading}
          onClick={handleAnalyze}
          className={`
            w-full py-4 rounded-2xl flex justify-center gap-3 items-center font-bold text-lg transition-all shadow-xl cursor-pointer border-0
            ${uploadedFile && !isUploading
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/25"
              : "bg-white/5 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Ingesting Data & Unlocking Platform...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" /> Unlock Full Experience <ArrowRight className="w-6 h-6" />
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}