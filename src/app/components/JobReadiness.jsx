import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const readinessMetrics = [
  { label: 'Technical Skills', score: 78, color: 'blue' },
  { label: 'System Design', score: 52, color: 'purple' },
  { label: 'Communication', score: 85, color: 'green' },
  { label: 'Leadership', score: 65, color: 'orange' },
];

const jobMatches = [
  { title: 'Senior Frontend Developer', company: 'TechCorp', match: 92, salary: '$120K - $150K' },
  { title: 'Full Stack Engineer', company: 'StartupXYZ', match: 85, salary: '$110K - $140K' },
  { title: 'React Developer', company: 'Innovation Labs', match: 88, salary: '$100K - $130K' },
];

export function JobReadiness() {
  return (
    
      {/* Card */}
      
        
          
            Job Readiness Score
            How ready are you for your target roles?
          
        

        {/* Overall score */}
        
          
            
              {/* Background circle */}
              
                
                
              
              
                
                  70%
                
                Ready
              
            
          
        

        {/* Metrics breakdown */}
        
          {readinessMetrics.map((metric, index) => (
            
              
                {metric.label}
                {metric.score}%
              
              
                
              
            
          ))}
        

        {/* Job matches */}
        
          
            
            Top Job Matches
          
          
            {jobMatches.map((job, index) => (
              
                
                  
                    
                      {job.title}
                    
                    {job.company}
                  
                  
                    {job.match}% Match
                    {job.salary}
                  
                
              
            ))}
          
        

        {/* CTA */}
        
          Apply to Matched Jobs
        
      
    
  );
}
