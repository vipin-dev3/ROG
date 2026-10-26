import React, { useState, useEffect } from 'react';
import { 
  Minus, 
  Square, 
  X, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  FileText, 
  Sparkles,
  Activity,
  Cpu,
  Layers,
  LogOut,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { playUiClick } from '../../utils/soundEffects';

export default function Header() {
  const { 
    operatingMode, 
    currentModeConfig, 
    telemetry, 
    soundEnabled, 
    setSoundEnabled,
    activeTab,
    setActiveTab,
    currentUser,
    logout,
    theme,
    toggleTheme
  } = useRog();

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    playUiClick();
    setSoundEnabled(!soundEnabled);
  };

  return (
    <header className="w-full bg-[#0a0a0c] border-b border-[#1f1f2a] select-none sticky top-0 z-40">
      {/* Top Title Bar with Window Controls */}
      <div className="flex items-center justify-between px-3 h-10 border-b border-[#161620] text-xs">
        {/* Left: Armoury Crate Logo & Title */}
        <div className="flex items-center space-x-2.5">
          {/* ROG Stylized Eye Emblem */}
          <div className="w-5 h-5 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-4 h-4 fill-rog-red drop-shadow-[0_0_8px_rgba(255,0,51,0.7)]">
              <path d="M12 48 L76 16 L88 28 L40 68 Z" />
              <path d="M28 58 L72 38 L85 52 L38 85 Z" fill="#ffffff" />
              <path d="M48 68 L82 52 L88 62 L52 88 Z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-200 tracking-wider text-[13px] font-sans">
            Armoury Crate
          </span>
          <span className="text-gray-500 font-mono text-[11px] hidden sm:inline">
            // GAMING VAULT v5.8.2
          </span>
        </div>

        {/* Center: Real-time Telemetry Strip */}
        <div className="hidden md:flex items-center space-x-6 text-[11px] font-mono text-gray-400 bg-[#121218] px-3 py-1 rounded border border-[#1e1e28]">
          <div className="flex items-center space-x-1.5">
            <span className="text-gray-500">MODE:</span>
            <span 
              className="font-bold tracking-wider uppercase px-1.5 py-0.5 rounded text-[10px]"
              style={{ 
                color: currentModeConfig.accentColor,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: `0 0 10px ${currentModeConfig.glowColor}`
              }}
            >
              {currentModeConfig.name}
            </span>
          </div>
          <div className="w-[1px] h-3 bg-gray-800" />
          <div className="flex items-center space-x-1.5">
            <span className="text-gray-500">CPU:</span>
            <span className="text-white font-medium">{telemetry.cpuClock} MHz</span>
            <span className="text-rog-red">({telemetry.cpuUsage}%)</span>
          </div>
          <div className="w-[1px] h-3 bg-gray-800" />
          <div className="flex items-center space-x-1.5">
            <span className="text-gray-500">GPU:</span>
            <span className="text-white font-medium">{telemetry.gpuTemp}°C</span>
            <span className="text-gray-400">({telemetry.gpuTgp}W)</span>
          </div>
          <div className="w-[1px] h-3 bg-gray-800" />
          <div className="flex items-center space-x-1.5 text-gray-400">
            <span>SYS:</span>
            <span className="text-gray-300">{currentTime}</span>
          </div>
        </div>

        {/* Right: Armoury Utility Icons & Window Buttons */}
        <div className="flex items-center space-x-1">
          {/* Aura Sync shortcut */}
          <button
            onClick={() => { playUiClick(); setActiveTab('aura'); }}
            title="Aura Sync Lighting"
            className="p-1.5 hover:text-white text-gray-400 transition-colors hover:bg-[#1a1a24] rounded"
          >
            <Sparkles className="w-3.5 h-3.5 text-gray-300 hover:text-rog-red" />
          </button>

          {/* Release Notes / Documentation */}
          <button
            onClick={() => { playUiClick(); setActiveTab('library'); }}
            title="Game Library Vault"
            className="relative p-1.5 hover:text-white text-gray-400 transition-colors hover:bg-[#1a1a24] rounded"
          >
            <Layers className="w-3.5 h-3.5 text-gray-300 hover:text-white" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rog-red rounded-full ring-2 ring-[#0a0a0c]" />
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? "Mute UI Sound Effects" : "Enable UI Sound Effects"}
            className="p-1.5 hover:text-white text-gray-400 transition-colors hover:bg-[#1a1a24] rounded"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-rog-red" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-gray-500" />
            )}
          </button>

          {/* Theme Toggle (Cyber Dark / Moonlight White) */}
          <button
            onClick={() => {
              playUiClick();
              toggleTheme();
            }}
            title={theme === 'light' ? "Switch to Cyber Dark Mode" : "Switch to Moonlight White Mode"}
            className="p-1.5 hover:text-white text-gray-400 transition-colors hover:bg-[#1a1a24] rounded"
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-indigo-400 hover:text-indigo-300" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400 hover:text-amber-300" />
            )}
          </button>

          {/* ROG Mobile Link Icon */}
          <button
            onClick={() => playUiClick()}
            title="Armoury Crate Mobile Connect"
            className="p-1.5 hover:text-white text-gray-400 transition-colors hover:bg-[#1a1a24] rounded"
          >
            <Smartphone className="w-3.5 h-3.5 text-gray-300" />
          </button>

          {/* User Clearance & Logout */}
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#161622] border border-[#232334] ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span className="font-mono text-gray-300 text-[10px] font-bold tracking-wider">
              {currentUser || 'DRACULA'}
            </span>
            <button
              onClick={() => {
                playUiClick();
                logout();
              }}
              title="Logout (Return to Security Gateway)"
              className="p-0.5 hover:text-rog-red text-gray-400 hover:bg-[#20202e] rounded transition-colors ml-0.5"
            >
              <LogOut className="w-3 h-3" />
            </button>
          </div>

          <div className="w-[1px] h-3.5 bg-gray-800 mx-1" />

          {/* Window Controls */}
          <div className="flex items-center">
            <button 
              onClick={() => playUiClick()}
              className="w-7 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1a24] transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button 
              onClick={() => playUiClick()}
              className="w-7 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1a1a24] transition-colors"
            >
              <Square className="w-2.5 h-2.5" />
            </button>
            <button 
              onClick={() => playUiClick()}
              className="w-7 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-rog-red transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

