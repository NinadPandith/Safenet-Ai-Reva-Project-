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
import DomainImpersonation from './tools/DomainImpersonation';
import DataBreachChecker from './tools/DataBreachChecker';
import PasswordBreachDetector from './tools/PasswordBreachDetector';
import SecurityScore from './tools/SecurityScore';
import SafeDownload from './tools/SafeDownload';
import FloatingAssistant from './components/FloatingAssistant';
import ProfileModal from './components/ProfileModal';
import SettingsModal from './components/SettingsModal';
import { ToastProvider } from './contexts/ToastContext';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <ToastProvider>
      <SettingsProvider>
        <Router>
          <div className="min-h-screen bg-transparent text-white font-sans selection:bg-blue-500/30">
            <Routes>
              {/* Landing Page Route */}
              <Route path="/" element={<LandingPage />} />

              {/* Dashboard and Tools Routes */}
              <Route
                path="/*"
                element={
                  <div className="flex bg-transparent">
                    <Navbar
                      onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      onOpenProfile={() => setIsProfileModalOpen(true)}
                      onOpenSettings={() => setIsSettingsModalOpen(true)}
                    />
                    <Sidebar
                      isOpen={isSidebarOpen}
                      onOpenSettings={() => setIsSettingsModalOpen(true)}
                    />
                    <main className="flex-1 lg:ml-[260px] pt-16 min-h-screen transition-all bg-transparent">
                      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 w-full">
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/tool/phishing" element={<PhishingDetector />} />
                          <Route path="/tool/url" element={<URLScanner />} />
                          <Route path="/tool/permissions" element={<PermissionAnalyzer />} />
                          <Route path="/tool/password" element={<PasswordAnalyzer />} />
                          <Route path="/tool/chat" element={<AIChatbot />} />
                          <Route path="/tool/domain" element={<DomainImpersonation />} />
                          <Route path="/tool/breach" element={<DataBreachChecker />} />
                          <Route path="/tool/pw-breach" element={<PasswordBreachDetector />} />
                          <Route path="/tool/score" element={<SecurityScore />} />
                          <Route path="/tool/download" element={<SafeDownload />} />
                          <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                      </div>

                      <FloatingAssistant />

                      <footer className="p-8 text-center border-t border-slate-800 bg-transparent">
                        <p className="text-xs text-white/50 font-medium">SafeNet-AI — Enterprise Cybersecurity Platform © 2026</p>
                      </footer>

                      {/* Modals */}
                      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
                      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
                    </main>
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </SettingsProvider>
    </ToastProvider>
  );
}

export default App;
