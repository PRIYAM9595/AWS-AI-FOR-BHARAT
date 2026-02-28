import { motion } from 'motion/react';
import { Clock, Check, Play, BookOpen } from 'lucide-react';

const activities = [
  {
    icon: Check,
    color: 'green',
    title: 'Completed TypeScript Advanced Patterns',
    time: '2 hours ago',
  },
  {
    icon: Play,
    color: 'blue',
    title: 'Started Node.js Project',
    time: '5 hours ago',
  },
  {
    icon: BookOpen,
    color: 'purple',
    title: 'Saved 3 new resources',
    time: '1 day ago',
  },
  {
    icon: Check,
    color: 'green',
    title: 'Skill assessment completed',
    time: '2 days ago',
  },
];

export function ActivityFeed() {
  return (
    
      {/* Card */}
      
        
          
            Recent Activity
            Your learning journey
          
          
        

        
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              
                
                  
                
                
                  {activity.title}
                  {activity.time}
                
              
            );
          })}
        

        
          View All Activity
        
      
    
  );
}
