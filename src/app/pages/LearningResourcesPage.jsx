import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  Target, 
  Video,
  BookOpen,
  FileText,
  Star,
  Clock,
  TrendingUp,
  Filter,
  Search,
  ExternalLink,
  Play,
  Award
} from 'lucide-react';
import { LearningResources } from '../components/LearningResources';

const resources = [
  {
    id: 1,
    title: 'Advanced TypeScript Patterns',
    type: 'video',
    platform: 'YouTube',
    duration: '2h 15m',
    rating: 4.8,
    difficulty: 'advanced',
    skill: 'TypeScript',
    url: '#'
  },
  {
    id: 2,
    title: 'System Design Interview Guide',
    type: 'course',
    platform: 'Udemy',
    duration: '12h 30m',
    rating: 4.9,
    difficulty: 'advanced',
    skill: 'System Design',
    url: '#'
  },
  {
    id: 3,
    title: 'AWS Solutions Architect',
    type: 'course',
    platform: 'Coursera',
    duration: '40h',
    rating: 4.7,
    difficulty: 'intermediate',
    skill: 'AWS',
    url: '#'
  },
  {
    id: 4,
    title: 'GraphQL Complete Guide',
    type: 'article',
    platform: 'Medium',
    duration: '45m',
    rating: 4.6,
    difficulty: 'intermediate',
    skill: 'GraphQL',
    url: '#'
  },
  {
    id: 5,
    title: 'React Testing Library',
    type: 'documentation',
    platform: 'Official Docs',
    duration: '3h',
    rating: 4.9,
    difficulty: 'beginner',
    skill: 'Testing',
    url: '#'
  },
  {
    id: 6,
    title: 'Docker & Kubernetes',
    type: 'course',
    platform: 'Udemy',
    duration: '18h',
    rating: 4.8,
    difficulty: 'intermediate',
    skill: 'DevOps',
    url: '#'
  }
];

export default function LearningResourcesPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    if (selectedType !== 'all' && resource.type !== selectedType) return false;
    if (selectedDifficulty !== 'all' && resource.difficulty !== selectedDifficulty) return false;
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'course': return Play;
      case 'article': return FileText;
      case 'documentation': return BookOpen;
      default: return BookOpen;
    }
  };

  return (
    
      {/* Header */}
      
        Learning Resources
        Curated learning materials tailored to your skill gaps and career goals
      

      {/* Stats Overview */}
      
        
          
            
              
            
            Total Resources
          
          {resources.length}
        

        
          
            
              
            
            Completed
          
          8
        

        
          
            
              
            
            In Progress
          
          3
        

        
          
            
              
            
            Avg. Rating
          
          4.8
        
      

      {/* Filters & Search */}
      
        
          
           setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900"
          />
        

         setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900"
        >
          All Types
          Video
          Course
          Article
          Documentation
        

         setSelectedDifficulty(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900"
        >
          All Levels
          Beginner
          Intermediate
          Advanced
        
      

      {/* Learning Resources Component */}
      
        
      

      {/* Resource Grid */}
      
        {filteredResources.map((resource, index) => {
          const Icon = getTypeIcon(resource.type);
          return (
            
              
                
                  
                    
                  
                  
                    
                      {resource.title}
                    
                    {resource.platform}
                  
                
                
              

              
                
                  
                  {resource.duration}
                
                
                  
                  {resource.rating}
                
                
                  {resource.difficulty}
                
              

              
                Target Skill: 
                {resource.skill}
              
            
          );
        })}
      

      {/* Empty State */}
      {filteredResources.length === 0 && (
        
          
            
          
          No resources found
          Try adjusting your filters or search query
        
      )}
    
  );
}
