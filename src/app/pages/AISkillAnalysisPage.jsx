import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  Brain, 
  Code, 
  Database, 
  Palette, 
  Server, 
  Cloud,
  ArrowRight,
  TrendingUp,
  Award,
  Target,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Overall Score', value: '78/100', change: '+12 pts this month', trend: 'up', icon: Target },
  { label: 'Skills Analyzed', value: '24', change: '8 categories', trend: 'up', icon: Brain },
  { label: 'Strengths', value: '12', change: 'Above average', trend: 'up', icon: Award },
  { label: 'Skill Gaps', value: '5', change: 'Need attention', trend: 'down', icon: AlertCircle }
];

const skillCategories = [
  {
    category: 'Frontend',
    icon: Code,
    skills: [
      { name: 'React', level: 85, trend: 'up' },
      { name: 'TypeScript', level: 70, trend: 'up' },
      { name: 'CSS/Tailwind', level: 90, trend: 'stable' },
      { name: 'Next.js', level: 65, trend: 'up' }
    ]
  },
  {
    category: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 80, trend: 'stable' },
      { name: 'Express', level: 75, trend: 'stable' },
      { name: 'REST APIs', level: 85, trend: 'up' },
      { name: 'GraphQL', level: 45, trend: 'up' }
    ]
  },
  {
    category: 'Database',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 70, trend: 'stable' },
      { name: 'MongoDB', level: 60, trend: 'up' },
      { name: 'Redis', level: 40, trend: 'up' },
      { name: 'SQL', level: 75, trend: 'stable' }
    ]
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      { name: 'AWS', level: 55, trend: 'up' },
      { name: 'Docker', level: 50, trend: 'up' },
      { name: 'CI/CD', level: 60, trend: 'stable' },
      { name: 'Kubernetes', level: 30, trend: 'up' }
    ]
  }
];

const radarData = [
  { subject: 'Frontend', value: 77.5, fullMark: 100 },
  { subject: 'Backend', value: 71.25, fullMark: 100 },
  { subject: 'Database', value: 61.25, fullMark: 100 },
  { subject: 'Cloud', value: 48.75, fullMark: 100 },
  { subject: 'System Design', value: 55, fullMark: 100 },
  { subject: 'Testing', value: 65, fullMark: 100 }
];

export default function AISkillAnalysisPage() {
  return (
    
      {/* Header */}
      
        
          
          Analysis Complete
        
        AI Skill Analysis
        Comprehensive analysis of your technical skills and competencies
      

      {/* Stats Cards */}
      
        {stats.map((stat, index) => (
          
            
              
                
              
              {stat.label}
            
            {stat.value}
            
              {stat.change}
            
          
        ))}
      

      {/* Main Grid */}
      
        {/* Radar Chart */}
        
          Skill Distribution
          
            
              
                
                
                
                
              
            
          
        

        {/* AI Insights */}
        
          
            
            AI Insights
          

          
            
              
                
                
                  Strong Frontend Skills
                  
                    Your React and CSS expertise is well above industry average. This positions you well for senior frontend roles.
                  
                
              
            

            
              
                
                
                  Backend Proficiency
                  
                    Solid Node.js and API development skills. Consider deepening GraphQL knowledge for modern API architectures.
                  
                
              
            

            
              
                
                
                  Cloud Skills Gap
                  
                    Your cloud and DevOps skills need improvement. Focus on AWS and container orchestration for senior roles.
                  
                
              
            
          
        
      

      {/* Detailed Skills */}
      
        Detailed Breakdown
        
        
          {skillCategories.map((category, categoryIndex) => (
            
              
                
                  
                
                {category.category}
              

              
                {category.skills.map((skill) => (
                  
                    
                      {skill.name}
                      
                        {skill.level}%
                        {skill.trend === 'up' && (
                          
                        )}
                      
                    
                    
                      = 70 ? 'bg-green-600' : skill.level >= 50 ? 'bg-blue-600' : 'bg-orange-600'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    
                  
                ))}
              
            
          ))}
        
      

      {/* CTA */}
      
        
          
            Ready to address your skill gaps?
            Get a personalized plan to improve your weakest areas
          
          
            View Skill Gaps
            
          
        
      
    
  );
}
