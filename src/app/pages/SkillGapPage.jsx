import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  TrendingUp, 
  Target, 
  AlertTriangle,
  ArrowRight,
  Flame,
  Award,
  Clock,
  Zap,
  ChevronRight
} from 'lucide-react';
import { SkillGapChart } from '../components/SkillGapChart';

export default function SkillGapPage() {
  const skillGaps = [
    {
      skill: 'TypeScript',
      current: 60,
      target: 90,
      priority: 'high',
      timeline: '2 months',
      impact: 'High salary impact'
    },
    {
      skill: 'System Design',
      current: 45,
      target: 85,
      priority: 'high',
      timeline: '3 months',
      impact: 'Senior role requirement'
    },
    {
      skill: 'AWS Services',
      current: 55,
      target: 80,
      priority: 'medium',
      timeline: '2 months',
      impact: 'Cloud expertise'
    },
    {
      skill: 'GraphQL',
      current: 40,
      target: 75,
      priority: 'medium',
      timeline: '1.5 months',
      impact: 'Modern API development'
    },
    {
      skill: 'Testing (Jest/RTL)',
      current: 50,
      target: 80,
      priority: 'low',
      timeline: '1 month',
      impact: 'Code quality'
    }
  ];

  return (
    
      {/* Header */}
      
        
          
            Skill Gap Analysis
            Identify and close the gaps between your current and target skill levels
          
          
            View Learning Path
            
          
        
      

      {/* Stats Overview */}
      
        
          
            
              
            
            Critical Gaps
          
          2
        

        
          
            
              
            
            High Priority
          
          2
        

        
          
            
              
            
            Avg. Timeline
          
          2 months
        

        
          
            
              
            
            Potential Score
          
          92/100
        
      

      {/* Skill Gap Chart */}
      
        
      

      {/* Detailed Skill Gaps */}
      
        Detailed Analysis
        
          {skillGaps.map((gap, index) => (
            
              
                
                  
                    {gap.skill}
                    
                      {gap.priority} priority
                    
                  
                  {gap.impact}
                
                
                  Start Learning
                  
                
              

              {/* Progress Bar */}
              
                
                  Current: {gap.current}%
                  Target: {gap.target}%
                
                
                  
                  
                
                
                  
                    
                    {gap.timeline}
                  
                  
                    {gap.target - gap.current}% gap
                  
                
              
            
          ))}
        
      

      {/* CTA Section */}
      
        
          
            Ready to close these gaps?
            Get a personalized learning roadmap with curated resources
          
          
            
            Generate Roadmap
          
        
      
    
  );
}
