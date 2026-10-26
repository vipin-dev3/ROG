import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_GAMES,
  ROG_SYSTEM_SPECS,
  OPERATING_MODES,
  CONNECTED_DEVICES,
  AURA_EFFECTS
} from '../data/gamesData';
import { playModeSwitchSound, setMuted as setAudioMuted } from '../utils/soundEffects';

const RogContext = createContext();

export function RogProvider({ children }) {
  // Navigation View
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'library' | 'telemetry' | 'aura' | 'settings'

  // Operating Mode
  const [operatingMode, setOperatingModeState] = useState(() => {
    return localStorage.getItem('rog_operating_mode') || 'windows';
  });

  // Sound FX State
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('rog_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Games State
  const [games, setGames] = useState(() => {
    try {
      localStorage.removeItem('rog_vault_games');
      localStorage.removeItem('rog_vault_games_v2');
      localStorage.removeItem('rog_vault_games_v3');
      localStorage.removeItem('rog_vault_games_v4');
      localStorage.removeItem('rog_vault_games_v5');
      localStorage.removeItem('rog_vault_games_v6');
      localStorage.removeItem('rog_vault_games_v7');
      localStorage.removeItem('rog_vault_games_v8');
      const saved = localStorage.getItem('rog_vault_games_v9');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      return INITIAL_GAMES;
    }
    return INITIAL_GAMES;
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Playing' | 'Completed' | 'Wishlist' | 'Favorites'
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [sortBy, setSortBy] = useState('hoursPlayed'); // 'hoursPlayed' | 'title' | 'lastPlayed' | 'rating'

  // Modals & Active Game
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGameForModal, setSelectedGameForModal] = useState(null);
  const [activeLaunchingGame, setActiveLaunchingGame] = useState(null);

  // Peripherals
  const [devices, setDevices] = useState(CONNECTED_DEVICES);

  // Aura Sync state
  const [auraEffect, setAuraEffect] = useState('breathing');
  const [auraColor, setAuraColor] = useState('#ff0033');
  const [auraBrightness, setAuraBrightness] = useState(90);

  // Sync sound settings with audio synth
  useEffect(() => {
    setAudioMuted(!soundEnabled);
    localStorage.setItem('rog_sound_enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Persist Games
  useEffect(() => {
    localStorage.setItem('rog_vault_games_v9', JSON.stringify(games));
  }, [games]);

  // Persist Operating Mode
  useEffect(() => {
    localStorage.setItem('rog_operating_mode', operatingMode);
  }, [operatingMode]);

  // Switch Operating Mode with Sound & Glow updates
  const setOperatingMode = (modeId) => {
    setOperatingModeState(modeId);
    playModeSwitchSound(modeId);
  };

  // Live Simulated Hardware Telemetry matching current operating mode
  const currentModeConfig = OPERATING_MODES.find(m => m.id === operatingMode) || OPERATING_MODES[0];

  const [telemetry, setTelemetry] = useState({
    cpuClock: currentModeConfig.cpuClockMhz,
    cpuUsage: currentModeConfig.cpuUsagePercent,
    cpuTemp: currentModeConfig.cpuTempC,
    cpuVoltage: 1171,
    gpuClock: currentModeConfig.gpuClockMhz,
    gpuUsage: operatingMode === 'silent' ? 12 : operatingMode === 'turbo' ? 78 : 34,
    gpuTemp: currentModeConfig.gpuTempC,
    gpuVoltage: 980,
    gpuTgp: currentModeConfig.tgpWatts,
    fanCpuRpm: currentModeConfig.fanCpuRpm,
    fanGpuRpm: currentModeConfig.fanGpuRpm,
    fanDba: currentModeConfig.fanDba,
    ramUsedGb: 8.6,
    ramTotalGb: ROG_SYSTEM_SPECS.memory.totalCapacityGb,
    storageUsedGb: ROG_SYSTEM_SPECS.storage.usedGbDefault,
    storageTotalGb: ROG_SYSTEM_SPECS.storage.totalGb
  });

  // Dynamic telemetry tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const jitter = (range) => (Math.random() * range - range / 2);
        const targetMode = OPERATING_MODES.find(m => m.id === operatingMode) || OPERATING_MODES[0];

        // Smoothly approach mode target with slight organic jitter
        const newCpuClock = Math.round(targetMode.cpuClockMhz + jitter(80));
        const newCpuUsage = Math.min(100, Math.max(8, Math.round(targetMode.cpuUsagePercent + jitter(6))));
        const newCpuTemp = Math.round(targetMode.cpuTempC + jitter(2));
        const newGpuTemp = Math.round(targetMode.gpuTempC + jitter(1.5));
        const newFanCpu = Math.round(targetMode.fanCpuRpm + jitter(120));
        const newFanGpu = Math.round(targetMode.fanGpuRpm + jitter(120));
        const newGpuTgp = Math.round(targetMode.tgpWatts + jitter(4));

        return {
          ...prev,
          cpuClock: newCpuClock,
          cpuUsage: newCpuUsage,
          cpuTemp: newCpuTemp,
          gpuClock: Math.round(targetMode.gpuClockMhz + jitter(50)),
          gpuUsage: Math.min(100, Math.max(0, Math.round((targetMode.id === 'turbo' ? 75 : 28) + jitter(8)))),
          gpuTemp: newGpuTemp,
          gpuTgp: newGpuTgp,
          fanCpuRpm: newFanCpu,
          fanGpuRpm: newFanGpu,
          ramUsedGb: +(8.4 + jitter(0.4)).toFixed(1),
          cpuVoltage: Math.round(1150 + jitter(40))
        };
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [operatingMode]);

  // Game actions
  const addGame = (newGameData) => {
    const newGame = {
      id: `game-${Date.now()}`,
      title: newGameData.title || "Untitled Game",
      genre: newGameData.genre || "Action RPG",
      platform: newGameData.platform || "Steam",
      hoursPlayed: parseFloat(newGameData.hoursPlayed) || 0,
      lastPlayed: "Just now",
      status: newGameData.status || "Playing",
      rating: parseInt(newGameData.rating) || 5,
      completionPercentage: parseInt(newGameData.completionPercentage) || 0,
      profileMode: newGameData.profileMode || operatingMode,
      coverImage: newGameData.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
      bannerImage: newGameData.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
      description: newGameData.description || "Custom Armoury Crate game profile deployed to the ROG Vault.",
      tags: newGameData.tags ? (Array.isArray(newGameData.tags) ? newGameData.tags : newGameData.tags.split(',').map(t => t.trim())) : ["Custom Game"],
      achievementsUnlocked: parseInt(newGameData.achievementsUnlocked) || 0,
      totalAchievements: parseInt(newGameData.totalAchievements) || 50,
      isFavorite: Boolean(newGameData.isFavorite),
      personalNotes: newGameData.personalNotes || "Added to ROG Vault."
    };

    setGames(prev => [newGame, ...prev]);
  };

  const updateGame = (id, updatedFields) => {
    setGames(prev => prev.map(game => (game.id === id ? { ...game, ...updatedFields } : game)));
  };

  const deleteGame = (id) => {
    setGames(prev => prev.filter(game => game.id !== id));
    if (selectedGameForModal?.id === id) {
      setSelectedGameForModal(null);
    }
  };

  const toggleFavorite = (id) => {
    setGames(prev => prev.map(game => {
      if (game.id === id) {
        return { ...game, isFavorite: !game.isFavorite };
      }
      return game;
    }));
  };

  const logHours = (id, additionalHours) => {
    setGames(prev => prev.map(game => {
      if (game.id === id) {
        const newHours = +(game.hoursPlayed + additionalHours).toFixed(1);
        return {
          ...game,
          hoursPlayed: newHours,
          lastPlayed: 'Just now'
        };
      }
      return game;
    }));
  };

  const resetDefaults = () => {
    setGames(INITIAL_GAMES);
    setOperatingModeState('windows');
    localStorage.removeItem('rog_vault_games');
  };

  return (
    <RogContext.Provider
      value={{
        activeTab,
        setActiveTab,
        operatingMode,
        setOperatingMode,
        currentModeConfig,
        telemetry,
        systemSpecs: ROG_SYSTEM_SPECS,
        operatingModes: OPERATING_MODES,
        games,
        addGame,
        updateGame,
        deleteGame,
        toggleFavorite,
        logHours,
        resetDefaults,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        selectedGenre,
        setSelectedGenre,
        selectedPlatform,
        setSelectedPlatform,
        sortBy,
        setSortBy,
        isAddModalOpen,
        setIsAddModalOpen,
        selectedGameForModal,
        setSelectedGameForModal,
        activeLaunchingGame,
        setActiveLaunchingGame,
        devices,
        setDevices,
        auraEffect,
        setAuraEffect,
        auraColor,
        setAuraColor,
        auraBrightness,
        setAuraBrightness,
        soundEnabled,
        setSoundEnabled
      }}
    >
      {children}
    </RogContext.Provider>
  );
}

export function useRog() {
  const context = useContext(RogContext);
  if (!context) {
    throw new Error('useRog must be used within a RogProvider');
  }
  return context;
}

