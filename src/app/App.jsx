import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import AISkillAnalysisPage from "./pages/AISkillAnalysisPage";
import SkillGapPage from "./pages/SkillGapPage";
import LearningNavigatorPage from "./pages/LearningNavigatorPage";
import LearningResourcesPage from "./pages/LearningResourcesPage";
import CareerSimulationPage from "./pages/CareerSimulationPage";
import ProgressAnalyticsPage from "./pages/ProgressAnalyticsPage";
import CompetitiveBenchmarkPage from "./pages/CompetitiveBenchmarkPage";
import AIWeeklyPlannerPage from "./pages/AIWeeklyPlannerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - no sidebar or header */}
        <Route path="/" element={<LandingPage />} />

        {/* Main App Routes - with sidebar and header */}
        <Route path="/app/*" element={<MainLayout />} />

        {/* Redirect unknown route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="resume-upload" element={<ResumeUploadPage />} />
            <Route path="ai-skill-analysis" element={<AISkillAnalysisPage />} />
            <Route path="skill-gap" element={<SkillGapPage />} />
            <Route path="learning-navigator" element={<LearningNavigatorPage />} />
            <Route path="learning-resources" element={<LearningResourcesPage />} />
            <Route path="career-simulation" element={<CareerSimulationPage />} />
            <Route path="progress-analytics" element={<ProgressAnalyticsPage />} />
            <Route path="competitive-benchmark" element={<CompetitiveBenchmarkPage />} />
            <Route path="weekly-planner" element={<AIWeeklyPlannerPage />} />

            {/* Redirect any unknown route to dashboard */}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}