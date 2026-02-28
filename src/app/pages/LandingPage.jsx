import { Link } from 'react-router';
import { motion } from 'motion/react';
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
} from 'lucide-react';

export default function LandingPage() {
  return (
    
      {/* Navigation */}
      
        
          
            
              
            
            
              SkillGPS
            
          
          
          
            
              Sign In
            
            
              Get Started
              
            
          
        
      

      {/* Hero Section */}
      
        
          
            
              
              AI-Powered Career Navigation
            

            
              Navigate Your Career with AI
            
            
            
              Like Google Maps for your skills. Analyze your resume, detect skill gaps, and get AI-powered roadmaps to reach your career goals faster.
            

            
              
                Start Your Journey
                
              
              
              
                Watch Demo
                
              
            
          

          {/* Feature Cards Grid */}
          
            {features.map((feature, index) => (
              
                
                  
                
                {feature.title}
                {feature.description}
              
            ))}
          
        
      

      {/* Stats Section */}
      
        
          
            
              {stats.map((stat, index) => (
                
                  
                    {stat.value}
                  
                  {stat.label}
                
              ))}
            
          
        
      

      {/* How It Works Section */}
      
        
          
            
              How It Works
            
            
              Get AI-powered career guidance in three simple steps
            
          

          
            {steps.map((step, index) => (
              
                
                  
                    {index + 1}
                  
                  
                    
                  
                  {step.title}
                  {step.description}
                
              
            ))}
          
        
      

      {/* CTA Section */}
      
        
          
            
              Ready to Navigate Your Career?
            
            
              Join thousands of professionals using AI to accelerate their career growth
            
            
              Get Started Now
              
            
          
        
      

      {/* Footer */}
      
        
          © 2026 SkillGPS. All rights reserved.
        
      
    
  );
}

const features = [
  {
    icon: Brain,
    title: "AI Skill Analysis",
    description: "Upload your resume and let AI analyze your skills, experience, and career trajectory in seconds."
  },
  {
    icon: Target,
    title: "Gap Detection",
    description: "Identify missing skills based on real-time market demand and your career goals."
  },
  {
    icon: TrendingUp,
    title: "Smart Roadmaps",
    description: "Get personalized learning paths that update weekly based on industry trends."
  },
  {
    icon: Globe,
    title: "Market Insights",
    description: "Access real-time data on trending skills, salaries, and job opportunities."
  },
  {
    icon: GitBranch,
    title: "Career Simulation",
    description: "See how learning new skills impacts your salary and career opportunities."
  },
  {
    icon: Award,
    title: "Job Readiness",
    description: "Track your progress and get a real-time score on your job market readiness."
  }
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "95%", label: "Success Rate" },
  { value: "1M+", label: "Skills Analyzed" },
  { value: "4.9/5", label: "User Rating" }
];

const steps = [
  {
    icon: Target,
    title: "Upload & Connect",
    description: "Upload your resume and connect your GitHub and LinkedIn profiles"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI analyzes your skills, experience, and identifies gaps"
  },
  {
    icon: TrendingUp,
    title: "Get Your Roadmap",
    description: "Receive a personalized learning roadmap with curated resources"
  }
];
