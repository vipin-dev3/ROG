/**
 * Web Audio API synthesizer for ROG Armoury Crate UI sound effects.
 * 100% self-contained without needing external audio files.
 */

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted) {
  isMuted = muted;
}

export function getMuted() {
  return isMuted;
}

/**
 * Clean subtle cyber mechanical click
 */
export function playUiClick() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Graceful fallback if audio blocked
  }
}

/**
 * ROG Armoury Crate Operating Mode change sound
 */
export function playModeSwitchSound(modeId) {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;

    if (modeId === 'turbo') {
      // Roaring overdrive frequency sweep
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.22);
      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    } else if (modeId === 'silent') {
      // Gentle soft tone
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.exponentialRampToValueAtTime(260, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    } else {
      // Performance / Windows crisp cyber chime
      osc1.type = 'square';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(650, now);
      osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    }

    osc1.connect(gain);
    if (modeId === 'turbo' || modeId === 'performance') {
      osc2.connect(gain);
    }
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.3);
    if (modeId === 'turbo' || modeId === 'performance') {
      osc2.start(now);
      osc2.stop(now + 0.3);
    }
  } catch {
    // audio fallback
  }
}

/**
 * Game launch sound: dramatic sub bass drop + electronic laser sweep
 */
export function playGameLaunchSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub Bass
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(180, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.45);
    subGain.gain.setValueAtTime(0.2, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    // Laser sweep
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweepOsc.type = 'sawtooth';
    sweepOsc.frequency.setValueAtTime(1200, now + 0.05);
    sweepOsc.frequency.exponentialRampToValueAtTime(2400, now + 0.25);
    sweepGain.gain.setValueAtTime(0.08, now + 0.05);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    sweepOsc.connect(sweepGain);
    sweepGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.5);
    sweepOsc.start(now + 0.05);
    sweepOsc.stop(now + 0.35);
  } catch {
    // fallback
  }
}

