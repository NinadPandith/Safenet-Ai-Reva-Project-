import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PhishingDetector from './tools/PhishingDetector';
import URLScanner from './tools/URLScanner';
import PermissionAnalyzer from './tools/PermissionAnalyzer';
import PasswordAnalyzer from './tools/PasswordAnalyzer';
import AIChatbot from './tools/AIChatbot';
import RiskScoreQuiz from './tools/RiskScoreQuiz';
import ThreatIntelligence from './tools/ThreatIntelligence';
import FloatingAssistant from './components/FloatingAssistant';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Dashboard and Tools Routes */}
          <Route
            path="/*"
            element={
              <div className="flex bg-slate-900">
                <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <Sidebar isOpen={isSidebarOpen} />
                <main className="flex-1 lg:ml-[260px] pt-16 min-h-screen transition-all bg-slate-900">
                  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 w-full">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/tool/phishing" element={<PhishingDetector />} />
                      <Route path="/tool/url" element={<URLScanner />} />
                      <Route path="/tool/permissions" element={<PermissionAnalyzer />} />
                      <Route path="/tool/password" element={<PasswordAnalyzer />} />
                      <Route path="/tool/chat" element={<AIChatbot />} />
                      <Route path="/tool/risk" element={<RiskScoreQuiz />} />
                      <Route path="/tool/intel" element={<ThreatIntelligence />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </div>

                  <FloatingAssistant />

                  <footer className="p-8 text-center border-t border-slate-800 bg-slate-900">
                    <p className="text-xs text-slate-500 font-medium">SafeNet-AI — Enterprise Cybersecurity Platform © 2026</p>
                  </footer>
                </main>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
