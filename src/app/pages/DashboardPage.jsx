import { StatsCard } from '../components/StatsCard';
import { AIInsights } from '../components/AIInsights';
import { ActivityFeed } from '../components/ActivityFeed';
import { Target, TrendingUp, Award, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

export default function DashboardPage() {
  return (
    
      {/* Welcome Header */}
      
        Welcome back
        Track your skill development and career progress
      

      {/* Stats cards */}
      
        
        
        
        
      

      {/* Quick Actions */}
      
        
          
            
              Upload Resume
              Analyze your skills
            
            
          
        

        
          
            
              Skill Gaps
              Identify areas to improve
            
            
          
        

        
          
            
              Learning Path
              View your roadmap
            
            
          
        
      

      {/* Main dashboard grid */}
      
        {/* Left column - AI Insights */}
        
          
        

        {/* Right column - Activity */}
        
          
        
      
    
  );
}
