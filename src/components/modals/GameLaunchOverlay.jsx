import React, { useState, useEffect } from 'react';
import { X, Play, CheckCircle2, ShieldCheck, Flame, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRog } from '../../context/RogContext';
import { playUiClick } from '../../utils/soundEffects';
import RogVLogo from '../common/RogVLogo';

export default function GameLaunchOverlay() {
  const { activeLaunchingGame, setActiveLaunchingGame, logHours } = useRog();
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLaunched, setIsLaunched] = useState(false);

  const steps = [
    "INITIALIZING ARMOURY CRATE GPU DRIVERS...",
    "ENGAGING ROG INTELLIGENT COOLING & FAN CURVES...",
    "APPLYING AURA SYNC RGB PROFILE...",
    "SETTING NEBULA DISPLAY TO 240Hz G-SYNC ULTRA...",
    "DISPATCHING HIGH PRIORITY CPU CORES...",
    "EXECUTING TARGET APPLICATION..."
  ];

  useEffect(() => {
    if (!activeLaunchingGame) {
      setProgress(0);
      setStepIndex(0);
      setIsLaunched(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLaunched(true);
          // Celebration confetti
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#ff0033', '#ffffff', '#ff007f']
            });
          } catch {}
          return 100;
        }
        const next = prev + 12;
        if (next > 20 && next <= 40) setStepIndex(1);
        if (next > 40 && next <= 60) setStepIndex(2);
        if (next > 60 && next <= 80) setStepIndex(3);
        if (next > 80 && next < 100) setStepIndex(4);
        if (next >= 100) setStepIndex(5);
        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [activeLaunchingGame]);

  if (!activeLaunchingGame) return null;

  const handleClose = () => {
    playUiClick();
    if (isLaunched) {
      logHours(activeLaunchingGame.id, 0.2);
    }
    setActiveLaunchingGame(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-rog-mesh opacity-40 pointer-events-none" />
      <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />

      {/* Main HUD Window */}
      <div className="relative w-full max-w-xl bg-[#0f0f16] border-2 border-rog-red rounded-2xl shadow-[0_0_60px_rgba(255,0,51,0.5)] p-6 text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-[#1f1f2e] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ROG V Emblem */}
        <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
          <RogVLogo className="w-14 h-14 animate-pulse-subtle" glow={true} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold font-sans text-white uppercase tracking-wider">
          {activeLaunchingGame.title}
        </h2>
        <p className="text-xs font-mono text-gray-400 mt-1">
          PLATFORM: {activeLaunchingGame.platform} // PROFILE: {activeLaunchingGame.profileMode || 'TURBO'}
        </p>

        {/* Progress & Status Step */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-rog-red font-semibold tracking-wider">
              {steps[stepIndex]}
            </span>
            <span className="text-white font-bold">{progress}%</span>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="w-full bg-[#181824] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#2b2b3e]">
            <div
              className="h-full rog-telemetry-bar rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Launched Success State */}
        {isLaunched && (
          <div className="mt-6 pt-5 border-t border-[#1e1e2d] space-y-4">
            <div className="flex items-center justify-center space-x-2 text-emerald-400 text-sm font-bold font-mono">
              <CheckCircle2 className="w-5 h-5" />
              <span>GAME SESSION ACTIVE & OPTIMIZED</span>
            </div>
            <p className="text-xs font-mono text-gray-400 max-w-sm mx-auto">
              Armoury Crate telemetry is actively monitoring thermals and boosting GPU clocks in background.
            </p>

            <button
              onClick={handleClose}
              className="px-8 py-2.5 bg-rog-red hover:bg-[#ff1a47] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,51,0.6)] transition-all"
            >
              Return to Armoury Crate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

