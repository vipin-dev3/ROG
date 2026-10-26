import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Key, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Terminal,
  Zap
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { playUiClick, playAuthSuccessSound, playAuthErrorSound } from '../../utils/soundEffects';

export default function LoginPage() {
  const { login } = useRog();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    playUiClick();

    // Simulated authentic biometric / terminal scan delay
    setTimeout(() => {
      const result = login(username, password, rememberMe);
      if (result.success) {
        setIsSuccess(true);
        playAuthSuccessSound();
      } else {
        setIsLoading(false);
        setError(result.error || 'ACCESS REJECTED // INVALID CREDENTIALS');
        playAuthErrorSound();
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden select-none">
      {/* Background Cyber Mesh, Scanline & Ambient ROG Glow */}
      <div className="absolute inset-0 bg-rog-mesh opacity-90 pointer-events-none" />
      <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-rog-red/15 blur-[160px] pointer-events-none rounded-full" />

      {/* Top Header Bar inside Terminal */}
      <div className="relative z-10 w-full max-w-md mb-4 flex items-center justify-between text-[11px] font-mono text-gray-500 border-b border-[#1b1b26] pb-2">
        <span className="flex items-center gap-1.5 text-gray-400">
          <Terminal className="w-3.5 h-3.5 text-rog-red" />
          <span>ARMOURY CRATE // SEC_TERM_v5.8</span>
        </span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          GATEWAY SECURE
        </span>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#101016]/95 border-2 border-[#20202e] hover:border-rog-red/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_25px_rgba(255,0,51,0.25)] transition-all duration-300">
        {/* Corner Tech Brackets */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-rog-red" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-rog-red" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-rog-red" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-rog-red" />

        {/* ROG Eye Emblem & Title */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 flex items-center justify-center mb-3">
            <svg viewBox="0 0 100 100" className="w-14 h-14 fill-rog-red drop-shadow-[0_0_18px_rgba(255,0,51,0.9)] animate-pulse-subtle">
              <path d="M12 48 L76 16 L88 28 L40 68 Z" />
              <path d="M28 58 L72 38 L85 52 L38 85 Z" fill="#ffffff" />
              <path d="M48 68 L82 52 L88 62 L52 88 Z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold font-sans tracking-widest text-white uppercase flex items-center justify-center gap-2">
            <span className="text-rog-red font-display">///</span>
            ARMOURY GATEWAY
          </h1>
          <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">
            SECURITY CLEARANCE LEVEL 5 REQUIRED
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-5 p-3 rounded-lg bg-rog-red/15 border border-rog-red text-rog-red flex items-center space-x-2 text-xs font-mono shadow-[0_0_15px_rgba(255,0,51,0.3)] animate-shake">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Confirmation Box */}
        {isSuccess && (
          <div className="mb-5 p-3 rounded-lg bg-emerald-500/15 border border-emerald-500 text-emerald-400 flex items-center space-x-2 text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>CLEARANCE VERIFIED // DEPLOYING ROG VAULT...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rog-red" />
              <span>Security Identifier</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="Enter identifier..."
                disabled={isLoading || isSuccess}
                className="w-full bg-[#161622] border border-[#28283a] focus:border-rog-red focus:ring-1 focus:ring-rog-red text-sm text-white placeholder-gray-500 rounded-lg pl-3.5 pr-4 py-2.5 outline-none font-sans transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-rog-red" />
              <span>Security Passcode</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter passcode..."
                disabled={isLoading || isSuccess}
                className="w-full bg-[#161622] border border-[#28283a] focus:border-rog-red focus:ring-1 focus:ring-rog-red text-sm text-white placeholder-gray-500 rounded-lg pl-3.5 pr-10 py-2.5 outline-none font-mono transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Option */}
          <div className="flex items-center justify-between pt-1 text-xs font-mono text-gray-400">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-[#1a1a26] border-gray-700 text-rog-red focus:ring-rog-red accent-rog-red cursor-pointer"
              />
              <span>Remember Clearance Session</span>
            </label>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,51,0.5)] active:scale-98 ${
              isSuccess
                ? 'bg-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.7)]'
                : 'bg-rog-red hover:bg-[#ff1a47] text-white hover:shadow-[0_0_30px_rgba(255,0,51,0.8)]'
            } disabled:opacity-70`}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>VERIFYING BIOMETRICS...</span>
              </span>
            ) : isSuccess ? (
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>CLEARANCE ACCEPTED</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <span>AUTHENTICATE & UNLOCK VAULT</span>
              </span>
            )}
          </button>
        </form>

        {/* Footer Security Protocol Note */}
        <div className="mt-6 pt-4 border-t border-[#1c1c28] flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>ROG VAULT PROTOCOL</span>
          <span>AES-256 ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
}
