import { CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const roadmapSteps = [
  {
    title: 'Master TypeScript Advanced Patterns',
    status: 'completed',
    duration: '2 weeks',
    skills: ['Generics', 'Utility Types', 'Decorators'],
    resources: 3,
  },
  {
    title: 'Build Full-Stack Project with Node.js',
    status: 'in-progress',
    duration: '4 weeks',
    skills: ['Express', 'PostgreSQL', 'Authentication'],
    resources: 5,
    progress: 65,
  },
  {
    title: 'Learn System Design Fundamentals',
    status: 'upcoming',
    duration: '6 weeks',
    skills: ['Scalability', 'Load Balancing', 'Caching'],
    resources: 8,
  },
  {
    title: 'AWS Certification Prep',
    status: 'upcoming',
    duration: '8 weeks',
    skills: ['EC2', 'S3', 'Lambda', 'RDS'],
    resources: 12,
  },
];

export function CareerRoadmap() {
  return (
    
      {/* Card */}
      
        
          
            AI-Generated Career Roadmap
            Personalized learning path to Senior Developer
          
          
            
            AI Optimized
          
        

        
          {roadmapSteps.map((step, index) => (
            
              {/* Connector line */}
              {index 
              )}

              
                {/* Icon */}
                
                  {step.status === 'completed' ? (
                    
                  ) : step.status === 'in-progress' ? (
                    
                  ) : (
                    
                  )}
                

                {/* Content */}
                
                  
                    {step.title}
                    
                      
                      {step.duration}
                    
                  

                  {/* Progress bar for in-progress */}
                  {step.status === 'in-progress' && step.progress && (
                    
                      
                        Progress
                        {step.progress}%
                      
                      
                        
                      
                    
                  )}

                  {/* Skills */}
                  
                    {step.skills.map((skill, idx) => (
                      
                        {skill}
                      
                    ))}
                  

                  {step.resources} curated resources
                
              
            
          ))}
        

        {/* Action button */}
        
          View Full Roadmap
        
      
    
  );
}
