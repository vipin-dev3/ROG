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
  Maximize2
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

  // Active highlighted isometric node: 'all' | 'reactor' | 'charging' | 'storage' | 'grid' | 'compute'
  const [activeNode, setActiveNode] = useState('compute');
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
              <span>COMMANDER {currentUser?.toUpperCase() || 'DRACULA'}</span>
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

      {/* Top 5 Futuristic KPI Metric Badges (Exact replica of reference header row) */}
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

      {/* Main Grid: Center 3D Digital Twin Isometric Infrastructure + Right Side Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left/Center 8 Columns: 3D Isometric Energy & Computing Infrastructure */}
        <div className={`lg:col-span-8 rounded-2xl border p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all ${
          isLight 
            ? 'bg-white border-slate-200 shadow-md' 
            : 'bg-gradient-to-b from-[#0e131d] via-[#101624] to-[#0c101a] border-[#1d273a] shadow-[0_0_40px_rgba(0,0,0,0.7)]'
        }`}>
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Subheader Title */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#1b2538]">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              <h2 className="text-sm font-bold font-sans tracking-widest uppercase text-white flex items-center gap-2">
                <span className={isLight ? 'text-gray-900' : 'text-white'}>ISOMETRIC DIGITAL TWIN INFRASTRUCTURE MATRIX</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hidden sm:inline">
                  3D TELEMETRY TWIN
                </span>
              </h2>
            </div>
            
            <div className="flex items-center space-x-2 text-[11px] font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-emerald-400 font-bold">ONLINE (52% REACTOR)</span>
            </div>
          </div>

          {/* Isometric SVG Canvas Visualization */}
          <div className="relative z-10 my-4 w-full h-[320px] sm:h-[400px] flex items-center justify-center">
            <svg 
              viewBox="0 0 900 500" 
              className="w-full h-full max-h-[420px] drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow Filters */}
                <filter id="neonGlowCyan" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="neonGlowTurquoise" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="traceGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e5a3" />
                  <stop offset="50%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="plantGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#00e5a3" />
                </linearGradient>
              </defs>

              {/* 3D Isometric Base Ground Grid */}
              <g opacity="0.3" stroke="#1d2a3d" strokeWidth="1">
                {/* Isometric diamond lines */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line 
                    key={`iso-diag-1-${i}`}
                    x1={100 + i * 80} y1="360"
                    x2={450 + i * 40} y2="120" 
                  />
                ))}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line 
                    key={`iso-diag-2-${i}`}
                    x1={800 - i * 80} y1="360" 
                    x2={450 - i * 40} y2="120" 
                  />
                ))}
              </g>

              {/* Glowing Circuit Bus Traces from Central Reactor */}
              {/* Branch 1: Reactor to Charging Station (Left) */}
              <path 
                d="M 230 160 L 230 220 L 290 260 L 250 280" 
                stroke="url(#traceGradCyan)" 
                strokeWidth="3.5" 
                fill="none" 
                strokeDasharray="6,4"
                className="animate-pulse"
              />
              {/* Branch 2: Reactor to Storage Cluster (Center-Top) */}
              <path 
                d="M 250 150 L 360 150 L 400 200" 
                stroke="url(#traceGradCyan)" 
                strokeWidth="3.5" 
                fill="none" 
                strokeDasharray="6,4"
              />
              {/* Branch 3: Storage to Transmission Towers (Right) */}
              <path 
                d="M 440 210 L 530 210 L 580 230" 
                stroke="url(#traceGradCyan)" 
                strokeWidth="3.5" 
                fill="none" 
                strokeDasharray="6,4"
              />
              {/* Branch 4: Storage to Main Silicon Transformer Plant (Bottom-Center) */}
              <path 
                d="M 390 230 L 390 270 L 430 300" 
                stroke="#00e5a3" 
                strokeWidth="4" 
                fill="none" 
                filter="url(#neonGlowCyan)"
              />

              {/* ======================================================== */}
              {/* NODE 1: CENTRAL CIRCULAR REACTOR CORE (Top-Left)         */}
              {/* ======================================================== */}
              <g 
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => { playUiClick(); setActiveNode('reactor'); }}
              >
                {/* Outer animated pulse rings */}
                <ellipse cx="230" cy="150" rx="38" ry="24" fill="none" stroke="#00e5a3" strokeWidth="1.5" opacity="0.4" />
                <ellipse cx="230" cy="150" rx="32" ry="20" fill="none" stroke="#00f0ff" strokeWidth="2" opacity="0.7" filter="url(#neonGlowCyan)" />
                {/* Reactor Core Cylinder */}
                <ellipse cx="230" cy="146" rx="26" ry="16" fill="#0c1724" stroke="#00f0ff" strokeWidth="2.5" />
                <ellipse cx="230" cy="142" rx="22" ry="13" fill="#00f0ff" opacity="0.85" filter="url(#neonGlowTurquoise)" />
                <path d="M 230 132 L 235 141 L 228 143 L 232 153 L 223 144 L 229 142 Z" fill="#ffffff" />

                {/* 52% Pulse Tag */}
                <rect x="180" y="110" width="38" height="20" rx="4" fill="#09101a" stroke="#00f0ff" strokeWidth="1" />
                <text x="199" y="124" fill="#00f0ff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">52%</text>
              </g>

              {/* ======================================================== */}
              {/* NODE 2: CHARGING BAYS / VRM POWER STAGE (Left Bay)       */}
              {/* ======================================================== */}
              <g 
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => { playUiClick(); setActiveNode('charging'); }}
              >
                {/* Ground Platform */}
                <polygon points="180,260 280,260 310,300 210,300" fill="#131a28" stroke={activeNode === 'charging' ? "#00f0ff" : "#1f2d42"} strokeWidth="1.5" />
                
                {/* 4 Isometric Charging Posts */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <g key={`chg-${i}`}>
                    <polygon points={`${200 + i * 22},250 ${208 + i * 22},250 ${208 + i * 22},275 ${200 + i * 22},275`} fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
                    <circle cx={204 + i * 22} cy="254" r="1.5" fill="#00f0ff" />
                  </g>
                ))}

                {/* Floating Tech Tooltip Card */}
                <rect x="110" y="210" width="95" height="38" rx="4" fill="#090e18" stroke="#1f2d44" strokeWidth="1" opacity="0.95" />
                <text x="118" y="224" fill="#94a3b8" fontSize="8" fontFamily="monospace">● VRM POWER</text>
                <text x="118" y="235" fill="#00f0ff" fontSize="10" fontFamily="monospace" fontWeight="bold">175W // 980mV</text>
                <text x="118" y="244" fill="#64748b" fontSize="7" fontFamily="monospace">MAX TGP BOOST</text>
              </g>

              {/* ======================================================== */}
              {/* NODE 3: ENERGY STORAGE CLUSTER / SERVER RACKS (Center)  */}
              {/* ======================================================== */}
              <g 
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => { playUiClick(); setActiveNode('storage'); }}
              >
                {/* Server Battery Bay Platform */}
                <polygon points="350,180 440,180 470,225 380,225" fill="#141c2c" stroke={activeNode === 'storage' ? "#00f0ff" : "#202e47"} strokeWidth="1.5" />
                
                {/* 3 Rows of Server Battery Blocks */}
                {Array.from({ length: 3 }).map((_, r) => (
                  <g key={`rack-r-${r}`}>
                    {Array.from({ length: 3 }).map((_, c) => (
                      <polygon 
                        key={`rack-${r}-${c}`}
                        points={`${375 + c * 24 + r * 6},${185 + r * 10} ${390 + c * 24 + r * 6},${185 + r * 10} ${394 + c * 24 + r * 6},${193 + r * 10} ${379 + c * 24 + r * 6},${193 + r * 10}`}
                        fill="#1e2a3e"
                        stroke="#38bdf8"
                        strokeWidth="0.8"
                      />
                    ))}
                  </g>
                ))}

                {/* Floating Tech Tooltip Card */}
                <rect x="370" y="135" width="105" height="38" rx="4" fill="#090e18" stroke="#1f2d44" strokeWidth="1" opacity="0.95" />
                <text x="378" y="149" fill="#94a3b8" fontSize="8" fontFamily="monospace">● NVMe CLUSTER</text>
                <text x="378" y="160" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">2TB // 7,100 MB/s</text>
                <text x="378" y="169" fill="#64748b" fontSize="7" fontFamily="monospace">GEN4x4 ACTIVE</text>
              </g>

              {/* ======================================================== */}
              {/* NODE 4: TRANSMISSION TOWERS / NEBULA DISPLAY (Right)     */}
              {/* ======================================================== */}
              <g 
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => { playUiClick(); setActiveNode('grid'); }}
              >
                {/* Substation Ground */}
                <polygon points="540,210 650,210 670,260 560,260" fill="#131b2a" stroke={activeNode === 'grid' ? "#00f0ff" : "#1e2c44"} strokeWidth="1.5" />
                
                {/* Isometric Lattice Pylon 1 */}
                <line x1="570" y1="245" x2="570" y2="185" stroke="#475569" strokeWidth="2.5" />
                <line x1="560" y1="205" x2="580" y2="205" stroke="#475569" strokeWidth="1.5" />
                <line x1="563" y1="195" x2="577" y2="195" stroke="#475569" strokeWidth="1.5" />
                <line x1="570" y1="185" x2="560" y2="245" stroke="#334155" strokeWidth="1" />
                <line x1="570" y1="185" x2="580" y2="245" stroke="#334155" strokeWidth="1" />
                
                {/* Isometric Lattice Pylon 2 */}
                <line x1="620" y1="240" x2="620" y2="180" stroke="#475569" strokeWidth="2.5" />
                <line x1="610" y1="200" x2="630" y2="200" stroke="#475569" strokeWidth="1.5" />
                <line x1="620" y1="180" x2="610" y2="240" stroke="#334155" strokeWidth="1" />
                <line x1="620" y1="180" x2="630" y2="240" stroke="#334155" strokeWidth="1" />

                {/* Power Lines connecting pylons */}
                <path d="M 570 185 Q 595 192 620 180" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.75" />

                {/* Floating Tech Tooltip Card */}
                <rect x="580" y="140" width="95" height="38" rx="4" fill="#090e18" stroke="#1f2d44" strokeWidth="1" opacity="0.95" />
                <text x="588" y="154" fill="#94a3b8" fontSize="8" fontFamily="monospace">● NEBULA GRID</text>
                <text x="588" y="165" fill="#00e5a3" fontSize="10" fontFamily="monospace" fontWeight="bold">240Hz G-SYNC</text>
                <text x="588" y="174" fill="#64748b" fontSize="7" fontFamily="monospace">QHD+ 3ms 16:10</text>
              </g>

              {/* ======================================================== */}
              {/* NODE 5: MAIN CORE PLANT (Exact Glowing Neon Box Match)  */}
              {/* ======================================================== */}
              <g 
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => { playUiClick(); setActiveNode('compute'); }}
              >
                {/* Prominent Glowing Neon Turquoise Frame Base (Highlight of the photo!) */}
                <polygon 
                  points="390,265 520,265 550,335 420,335" 
                  fill="#00e5a3" 
                  fillOpacity="0.12" 
                  stroke="#00e5a3" 
                  strokeWidth="3.5" 
                  filter="url(#neonGlowTurquoise)" 
                />

                {/* Raised Plant Block Foundation */}
                <polygon points="410,275 500,275 525,320 435,320" fill="#132030" stroke="#00e5a3" strokeWidth="1.5" />

                {/* Transformer Station Buildings / Heatsink Fin Array */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <g key={`fin-${i}`}>
                    <polygon 
                      points={`${430 + i * 18},265 ${442 + i * 18},265 ${448 + i * 18},295 ${436 + i * 18},295`}
                      fill="#1e2e42"
                      stroke="#00e5a3"
                      strokeWidth="1.2"
                    />
                    <polygon 
                      points={`${442 + i * 18},265 ${448 + i * 18},265 ${448 + i * 18},295 ${442 + i * 18},295`}
                      fill="#0d1b28"
                    />
                  </g>
                ))}

                {/* Main Core CPU / GPU Die on Top */}
                <ellipse cx="468" cy="275" rx="14" ry="8" fill="#00f0ff" opacity="0.9" filter="url(#neonGlowCyan)" />

                {/* Floating Tech Tooltip Card */}
                <rect x="525" y="275" width="115" height="42" rx="4" fill="#090e18" stroke="#00e5a3" strokeWidth="1.5" opacity="0.95" />
                <text x="533" y="290" fill="#00e5a3" fontSize="8" fontFamily="monospace" fontWeight="bold">● CORE PROCESSOR</text>
                <text x="533" y="302" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">i9-13980HX + RTX 4080</text>
                <text x="533" y="312" fill="#64748b" fontSize="7" fontFamily="monospace">24 CORES // 7424 CUDA</text>
              </g>
            </svg>
          </div>

          {/* Interactive Node Selector Pills below the 3D Map */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#1b2538]">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                { id: 'compute', label: 'Main Compute Core', icon: Cpu, color: 'text-emerald-400' },
                { id: 'charging', label: 'VRM Power Stage', icon: BatteryCharging, color: 'text-cyan-400' },
                { id: 'storage', label: 'NVMe Cluster', icon: Database, color: 'text-sky-400' },
                { id: 'grid', label: 'Nebula Display Grid', icon: Radio, color: 'text-teal-400' },
                { id: 'reactor', label: 'Central Reactor', icon: Zap, color: 'text-amber-400' }
              ].map((btn) => {
                const isSelected = activeNode === btn.id;
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.id}
                    onClick={() => {
                      playUiClick();
                      setActiveNode(btn.id);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center space-x-1.5 transition-all ${
                      isSelected
                        ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/60 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : (isLight 
                            ? 'bg-slate-100 text-gray-700 hover:bg-slate-200 border border-slate-200' 
                            : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2a3e]')
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${btn.color}`} />
                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
              <span>STATUS:</span>
              <strong className="text-emerald-400 font-bold">SYNCHRONIZED</strong>
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
                COMMANDER DEPLOYMENT LOG
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

      {/* Bottom Row: 3 Telemetry & Waveform Graph Visualizers (Exact match to bottom strip of photo) */}
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
                <linearGradient id="waveFillGrad" x1="0" y1="0" x2="0" y2="1">
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
