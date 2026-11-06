import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CareerPathsPage } from './pages/CareerPathsPage';
import { LearningHubPage } from './pages/LearningHubPage';
import { CodingPracticePage } from './pages/CodingPracticePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PlacementPage } from './pages/PlacementPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { PerformancePage } from './pages/PerformancePage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#120E2C]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/career-paths" element={<CareerPathsPage />} />
            <Route path="/learn" element={<LearningHubPage />} />
            <Route path="/practice" element={<CodingPracticePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/placement" element={<PlacementPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/profile" element={<ProfileSettingsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
