import React, { useState } from 'react';
import { X, Plus, Image, Flame, Check } from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { GENRES, PLATFORMS } from '../../data/gamesData';
import { playUiClick } from '../../utils/soundEffects';

const QUICK_PRESETS = [
  {
    title: "Ghost of Tsushima: Director's Cut",
    genre: "Action RPG / Open World",
    platform: "Steam",
    hours: "38.5",
    cover: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=900&q=80",
    tags: "PlayStation PC, Ultrawide, HDR"
  },
  {
    title: "Helldivers 2",
    genre: "FPS / Fast Paced",
    platform: "Steam",
    hours: "64.0",
    cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    tags: "Co-op, Turbo Mode, Ray Tracing"
  },
  {
    title: "Alan Wake 2",
    genre: "Survival Horror",
    platform: "Epic Games",
    hours: "26.2",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
    tags: "Full Path Tracing, DLSS 3.5"
  }
];

export default function AddGameModal() {
  const { isAddModalOpen, setIsAddModalOpen, addGame, operatingMode } = useRog();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState(GENRES[1] || 'Action RPG / Sci-Fi');
  const [platform, setPlatform] = useState('Steam');
  const [hoursPlayed, setHoursPlayed] = useState('0');
  const [status, setStatus] = useState('Playing');
  const [rating, setRating] = useState(5);
  const [profileMode, setProfileMode] = useState(operatingMode);
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('Ray Tracing, High FPS');
  const [personalNotes, setPersonalNotes] = useState('');
  const [error, setError] = useState('');

  if (!isAddModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Game Title is required to register to the Armoury Vault.');
      return;
    }

    addGame({
      title: title.trim(),
      genre,
      platform,
      hoursPlayed: parseFloat(hoursPlayed) || 0,
      status,
      rating,
      profileMode,
      coverImage: coverImage.trim() || undefined,
      tags,
      personalNotes
    });

    playUiClick();
    setIsAddModalOpen(false);
  };

  const applyPreset = (preset) => {
    playUiClick();
    setTitle(preset.title);
    setGenre(preset.genre);
    setPlatform(preset.platform);
    setHoursPlayed(preset.hours);
    setCoverImage(preset.cover);
    setTags(preset.tags);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-2xl bg-[#121218] border border-[#2b2b3e] rounded-2xl shadow-[0_0_40px_rgba(255,0,51,0.3)] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f2e] bg-[#161622]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-rog-red transform -skew-x-[20deg]" />
            <h2 className="text-lg font-bold font-sans tracking-wide text-white uppercase">
              REGISTER NEW GAME // ARMOURY VAULT
            </h2>
          </div>

          <button
            onClick={() => {
              playUiClick();
              setIsAddModalOpen(false);
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-rog-red transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="px-6 py-2.5 bg-[#0f0f15] border-b border-[#1c1c28] flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-gray-400 font-mono text-[11px] whitespace-nowrap">QUICK TEMPLATES:</span>
          {QUICK_PRESETS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => applyPreset(p)}
              className="px-2.5 py-1 bg-[#1a1a26] hover:bg-[#252538] text-gray-200 hover:text-white border border-[#2c2c3e] rounded text-[11px] whitespace-nowrap transition-colors"
            >
              + {p.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-2.5 bg-rog-red/10 border border-rog-red text-rog-red text-xs rounded-lg font-mono">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
              Game Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Star Wars Jedi: Survivor"
              className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-sm text-white px-3.5 py-2.5 rounded-lg outline-none font-sans"
            />
          </div>

          {/* Genre and Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-xs text-white px-3 py-2.5 rounded-lg outline-none cursor-pointer"
              >
                {GENRES.filter(g => g !== 'All').map((g) => (
                  <option key={g} value={g} className="bg-[#121218]">
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                Platform Launcher
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-xs text-white px-3 py-2.5 rounded-lg outline-none cursor-pointer"
              >
                {PLATFORMS.filter(p => p !== 'All Platforms').map((p) => (
                  <option key={p} value={p} className="bg-[#121218]">
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hours Played & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                Playtime (Hours)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={hoursPlayed}
                onChange={(e) => setHoursPlayed(e.target.value)}
                className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                Vault Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none cursor-pointer"
              >
                <option value="Playing" className="bg-[#121218]">Playing / In Progress</option>
                <option value="Completed" className="bg-[#121218]">Completed / Mastered</option>
                <option value="Wishlist" className="bg-[#121218]">Wishlist</option>
                <option value="Backlog" className="bg-[#121218]">Backlog</option>
              </select>
            </div>
          </div>

          {/* Linked Operating Mode & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                Linked Armoury Profile
              </label>
              <select
                value={profileMode}
                onChange={(e) => setProfileMode(e.target.value)}
                className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none cursor-pointer font-sans"
              >
                <option value="Turbo" className="bg-[#121218]">Turbo (Maximum 175W Boost)</option>
                <option value="Performance" className="bg-[#121218]">Performance (Dynamic Balanced)</option>
                <option value="Silent" className="bg-[#121218]">Silent (Whisper Quiet 0dB)</option>
                <option value="Windows" className="bg-[#121218]">Windows (Default OS)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
                User Rating (1 - 5 Stars)
              </label>
              <div className="flex items-center space-x-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => { playUiClick(); setRating(star); }}
                    className={`w-7 h-7 rounded flex items-center justify-center border ${
                      rating >= star
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                        : 'bg-[#181824] border-[#2b2b3a] text-gray-500'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
              Cover Image URL (Optional)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/... or paste image URL"
              className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none font-mono"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
              Tech Tags / Features (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ray Tracing, DLSS 3, HDR, 240Hz"
              className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-xs text-white px-3 py-2 rounded-lg outline-none font-sans"
            />
          </div>

          {/* Personal Review / Notes */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1">
              Personal Notes / Performance Benchmark
            </label>
            <textarea
              rows={2}
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              placeholder="Average FPS, optimal graphics settings, gameplay thoughts..."
              className="w-full bg-[#181824] border border-[#2a2a3c] focus:border-rog-red text-xs text-white p-3 rounded-lg outline-none font-sans"
            />
          </div>

          {/* Submit Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#1f1f2e]">
            <button
              type="button"
              onClick={() => {
                playUiClick();
                setIsAddModalOpen(false);
              }}
              className="px-5 py-2 rounded-lg bg-[#181824] hover:bg-[#222232] text-xs font-mono text-gray-300 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-rog-red hover:bg-[#ff1a47] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,51,0.6)] transition-all"
            >
              Save to Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

