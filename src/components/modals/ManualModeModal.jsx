import React, { useState } from 'react';
import { X, Sliders, Cpu, Zap, Wind, Check } from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { playUiClick } from '../../utils/soundEffects';

export default function ManualModeModal({ isOpen, onClose }) {
  const { setOperatingMode } = useRog();

  const [pl1Power, setPl1Power] = useState(85);
  const [pl2Power, setPl2Power] = useState(135);
  const [gpuClockOffset, setGpuClockOffset] = useState(100);
  const [vramClockOffset, setVramClockOffset] = useState(150);
  const [fanProfile, setFanProfile] = useState('Aggressive');

  if (!isOpen) return null;

  const handleApply = () => {
    playUiClick();
    setOperatingMode('manual');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-xl bg-[#111118] border border-[#2b2b3f] rounded-2xl shadow-[0_0_50px_rgba(255,170,0,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f2e] bg-[#161624]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-amber-500 transform -skew-x-[20deg]" />
            <h2 className="text-base font-bold font-sans tracking-wide text-white uppercase">
              MANUAL POWER & FAN TUNING // ARMOURY CRATE
            </h2>
          </div>

          <button
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-amber-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs font-mono">
          {/* CPU Power Limits */}
          <div className="bg-[#151520] p-4 rounded-xl border border-[#222232] space-y-3">
            <div className="flex items-center space-x-2 text-white font-sans font-bold">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>CPU POWER LIMITS (PL1 / PL2)</span>
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>CPU PL1 (Sustained):</span>
                <span className="text-amber-400 font-bold">{pl1Power} W</span>
              </div>
              <input
                type="range"
                min="45"
                max="125"
                value={pl1Power}
                onChange={(e) => setPl1Power(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>CPU PL2 (Short Burst):</span>
                <span className="text-amber-400 font-bold">{pl2Power} W</span>
              </div>
              <input
                type="range"
                min="75"
                max="175"
                value={pl2Power}
                onChange={(e) => setPl2Power(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* GPU Overclock Offsets */}
          <div className="bg-[#151520] p-4 rounded-xl border border-[#222232] space-y-3">
            <div className="flex items-center space-x-2 text-white font-sans font-bold">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>GPU OVERCLOCK OFFSET</span>
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>GPU Core Clock Offset:</span>
                <span className="text-amber-400 font-bold">+{gpuClockOffset} MHz</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                step="10"
                value={gpuClockOffset}
                onChange={(e) => setGpuClockOffset(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>GPU VRAM Clock Offset:</span>
                <span className="text-amber-400 font-bold">+{vramClockOffset} MHz</span>
              </div>
              <input
                type="range"
                min="0"
                max="400"
                step="25"
                value={vramClockOffset}
                onChange={(e) => setVramClockOffset(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Fan Curve Profile */}
          <div className="bg-[#151520] p-4 rounded-xl border border-[#222232] space-y-2">
            <div className="flex items-center space-x-2 text-white font-sans font-bold mb-2">
              <Wind className="w-4 h-4 text-amber-400" />
              <span>FAN CURVE PRESET</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['Stealth', 'Balanced', 'Aggressive'].map((prof) => (
                <button
                  key={prof}
                  type="button"
                  onClick={() => { playUiClick(); setFanProfile(prof); }}
                  className={`py-2 rounded-lg text-center font-mono transition-all ${
                    fanProfile === prof
                      ? 'bg-amber-500 text-black font-bold shadow-[0_0_12px_rgba(255,170,0,0.5)]'
                      : 'bg-[#1b1b28] text-gray-300 hover:bg-[#252538]'
                  }`}
                >
                  {prof}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#191924] hover:bg-[#222232] text-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded-lg shadow-[0_0_15px_rgba(255,170,0,0.6)] flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply & Switch to Manual</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

