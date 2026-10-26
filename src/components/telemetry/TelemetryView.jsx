import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Flame, 
  Thermometer, 
  Zap, 
  Gauge, 
  HardDrive, 
  Fan, 
  RefreshCw 
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import RogSlashes from '../common/RogSlashes';

export default function TelemetryView() {
  const { telemetry, systemSpecs, operatingMode, currentModeConfig } = useRog();

  // Simulated live graph history
  const [history, setHistory] = useState(() => 
    Array.from({ length: 18 }, () => ({
      cpu: Math.floor(Math.random() * 30 + 20),
      gpu: Math.floor(Math.random() * 30 + 15),
      temp: Math.floor(Math.random() * 15 + 55)
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setHistory(prev => {
        const next = [...prev.slice(1)];
        next.push({
          cpu: telemetry.cpuUsage,
          gpu: telemetry.gpuUsage,
          temp: telemetry.cpuTemp
        });
        return next;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [telemetry]);

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6 select-none">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#1f1f2e] pb-4">
        <div>
          <div className="flex items-center text-xl sm:text-2xl font-bold font-sans tracking-wide text-white">
            <RogSlashes count={3} />
            <span>SYSTEM USAGE & HARDWARE TELEMETRY</span>
          </div>
          <p className="text-xs font-mono text-gray-400 mt-1">
            REAL-TIME SENSORS // ACTIVE PROFILE: <span className="text-rog-red font-bold uppercase">{operatingMode}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-[#121218] px-3 py-1.5 rounded-lg border border-[#222230]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>POLLING AT 1000Hz</span>
        </div>
      </div>

      {/* Real-time Hardware Wave Graph */}
      <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="text-white font-bold flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rog-red" /> CPU Utilization ({telemetry.cpuUsage}%)
            </span>
            <span className="text-gray-400 flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#00f0ff]" /> GPU Load ({telemetry.gpuUsage}%)
            </span>
          </div>
          <span className="text-[11px] font-mono text-gray-400">HISTORY // LAST 30 SECONDS</span>
        </div>

        {/* SVG Live Wave Chart */}
        <div className="relative h-44 w-full bg-[#0b0b10] rounded-xl border border-[#1a1a24] p-3 flex items-end justify-between overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-rows-4 w-full h-full opacity-15 pointer-events-none">
            <div className="border-b border-gray-600" />
            <div className="border-b border-gray-600" />
            <div className="border-b border-gray-600" />
            <div className="border-b border-gray-600" />
          </div>

          {/* Bar chart points */}
          {history.map((point, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full px-1 z-10">
              <div
                className="w-full bg-rog-red rounded-t-sm opacity-80 hover:opacity-100 transition-all duration-300"
                style={{ height: `${point.cpu}%` }}
                title={`CPU: ${point.cpu}%`}
              />
              <div
                className="w-full bg-[#00f0ff] opacity-60 hover:opacity-100 transition-all duration-300 mt-0.5"
                style={{ height: `${point.gpu * 0.7}%` }}
                title={`GPU: ${point.gpu}%`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sensor Deep Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Thermal Overview */}
        <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-white font-sans font-bold">
            <Thermometer className="w-5 h-5 text-rog-red" />
            <span>THERMAL SENSORS</span>
          </div>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>CPU Package:</span>
              <span className="text-white font-bold">{telemetry.cpuTemp} °C</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>GPU Core:</span>
              <span className="text-white font-bold">{telemetry.gpuTemp} °C</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>GPU Hot Spot:</span>
              <span className="text-rog-red font-bold">{telemetry.gpuTemp + 9} °C</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>M.2 SSD Gen4:</span>
              <span className="text-gray-200">42 °C</span>
            </div>
          </div>
        </div>

        {/* ROG Intelligent Cooling */}
        <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-white font-sans font-bold">
            <Fan className="w-5 h-5 text-cyan-400" />
            <span>FAN ACOUSTICS & SPEED</span>
          </div>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>CPU Arc Flow Fan:</span>
              <span className="text-cyan-400 font-bold">{telemetry.fanCpuRpm} RPM</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>GPU Arc Flow Fan:</span>
              <span className="text-cyan-400 font-bold">{telemetry.fanGpuRpm} RPM</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>Sound Pressure:</span>
              <span className="text-white font-bold">{telemetry.fanDba}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Chamber:</span>
              <span className="text-emerald-400">Vapor Chamber Active</span>
            </div>
          </div>
        </div>

        {/* Power & Frequency */}
        <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-white font-sans font-bold">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>POWER DELIVERY</span>
          </div>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>GPU TGP Draw:</span>
              <span className="text-amber-400 font-bold">{telemetry.gpuTgp} W</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>CPU Voltage:</span>
              <span className="text-white font-bold">{telemetry.cpuVoltage} mV</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 border-b border-[#181824] pb-2">
              <span>Power Source:</span>
              <span className="text-white font-bold">330W ROG Power Adapter</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Battery:</span>
              <span className="text-emerald-400">100% (Bypass Charging)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

