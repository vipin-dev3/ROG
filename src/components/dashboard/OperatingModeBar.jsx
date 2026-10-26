import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Feather, 
  Gauge, 
  Rocket, 
  Wrench,
  Sliders
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import RogSlashes from '../common/RogSlashes';
import { playUiClick } from '../../utils/soundEffects';

export default function OperatingModeBar({ onOpenManualModal }) {
  const { operatingMode, setOperatingMode, operatingModes, currentModeConfig, theme } = useRog();
  const isLight = theme === 'light';

  const iconMap = {
    LayoutGrid: LayoutGrid,
    Feather: Feather,
    Gauge: Gauge,
    Rocket: Rocket,
    Wrench: Wrench
  };

  return (
    <div className="flex flex-col space-y-2.5 select-none pt-2">
      {/* Header: /// Operating Mode with [Edit Manual Mode] button */}
      <div className="flex items-center justify-between">
        <div className={`flex items-center text-sm font-bold tracking-wide ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>
          <RogSlashes count={3} />
          <span>Operating Mode</span>
        </div>

        <button
          onClick={() => {
            playUiClick();
            if (onOpenManualModal) onOpenManualModal();
          }}
          className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all duration-200 flex items-center space-x-1 ${
            isLight 
              ? 'text-gray-700 hover:text-gray-900 bg-slate-100 hover:bg-slate-200 border border-slate-300' 
              : 'text-gray-300 hover:text-white bg-[#14141c] hover:bg-[#1c1c28] border border-[#2b2b3a] hover:border-rog-red/80'
          }`}
        >
          <Sliders className="w-3 h-3 text-rog-red" />
          <span>Edit Manual Mode</span>
        </button>
      </div>

      {/* Modes Bar Container matching the screenshot */}
      <div className="bg-[#101016]/95 border border-[#1e1e2c] rounded-xl p-1.5 flex items-center justify-between">
        {operatingModes.map((mode) => {
          const isActive = operatingMode === mode.id;
          const Icon = iconMap[mode.icon] || LayoutGrid;

          return (
            <button
              key={mode.id}
              onClick={() => setOperatingMode(mode.id)}
              className={`relative flex-1 py-3 px-2 flex flex-col items-center justify-center space-y-1.5 transition-all duration-200 rounded-lg group ${
                isActive
                  ? (isLight ? 'text-gray-900 font-bold' : 'text-white')
                  : (isLight ? 'text-gray-500 hover:text-gray-900 hover:bg-slate-100' : 'text-gray-400 hover:text-gray-200 hover:bg-[#161622]/60')
              }`}
            >
              {/* Icon */}
              <Icon 
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,0,51,0.8)]' : 'group-hover:scale-105'
                }`}
                style={{
                  color: isActive 
                    ? (mode.id === 'turbo' ? '#ff0033' : mode.accentColor) 
                    : (isLight ? '#64748b' : undefined)
                }}
              />

              {/* Mode Name */}
              <span className={`text-xs tracking-wider font-sans ${isActive ? 'font-bold' : 'font-semibold'}`}>
                {mode.label}
              </span>

              {/* Active Red Underline Bar */}
              {isActive ? (
                <div 
                  className="w-10 h-[3px] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,0,51,0.9)]"
                  style={{ backgroundColor: mode.accentColor }}
                />
              ) : (
                <div className="w-10 h-[3px] bg-transparent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Mode Quick Status Description */}
      <div className={`flex items-center justify-between px-2 text-[11px] font-mono ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
        <span className={isLight ? 'text-gray-800 font-bold' : 'text-gray-500'}>PROFILE:</span>
        <span className={`${isLight ? 'text-gray-700 font-medium' : 'text-gray-300'} truncate max-w-[420px]`}>
          {currentModeConfig.description}
        </span>
      </div>
    </div>
  );
}

