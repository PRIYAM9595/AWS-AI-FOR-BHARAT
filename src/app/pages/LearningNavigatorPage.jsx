import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  Target, 
  CheckCircle2,
  Circle,
  ArrowRight,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Zap,
  Play
} from 'lucide-react';
import { CareerRoadmap } from '../components/CareerRoadmap';

const milestones = [
  {
    id: 1,
    title: 'Master TypeScript Fundamentals',
    status: 'completed',
    skills: ['TypeScript Basics', 'Type Safety', 'Interfaces'],
    completedDate: '2 weeks ago',
    duration: '3 weeks'
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    status: 'in-progress',
    skills: ['Hooks', 'Context API', 'Performance Optimization'],
    progress: 65,
    estimatedCompletion: '2 weeks',
    duration: '4 weeks'
  },
  {
    id: 3,
    title: 'System Design Principles',
    status: 'upcoming',
    skills: ['Scalability', 'Load Balancing', 'Caching'],
    startDate: 'In 2 weeks',
    duration: '6 weeks'
  },
  {
    id: 4,
    title: 'AWS Cloud Services',
    status: 'upcoming',
    skills: ['EC2', 'S3', 'Lambda', 'RDS'],
    startDate: 'In 8 weeks',
    duration: '5 weeks'
  },
  {
    id: 5,
    title: 'GraphQL & API Design',
    status: 'upcoming',
    skills: ['Schema Design', 'Resolvers', 'Apollo'],
    startDate: 'In 13 weeks',
    duration: '3 weeks'
  }
];

export default function LearningNavigatorPage() {
  return (
    
      {/* Header */}

            Learning Navigator
            Your personalized roadmap to achieve your career goals

            Weekly Plan

      {/* Progress Overview */}

            Completed
          
          1/5
          Milestones

            In Progress
          
          65%
          Current milestone

            Time Remaining
          
          14 weeks
          To completion

            Weekly Hours
          
          12h
          Average commitment

      {/* Career Roadmap Component */}

      {/* Milestone Timeline */}
      
        Your Learning Milestones

          {milestones.map((milestone, index) => (
            
              {/* Timeline connector */}
              {index 
              )}

                {/* Status Icon */}
                
                  {milestone.status === 'completed' ? (
                    
                  ) : milestone.status === 'in-progress' ? (
                    
                  ) : (
                    
                  )}

                {/* Content */}

                        {milestone.title}
                        
                          {milestone.status === 'completed' ? 'Completed' : milestone.status === 'in-progress' ? 'In Progress' : 'Upcoming'}

                      {/* Skills */}
                      
                        {milestone.skills.map((skill) => (
                          
                            {skill}
                          
                        ))}

                      {/* Progress bar for in-progress */}
                      {milestone.status === 'in-progress' && milestone.progress !== undefined && (

                            Progress
                            {milestone.progress}%

                      )}

                      {/* Timeline info */}

                          {milestone.duration}
                        
                        {milestone.status === 'completed' && milestone.completedDate && (
                          Completed {milestone.completedDate}
                        )}
                        {milestone.status === 'in-progress' && milestone.estimatedCompletion && (
                          Est. completion: {milestone.estimatedCompletion}
                        )}
                        {milestone.status === 'upcoming' && milestone.startDate && (
                          Starts {milestone.startDate}
                        )}

                    {milestone.status === 'in-progress' && (
                      
                        Continue

                    )}

          ))}

      {/* Action CTA */}

            Need to adjust your roadmap?
            Update your goals and get a refreshed learning path

            Refresh Analysis

  );
}
