import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  Upload, 
  FileText, 
  Github, 
  Linkedin,
  CheckCircle,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

export default function ResumeUploadPage() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [githubConnected, setGithubConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
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

  const handleAnalyze = () => {
    if (uploadedFile) {
      navigate('/analysis');
    }
  };

  return (
    
      {/* Animated Background */}

      {/* Content */}

          {/* Header */}

              Step 1: Upload Your Profile

              Let's Analyze Your Skills

              Upload your resume and connect your profiles to get started

          {/* Upload Section */}

              {uploadedFile ? (

                      {uploadedFile.name}
                      
                        {(uploadedFile.size / 1024).toFixed(2)} KB

                     setUploadedFile(null)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >

              ) : (
                <>

                      Drop your resume here

                      or click to browse your files

                      Choose File

                      Supports PDF, DOC, DOCX (Max 10MB)

              )}

          {/* Connection Cards */}
          
            {/* GitHub Connection */}

                  GitHub Profile
                  
                    Connect to analyze your repositories and contributions

               setGithubConnected(!githubConnected)}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  githubConnected
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                {githubConnected ? (

                    Connected
                  
                ) : (
                  'Connect GitHub'
                )}

            {/* LinkedIn Connection */}

                  LinkedIn Profile
                  
                    Import your experience and endorsements

               setLinkedinConnected(!linkedinConnected)}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  linkedinConnected
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                {linkedinConnected ? (

                    Connected
                  
                ) : (
                  'Connect LinkedIn'
                )}

          {/* Analyze Button */}

              {uploadedFile ? (
                <>
                  
                  Analyze My Skills

              ) : (
                <>
                  
                  Upload Resume to Continue
                
              )}

              Your data is encrypted and secure. We never share your information.

          {/* Features */}
          
            {features.map((feature, index) => (

                {feature.label}
              
            ))}

  );
}

const features = [
  { icon, label: "AI-Powered Analysis" },
  { icon, label: "Instant Results" },
  { icon, label: "Detailed Reports" }
];
