import React, { useState } from 'react';
import { RogProvider, useRog } from './context/RogContext';
import LoginPage from './components/auth/LoginPage';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import DashboardView from './components/dashboard/DashboardView';
import LibraryView from './components/library/LibraryView';
import TelemetryView from './components/telemetry/TelemetryView';
import AuraSyncView from './components/aura/AuraSyncView';
import SettingsView from './components/settings/SettingsView';
import AddGameModal from './components/modals/AddGameModal';
import GameDetailModal from './components/modals/GameDetailModal';
import GameLaunchOverlay from './components/modals/GameLaunchOverlay';
import ManualModeModal from './components/modals/ManualModeModal';

function MainApp() {
  const { isAuthenticated, activeTab, operatingMode, currentModeConfig, auraColor } = useRog();
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // If user is not authenticated, display the ROG Security Terminal Login Gateway
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div 
      className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans relative overflow-x-hidden"
      style={{
        '--rog-accent': currentModeConfig.accentColor,
        '--rog-glow': currentModeConfig.glowColor
      }}
    >
      {/* Background Cyber Mesh & Dynamic Ambient Glow */}
      <div className="fixed inset-0 bg-rog-mesh opacity-90 pointer-events-none z-0" />
      
      {/* Dynamic Ambient Glow shifted by Operating Mode & Aura Sync */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] blur-[140px] opacity-20 pointer-events-none transition-all duration-700 z-0"
        style={{
          backgroundColor: operatingMode === 'turbo' ? '#ff0033' : auraColor
        }}
      />

      {/* Top Armoury Crate Header */}
      <Header />

      {/* Main Layout: Left Sidebar + Content View */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar />

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-40px)]">
          {activeTab === 'home' && (
            <DashboardView onOpenManualModal={() => setIsManualModalOpen(true)} />
          )}

          {activeTab === 'library' && (
            <LibraryView />
          )}

          {activeTab === 'telemetry' && (
            <TelemetryView />
          )}

          {activeTab === 'aura' && (
            <AuraSyncView />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Interactive HUD Modals & Overlays */}
      <AddGameModal />
      <GameDetailModal />
      <GameLaunchOverlay />
      <ManualModeModal 
        isOpen={isManualModalOpen} 
        onClose={() => setIsManualModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <RogProvider>
      <MainApp />
    </RogProvider>
  );
}
