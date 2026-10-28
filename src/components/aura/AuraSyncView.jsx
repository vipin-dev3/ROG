import React from 'react';
import { 
  Palette, 
  Lightbulb, 
  Activity, 
  Zap, 
  RefreshCw, 
  Sliders, 
  Sun,
  Shield,
  Mouse,
  Keyboard,
  Headphones,
  Monitor
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { AURA_EFFECTS } from '../../data/gamesData';
import RogSlashes from '../common/RogSlashes';
import { playUiClick } from '../../utils/soundEffects';

const PALETTE = [
  { name: 'ROG Crimson', hex: '#ff0033' },
  { name: 'Cyber Cyan', hex: '#00f0ff' },
  { name: 'Neon Purple', hex: '#a855f7' },
  { name: 'Toxic Lime', hex: '#22c55e' },
  { name: 'Solar Amber', hex: '#f59e0b' },
  { name: 'Glacier White', hex: '#ffffff' }
];

export default function AuraSyncView() {
  const { 
    auraEffect, 
    setAuraEffect, 
    auraColor, 
    setAuraColor, 
    auraBrightness, 
    setAuraBrightness,
    devices 
  } = useRog();

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6 select-none">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#1f1f2e] pb-4">
        <div>
          <div className="flex items-center text-xl sm:text-2xl font-bold font-sans tracking-wide text-white">
            <RogSlashes count={3} />
            <span>AURA SYNC RGB LIGHTING CONTROL</span>
          </div>
          <p className="text-xs font-mono text-gray-400 mt-1">
            PER-KEY RGB & UNDERGLOW CHASSIS SYNCHRONIZATION // HARDWARE LEVEL CONTROLLER
          </p>
        </div>

        {/* Live Aura Color Indicator */}
        <div className="flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#121218] border border-[#222230]">
          <span 
            className="w-3.5 h-3.5 rounded-full transition-colors duration-300 shadow-[0_0_10px_var(--glow)]"
            style={{ backgroundColor: auraColor, '--glow': auraColor }}
          />
          <span className="text-gray-200 uppercase">{auraColor}</span>
        </div>
      </div>

      {/* Main Control Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Lighting Effects & Color Selection */}
        <div className="lg:col-span-8 space-y-5">
          {/* Effects Grid */}
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
              <Palette className="w-4 h-4 text-rog-red" />
              <span>Basic & Dynamic Lighting Effects</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AURA_EFFECTS.map((effect) => {
                const isActive = auraEffect === effect.id;
                return (
                  <button
                    key={effect.id}
                    onClick={() => {
                      playUiClick();
                      setAuraEffect(effect.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
                      isActive
                        ? 'bg-[#181826] border-rog-red shadow-[0_0_15px_rgba(255,0,51,0.3)] text-white'
                        : 'bg-[#12121a] border-[#222232] text-gray-400 hover:text-gray-200 hover:bg-[#161622]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-sans uppercase tracking-wider">
                        {effect.name}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-rog-red shadow-[0_0_8px_rgba(255,0,51,0.9)]" />
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-gray-400">
                      {effect.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Palette Selector */}
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-rog-red" />
              <span>Aura Color Palette</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {PALETTE.map((item) => {
                const isSelected = auraColor.toLowerCase() === item.hex.toLowerCase();
                return (
                  <button
                    key={item.hex}
                    onClick={() => {
                      playUiClick();
                      setAuraColor(item.hex);
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                      isSelected
                        ? 'border-white bg-[#1a1a28] shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                        : 'border-[#222232] bg-[#12121a] hover:border-gray-500'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full shadow-lg"
                      style={{ 
                        backgroundColor: item.hex,
                        boxShadow: isSelected ? `0 0 16px ${item.hex}` : undefined
                      }}
                    />
                    <span className="text-[11px] font-mono font-medium text-gray-300">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Brightness Slider */}
            <div className="pt-4 border-t border-[#1a1a26] space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-gray-400" />
                  LED Brightness
                </span>
                <span className="text-white font-bold">{auraBrightness}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={auraBrightness}
                onChange={(e) => setAuraBrightness(Number(e.target.value))}
                className="w-full accent-rog-red cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Synchronized Peripherals Status */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Aura Sync Devices ({devices.length})</span>
            </h3>

            <div className="space-y-2.5">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="p-3 rounded-xl bg-[#14141d] border border-[#222232] flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">{device.name}</h4>
                    <p className="text-[10px] font-mono text-gray-400 mt-0.5">{device.status}</p>
                  </div>

                  <div 
                    className="w-3 h-3 rounded-full shadow-[0_0_8px_var(--glow)] transition-colors duration-500"
                    style={{ backgroundColor: auraColor, '--glow': auraColor }}
                  />
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#13131c] rounded-xl border border-[#1f1f2e] text-[11px] font-mono text-gray-400">
              <p>⚡ All connected ROG peripherals are synchronizing lighting cycles at 60 FPS.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

