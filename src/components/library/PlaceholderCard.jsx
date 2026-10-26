import React from 'react';
import { Plus, Disc3, ShieldAlert, Cpu } from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { playUiClick } from '../../utils/soundEffects';

export default function PlaceholderCard({ slot, isPrimaryAdd = false }) {
  const { setIsAddModalOpen } = useRog();

  const handleClick = () => {
    playUiClick();
    setIsAddModalOpen(true);
  };

  if (isPrimaryAdd) {
    return (
      <div
        onClick={handleClick}
        className="group relative bg-[#101016]/60 border-2 border-dashed border-[#2f2f45] hover:border-rog-red rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,0,51,0.4)] flex flex-col items-center justify-center text-center aspect-[16/10] sm:aspect-auto min-h-[280px]"
      >
        {/* Corner Tech Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gray-600 group-hover:border-rog-red transition-colors" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gray-600 group-hover:border-rog-red transition-colors" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gray-600 group-hover:border-rog-red transition-colors" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gray-600 group-hover:border-rog-red transition-colors" />

        {/* Center Glowing Icon */}
        <div className="w-14 h-14 rounded-full bg-[#161622] group-hover:bg-rog-red/20 border border-[#2b2b3d] group-hover:border-rog-red flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(255,0,51,0.6)]">
          <Plus className="w-7 h-7 text-gray-400 group-hover:text-rog-red group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Text cues */}
        <h3 className="mt-4 text-sm font-bold font-sans tracking-wider uppercase text-gray-200 group-hover:text-white">
          + Add Game Slot
        </h3>
        <p className="mt-1 text-xs text-gray-400 font-mono max-w-[200px]">
          Click to register a new title or executable to the Vault
        </p>

        {/* Blank slot indicators */}
        <div className="mt-4 flex items-center space-x-2 text-[10px] font-mono text-gray-500">
          <span className="px-2 py-0.5 rounded bg-[#181824] border border-[#242436] text-gray-400">
            GENRE: UNASSIGNED
          </span>
          <span className="px-2 py-0.5 rounded bg-[#181824] border border-[#242436] text-gray-400">
            0.0 HRS
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="group relative bg-[#0e0e14]/40 border border-[#1b1b26] hover:border-rog-red/60 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,51,0.25)] flex flex-col justify-between min-h-[280px]"
    >
      {/* Top Header of empty slot */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 group-hover:text-rog-red transition-colors">
          SLOT #{slot?.slotNumber || '00'}
        </span>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#161622] text-gray-400 border border-[#242434]">
          READY
        </span>
      </div>

      {/* Center Reticle / Placeholder Artwork Frame */}
      <div className="my-3 py-6 flex flex-col items-center justify-center border border-dashed border-[#20202e] group-hover:border-rog-red/40 rounded-lg bg-[#0b0b10]">
        <div className="w-10 h-10 rounded border border-[#252538] flex items-center justify-center text-gray-600 group-hover:text-rog-red transition-colors">
          <Disc3 className="w-5 h-5 animate-spin-slow opacity-60" />
        </div>
        <p className="mt-2 text-xs font-semibold text-gray-400 group-hover:text-gray-200 tracking-wide font-sans">
          {slot?.titlePrompt || "Vacant Vault Slot"}
        </p>
        <p className="text-[10px] font-mono text-gray-400 text-center px-4 mt-0.5">
          {slot?.sectorCode || "AWAITING GAME ALLOCATION"}
        </p>
      </div>

      {/* Bottom Placeholder Tags */}
      <div className="pt-2 border-t border-[#181824] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span>PLAYTIME: -- HRS</span>
        <span className="text-rog-red group-hover:underline">+ REGISTER</span>
      </div>
    </div>
  );
}

