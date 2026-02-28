import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  Target,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Sparkles
} from 'lucide-react';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weeklyPlan = {
  Mon: [
    { time: '9:00 AM', task: 'TypeScript Advanced Types', duration: '2h', status: 'completed', category: 'learning' },
    { time: '2:00 PM', task: 'Practice System Design', duration: '1.5h', status: 'completed', category: 'practice' }
  ],
  Tue: [
    { time: '9:00 AM', task: 'AWS Lambda Deep Dive', duration: '2h', status: 'completed', category: 'learning' },
    { time: '3:00 PM', task: 'Build Serverless API', duration: '2h', status: 'in-progress', category: 'project' }
  ],
  Wed: [
    { time: '10:00 AM', task: 'GraphQL Schema Design', duration: '1.5h', status: 'pending', category: 'learning' },
    { time: '2:00 PM', task: 'Code Review Practice', duration: '1h', status: 'pending', category: 'practice' }
  ],
  Thu: [
    { time: '9:00 AM', task: 'Docker Containers Workshop', duration: '2h', status: 'pending', category: 'learning' },
    { time: '1:00 PM', task: 'Deploy to AWS', duration: '1.5h', status: 'pending', category: 'project' }
  ],
  Fri: [
    { time: '10:00 AM', task: 'Testing Best Practices', duration: '1.5h', status: 'pending', category: 'learning' },
    { time: '3:00 PM', task: 'Weekend Project Planning', duration: '1h', status: 'pending', category: 'planning' }
  ],
  Sat: [
    { time: '10:00 AM', task: 'Build Portfolio Project', duration: '3h', status: 'pending', category: 'project' }
  ],
  Sun: [
    { time: '11:00 AM', task: 'Weekly Review & Planning', duration: '1h', status: 'pending', category: 'planning' }
  ]
};

export default function AIWeeklyPlannerPage() {
  const [selectedDay, setSelectedDay] = useState('Tue');
  const currentTasks = weeklyPlan[selectedDay typeof weeklyPlan] || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'learning': return 'bg-blue-100 text-blue-700';
      case 'practice': return 'bg-purple-100 text-purple-700';
      case 'project': return 'bg-green-100 text-green-700';
      case 'planning': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    
      {/* Header */}
      
        
          
            
              
              AI-Generated Plan
            
            Weekly Learning Planner
            Your personalized weekly schedule optimized for skill development
          
          
            
            Add Task
          
        
      

      {/* Weekly Stats */}
      
        
          
            
              
            
            Completed
          
          5 / 15
          Tasks this week
        

        
          
            
              
            
            Planned Hours
          
          22.5h
          This week
        

        
          
            
              
            
            Focus Areas
          
          4
          Key skills
        

        
          
            
              
            
            In Progress
          
          1
          Active task
        
      

      {/* Day Selector */}
      
        {weekDays.map((day) => {
          const dayTasks = weeklyPlan[day typeof weeklyPlan] || [];
          const completedCount = dayTasks.filter(t => t.status === 'completed').length;
          const totalCount = dayTasks.length;
          
          return (
             setSelectedDay(day)}
              className={`flex-shrink-0 px-6 py-4 rounded-lg border transition-all ${
                selectedDay === day
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
              }`}
            >
              
                {day}
                
                  {completedCount}/{totalCount} done
                
              
            
          );
        })}
      

      {/* Task List for Selected Day */}
      
        
          {selectedDay}'s Schedule
          
            {currentTasks.reduce((sum, task) => {
              const hours = parseFloat(task.duration.replace('h', ''));
              return sum + hours;
            }, 0)}h total
          
        

        
          {currentTasks.length > 0 ? (
            currentTasks.map((task, index) => (
              
                
                  
                    {/* Status Icon */}
                    
                      {task.status === 'completed' ? (
                        
                          
                        
                      ) : task.status === 'in-progress' ? (
                        
                          
                        
                      ) : (
                        
                          
                        
                      )}
                    

                    {/* Task Details */}
                    
                      
                        {task.task}
                        
                          {task.category}
                        
                      

                      
                        
                          
                          {task.time}
                        
                        Duration: {task.duration}
                      
                    
                  

                  {/* Action Button */}
                  
                    
                  
                
              
            ))
          ) : (
            
              
              No tasks scheduled
              Add tasks to plan your day
            
          )}
        
      

      {/* Quick Actions */}
      
        
          Need a different plan?
          
            Let AI regenerate your weekly schedule based on updated goals
          
          
            
            Regenerate Plan
          
        

        
          Track your progress
          
            View detailed analytics on your learning journey
          
          
            View Analytics
            
          
        
      
    
  );
}
