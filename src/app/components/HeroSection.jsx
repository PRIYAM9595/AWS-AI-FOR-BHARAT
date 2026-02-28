import { motion } from 'framer-motion';
import { Sparkles, Upload, Github } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>AI-Powered Career Navigation</h1>

        <div className="hero-subtitle">
          <p>Navigate Your Career Like</p>
          <p className="highlight">Google Maps for Skills</p>
        </div>

        <p className="hero-description">
          Upload your resume or connect your GitHub to get AI-powered insights on skill gaps, 
          personalized learning roadmaps, and career growth predictions based on real-time market data.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary">
            <Upload size={20} />
            Upload Resume
          </button>

          <button className="btn btn-secondary">
            <Github size={20} />
            Connect GitHub
          </button>
        </div>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat">
            <span className="stat-value">10K+</span>
            <span className="stat-label">Skills Analyzed</span>
          </div>

          <div className="stat">
            <span className="stat-value">95%</span>
            <span className="stat-label">Career Match Rate</span>
          </div>

          <div className="stat">
            <span className="stat-value">2.5x</span>
            <span className="stat-label">Avg. Salary Growth</span>
          </div>
        </div>
      </div>
    </section>
  );
}
