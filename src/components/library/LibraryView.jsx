import React, { useMemo } from 'react';
import { useRog } from '../../context/RogContext';
import { EMPTY_PLACEHOLDER_SLOTS } from '../../data/gamesData';
import LibraryToolbar from './LibraryToolbar';
import GameCard from './GameCard';
import PlaceholderCard from './PlaceholderCard';
import { Gamepad2, SearchX, Plus } from 'lucide-react';
import { playUiClick } from '../../utils/soundEffects';

export default function LibraryView() {
  const {
    games,
    searchQuery,
    statusFilter,
    selectedGenre,
    selectedPlatform,
    sortBy,
    setSearchQuery,
    setStatusFilter,
    setSelectedGenre,
    setSelectedPlatform,
    setIsAddModalOpen
  } = useRog();

  // Filter and Sort logic
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Status filter
        if (statusFilter === 'Favorites' && !game.isFavorite) return false;
        if (statusFilter !== 'All' && statusFilter !== 'Favorites' && game.status !== statusFilter) return false;

        // Genre filter
        if (selectedGenre !== 'All' && !game.genre.toLowerCase().includes(selectedGenre.toLowerCase())) return false;

        // Platform filter
        if (selectedPlatform !== 'All Platforms' && game.platform !== selectedPlatform) return false;

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchGenre = game.genre.toLowerCase().includes(q);
          const matchTags = game.tags && game.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchGenre && !matchTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'hoursPlayed') {
          return (parseFloat(b.hoursPlayed) || 0) - (parseFloat(a.hoursPlayed) || 0);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        return 0;
      });
  }, [games, statusFilter, selectedGenre, selectedPlatform, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setSelectedGenre('All');
    setSelectedPlatform('All Platforms');
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
      <LibraryToolbar />

      {games.length === 0 ? (
        /* Empty Vault State: Clean Armoury Crate Slot View Ready for Titles */
        <div className="space-y-6">
          <div className="bg-[#121218]/90 border border-[#222234] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-rog-red/10 border border-rog-red/40 flex items-center justify-center flex-shrink-0">
                <Gamepad2 className="w-6 h-6 text-rog-red animate-pulse-subtle" />
              </div>
              <div>
                <h3 className="text-base font-bold font-sans text-white uppercase tracking-wider flex items-center gap-2">
                  <span>ARMOURY VAULT READY // NO TITLES REGISTERED</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rog-red/20 text-rog-red border border-rog-red/40">
                    AWAITING INPUT
                  </span>
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-1">
                  Ready to deploy your game collection. Click on "+ Add Game Slot" or any empty sector card below to register a title.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playUiClick();
                setIsAddModalOpen(true);
              }}
              className="px-5 py-2.5 bg-rog-red hover:bg-[#ff1a47] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,51,0.6)] flex items-center space-x-2 transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>+ Register First Title</span>
            </button>
          </div>

          {/* Grid of Empty Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            <PlaceholderCard isPrimaryAdd={true} />
            {EMPTY_PLACEHOLDER_SLOTS.map((slot) => (
              <PlaceholderCard key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      ) : filteredGames.length === 0 ? (
        /* Filters active with 0 results */
        <div className="py-16 text-center flex flex-col items-center justify-center bg-[#111118]/60 border border-[#1e1e2c] rounded-2xl p-8">
          <div className="w-16 h-16 rounded-full bg-[#181824] flex items-center justify-center text-gray-500 mb-4 border border-[#262638]">
            <SearchX className="w-8 h-8 text-rog-red" />
          </div>
          <h3 className="text-lg font-bold font-sans text-white uppercase tracking-wider">
            No matching titles found in Armoury Vault
          </h3>
          <p className="text-xs text-gray-400 font-mono mt-1 max-w-md">
            No games matched your current filters. Try changing your search query or reset your filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-5 px-5 py-2 bg-[#1b1b26] hover:bg-[#252538] border border-[#2d2d42] text-xs font-mono text-white rounded-lg transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        /* Active games grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}

          {/* Primary '+ Add Game' Slot Card */}
          <PlaceholderCard isPrimaryAdd={true} />

          {/* Blank / Placeholder Ready Cards */}
          {statusFilter === 'All' && searchQuery === '' && (
            EMPTY_PLACEHOLDER_SLOTS.map((slot) => (
              <PlaceholderCard key={slot.id} slot={slot} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
