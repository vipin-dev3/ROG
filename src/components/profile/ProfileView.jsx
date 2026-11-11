import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Server, 
  BatteryCharging, 
  Radio, 
  Gauge, 
  BarChart3, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle2, 
  User, 
  Clock, 
  Flame, 
  Layers, 
  Sliders, 
  Database,
  ArrowUpRight,
  Eye,
  EyeOff,
  Maximize2,
  Scan,
  Fan,
  Wifi,
  Sparkles
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import RogSlashes from '../common/RogSlashes';
import RogVLogo from '../common/RogVLogo';
import { playUiClick } from '../../utils/soundEffects';

export default function ProfileView() {
  const { 
    currentUser, 
    systemSpecs, 
    telemetry, 
    operatingMode, 
    games, 
    auraColor, 
    theme 
  } = useRog();

  const isLight = theme === 'light';

  // Active highlighted district: 'all' | 'cpu' | 'gpu' | 'zephyrus' | 'cooling' | 'dimm' | 'radar'
  const [activeDistrict, setActiveDistrict] = useState('all');
  const [showHudOverlays, setShowHudOverlays] = useState(true);
  const [pulseTick, setPulseTick] = useState(0);

  // Periodic simulated micro-variations for live charts & gauges
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick(prev => (prev + 1) % 100);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const totalHours = games.reduce((acc, g) => acc + (parseFloat(g.hoursPlayed) || 0), 0).toFixed(0);
  const completedCount = games.filter(g => g.status === 'Completed').length;

  const districts = [
    {
      id: 'cpu',
      name: 'ROG Neural Core',
      subtitle: 'Central Processor Nexus',
      icon: Cpu,
      color: '#00e5a3',
      badge: 'i9-13980HX',
      top: '46%',
      left: '48%',
      details: {
        spec: 'Intel Core i9-13980HX (24 Cores / 32 Threads)',
        metric1: `${telemetry.cpuClock || 4792} MHz Boost`,
        metric2: `${telemetry.cpuTemp || 62}°C Liquid Metal`,
        status: '100% Health // Zero Throttling'
      }
    },
    {
      id: 'gpu',
      name: 'GPU Generator Substation',
      subtitle: 'Discrete Graphics Array',
      icon: Zap,
      color: '#00f0ff',
      badge: 'RTX 4080',
      top: '80%',
      left: '49%',
      details: {
        spec: 'NVIDIA GeForce RTX 4080 Laptop GPU @ 12GB GDDR6',
        metric1: '175W Peak TGP (Dynamic Boost)',
        metric2: '7424 CUDA Cores // DLSS 3.5',
        status: '240Hz G-SYNC Ultra Synchronization'
      }
    },
    {
      id: 'zephyrus',
      name: 'Zephyrus Cyber Sector',
      subtitle: 'Vapor Chamber Heatsink',
      icon: ShieldCheck,
      color: '#38bdf8',
      badge: '0dB CHASSIS',
      top: '56%',
      left: '26%',
      details: {
        spec: 'Extended Vapor Chamber Thermal Dissipation',
        metric1: '0dB Ambient Whisper Acoustics',
        metric2: 'Full Motherboard Component Coverage',
        status: 'Active Passive/Dynamic Cooling'
      }
    },
    {
      id: 'cooling',
      name: 'Cool Pipe Radiator',
      subtitle: 'Dual Arc Flow Fans',
      icon: Fan,
      color: '#10b981',
      badge: '84 BLADES',
      top: '23%',
      left: '64%',
      details: {
        spec: 'Dual 84-Blade Arc Flow Fans & Heatpipes',
        metric1: `${telemetry.fanCpuRpm || 3800} RPM Exhaust Flow`,
        metric2: `${telemetry.fanDba || '32.4'} dBA Pressure Level`,
        status: 'Anti-Dust Self-Cleaning Tunnels Active'
      }
    },
    {
      id: 'dimm',
      name: 'DIMM Memory Grid',
      subtitle: 'High-Density RAM & Capacitors',
      icon: Database,
      color: '#a855f7',
      badge: '32GB DDR5',
      top: '64%',
      left: '68%',
      details: {
        spec: '32.0 GB DDR5-4800 MHz (2 x 16GB Dual Channel)',
        metric1: '4800 MT/s Low Latency Bus',
        metric2: 'Solid Polymer Capacitor Array',
        status: 'Quad-Channel Sub-channel Bandwidth'
      }
    },
    {
      id: 'radar',
      name: 'Aura Radar Uplink',
      subtitle: 'Omnidirectional RF Transceiver',
      icon: Radio,
      color: '#00e5a3',
      badge: 'WI-FI 6E',
      top: '11%',
      left: '42%',
      details: {
        spec: 'Tri-Band Wi-Fi 6E (802.11ax) + Bluetooth 5.3',
        metric1: '2.4GHz Ultra-Low Latency RF Link',
        metric2: 'Aura Sync Spectrum Controller',
        status: 'Deep Space Satellite Telemetry Online'
      }
    }
  ];

  return (
    <div className="p-3 sm:p-5 max-w-[1720px] mx-auto space-y-4 sm:space-y-5 select-none">
      {/* Top Command Matrix Ribbon */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
        isLight 
          ? 'bg-white border-slate-200 shadow-sm text-gray-900' 
          : 'bg-[#0f131c]/95 border-[#1e2738] shadow-[0_0_30px_rgba(0,240,255,0.04)] text-white'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <RogVLogo className="w-7 h-7" glow={true} accentColor="#00f0ff" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#00f0ff] uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                DIGITAL TWIN MATRIX // COMMAND CENTER
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-[#182030] border-[#25334d] text-cyan-300'
              }`}>
                ARMOURY v5.8.2
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-wide uppercase flex items-center gap-2 mt-0.5">
              <span>{currentUser?.toUpperCase() || 'DRACULA'}</span>
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                CLEARANCE LEVEL 5
              </span>
            </h1>
          </div>
        </div>

        {/* Station Readout & Live Clock */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
          <div className={`px-3 py-1.5 rounded border flex items-center space-x-2 ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#141b28] border-[#222e44] text-gray-300'
          }`}>
            <span className="text-gray-400">STATION:</span>
            <span className="font-bold text-[#00f0ff]">{systemSpecs.modelName}</span>
          </div>

          <div className={`px-3 py-1.5 rounded border flex items-center space-x-2 ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#141b28] border-[#222e44] text-gray-300'
          }`}>
            <span className="text-gray-400">PROFILE:</span>
            <span className="font-bold uppercase text-emerald-400">{operatingMode}</span>
          </div>

          <div className={`px-3 py-1.5 rounded border flex items-center space-x-2 ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#141b28] border-[#222e44] text-gray-300'
          }`}>
            <Activity className="w-3.5 h-3.5 text-rog-red animate-pulse" />
            <span className="font-bold text-gray-200">2026.11.11 // 10:00:00</span>
          </div>
        </div>
      </div>

      {/* Top 5 Futuristic KPI Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Metric 1: Total Power Output */}
        <div className={`p-3 sm:p-3.5 rounded-xl border flex items-center space-x-3 transition-all hover:border-[#00e5a3]/60 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#101522]/90 border-[#1c263a]'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-[#00e5a3]/15 border border-[#00e5a3]/40 flex items-center justify-center text-[#00e5a3] shadow-[0_0_12px_rgba(0,229,163,0.3)]">
            <Zap className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider truncate flex items-center gap-1">
              <span>Grid Output</span>
              <span className="text-[9px] text-[#00e5a3] font-bold">●</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1">
              <span className={isLight ? 'text-gray-900' : 'text-white'}>1,054,792</span>
              <span className="text-[10px] text-gray-400 font-normal">W</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Peak Frequency Vector */}
        <div className={`p-3 sm:p-3.5 rounded-xl border flex items-center space-x-3 transition-all hover:border-[#00f0ff]/60 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#101522]/90 border-[#1c263a]'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/15 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.3)]">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider truncate flex items-center gap-1">
              <span>Peak Vector</span>
              <span className="text-[9px] text-[#00f0ff] font-bold">●</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1">
              <span className={isLight ? 'text-gray-900' : 'text-white'}>{telemetry.cpuClock || 4792}</span>
              <span className="text-[10px] text-gray-400 font-normal">MHz</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Bus Data Throughput */}
        <div className={`p-3 sm:p-3.5 rounded-xl border flex items-center space-x-3 transition-all hover:border-[#38bdf8]/60 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#101522]/90 border-[#1c263a]'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-[#38bdf8]/15 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.3)]">
            <Database className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider truncate flex items-center gap-1">
              <span>Memory Bus</span>
              <span className="text-[9px] text-[#38bdf8] font-bold">●</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1">
              <span className={isLight ? 'text-gray-900' : 'text-white'}>4,792</span>
              <span className="text-[10px] text-gray-400 font-normal">MB/s</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Thermal Dissipation Flux */}
        <div className={`p-3 sm:p-3.5 rounded-xl border flex items-center space-x-3 transition-all hover:border-[#10b981]/60 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#101522]/90 border-[#1c263a]'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-[#10b981]/15 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <Flame className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider truncate flex items-center gap-1">
              <span>Thermal Flux</span>
              <span className="text-[9px] text-[#10b981] font-bold">●</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1">
              <span className={isLight ? 'text-gray-900' : 'text-white'}>792</span>
              <span className="text-[10px] text-gray-400 font-normal">BTU/h</span>
            </div>
          </div>
        </div>

        {/* Metric 5: Compute Operations Matrix */}
        <div className={`col-span-2 sm:col-span-1 p-3 sm:p-3.5 rounded-xl border flex items-center space-x-3 transition-all hover:border-[#00f0ff]/60 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#101522]/90 border-[#1c263a]'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/15 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.3)]">
            <Gauge className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider truncate flex items-center gap-1">
              <span>Ops Matrix</span>
              <span className="text-[9px] text-[#00f0ff] font-bold">●</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1">
              <span className={isLight ? 'text-gray-900' : 'text-white'}>43,054,792</span>
              <span className="text-[10px] text-gray-400 font-normal">TFLOPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: 3D ROG Motherboard Cyber-City + Right Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left/Center 8 Columns: Photorealistic 3D ROG Motherboard Cyber-City with Interactive Hotspots */}
        <div className={`lg:col-span-8 rounded-2xl border p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all ${
          isLight 
            ? 'bg-white border-slate-200 shadow-md' 
            : 'bg-gradient-to-b from-[#0e131d] via-[#101624] to-[#0c101a] border-[#1d273a] shadow-[0_0_40px_rgba(0,0,0,0.7)]'
        }`}>
          {/* Top Title & Interactive Controls */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#1b2538]">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              <h2 className="text-sm font-bold font-sans tracking-widest uppercase text-white flex items-center gap-2">
                <span className={isLight ? 'text-gray-900' : 'text-white'}>ISOMETRIC DIGITAL TWIN INFRASTRUCTURE MATRIX</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hidden sm:inline">
                  3D ROG MOTHERBOARD CITY
                </span>
              </h2>
            </div>
            
            <div className="flex items-center space-x-3 text-[11px] font-mono">
              <button
                onClick={() => {
                  playUiClick();
                  setShowHudOverlays(!showHudOverlays);
                }}
                className={`px-2 py-1 rounded flex items-center space-x-1.5 border transition-colors ${
                  showHudOverlays 
                    ? 'bg-[#00f0ff]/15 border-[#00f0ff]/40 text-[#00f0ff]' 
                    : 'bg-[#141b2a] border-[#1e2a3e] text-gray-400 hover:text-white'
                }`}
                title="Toggle Holographic HUD Markers"
              >
                {showHudOverlays ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span className="hidden sm:inline">HUD {showHudOverlays ? 'ACTIVE' : 'MUTED'}</span>
              </button>

              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>ONLINE (52% REACTOR)</span>
              </div>
            </div>
          </div>

          {/* Central 3D Cyber Motherboard City Canvas with Holographic HUD Hotspots */}
          <div className="relative z-10 my-3 w-full rounded-xl overflow-hidden border border-[#1e2a3d] bg-[#090d15] shadow-[0_0_50px_rgba(0,0,0,0.9)] group">
            {/* The 3D ROG Motherboard Cyber-City Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[1024/568] overflow-hidden">
              <img 
                src="./assets/rog-cyber-city.jpg" 
                alt="ROG Motherboard Cyber City 3D Digital Twin" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] filter brightness-95 group-hover:brightness-100"
              />

              {/* Edge Vignette & Cyber Blue Atmosphere Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d15]/90 via-transparent to-[#090d15]/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090d15]/50 via-transparent to-[#090d15]/50 pointer-events-none" />

              {/* Holographic Hotspot Markers & Tooltips */}
              {showHudOverlays && districts.map((district) => {
                const isSelected = activeDistrict === district.id;
                const Icon = district.icon;

                return (
                  <div
                    key={district.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/marker"
                    style={{ top: district.top, left: district.left }}
                    onClick={() => {
                      playUiClick();
                      setActiveDistrict(activeDistrict === district.id ? 'all' : district.id);
                    }}
                  >
                    {/* Pulsing Beacon Ring */}
                    <div className="relative flex items-center justify-center">
                      <span 
                        className="absolute w-8 h-8 rounded-full animate-ping opacity-60"
                        style={{ backgroundColor: district.color }}
                      />
                      <span 
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border shadow-lg transition-transform duration-300 ${
                          isSelected ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                        }`}
                        style={{ 
                          backgroundColor: '#0c121e', 
                          borderColor: district.color,
                          boxShadow: `0 0 15px ${district.color}`
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: district.color }} />
                      </span>
                    </div>

                    {/* Holographic Callout HUD Tooltip Card */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 sm:w-64 p-2.5 rounded-lg border backdrop-blur-md shadow-2xl transition-all duration-300 pointer-events-none font-mono ${
                      isSelected 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95 group-hover/marker:opacity-100 group-hover/marker:scale-100'
                    }`}
                    style={{
                      backgroundColor: 'rgba(9, 14, 24, 0.95)',
                      borderColor: district.color,
                      boxShadow: `0 0 20px rgba(0, 240, 255, 0.35)`
                    }}>
                      <div className="flex items-center justify-between border-b pb-1.5 mb-1.5" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: district.color }} />
                          <span className="text-[11px] font-bold uppercase text-white truncate">{district.name}</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: `${district.color}25`, color: district.color }}>
                          {district.badge}
                        </span>
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div className="text-gray-300 font-medium truncate">{district.details.spec}</div>
                        <div className="flex items-center justify-between text-gray-400">
                          <span className="text-white font-bold">{district.details.metric1}</span>
                          <span style={{ color: district.color }}>{district.details.metric2}</span>
                        </div>
                        <div className="text-[9px] text-emerald-400 pt-0.5 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{district.details.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Overlay Status Bar within the 3D City */}
            <div className="px-3 py-2 bg-[#0a0f1a]/95 border-t border-[#1a2538] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="flex items-center gap-1.5 text-[#00f0ff]">
                  <Scan className="w-3.5 h-3.5" />
                  <span>3D MOTHERBOARD VISUALIZER</span>
                </span>
                <span className="hidden sm:inline text-gray-500">•</span>
                <span className="hidden sm:inline text-gray-400">240 FPS REAL-TIME TWIN</span>
              </div>

              <div className="flex items-center space-x-2 text-[11px]">
                <span className="text-gray-400">FOCUS:</span>
                <span className="font-bold text-[#00e5a3] uppercase">
                  {activeDistrict === 'all' ? 'All Sectors Active' : districts.find(d => d.id === activeDistrict)?.name}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive District Selector Buttons below the 3D City */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1b2538]">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  playUiClick();
                  setActiveDistrict('all');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center space-x-1.5 transition-all ${
                  activeDistrict === 'all'
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/60 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : (isLight 
                        ? 'bg-slate-100 text-gray-700 hover:bg-slate-200 border border-slate-200' 
                        : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2a3e]')
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>All Sectors</span>
              </button>

              {districts.map((d) => {
                const isSelected = activeDistrict === d.id;
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      playUiClick();
                      setActiveDistrict(d.id);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center space-x-1.5 transition-all ${
                      isSelected
                        ? 'border shadow-md'
                        : (isLight 
                            ? 'bg-slate-100 text-gray-700 hover:bg-slate-200 border border-slate-200' 
                            : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2a3e]')
                    }`}
                    style={isSelected ? {
                      backgroundColor: `${d.color}25`,
                      color: d.color,
                      borderColor: d.color,
                      boxShadow: `0 0 12px ${d.color}40`
                    } : {}}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: d.color }} />
                    <span>{d.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
              <span>TWIN MATRIX:</span>
              <strong className="text-emerald-400 font-bold">CALIBRATED</strong>
            </span>
          </div>
        </div>

        {/* Right 4 Columns: Resource Analytics & Hierarchy (Matches right panel of reference photo) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Resource Consumption Analysis (Hierarchical Ranked Bars) */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#101522]/95 border-[#1c263a]'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2538] mb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-[#00f0ff]" />
                <h3 className={`text-xs font-bold font-sans tracking-wider uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  RESOURCE HIERARCHY ANALYSIS
                </h3>
              </div>
              <span className="text-[10px] font-mono text-gray-400">REAL-TIME</span>
            </div>

            {/* 4 Ranked Multi-tier Progress Bars */}
            <div className="space-y-3 font-mono">
              {/* Rank 1: GPU Tensor Compute (Cyan Bar) */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 flex items-center justify-center text-[10px] font-bold">
                      1
                    </span>
                    <span className={isLight ? 'text-gray-800' : 'text-gray-200'}>GPU Tensor Vector</span>
                  </div>
                  <span className="text-[#00f0ff] font-bold">1254.79</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#182133] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00e5a3] shadow-[0_0_8px_rgba(0,240,255,0.7)] transition-all duration-700"
                    style={{ width: `${88 + (pulseTick % 5)}%` }}
                  />
                </div>
              </div>

              {/* Rank 2: CPU Multithread Scheduler (Sky Blue Bar) */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40 flex items-center justify-center text-[10px] font-bold">
                      2
                    </span>
                    <span className={isLight ? 'text-gray-800' : 'text-gray-200'}>CPU Core Director</span>
                  </div>
                  <span className="text-[#38bdf8] font-bold">1154.79</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#182133] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#00f0ff] shadow-[0_0_8px_rgba(56,189,248,0.7)] transition-all duration-700"
                    style={{ width: `${76 + (pulseTick % 4)}%` }}
                  />
                </div>
              </div>

              {/* Rank 3: DDR5 Memory Bus (Amber / Yellow Bar) */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 flex items-center justify-center text-[10px] font-bold">
                      3
                    </span>
                    <span className={isLight ? 'text-gray-800' : 'text-gray-200'}>DDR5 Memory Bus</span>
                  </div>
                  <span className="text-[#f59e0b] font-bold">1054.79</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#182133] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] shadow-[0_0_8px_rgba(245,158,11,0.7)] transition-all duration-700"
                    style={{ width: `${64 + (pulseTick % 3)}%` }}
                  />
                </div>
              </div>

              {/* Rank 4: PCIe Gen4 I/O Channel (Violet Bar) */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/40 flex items-center justify-center text-[10px] font-bold">
                      4
                    </span>
                    <span className={isLight ? 'text-gray-800' : 'text-gray-200'}>PCIe NVMe Pipeline</span>
                  </div>
                  <span className="text-[#a855f7] font-bold">1054.79</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#182133] overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#a855f7] to-[#c084fc] shadow-[0_0_8px_rgba(168,85,247,0.7)] transition-all duration-700"
                    style={{ width: `${52 + (pulseTick % 4)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Operational Yield Matrix (4 KPI Tiles) */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#101522]/95 border-[#1c263a]'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2538] mb-3">
              <h3 className={`text-xs font-bold font-sans tracking-wider uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                OPERATIONAL EFFICIENCY MATRIX
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">99.8% STABLE</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b2a] border-[#1e2a3e]'}`}>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a3]" />
                  <span>Yield Factor</span>
                </div>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>1,054.792</div>
              </div>

              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b2a] border-[#1e2a3e]'}`}>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                  <span>Offset kgCO2</span>
                </div>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>43,054.792</div>
              </div>

              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b2a] border-[#1e2a3e]'}`}>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                  <span>Flux Index</span>
                </div>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>1,054.792</div>
              </div>

              <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b2a] border-[#1e2a3e]'}`}>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                  <span>Stability Index</span>
                </div>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>43,054.792</div>
              </div>
            </div>
          </div>

          {/* Card 3: Vault Master Summary */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#101522]/95 border-[#1c263a]'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#1b2538] mb-3">
              <h3 className={`text-xs font-bold font-sans tracking-wider uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                DRACULA DEPLOYMENT LOG
              </h3>
              <span className="text-[10px] font-mono text-rog-red font-bold">ARMOURY SYNC</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Vault Titles:</span>
                <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{games.length} Games</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Completed Games:</span>
                <span className="font-bold text-emerald-400">{completedCount} Titles (100% Rate)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Logged Game Playtime:</span>
                <span className="font-bold text-rog-red">{totalHours} Hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Security Clearance:</span>
                <span className="font-bold text-[#00f0ff]">Level 5 Authorized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: 3 Telemetry & Waveform Graph Visualizers */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Widget 1: Station Envelopes & Counters (Left 3 cols) */}
        <div className={`md:col-span-3 p-4 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#101522]/95 border-[#1c263a]'
        }`}>
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00e5a3]" />
            <h4 className={`text-xs font-bold font-sans tracking-wider uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
              PROJECT PARAMETERS
            </h4>
          </div>

          <div className="space-y-3 font-mono">
            <div className={`p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 flex items-center justify-between`}>
              <span>SCAR-16 STATION 234100</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className={`p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b28] border-[#1e2a3e]'}`}>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>100</div>
                <div className="text-[9px] text-gray-400">Primary kW</div>
              </div>
              <div className={`p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b28] border-[#1e2a3e]'}`}>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>1,000</div>
                <div className="text-[9px] text-gray-400">Clock Boost</div>
              </div>
              <div className={`p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b28] border-[#1e2a3e]'}`}>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>500</div>
                <div className="text-[9px] text-gray-400">Peak Watts</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className={`p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b28] border-[#1e2a3e]'}`}>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>200</div>
                <div className="text-[9px] text-gray-400">FPS Avg</div>
              </div>
              <div className={`p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141b28] border-[#1e2a3e]'}`}>
                <div className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>320</div>
                <div className="text-[9px] text-gray-400">GB/s Bandwidth</div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget 2: Electricity Generation Trend Waveform (Middle-Left 3 cols) */}
        <div className={`md:col-span-3 p-4 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#101522]/95 border-[#1c263a]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#00f0ff]" />
              <h4 className={`text-xs font-bold font-sans tracking-wider uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                POWER WAVEFORM TREND
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#00f0ff] font-bold">11:25 (+3.8%)</span>
          </div>

          {/* SVG Smooth Waveform Area Chart */}
          <div className="w-full h-32 relative">
            <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="waveFillGrad" x1="0%" y1="0%" x2="0%" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="300" y2="30" stroke="#1c2738" strokeDasharray="3,3" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#1c2738" strokeDasharray="3,3" />
              <line x1="0" y1="90" x2="300" y2="90" stroke="#1c2738" strokeDasharray="3,3" />

              {/* Wave Area Fill */}
              <path 
                d="M 0 80 Q 50 70 80 85 T 160 75 T 220 50 T 260 40 T 300 65 L 300 120 L 0 120 Z" 
                fill="url(#waveFillGrad)" 
              />

              {/* Wave Outline */}
              <path 
                d="M 0 80 Q 50 70 80 85 T 160 75 T 220 50 T 260 40 T 300 65" 
                fill="none" 
                stroke="#00f0ff" 
                strokeWidth="2.5" 
                filter="url(#neonGlowCyan)"
              />

              {/* Peak Marker Tooltip */}
              <circle cx="260" cy="40" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
              <rect x="225" y="10" width="70" height="20" rx="3" fill="#0d1420" stroke="#f59e0b" strokeWidth="0.8" />
              <text x="260" y="24" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">175W PEAK</text>
            </svg>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Widget 3: Multi-Phase Operating Power Curves (Middle-Right 3 cols) */}
        <div className={`md:col-span-3 p-4 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#101522]/95 border-[#1c263a]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
              <h4 className={`text-xs font-bold font-sans tracking-wider uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                MULTI-PHASE VECTOR CURVES
              </h4>
            </div>
            <div className="flex items-center space-x-1.5 text-[9px] font-mono">
              <span className="w-2 h-0.5 bg-[#00f0ff]" />
              <span className="w-2 h-0.5 bg-[#38bdf8]" />
              <span className="w-2 h-0.5 bg-[#f59e0b]" />
              <span className="w-2 h-0.5 bg-[#ef4444]" />
            </div>
          </div>

          {/* Multi-line Smooth Chart */}
          <div className="w-full h-32 relative">
            <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
              {/* Curve 1: Cyan (Main bus) */}
              <path d="M 0 65 Q 80 65 140 45 T 300 45" fill="none" stroke="#00f0ff" strokeWidth="2" />
              {/* Curve 2: Blue (Secondary) */}
              <path d="M 0 75 Q 80 75 140 60 T 300 58" fill="none" stroke="#38bdf8" strokeWidth="2" />
              {/* Curve 3: Amber (Thermal response) */}
              <path d="M 0 95 Q 100 95 160 80 T 300 78" fill="none" stroke="#f59e0b" strokeWidth="2" />
              {/* Curve 4: Red (Peak load threshold) */}
              <path d="M 0 110 Q 120 110 180 95 T 300 95" fill="none" stroke="#ef4444" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
            <span>PHASE 1</span>
            <span>PHASE 2</span>
            <span>PHASE 3</span>
            <span>PHASE 4</span>
          </div>
        </div>

        {/* Widget 4: Spectral Frequency Bar Chart (Right 3 cols) */}
        <div className={`md:col-span-3 p-4 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-[#101522]/95 border-[#1c263a]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Gauge className="w-3.5 h-3.5 text-[#00e5a3]" />
              <h4 className={`text-xs font-bold font-sans tracking-wider uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                SPECTRAL HARMONICS
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#00e5a3] font-bold">240Hz SYNC</span>
          </div>

          {/* Equalizer Frequency Bars */}
          <div className="w-full h-32 flex items-end justify-between gap-1 px-1">
            {[32, 45, 60, 85, 40, 55, 75, 95, 65, 80, 50, 70, 90, 60, 40, 30].map((height, i) => {
              const liveHeight = Math.min(100, Math.max(15, height + ((pulseTick + i * 3) % 15) - 7));
              return (
                <div key={`bar-${i}`} className="flex-1 flex flex-col items-center gap-1 group">
                  <div 
                    className="w-full rounded-t transition-all duration-300 bg-gradient-to-t from-[#00e5a3]/40 to-[#00f0ff] shadow-[0_0_6px_rgba(0,240,255,0.4)]"
                    style={{ height: `${liveHeight}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
            <span>30Hz</span>
            <span>60Hz</span>
            <span>120Hz</span>
            <span>240Hz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
