import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  Target,
  DollarSign,
  TrendingUp,
  Briefcase,
  Award,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { SalaryProjection } from '../components/SalaryProjection';

const availableSkills = [
  'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 
  'Kubernetes', 'GraphQL', 'System Design', 'MongoDB', 
  'PostgreSQL', 'Redis', 'CI/CD'
];

const careerPaths = [
  {
    title: 'Senior Full-Stack Engineer',
    salary: '$140k - $180k',
    timeline: '12-18 months',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'System Design'],
    description: 'Lead complex projects and mentor junior developers'
  },
  {
    title: 'Tech Lead',
    salary: '$160k - $220k',
    timeline: '18-24 months',
    requiredSkills: ['System Design', 'TypeScript', 'AWS', 'Kubernetes', 'CI/CD'],
    description: 'Guide technical decisions and architecture'
  },
  {
    title: 'Engineering Manager',
    salary: '$170k - $240k',
    timeline: '24-36 months',
    requiredSkills: ['System Design', 'Leadership', 'Agile', 'Stakeholder Management'],
    description: 'Manage team and drive product initiatives'
  }
];

export default function CareerSimulationPage() {
  const [selectedSkills, setSelectedSkills] = useState(['React', 'Node.js']);
  const [experienceYears, setExperienceYears] = useState(3);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Calculate projections based on selected skills
  const baseSalary = 85000;
  const skillMultiplier = selectedSkills.length * 0.08;
  const expMultiplier = experienceYears * 0.05;
  const projectedSalary = Math.round(baseSalary * (1 + skillMultiplier + expMultiplier));
  const jobReadiness = Math.min(95, 45 + selectedSkills.length * 8);

  // Generate projection data
  const projectionData = Array.from({ length: 12 }, (_, i) => {
    const currentSkills = Math.min(selectedSkills.length + Math.floor(i / 2), availableSkills.length);
    const salary = Math.round(baseSalary * (1 + currentSkills * 0.08 + (experienceYears + i / 12) * 0.05));
    return {
      month: `M${i + 1}`,
      salary,
      readiness: Math.min(95, 45 + currentSkills * 8)
    };
  });

  return (
    
      {/* Header */}
      
        Career Simulation
        Simulate different career paths and see projected salary outcomes based on your skill development
      

      {/* Current Projections */}
      
        
          
            
              
            
            Projected Salary
          
          ${(projectedSalary / 1000).toFixed(0)}k
          Based on {selectedSkills.length} skills
        

        
          
            
              
            
            Job Readiness
          
          {jobReadiness}%
          For senior roles
        

        
          
            
              
            
            Experience
          
          {experienceYears} years
          Current level
        
      

      {/* Interactive Skill Selector */}
      
        
          Customize Your Skills
           setSelectedSkills([])}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear All
          
        
        
        
          {availableSkills.map((skill) => (
             toggleSkill(skill)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedSkills.includes(skill)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
              }`}
            >
              
                {selectedSkills.includes(skill) ? (
                  
                ) : (
                  
                )}
                {skill}
              
            
          ))}
        

        {/* Experience Slider */}
        
          
            Years of Experience
            {experienceYears} years
          
           setExperienceYears(Number(e.target.value))}
            className="w-full"
          />
        
      

      {/* Salary Projection Component */}
      
        
      

      {/* 12-Month Projection Chart */}
      
        12-Month Projection
        
          
            
              
                
                  
                  
                
              
              
              
               `$${(value / 1000).toFixed(0)}k`} />
               [`$${value.toLocaleString()}`, 'Salary']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              
            
          
        
      

      {/* Career Path Options */}
      
        Potential Career Paths
        
          {careerPaths.map((path, index) => (
            
              
                {path.title}
                {path.description}
              

              
                
                  
                  {path.salary}
                
                
                  
                  {path.timeline}
                
              

              
                Required Skills:
                
                  {path.requiredSkills.map((skill) => (
                    
                      {selectedSkills.includes(skill) && }
                      {skill}
                    
                  ))}
                
              
            
          ))}
        
      
    
  );
}
