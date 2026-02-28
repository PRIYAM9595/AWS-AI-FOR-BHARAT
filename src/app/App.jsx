import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import AISkillAnalysisPage from './pages/AISkillAnalysisPage';
import SkillGapPage from './pages/SkillGapPage';
import LearningNavigatorPage from './pages/LearningNavigatorPage';
import LearningResourcesPage from './pages/LearningResourcesPage';
import CareerSimulationPage from './pages/CareerSimulationPage';
import ProgressAnalyticsPage from './pages/ProgressAnalyticsPage';
import CompetitiveBenchmarkPage from './pages/CompetitiveBenchmarkPage';
import AIWeeklyPlannerPage from './pages/AIWeeklyPlannerPage';

export default function App() {
  return (
    
      
        {/* Landing Page - no sidebar or header */}
        } />
        
        {/* Main App Routes - with sidebar and header */}
        } />
      
    
  );
}

function MainLayout() {
  return (
    
      {/* Header */}
      

      {/* Sidebar */}
      

      {/* Main content */}
      
        
          
            } />
            } />
            } />
            } />
            } />
            } />
            } />
            } />
            } />
            } />
            
            {/* Redirect any unknown route to dashboard */}
            } />
          
        
      
    
  );
}
