import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Target } from 'lucide-react';

const salaryData = [
  { month: 'Now', current: 85, projected: 85 },
  { month: '3M', current: 85, projected: 92 },
  { month: '6M', current: 85, projected: 98 },
  { month: '9M', current: 85, projected: 105 },
  { month: '12M', current: 85, projected: 115 },
  { month: '18M', current: 85, projected: 125 },
  { month: '24M', current: 85, projected: 140 },
];

export function SalaryProjection() {
  return (
    
      {/* Card */}
      
        
          
            Career Growth Simulation
            Estimated salary impact from skill development
          
          
            
          
        

        {/* Key metrics */}
        
          
            
            Current
            $85K
          
          
            
            Target (24M)
            $140K
          
          
            
            Growth
            +65%
          
        

        {/* Chart */}
        
          
            
              
                
                  
                  
                
                
                  
                  
                
              
              
              
               `$${value}K`}
              />
              
              
              
            
          
        

        {/* Info */}
        
          
            AI Insight: Completing your roadmap can increase your market value by 65% within 24 months based on current industry trends.
          
        
      
    
  );
}
