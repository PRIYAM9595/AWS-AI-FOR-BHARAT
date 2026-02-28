import { Youtube, BookOpen, Code2, ExternalLink, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';

const resources = [
  {
    title: 'Advanced TypeScript Patterns',
    type: 'youtube',
    author: 'Matt Pocock',
    duration: '2h 15m',
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
  },
  {
    title: 'Node.js Microservices Architecture',
    type: 'course',
    author: 'Udemy',
    duration: '12h 30m',
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
  },
  {
    title: 'Build a Real-time Chat App',
    type: 'project',
    author: 'GitHub',
    duration: '4h',
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
  },
];

const typeConfig = {
  youtube: { icon: Youtube, color: 'red', label: 'Video' },
  course: { icon: BookOpen, color: 'blue', label: 'Course' },
  project: { icon: Code2, color: 'green', label: 'Project' },
};

export function LearningResources() {
  return (
    
      {/* Card */}
      
        
          
            Recommended Resources
            Curated for your learning path
          
          
            View All
          
        

        
          {resources.map((resource, index) => {
            const config = typeConfig[resource.type typeof typeConfig];
            const Icon = config.icon;

            return (
              
                
                  {/* Thumbnail */}
                  
                    
                    
                    
                      
                    
                  

                  {/* Content */}
                  
                    
                      
                        {resource.title}
                      
                      
                    
                    
                    {resource.author}
                    
                    
                      
                        
                        {resource.duration}
                      
                      
                        
                        {resource.rating}
                      
                      
                        {config.label}
                      
                    
                  
                
              
            );
          })}
        

        {/* CTA */}
        
          Explore More Resources
        
      
    
  );
}
