import React, { useRef, useState } from 'react';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Check, 
  Info 
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import RogSlashes from '../common/RogSlashes';
import { playUiClick, playModeSwitchSound } from '../../utils/soundEffects';

export default function SettingsView() {
  const { 
    soundEnabled, 
    setSoundEnabled, 
    games, 
    resetDefaults, 
    systemSpecs 
  } = useRog();

  const [notification, setNotification] = useState('');
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleExportJson = () => {
    playUiClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(games, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `rog_vault_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Vault library exported successfully as JSON.');
  };

  const handleImportJson = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            localStorage.setItem('rog_vault_games', JSON.stringify(parsed));
            window.location.reload();
          } else {
            showToast('Invalid backup file format.');
          }
        } catch {
          showToast('Failed to parse JSON file.');
        }
      };
    }
  };

  const handleReset = () => {
    playUiClick();
    if (window.confirm('Reset all vault library data to factory defaults?')) {
      resetDefaults();
      showToast('Vault restored to default ROG configuration.');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6 select-none">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#1f1f2e] pb-4">
        <div>
          <div className="flex items-center text-xl sm:text-2xl font-bold font-sans tracking-wide text-white">
            <RogSlashes count={3} />
            <span>ARMOURY CRATE PREFERENCES & VAULT SETTINGS</span>
          </div>
          <p className="text-xs font-mono text-gray-400 mt-1">
            CONFIGURATION // REPOSITORY BACKUP // SOUND ENGINE // SYSTEM FIRMWARE
          </p>
        </div>

        {notification && (
          <div className="px-3 py-1.5 rounded bg-rog-red/20 border border-rog-red text-rog-red text-xs font-mono">
            {notification}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: General Preferences */}
        <div className="lg:col-span-6 space-y-5">
          {/* Sound & Audio FX */}
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-rog-red" />
              <span>UI Audio Synthesizer (Web Audio API)</span>
            </h3>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#14141d] border border-[#222232]">
              <div>
                <p className="text-xs font-bold text-gray-200">Cybernetic Interface Audio</p>
                <p className="text-[11px] font-mono text-gray-400">
                  Synthesized mechanical clicks, mode switches, and launcher sounds
                </p>
              </div>

              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) playModeSwitchSound('turbo');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  soundEnabled
                    ? 'bg-rog-red text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]'
                    : 'bg-[#1e1e2c] text-gray-400'
                }`}
              >
                {soundEnabled ? 'ENABLED' : 'MUTED'}
              </button>
            </div>
          </div>

          {/* Backup & Data Management */}
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>Vault Data Persistence (LocalStorage)</span>
            </h3>

            <p className="text-xs text-gray-400 font-sans">
              All added games, playtime hours, personal benchmark notes, and operating profile selections persist locally in your browser storage.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleExportJson}
                className="px-4 py-2.5 bg-[#171722] hover:bg-[#202030] border border-[#2b2b3e] text-xs font-mono text-gray-200 hover:text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export Library JSON</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 bg-[#171722] hover:bg-[#202030] border border-[#2b2b3e] text-xs font-mono text-gray-200 hover:text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Import JSON Backup</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />

              <button
                onClick={handleReset}
                className="px-4 py-2.5 bg-[#1f1214] hover:bg-[#2b1619] border border-rog-red/40 text-xs font-mono text-rog-red rounded-lg flex items-center space-x-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Factory Reset Vault</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: System Specs & Firmware */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-rog-red" />
              <span>Machine Hardware Specifications</span>
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between">
                <span className="text-gray-400">Chassis Model:</span>
                <span className="text-white font-bold">{systemSpecs.modelName}</span>
              </div>
              <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between">
                <span className="text-gray-400">Processor (CPU):</span>
                <span className="text-white truncate max-w-[280px]">{systemSpecs.cpu.model}</span>
              </div>
              <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between">
                <span className="text-gray-400">Graphics (GPU):</span>
                <span className="text-white truncate max-w-[280px]">{systemSpecs.gpu.model}</span>
              </div>
              <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between">
                <span className="text-gray-400">Display Nebula HDR:</span>
                <span className="text-white truncate max-w-[280px]">{systemSpecs.display.panel}</span>
              </div>
              <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between">
                <span className="text-gray-400">Firmware BIOS:</span>
                <span className="text-rog-red font-bold">{systemSpecs.biosVersion}</span>
              </div>
            </div>

            <div className="p-3 bg-[#13131c] rounded-xl border border-[#1f1f2e] text-[11px] font-mono text-gray-400 flex items-center space-x-2">
              <Info className="w-4 h-4 text-rog-red flex-shrink-0" />
              <span>Decoupled configuration file active at <code>src/data/gamesData.js</code>.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

