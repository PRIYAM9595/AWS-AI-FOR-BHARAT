import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function StatsCard({ title, value, change, icon: Icon, trend, delay = 0 }: StatsCardProps) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  
  return (
    
      {/* Card */}
      
        
          
            
          
          {change}
        
        
        {value}
        {title}
      
    
  );
}
