import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  Target,
  Users,
  TrendingUp,
  Award,
  Trophy,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Minus,
  Briefcase,
  MapPin
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const benchmarkData = [
  { skill: 'React', you: 85, average: 72, topPerformer: 95 },
  { skill: 'TypeScript', you: 70, average: 68, topPerformer: 92 },
  { skill: 'Node.js', you: 80, average: 70, topPerformer: 90 },
  { skill: 'AWS', you: 55, average: 65, topPerformer: 88 },
  { skill: 'System Design', you: 55, average: 60, topPerformer: 85 }
];

const radarData = [
  { subject: 'Frontend', you: 78, market: 70 },
  { subject: 'Backend', you: 71, market: 68 },
  { subject: 'Database', you: 61, market: 65 },
  { subject: 'Cloud', you: 49, market: 63 },
  { subject: 'DevOps', you: 53, market: 58 },
  { subject: 'Testing', you: 65, market: 60 }
];

const peerComparison = [
  { name: 'Sarah Chen', score: 82, role: 'Senior Frontend Dev', location: 'San Francisco', trend: 'up' },
  { name: 'You', score: 78, role: 'Full Stack Dev', location: 'Remote', trend: 'up', isYou: true },
  { name: 'Mike Johnson', score: 76, role: 'Backend Engineer', location: 'Seattle', trend: 'stable' },
  { name: 'Emily Davis', score: 74, role: 'Full Stack Dev', location: 'Austin', trend: 'up' },
  { name: 'Alex Kumar', score: 72, role: 'Frontend Dev', location: 'Boston', trend: 'down' }
];

export default function CompetitiveBenchmarkPage() {
  return (
    
      {/* Header */}
      
        Competitive Benchmark
        Compare your skills against market averages and top performers in your field

      {/* Stats Overview */}

            Your Rank
          
          Top 35%
          Among peers

            Above Average
          
          8 skills
          +2 this month

            Below Average
          
          3 skills
          Need focus

            Peer Group
          
          1,247
          Similar profiles

      {/* Charts Grid */}
      
        {/* Skill Comparison Bar Chart */}
        
          Skill Comparison

        {/* Radar Comparison */}
        
          Category Comparison

      {/* Peer Leaderboard */}

          Peer Leaderboard
          Based on similar roles and experience

          {peerComparison.map((peer, index) => (

                  {index + 1}

                      {peer.name}
                    
                    {peer.isYou && (
                      You
                    )}

                      {peer.role}

                      {peer.location}

                  {peer.score}
                  Score

                {peer.trend === 'up' && (

                )}
                {peer.trend === 'down' && (

                )}
                {peer.trend === 'stable' && (

                )}

          ))}

      {/* Insights & CTA */}

          Your Strengths
          
            Your React and frontend skills are significantly above market average. This is a strong competitive advantage.

              React: Top 25% nationally

              Node.js: Above average

          Areas to Improve
          
            Focus on cloud and system design skills to match market expectations and advance your career.

            View Improvement Plan

  );
}
