import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Clock, 
  Trophy, 
  Trash2, 
  Star, 
  Flame, 
  Share2, 
  Sparkles,
  PlusCircle,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { playUiClick, playGameLaunchSound } from '../../utils/soundEffects';

export default function GameDetailModal() {
  const { 
    selectedGameForModal, 
    setSelectedGameForModal, 
    updateGame, 
    deleteGame, 
    logHours, 
    setActiveLaunchingGame 
  } = useRog();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(selectedGameForModal?.personalNotes || '');

  if (!selectedGameForModal) return null;

  const game = selectedGameForModal;

  const handleLaunch = () => {
    playGameLaunchSound();
    setActiveLaunchingGame(game);
  };

  const handleLogHours = (hrs) => {
    playUiClick();
    logHours(game.id, hrs);
    // update current modal view object
    setSelectedGameForModal(prev => ({
      ...prev,
      hoursPlayed: +(prev.hoursPlayed + hrs).toFixed(1)
    }));
  };

  const handleSaveNotes = () => {
    playUiClick();
    updateGame(game.id, { personalNotes: notes });
    setSelectedGameForModal(prev => ({ ...prev, personalNotes: notes }));
    setEditingNotes(false);
  };

  const handleDelete = () => {
    playUiClick();
    deleteGame(game.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-3xl bg-[#111118] border border-[#2b2b3f] rounded-2xl shadow-[0_0_50px_rgba(255,0,51,0.35)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Hero Banner */}
        <div className="relative h-64 w-full overflow-hidden bg-black">
          <img
            src={game.bannerImage || game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover filter brightness-90"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/40 to-black/60 pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => {
              playUiClick();
              setSelectedGameForModal(null);
            }}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-rog-red text-gray-300 hover:text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Left Badges */}
          <div className="absolute top-4 left-6 z-10 flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur border border-white/10 text-xs font-mono font-bold text-gray-200">
              {game.platform}
            </span>
            <span className="px-2.5 py-1 rounded bg-rog-red/20 border border-rog-red text-xs font-mono text-rog-red font-bold">
              ARMOURY VAULT
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

            {/* Launch Button in Hero */}
            <button
              onClick={handleLaunch}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-rog-red hover:bg-[#ff1a47] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,51,0.8)] active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Title</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
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
                {Math.round((game.achievementsUnlocked / game.totalAchievements) * 100)}% Complete
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
              {game.description}
            </p>
            {game.tags && (
              <div className="flex flex-wrap gap-2 pt-1">
                {game.tags.map((tag, i) => (
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
              {!editingNotes ? (
                <button
                  onClick={() => setEditingNotes(true)}
                  className="text-xs font-mono text-rog-red hover:underline"
                >
                  Edit Note
                </button>
              ) : (
                <button
                  onClick={handleSaveNotes}
                  className="text-xs font-mono text-emerald-400 hover:underline"
                >
                  Save Note
                </button>
              )}
            </div>

            {editingNotes ? (
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#1b1b26] border border-[#303046] focus:border-rog-red text-xs text-white p-2.5 rounded-lg outline-none font-sans"
              />
            ) : (
              <p className="text-xs text-gray-400 font-mono italic">
                "{game.personalNotes || 'No performance benchmarks recorded yet.'}"
              </p>
            )}
          </div>

          {/* Danger Zone: Delete Title */}
          <div className="pt-3 border-t border-[#1f1f2e] flex items-center justify-between">
            <div className="text-xs font-mono text-gray-500">
              ID: {game.id} // Added via Armoury Vault
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
    </div>
  );
}

