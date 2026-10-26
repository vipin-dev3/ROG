import React, { useState } from 'react';
import { 
  Laptop, 
  Settings2, 
  ChevronUp, 
  ChevronDown, 
  Plus, 
  Mouse, 
  Keyboard, 
  Headphones, 
  Monitor,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import RogSlashes from '../common/RogSlashes';
import { playUiClick } from '../../utils/soundEffects';

export default function LaptopView() {
  const { systemSpecs, devices, setDevices, setActiveTab, auraColor, operatingMode } = useRog();
  const [devicesExpanded, setDevicesExpanded] = useState(true);

  const deviceIcons = {
    Mouse: Mouse,
    Keyboard: Keyboard,
    Headphones: Headphones,
    Monitor: Monitor
  };

  const toggleDevice = (id) => {
    playUiClick();
    setDevices(prev => prev.map(dev => {
      if (dev.id === id) {
        const isConn = dev.status.includes('Connected');
        return {
          ...dev,
          status: isConn ? 'Disconnected' : 'Connected (2.4GHz Aura Sync)'
        };
      }
      return dev;
    }));
  };

  const connectedCount = devices.filter(d => d.status.includes('Connected')).length;

  return (
    <div className="flex flex-col space-y-5 select-none">
      {/* View Title */}
      <h1 className="text-2xl font-bold font-sans tracking-wide text-white flex items-center">
        Home
      </h1>

      {/* Futuristic Laptop Render & Specs */}
      <div className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-[#111118]/80 to-[#0c0c10]/90 border border-[#1e1e2c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden group">
        {/* Subtle Ambient Glow behind laptop corresponding to Aura Sync / Operating Mode */}
        <div 
          className="absolute -top-10 w-3/4 h-36 blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: auraColor }}
        />

        {/* 3D / Cyberpunk Laptop Illustration */}
        <div className="relative w-full max-w-[380px] h-[220px] flex items-center justify-center">
          {/* Laptop Lid & Screen */}
          <div className="relative w-[300px] h-[170px] bg-[#14141d] rounded-t-lg border-2 border-[#2b2b3a] shadow-2xl overflow-hidden flex flex-col justify-between p-2">
            {/* Screen Bezel & Camera */}
            <div className="flex justify-center items-center w-full">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600 ring-1 ring-black/40" />
            </div>

            {/* ROG Screen Display Wallpaper */}
            <div className="relative w-full h-[142px] bg-gradient-to-br from-[#0c0a18] via-[#1a0b1e] to-[#0a0a0e] rounded overflow-hidden flex flex-col items-center justify-center border border-[#ff0033]/30">
              {/* Wallpaper Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#ff0033_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />
              
              {/* Animated Scanline */}
              <div className="absolute inset-0 scanline-overlay opacity-30" />

              {/* ROG Logo on Screen */}
              <div className="relative z-10 flex flex-col items-center">
                <svg viewBox="0 0 100 100" className="w-12 h-12 fill-rog-red drop-shadow-[0_0_12px_rgba(255,0,51,0.9)] animate-pulse-subtle">
                  <path d="M12 48 L76 16 L88 28 L40 68 Z" />
                  <path d="M28 58 L72 38 L85 52 L38 85 Z" fill="#ffffff" />
                  <path d="M48 68 L82 52 L88 62 L52 88 Z" />
                </svg>
                <span className="font-display font-black text-white text-xs tracking-[0.25em] mt-1 drop-shadow-md">
                  ROG STRIX
                </span>
                <span className="text-[8px] font-mono text-gray-400 tracking-widest uppercase">
                  FOR THOSE WHO DARE
                </span>
              </div>
            </div>
          </div>

          {/* Laptop Base / Keyboard Chassis with Angle Perspective */}
          <div className="absolute -bottom-1 w-[340px] h-[34px] bg-gradient-to-r from-[#171722] via-[#242436] to-[#171722] rounded-b-xl border-t border-[#3a3a4d] shadow-[0_12px_28px_rgba(0,0,0,0.85)] flex flex-col justify-end px-4 pb-1">
            {/* Illuminated Per-Key RGB Keyboard Deck */}
            <div className="w-full h-3 bg-[#0f0f15] rounded-t flex items-center justify-around px-2 border-b border-[#2a2a3a]">
              {Array.from({ length: 18 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-2.5 h-1.5 rounded-[1px] transition-colors duration-500"
                  style={{
                    backgroundColor: i % 2 === 0 ? auraColor : '#00f0ff',
                    boxShadow: `0 0 4px ${i % 2 === 0 ? auraColor : '#00f0ff'}`
                  }}
                />
              ))}
            </div>

            {/* Glowing Chassis Edge Lightbar */}
            <div 
              className="w-full h-[3px] rounded-full transition-all duration-700 shadow-[0_2px_12px_rgba(255,0,51,0.9)]"
              style={{
                backgroundColor: auraColor,
                boxShadow: `0 0 10px ${auraColor}, 0 2px 14px ${auraColor}`
              }}
            />
          </div>

          {/* Underglow on Table */}
          <div 
            className="absolute -bottom-3 w-[360px] h-3 blur-md rounded-full transition-all duration-700 opacity-60"
            style={{ backgroundColor: auraColor }}
          />
        </div>

        {/* Laptop Title & Hardware Specs */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold font-sans tracking-widest text-white uppercase flex items-center justify-center gap-2">
            <span className="text-rog-red font-display tracking-normal">///</span>
            {systemSpecs.modelName}
          </h2>
          
          <div className="mt-1 space-y-0.5 text-xs text-gray-400 font-mono">
            <p className="truncate max-w-[340px]">{systemSpecs?.cpu?.model || 'Intel Core i9 Processor'}</p>
            <p className="truncate max-w-[340px] text-gray-400">{systemSpecs?.gpu?.model || 'NVIDIA GeForce RTX GPU'}</p>
          </div>

          {/* System Settings Button */}
          <button
            onClick={() => {
              playUiClick();
              setActiveTab('settings');
            }}
            className="mt-3 inline-flex items-center space-x-2 px-8 py-1.5 bg-[#171720] hover:bg-[#1f1f2c] border border-[#2e2e42] hover:border-rog-red text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-white rounded transition-all duration-200 group"
          >
            <Settings2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-rog-red group-hover:rotate-45 transition-transform duration-300" />
            <span>System Settings</span>
          </button>
        </div>
      </div>

      {/* Devices Section (Matching the screenshot with '/// Devices (0)' header and dashed box) */}
      <div className="rounded-xl bg-[#101016]/90 border border-[#1e1e2a] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm font-bold tracking-wide text-gray-200">
            <RogSlashes count={3} />
            <span>Devices ({connectedCount})</span>
          </div>

          <button
            onClick={() => {
              playUiClick();
              setDevicesExpanded(!devicesExpanded);
            }}
            className="text-xs text-gray-400 hover:text-white flex items-center space-x-1 transition-colors"
          >
            <span>{devicesExpanded ? 'Collapse' : 'View All'}</span>
            {devicesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Device Content */}
        {devicesExpanded && (
          <div className="space-y-2">
            {connectedCount === 0 ? (
              /* Dashed Empty Box matching screenshot */
              <div className="border border-dashed border-[#2b2b3c] rounded-lg p-5 flex flex-col items-center justify-center text-center bg-[#0d0d12]/50">
                <div className="w-12 h-12 rounded border border-[#2b2b3a] flex items-center justify-center mb-2">
                  <Plus className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-xs font-medium text-gray-300">No Devices Connected</p>
                <p className="text-[11px] text-gray-500 mt-1 max-w-[260px]">
                  Ensure that the devices are connected properly. For the latest ASUS products, visit{' '}
                  <span className="text-rog-red hover:underline cursor-pointer">ASUS official</span>.
                </p>
              </div>
            ) : (
              /* Connected Device Cards with Aura Sync indicator */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {devices.map((device) => {
                  const Icon = deviceIcons[device.type] || Mouse;
                  const isConnected = device.status.includes('Connected');

                  return (
                    <div
                      key={device.id}
                      onClick={() => toggleDevice(device.id)}
                      className={`p-2.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isConnected
                          ? 'bg-[#151520] border-[#2c2c3e] hover:border-rog-red/60'
                          : 'bg-[#0f0f15]/50 border-[#1a1a24] opacity-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 overflow-hidden">
                        <div className={`p-2 rounded bg-[#1d1d2b] ${isConnected ? 'text-rog-red' : 'text-gray-500'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-gray-200 truncate">{device.name}</p>
                          <p className="text-[10px] font-mono text-gray-400">
                            {device.battery ? `Battery: ${device.battery}` : device.pollingRate || device.refreshRate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        {isConnected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                        )}
                        <span className="text-[10px] font-mono text-gray-400">
                          {isConnected ? 'SYNC' : 'OFF'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

