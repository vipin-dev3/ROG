import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Clock, 
  Trophy, 
  Trash2, 
  Star, 
  Flame, 
  PlusCircle,
  CheckCircle,
  Edit2,
  Edit3,
  Save,
  RotateCcw,
  Sliders,
  Image,
  Tag,
  Gamepad2,
  ChevronRight
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { GENRES, PLATFORMS, OPERATING_MODES } from '../../data/gamesData';
import { playUiClick, playGameLaunchSound } from '../../utils/soundEffects';

export default function GameDetailModal() {
  const { 
    selectedGameForModal, 
    setSelectedGameForModal, 
    isEditingGameModal,
    setIsEditingGameModal,
    updateGame, 
    deleteGame, 
    logHours, 
    setActiveLaunchingGame 
  } = useRog();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    platform: '',
    status: 'Playing',
    rating: 5,
    profileMode: 'Turbo',
    hoursPlayed: 0,
    completionPercentage: 100,
    achievementsUnlocked: 0,
    totalAchievements: 50,
    coverImage: '',
    bannerImage: '',
    description: '',
    tags: '',
    personalNotes: ''
  });

  useEffect(() => {
    if (selectedGameForModal) {
      setFormData({
        title: selectedGameForModal.title || '',
        genre: selectedGameForModal.genre || '',
        platform: selectedGameForModal.platform || 'Steam',
        status: selectedGameForModal.status || 'Playing',
        rating: selectedGameForModal.rating ?? 5,
        profileMode: selectedGameForModal.profileMode || 'Turbo',
        hoursPlayed: selectedGameForModal.hoursPlayed ?? 0,
        completionPercentage: selectedGameForModal.completionPercentage ?? 0,
        achievementsUnlocked: selectedGameForModal.achievementsUnlocked ?? 0,
        totalAchievements: selectedGameForModal.totalAchievements ?? 50,
        coverImage: selectedGameForModal.coverImage || '',
        bannerImage: selectedGameForModal.bannerImage || '',
        description: selectedGameForModal.description || '',
        tags: Array.isArray(selectedGameForModal.tags) 
          ? selectedGameForModal.tags.join(', ') 
          : (selectedGameForModal.tags || ''),
        personalNotes: selectedGameForModal.personalNotes || ''
      });
      setIsEditing(Boolean(isEditingGameModal));
      setConfirmDelete(false);
    }
  }, [selectedGameForModal, isEditingGameModal]);

  if (!selectedGameForModal) return null;

  const game = selectedGameForModal;

  const handleLaunch = () => {
    playGameLaunchSound();
    setActiveLaunchingGame(game);
  };

  const handleLogHours = (hrs) => {
    playUiClick();
    logHours(game.id, hrs);
    setSelectedGameForModal(prev => ({
      ...prev,
      hoursPlayed: +(prev.hoursPlayed + hrs).toFixed(1)
    }));
  };

  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) return;

    const tagsArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const updatedData = {
      title: formData.title.trim(),
      genre: formData.genre.trim(),
      platform: formData.platform,
      status: formData.status,
      rating: Number(formData.rating),
      profileMode: formData.profileMode,
      hoursPlayed: parseFloat(formData.hoursPlayed) || 0,
      completionPercentage: Math.min(100, Math.max(0, parseInt(formData.completionPercentage) || 0)),
      achievementsUnlocked: parseInt(formData.achievementsUnlocked) || 0,
      totalAchievements: Math.max(1, parseInt(formData.totalAchievements) || 1),
      coverImage: formData.coverImage.trim() || game.coverImage,
      bannerImage: formData.bannerImage.trim() || formData.coverImage.trim() || game.bannerImage,
      description: formData.description.trim(),
      tags: tagsArray,
      personalNotes: formData.personalNotes.trim()
    };

    playUiClick();
    updateGame(game.id, updatedData);
    setSelectedGameForModal(prev => ({ ...prev, ...updatedData }));
    setIsEditing(false);
    setIsEditingGameModal(false);
  };

  const handleCancelEdit = () => {
    playUiClick();
    setIsEditing(false);
    setIsEditingGameModal(false);
    // Reset formData back to original game
    setFormData({
      title: game.title || '',
      genre: game.genre || '',
      platform: game.platform || 'Steam',
      status: game.status || 'Playing',
      rating: game.rating ?? 5,
      profileMode: game.profileMode || 'Turbo',
      hoursPlayed: game.hoursPlayed ?? 0,
      completionPercentage: game.completionPercentage ?? 0,
      achievementsUnlocked: game.achievementsUnlocked ?? 0,
      totalAchievements: game.totalAchievements ?? 50,
      coverImage: game.coverImage || '',
      bannerImage: game.bannerImage || '',
      description: game.description || '',
      tags: Array.isArray(game.tags) ? game.tags.join(', ') : (game.tags || ''),
      personalNotes: game.personalNotes || ''
    });
  };

  const handleDelete = () => {
    playUiClick();
    deleteGame(game.id);
  };

  const handleClose = () => {
    playUiClick();
    setSelectedGameForModal(null);
    setIsEditingGameModal(false);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-3xl bg-[#111118] border border-[#2b2b3f] rounded-2xl shadow-[0_0_50px_rgba(255,0,51,0.35)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header / Mode Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#1f1f2e] bg-[#14141f]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-rog-red transform -skew-x-[20deg]" />
            <span className="text-xs font-mono font-bold tracking-wider text-gray-300 uppercase">
              {isEditing ? 'EDITING GAME PROFILE // VAULT UPDATE' : 'ROG GAMING VAULT // TITLE SPECS'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => {
                  playUiClick();
                  setIsEditing(true);
                }}
                className="px-3 py-1 rounded bg-[#1e1e2d] hover:bg-rog-red text-gray-200 hover:text-white border border-[#3b3b55] hover:border-transparent text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-rog-red group-hover:text-white" />
                <span>Edit Info</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1 rounded bg-[#1c1c28] hover:bg-[#28283a] text-gray-300 text-xs font-mono transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="px-3 py-1 rounded bg-rog-red hover:bg-[#ff1a47] text-white text-xs font-mono font-bold shadow-[0_0_12px_rgba(255,0,51,0.5)] flex items-center space-x-1 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Info</span>
                </button>
              </div>
            )}

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-rog-red text-gray-300 hover:text-white flex items-center justify-center transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Toggle between View and Edit Mode */}
        {!isEditing ? (
          /* ================= VIEW MODE ================= */
          <div className="overflow-y-auto flex-1">
            {/* Top Hero Banner */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-black">
              <img
                src={game.bannerImage || game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover filter brightness-90"
              />

              {/* Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/50 to-black/60 pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-4 left-6 z-10 flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur border border-white/10 text-xs font-mono font-bold text-gray-200">
                  {game.platform}
                </span>
                <span className="px-2.5 py-1 rounded bg-rog-red/25 border border-rog-red text-xs font-mono text-rog-red font-bold">
                  ARMOURY VAULT
                </span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-gray-700 text-xs font-mono text-gray-300">
                  STATUS: {game.status}
                </span>
              </div>

              {/* Bottom Title Overlay */}
              <div className="absolute bottom-4 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                    {game.genre}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-wide">
                    {game.title}
                  </h1>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => {
                      playUiClick();
                      setIsEditing(true);
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#1b1b28] hover:bg-[#28283a] text-gray-200 hover:text-white border border-[#3b3b55] hover:border-rog-red text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-rog-red" />
                    <span>Edit Title</span>
                  </button>

                  <button
                    onClick={handleLaunch}
                    className="inline-flex items-center space-x-2 px-5 py-2 bg-rog-red hover:bg-[#ff1a47] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,51,0.8)] active:scale-95 transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-6">
              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#171722] border border-[#262638] rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Playtime</span>
                  <span className="text-lg font-bold font-mono text-white flex items-center gap-1.5 mt-1">
                    <Clock className="w-4 h-4 text-rog-red" />
                    {game.hoursPlayed} hrs
                  </span>
                  <div className="flex space-x-1 mt-2">
                    <button
                      onClick={() => handleLogHours(1)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202030] hover:bg-rog-red hover:text-white text-gray-300 transition-colors"
                    >
                      +1h
                    </button>
                    <button
                      onClick={() => handleLogHours(5)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202030] hover:bg-rog-red hover:text-white text-gray-300 transition-colors"
                    >
                      +5h
                    </button>
                  </div>
                </div>

                <div className="bg-[#171722] border border-[#262638] rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Armoury Mode</span>
                  <span className="text-lg font-bold font-sans text-rog-red flex items-center gap-1.5 mt-1">
                    <Flame className="w-4 h-4" />
                    {game.profileMode || 'TURBO'}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 mt-2">Overclock Auto-Switch</span>
                </div>

                <div className="bg-[#171722] border border-[#262638] rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Achievements</span>
                  <span className="text-lg font-bold font-mono text-yellow-400 flex items-center gap-1.5 mt-1">
                    <Trophy className="w-4 h-4" />
                    {game.achievementsUnlocked} / {game.totalAchievements}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 mt-2">
                    {Math.round((game.achievementsUnlocked / (game.totalAchievements || 1)) * 100)}% Complete
                  </span>
                </div>

                <div className="bg-[#171722] border border-[#262638] rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">User Rating</span>
                  <div className="flex items-center space-x-1 mt-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < game.rating ? 'fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 mt-2">Status: {game.status}</span>
                </div>
              </div>

              {/* Description & Tech Tags */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  Profile Overview & Features
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {game.description || "No overview provided for this title."}
                </p>
                {game.tags && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(Array.isArray(game.tags) ? game.tags : [game.tags]).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-[#1c1c28] border border-[#2e2e42] text-xs font-mono text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Review & Benchmark Notes */}
              <div className="bg-[#151520] border border-[#232334] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <span>Personal Performance & Benchmark Notes</span>
                  </h3>
                  <button
                    onClick={() => {
                      playUiClick();
                      setIsEditing(true);
                    }}
                    className="text-xs font-mono text-rog-red hover:underline flex items-center space-x-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <p className="text-xs text-gray-400 font-mono italic">
                  "{game.personalNotes || 'No performance benchmarks recorded yet.'}"
                </p>
              </div>

              {/* Danger Zone: Delete Title */}
              <div className="pt-3 border-t border-[#1f1f2e] flex items-center justify-between">
                <div className="text-xs font-mono text-gray-500">
                  ID: {game.id} // Armoury Vault Registered
                </div>

                {confirmDelete ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-rog-red font-mono">Confirm Remove?</span>
                    <button
                      onClick={handleDelete}
                      className="px-3 py-1 bg-rog-red text-white text-xs font-mono rounded hover:bg-[#d6002b]"
                    >
                      Yes, Remove
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="px-3 py-1 bg-[#1e1e2c] text-gray-300 text-xs font-mono rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center space-x-1.5 text-xs font-mono text-gray-500 hover:text-rog-red transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Title from Vault</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ================= EDIT MODE ================= */
          <form onSubmit={handleSaveAll} className="p-6 overflow-y-auto flex-1 space-y-5">
            {/* Live Banner / Cover Preview */}
            <div className="relative h-36 rounded-xl overflow-hidden border border-[#2b2b3f] bg-black">
              <img
                src={formData.bannerImage || formData.coverImage}
                alt="Preview"
                className="w-full h-full object-cover filter brightness-75"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-black/60 pointer-events-none" />
              <div className="absolute bottom-3 left-4 z-10">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  Live Preview
                </span>
                <h2 className="text-lg font-bold text-white font-sans truncate">
                  {formData.title || "Untitled Game"}
                </h2>
              </div>
            </div>

            {/* Core Info: Title, Genre, Platform */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Game Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-sm text-white px-3.5 py-2.5 rounded-lg outline-none font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                    Genre / Category
                  </label>
                  <input
                    type="text"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="e.g. Action RPG, FPS, Racing"
                    className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-xs text-white px-3 py-2.5 rounded-lg outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                    Platform Launcher
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-xs text-white px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                  >
                    {PLATFORMS.filter(p => p !== 'All Platforms').map((p) => (
                      <option key={p} value={p} className="bg-[#111118]">
                        {p}
                      </option>
                    ))}
                    <option value="Rockstar Games" className="bg-[#111118]">Rockstar Games</option>
                    <option value="Epic Games" className="bg-[#111118]">Epic Games</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Operating Mode Profile & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1 flex items-center justify-between">
                  <span>Armoury Operating Profile</span>
                  <Flame className="w-3.5 h-3.5 text-rog-red" />
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Performance', 'Turbo', 'Manual'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFormData({ ...formData, profileMode: mode })}
                      className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                        formData.profileMode?.toLowerCase() === mode.toLowerCase()
                          ? 'bg-rog-red/20 border-rog-red text-rog-red shadow-[0_0_10px_rgba(255,0,51,0.4)]'
                          : 'bg-[#171724] border-[#2b2b3f] text-gray-400 hover:text-white'
                      }`}
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Vault Play Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-xs text-white px-3 py-2.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="Playing" className="bg-[#111118]">Playing (In Progress)</option>
                  <option value="Completed" className="bg-[#111118]">Completed (Mastered)</option>
                  <option value="Wishlist" className="bg-[#111118]">Wishlist</option>
                  <option value="Backlog" className="bg-[#111118]">Backlog</option>
                </select>
              </div>
            </div>

            {/* Playtime, Rating, Completion & Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#14141f] p-4 rounded-xl border border-[#232334]">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Playtime (Hours)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.hoursPlayed}
                  onChange={(e) => setFormData({ ...formData, hoursPlayed: e.target.value })}
                  className="w-full bg-[#1a1a28] border border-[#2e2e42] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  User Rating (1-5)
                </label>
                <div className="flex items-center space-x-1 py-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-gray-300 ml-2">({formData.rating}/5)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Completion: {formData.completionPercentage}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.completionPercentage}
                  onChange={(e) => setFormData({ ...formData, completionPercentage: Number(e.target.value) })}
                  className="w-full accent-rog-red cursor-pointer mt-1"
                />
              </div>

              <div className="sm:col-span-3 grid grid-cols-2 gap-3 pt-2 border-t border-[#20202e]">
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                    Achievements Unlocked
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.achievementsUnlocked}
                    onChange={(e) => setFormData({ ...formData, achievementsUnlocked: e.target.value })}
                    className="w-full bg-[#1a1a28] border border-[#2e2e42] focus:border-rog-red text-xs text-white px-3 py-1.5 rounded-lg outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                    Total Achievements
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalAchievements}
                    onChange={(e) => setFormData({ ...formData, totalAchievements: e.target.value })}
                    className="w-full bg-[#1a1a28] border border-[#2e2e42] focus:border-rog-red text-xs text-white px-3 py-1.5 rounded-lg outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Artwork URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Cover Image URL / Path
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="./covers/game-name.jpg or https://..."
                  className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                  Banner Image URL / Path
                </label>
                <input
                  type="text"
                  value={formData.bannerImage}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  placeholder="Optional header banner image"
                  className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                Tech Tags (Comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Ray Tracing, DLSS 3, Ultrawide, HDR"
                className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none font-sans"
              />
            </div>

            {/* Overview & Description */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                Game Description & Synopsis
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-xs text-white p-3 rounded-lg outline-none font-sans leading-relaxed"
              />
            </div>

            {/* Benchmark Notes */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                Personal Performance & Hardware Benchmark Notes
              </label>
              <textarea
                rows={3}
                value={formData.personalNotes}
                onChange={(e) => setFormData({ ...formData, personalNotes: e.target.value })}
                placeholder="FPS, temperatures, graphics settings recommendations..."
                className="w-full bg-[#171724] border border-[#2b2b3f] focus:border-rog-red text-xs text-white p-3 rounded-lg outline-none font-sans leading-relaxed"
              />
            </div>

            {/* Save Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#1f1f2e]">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-5 py-2.5 bg-[#171722] hover:bg-[#202030] text-gray-300 text-xs font-mono rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-rog-red hover:bg-[#ff1a47] text-white text-xs font-bold uppercase tracking-wider font-mono rounded-lg shadow-[0_0_20px_rgba(255,0,51,0.7)] flex items-center space-x-2 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
