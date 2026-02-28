import { motion } from 'motion/react';
import { Brain, Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';

const insights = [
  {
    type: 'recommendation',
    icon: Lightbulb,
    color: 'yellow',
    title: 'High-Impact Skill',
    message: 'Learning System Design could increase your salary potential by 28% in the next 6 months.',
    priority: 'high',
  },
  {
    type: 'warning',
    icon: AlertCircle,
    color: 'orange',
    title: 'Skill Gap Alert',
    message: 'AWS/Cloud skills are in high demand for your target roles. Consider prioritizing this.',
    priority: 'medium',
  },
  {
    type: 'trend',
    icon: TrendingUp,
    color: 'green',
    title: 'Market Trend',
    message: 'TypeScript adoption is growing 45% YoY. Your current skill level puts you ahead of 73% of developers.',
    priority: 'low',
  },
];

export function AIInsights() {
  return (
    
      {/* Card */}
      
        
          
            
          
          
            AI Insights
            Personalized recommendations
          
        

        
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const priorityColors = {
              high: 'border-red-200 bg-red-50',
              medium: 'border-yellow-200 bg-yellow-50',
              low: 'border-blue-200 bg-blue-50',
            };

            return (
              
                
                  
                    
                  
                  
                    {insight.title}
                    {insight.message}
                  
                

                {/* Priority indicator */}
                
                  
                    {insight.priority.toUpperCase()}
                  
                
              
            );
          })}
        

        {/* AI Status */}
        
          
            
              
              AI Engine Active
            
            Last updated: 2 min ago
          
        
      
    
  );
}
