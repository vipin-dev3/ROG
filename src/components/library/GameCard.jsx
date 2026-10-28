import React from 'react';
import { 
  Play, 
  Star, 
  Clock, 
  MoreVertical, 
  Flame, 
  Trophy, 
  PlusCircle,
  Edit2
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { playUiClick, playGameLaunchSound } from '../../utils/soundEffects';

export default function GameCard({ game }) {
  const { 
    setSelectedGameForModal, 
    setActiveLaunchingGame, 
    toggleFavorite, 
    logHours,
    openGameModal,
    theme
  } = useRog();

  const isLight = theme === 'light';

  const handleLaunch = (e) => {
    e.stopPropagation();
    playGameLaunchSound();
    setActiveLaunchingGame(game);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    playUiClick();
    toggleFavorite(game.id);
  };

  const handleQuickLog = (e) => {
    e.stopPropagation();
    playUiClick();
    logHours(game.id, 1);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    playUiClick();
    if (openGameModal) {
      openGameModal(game, true);
    } else {
      setSelectedGameForModal(game);
    }
  };

  const handleCardClick = () => {
    playUiClick();
    setSelectedGameForModal(game);
  };

  const statusColors = {
    Playing: 'border-emerald-500/60 text-emerald-500 bg-emerald-500/10',
    Completed: 'border-yellow-500/60 text-yellow-600 bg-yellow-500/10',
    Wishlist: 'border-cyan-500/60 text-cyan-600 bg-cyan-500/10',
    Backlog: 'border-purple-500/60 text-purple-600 bg-purple-500/10'
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,0,51,0.35)] hover:border-rog-red/80 flex flex-col justify-between ${
        isLight ? 'bg-white border border-slate-200 shadow-sm' : 'bg-[#121218] border border-[#20202d]'
      }`}
    >
      {/* Top Cover Image Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0d12]">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80";
          }}
        />

        {/* Dark Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121218]/90 via-transparent to-black/60 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          {/* Platform Badge */}
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-black/80 backdrop-blur-md text-gray-200 border border-white/10">
            {game.platform}
          </span>

          {/* Favorite & Status Badges */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleToggleFavorite}
              title={game.isFavorite ? "Unfavorite" : "Favorite"}
              className="p-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  game.isFavorite ? 'text-yellow-400 fill-yellow-400' : ''
                }`}
              />
            </button>

            <button
              onClick={handleEditClick}
              title="Edit Game Information"
              className="p-1.5 rounded-full bg-black/70 hover:bg-rog-red backdrop-blur text-gray-300 hover:text-white transition-colors"
            >
              <Edit2 className="w-3 h-3" />
            </button>

            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border backdrop-blur-md ${statusColors[game.status] || 'border-gray-600 text-gray-300'}`}>
              {game.status}
            </span>
          </div>
        </div>

        {/* Floating Launch Button Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5 z-20">
          <button
            onClick={handleLaunch}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-rog-red hover:bg-[#ff1a47] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,51,0.8)] transition-transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch</span>
          </button>
          
          <button
            onClick={handleEditClick}
            title="Edit Game Info"
            className="p-2.5 rounded-lg bg-[#1c1c28] hover:bg-rog-red text-gray-200 hover:text-white border border-gray-700 hover:border-transparent transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleQuickLog}
            title="Log +1 Hour Played"
            className="p-2.5 rounded-lg bg-[#1c1c28] hover:bg-[#28283a] text-gray-200 hover:text-white border border-gray-700 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Recommended Armoury Operating Profile Badge */}
        {game.profileMode && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 backdrop-blur border border-white/10 text-gray-300">
            <Flame className="w-3 h-3 text-rog-red" />
            <span>MODE: {game.profileMode.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Card Info Details */}
      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <h3 className={`text-sm font-bold font-sans group-hover:text-rog-red transition-colors line-clamp-1 ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            {game.title}
          </h3>
          <p className={`text-xs font-sans mt-0.5 line-clamp-1 ${
            isLight ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {game.genre}
          </p>
        </div>

        {/* Playtime & Achievements Progress */}
        <div className={`pt-2 border-t space-y-1.5 ${isLight ? 'border-slate-100' : 'border-[#1b1b26]'}`}>
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span className="flex items-center space-x-1">
              <Clock className={`w-3 h-3 ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`font-semibold ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>{game.hoursPlayed} hrs</span>
            </span>

            <span className={`flex items-center space-x-1 text-[11px] ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              <Trophy className="w-3 h-3 text-yellow-500" />
              <span>{game.achievementsUnlocked}/{game.totalAchievements}</span>
            </span>
          </div>

          {/* Progress Bar for Completion */}
          <div className={`w-full h-1 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-[#181822]'}`}>
            <div
              className="h-full bg-gradient-to-r from-rog-red to-[#ff007f] rounded-full"
              style={{ width: `${game.completionPercentage || 50}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
