import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  Target,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Calendar,
  ArrowRight,
  Activity,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const progressData = [
  { month: 'Jan', score: 62, hours: 8 },
  { month: 'Feb', score: 65, hours: 10 },
  { month: 'Mar', score: 68, hours: 12 },
  { month: 'Apr', score: 72, hours: 15 },
  { month: 'May', score: 75, hours: 14 },
  { month: 'Jun', score: 78, hours: 12 }
];

const skillProgress = [
  { name: 'TypeScript', progress: 70 },
  { name: 'System Design', progress: 45 },
  { name: 'AWS', progress: 55 },
  { name: 'GraphQL', progress: 40 },
  { name: 'Docker', progress: 50 }
];

const timeDistribution = [
  { name: 'Frontend', value: 35, color: '#000000' },
  { name: 'Backend', value: 25, color: '#404040' },
  { name: 'Database', value: 15, color: '#808080' },
  { name: 'DevOps', value: 15, color: '#a0a0a0' },
  { name: 'Other', value: 10, color: '#c0c0c0' }
];

export default function ProgressAnalyticsPage() {
  return (
    
      {/* Header */}
      
        Progress Analytics
        Track your learning progress and skill development over time
      

      {/* Stats Overview */}
      
        
          
            
              
            
            Score Increase
          
          +16 pts
          Last 6 months
        

        
          
            
              
            
            Learning Hours
          
          71h
          Total invested
        

        
          
            
              
            
            Skills Improved
          
          12
          This quarter
        

        
          
            
              
            
            Streak
          
          24 days
          Current streak
        
      

      {/* Charts Grid */}
      
        {/* Skill Score Progress */}
        
          Skill Score Progress
          
            
              
                
                  
                    
                    
                  
                
                
                
                
                
                
              
            
          
        

        {/* Learning Hours */}
        
          Weekly Learning Hours
          
            
              
                
                
                
                
                
              
            
          
        
      

      {/* Time Distribution & Skill Progress */}
      
        {/* Time Distribution Pie Chart */}
        
          Time Distribution
          
            
              
                 `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {timeDistribution.map((entry, index) => (
                    
                  ))}
                
                
              
            
          
        

        {/* Individual Skill Progress */}
        
          Skill Progress
          
            {skillProgress.map((skill, index) => (
              
                
                  {skill.name}
                  {skill.progress}%
                
                
                  = 70 ? 'bg-green-600' :
                      skill.progress >= 50 ? 'bg-blue-600' : 'bg-orange-600'
                    }`}
                  />
                
              
            ))}
          
        
      

      {/* Activity Feed */}
      
        Recent Activity
        
          {[
            { action: 'Completed Advanced TypeScript course', time: '2 hours ago', icon: Award },
            { action: 'Practiced System Design problems', time: '1 day ago', icon: Target },
            { action: 'Started AWS Solutions Architect path', time: '3 days ago', icon: Zap },
            { action: 'Achieved 24-day learning streak', time: '5 days ago', icon: Activity }
          ].map((activity, index) => (
            
              
                
              
              
                {activity.action}
                {activity.time}
              
            
          ))}
        
      

      {/* CTA */}
      
        
          
            Keep the momentum going!
            Check your weekly planner to stay on track
          
          
            
            View Planner
          
        
      
    
  );
}
