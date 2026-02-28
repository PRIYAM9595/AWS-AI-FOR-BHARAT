import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

const data = [
  { skill: 'React', current: 85, market: 95 },
  { skill: 'TypeScript', current: 75, market: 90 },
  { skill: 'Node.js', current: 60, market: 85 },
  { skill: 'System Design', current: 45, market: 80 },
  { skill: 'AI/ML', current: 40, market: 75 },
  { skill: 'Cloud (AWS)', current: 50, market: 85 },
];

export function SkillGapChart() {
  return (
    
      {/* Card */}
      
        
          Skill Gap Analysis
          Your skills vs. market demand
        

        
          
            
              
                
                  
                  
                
                
                  
                  
                
              
              
              
              
              
              
               {value}}
              />
            
          
        

        {/* Key insights */}
        
          
            Avg. Gap
            -22%
          
          
            Priority Skills
            3
          
        
      
    
  );
}
