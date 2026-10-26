import React from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  Layers, 
  Sparkles,
  Gamepad,
  X
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { GENRES, PLATFORMS } from '../../data/gamesData';
import RogSlashes from '../common/RogSlashes';
import { playUiClick } from '../../utils/soundEffects';

export default function LibraryToolbar() {
  const {
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
    setIsAddModalOpen,
    games
  } = useRog();

  const statusTabs = [
    { id: 'All', label: 'All Games', count: games.length },
    { id: 'Playing', label: 'Recently Played', count: games.filter(g => g.status === 'Playing').length },
    { id: 'Favorites', label: 'Favorites', count: games.filter(g => g.isFavorite).length },
    { id: 'Completed', label: 'Completed', count: games.filter(g => g.status === 'Completed').length },
    { id: 'Wishlist', label: 'Wishlist', count: games.filter(g => g.status === 'Wishlist').length }
  ];

  const totalHours = games.reduce((acc, g) => acc + (parseFloat(g.hoursPlayed) || 0), 0).toFixed(0);

  return (
    <div className="space-y-4 select-none">
      {/* Vault Title Bar & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1f2e] pb-4">
        <div>
          <div className="flex items-center text-xl sm:text-2xl font-bold font-sans tracking-wide text-white">
            <RogSlashes count={3} />
            <span>GAME LIBRARY // ROG VAULT</span>
          </div>
          <p className="text-xs font-mono text-gray-400 mt-1 flex items-center gap-2">
            <span>INDEXED TITLES: <strong className="text-white">{games.length}</strong></span>
            <span>•</span>
            <span>TOTAL PLAYTIME: <strong className="text-rog-red">{totalHours} HOURS</strong></span>
            <span>•</span>
            <span className="text-emerald-400">STATUS: REPOSITORY SYNCHRONIZED</span>
          </p>
        </div>

        {/* Primary Action Button: + ADD NEW GAME */}
        <button
          onClick={() => {
            playUiClick();
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-rog-red hover:bg-[#ff1a47] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,51,0.5)] hover:shadow-[0_0_28px_rgba(255,0,51,0.8)] transition-all duration-200 active:scale-95 group"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
          <span>+ Add New Game</span>
        </button>
      </div>

      {/* Filter Tabs (All Games, Recently Played, Favorites, Completed, Wishlist) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {statusTabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playUiClick();
                setStatusFilter(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center space-x-2 ${
                isActive
                  ? 'bg-[#1e1e2d] text-white border-b-2 border-rog-red shadow-[0_0_12px_rgba(255,0,51,0.3)]'
                  : 'bg-[#121218] text-gray-400 hover:text-gray-200 hover:bg-[#161622] border border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                isActive ? 'bg-rog-red text-white' : 'bg-[#1c1c28] text-gray-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search, Genre, Platform & Sort Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#111118] p-3 rounded-xl border border-[#1e1e2c]">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vault by title, developer, or tag..."
            className="w-full bg-[#161622] border border-[#262638] focus:border-rog-red focus:ring-1 focus:ring-rog-red text-xs text-white placeholder-gray-500 rounded-lg pl-9 pr-8 py-2 outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Genre Selector */}
        <div className="md:col-span-3">
          <select
            value={selectedGenre}
            onChange={(e) => {
              playUiClick();
              setSelectedGenre(e.target.value);
            }}
            className="w-full bg-[#161622] border border-[#262638] focus:border-rog-red text-xs text-gray-200 rounded-lg px-3 py-2 outline-none cursor-pointer"
          >
            {GENRES.map((g) => (
              <option key={g} value={g} className="bg-[#121218] text-white">
                {g === 'All' ? 'All Genres' : g}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Selector */}
        <div className="md:col-span-2">
          <select
            value={selectedPlatform}
            onChange={(e) => {
              playUiClick();
              setSelectedPlatform(e.target.value);
            }}
            className="w-full bg-[#161622] border border-[#262638] focus:border-rog-red text-xs text-gray-200 rounded-lg px-3 py-2 outline-none cursor-pointer"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p} className="bg-[#121218] text-white">
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="md:col-span-2">
          <select
            value={sortBy}
            onChange={(e) => {
              playUiClick();
              setSortBy(e.target.value);
            }}
            className="w-full bg-[#161622] border border-[#262638] focus:border-rog-red text-xs text-gray-200 rounded-lg px-3 py-2 outline-none cursor-pointer"
          >
            <option value="hoursPlayed" className="bg-[#121218]">Most Played</option>
            <option value="lastPlayed" className="bg-[#121218]">Recently Played</option>
            <option value="title" className="bg-[#121218]">Title (A-Z)</option>
            <option value="rating" className="bg-[#121218]">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}

