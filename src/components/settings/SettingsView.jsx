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
  Info,
  LogOut,
  UserCheck,
  Edit2,
  Edit3,
  Save,
  X,
  Laptop
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import RogSlashes from '../common/RogSlashes';
import { playUiClick, playModeSwitchSound } from '../../utils/soundEffects';

export default function SettingsView() {
  const { 
    soundEnabled, 
    setSoundEnabled, 
    games, 
    importLibrary,
    resetDefaults, 
    systemSpecs,
    updateSystemSpecs,
    resetSystemSpecs,
    currentUser,
    updateCurrentUser,
    logout
  } = useRog();

  const [notification, setNotification] = useState('');
  const fileInputRef = useRef(null);

  // Hardware Specs Edit State
  const [isEditingSpecs, setIsEditingSpecs] = useState(false);
  const [specsForm, setSpecsForm] = useState({
    modelName: systemSpecs.modelName || '',
    subTitle: systemSpecs.subTitle || '',
    cpuModel: systemSpecs.cpu?.model || '',
    gpuModel: systemSpecs.gpu?.model || '',
    displayPanel: systemSpecs.display?.panel || '',
    ram: systemSpecs.memory?.installedRam || '',
    storage: systemSpecs.storage?.drive || '',
    bios: systemSpecs.biosVersion || ''
  });

  // User Call Sign / Alias Edit State
  const [isEditingAlias, setIsEditingAlias] = useState(false);
  const [aliasInput, setAliasInput] = useState(currentUser || 'Dracula');

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleStartEditSpecs = () => {
    playUiClick();
    setSpecsForm({
      modelName: systemSpecs.modelName || '',
      subTitle: systemSpecs.subTitle || '',
      cpuModel: systemSpecs.cpu?.model || '',
      gpuModel: systemSpecs.gpu?.model || '',
      displayPanel: systemSpecs.display?.panel || '',
      ram: systemSpecs.memory?.installedRam || '',
      storage: systemSpecs.storage?.drive || '',
      bios: systemSpecs.biosVersion || ''
    });
    setIsEditingSpecs(true);
  };

  const handleSaveSpecs = (e) => {
    e.preventDefault();
    playUiClick();
    updateSystemSpecs({
      modelName: specsForm.modelName,
      subTitle: specsForm.subTitle,
      cpu: { model: specsForm.cpuModel },
      gpu: { model: specsForm.gpuModel },
      display: { panel: specsForm.displayPanel },
      memory: { installedRam: specsForm.ram },
      storage: { drive: specsForm.storage },
      biosVersion: specsForm.bios
    });
    setIsEditingSpecs(false);
    showToast('Machine hardware specifications updated successfully.');
  };

  const handleRestoreSpecs = () => {
    playUiClick();
    resetSystemSpecs();
    setIsEditingSpecs(false);
    showToast('Specifications restored to ROG Strix SCAR 16 factory defaults.');
  };

  const handleSaveAlias = (e) => {
    e.preventDefault();
    playUiClick();
    if (aliasInput.trim()) {
      updateCurrentUser(aliasInput.trim());
      setIsEditingAlias(false);
      showToast('Commander call sign updated.');
    }
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
            importLibrary(parsed);
            showToast(`Imported ${parsed.length} titles into vault library.`);
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
    if (window.confirm('Reset all vault library data, specs, and settings to factory defaults?')) {
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
            HARDWARE SPECIFICATIONS // VAULT PERSISTENCE // SOUND ENGINE // SECURITY
          </p>
        </div>

        {notification && (
          <div className="px-3.5 py-1.5 rounded-lg bg-rog-red/20 border border-rog-red text-rog-red text-xs font-mono shadow-[0_0_15px_rgba(255,0,51,0.3)]">
            {notification}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: General Preferences & Security */}
        <div className="lg:col-span-6 space-y-5">
          {/* Audio Synthesizer */}
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-rog-red" />
              <span>UI Audio Synthesizer (Web Audio API)</span>
            </h3>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#14141d] border border-[#222232]">
              <div>
                <p className="text-xs font-bold text-gray-200">Cybernetic Interface Audio</p>
                <p className="text-[11px] font-mono text-gray-400">
                  Synthesized mechanical clicks, mode sweeps, and launcher audio
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

          {/* Security Clearance & Call Sign */}
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security Clearance & Session</span>
              </h3>

              {!isEditingAlias && (
                <button
                  onClick={() => {
                    playUiClick();
                    setIsEditingAlias(true);
                  }}
                  className="text-xs font-mono text-rog-red hover:underline flex items-center space-x-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Call Sign</span>
                </button>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#14141d] border border-[#222232] space-y-3">
              {!isEditingAlias ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-200 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>COMMANDER {currentUser?.toUpperCase() || 'DRACULA'}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        LEVEL 5 CLEARANCE
                      </span>
                    </p>
                    <p className="text-[11px] font-mono text-gray-400 mt-1">
                      Authenticated Single-User Gateway // Active Session
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playUiClick();
                      logout();
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#1e1e2a] hover:bg-rog-red text-gray-300 hover:text-white border border-[#2b2b3c] hover:border-transparent flex items-center space-x-1.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveAlias} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={aliasInput}
                    onChange={(e) => setAliasInput(e.target.value)}
                    placeholder="Enter Commander Call Sign"
                    className="flex-1 bg-[#1a1a28] border border-[#2e2e42] focus:border-rog-red text-xs text-white px-3 py-1.5 rounded-lg outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-rog-red text-white text-xs font-mono rounded-lg hover:bg-[#ff1a47]"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingAlias(false)}
                    className="px-2.5 py-1.5 bg-[#1e1e2c] text-gray-300 text-xs font-mono rounded-lg"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Backup & Data Persistence */}
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>Vault Data Persistence (LocalStorage)</span>
            </h3>

            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              All added games, edits, custom telemetry profiles, and machine settings persist locally in your browser storage across all 13 titles.
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

        {/* Right Side: Machine Hardware Specifications (Editable) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-[#101016] border border-[#1e1e2c] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold font-sans tracking-wide text-white uppercase flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-rog-red" />
                <span>Machine Hardware Specifications</span>
              </h3>

              {!isEditingSpecs ? (
                <button
                  onClick={handleStartEditSpecs}
                  className="px-3 py-1 rounded bg-[#1b1b28] hover:bg-rog-red text-gray-200 hover:text-white border border-[#2e2e42] hover:border-transparent text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-rog-red" />
                  <span>Edit Specs</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingSpecs(false)}
                    className="px-2.5 py-1 bg-[#1a1a26] text-gray-300 text-xs font-mono rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRestoreSpecs}
                    className="px-2.5 py-1 bg-[#251518] border border-rog-red/30 text-rog-red text-xs font-mono rounded hover:bg-[#35181c]"
                  >
                    Reset Defaults
                  </button>
                </div>
              )}
            </div>

            {!isEditingSpecs ? (
              /* View Specifications */
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between items-center">
                  <span className="text-gray-400">Chassis Model:</span>
                  <span className="text-white font-bold">{systemSpecs.modelName}</span>
                </div>
                <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between items-center">
                  <span className="text-gray-400">Processor (CPU):</span>
                  <span className="text-white truncate max-w-[280px]">{systemSpecs.cpu?.model}</span>
                </div>
                <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between items-center">
                  <span className="text-gray-400">Graphics (GPU):</span>
                  <span className="text-white truncate max-w-[280px]">{systemSpecs.gpu?.model}</span>
                </div>
                <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between items-center">
                  <span className="text-gray-400">Display Panel:</span>
                  <span className="text-white truncate max-w-[280px]">{systemSpecs.display?.panel}</span>
                </div>
                <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between items-center">
                  <span className="text-gray-400">System Memory:</span>
                  <span className="text-white truncate max-w-[280px]">{systemSpecs.memory?.installedRam}</span>
                </div>
                <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between items-center">
                  <span className="text-gray-400">Primary Storage:</span>
                  <span className="text-white truncate max-w-[280px]">{systemSpecs.storage?.drive}</span>
                </div>
                <div className="p-2.5 rounded bg-[#14141d] border border-[#20202e] flex justify-between items-center">
                  <span className="text-gray-400">Firmware BIOS:</span>
                  <span className="text-rog-red font-bold">{systemSpecs.biosVersion}</span>
                </div>
              </div>
            ) : (
              /* Edit Specifications Form */
              <form onSubmit={handleSaveSpecs} className="space-y-3 text-xs font-mono">
                <div>
                  <label className="block text-gray-400 uppercase mb-1">Chassis Model</label>
                  <input
                    type="text"
                    value={specsForm.modelName}
                    onChange={(e) => setSpecsForm({ ...specsForm, modelName: e.target.value })}
                    className="w-full bg-[#181824] border border-[#2e2e42] focus:border-rog-red text-white px-3 py-1.5 rounded-lg outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 uppercase mb-1">Processor (CPU)</label>
                  <input
                    type="text"
                    value={specsForm.cpuModel}
                    onChange={(e) => setSpecsForm({ ...specsForm, cpuModel: e.target.value })}
                    className="w-full bg-[#181824] border border-[#2e2e42] focus:border-rog-red text-white px-3 py-1.5 rounded-lg outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 uppercase mb-1">Graphics Card (GPU)</label>
                  <input
                    type="text"
                    value={specsForm.gpuModel}
                    onChange={(e) => setSpecsForm({ ...specsForm, gpuModel: e.target.value })}
                    className="w-full bg-[#181824] border border-[#2e2e42] focus:border-rog-red text-white px-3 py-1.5 rounded-lg outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 uppercase mb-1">Display Panel</label>
                  <input
                    type="text"
                    value={specsForm.displayPanel}
                    onChange={(e) => setSpecsForm({ ...specsForm, displayPanel: e.target.value })}
                    className="w-full bg-[#181824] border border-[#2e2e42] focus:border-rog-red text-white px-3 py-1.5 rounded-lg outline-none font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 uppercase mb-1">System Memory</label>
                    <input
                      type="text"
                      value={specsForm.ram}
                      onChange={(e) => setSpecsForm({ ...specsForm, ram: e.target.value })}
                      className="w-full bg-[#181824] border border-[#2e2e42] focus:border-rog-red text-white px-3 py-1.5 rounded-lg outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 uppercase mb-1">BIOS Version</label>
                    <input
                      type="text"
                      value={specsForm.bios}
                      onChange={(e) => setSpecsForm({ ...specsForm, bios: e.target.value })}
                      className="w-full bg-[#181824] border border-[#2e2e42] focus:border-rog-red text-white px-3 py-1.5 rounded-lg outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingSpecs(false)}
                    className="px-4 py-2 bg-[#1b1b26] text-gray-300 rounded-lg hover:bg-[#252538]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rog-red hover:bg-[#ff1a47] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(255,0,51,0.5)] flex items-center space-x-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Specifications</span>
                  </button>
                </div>
              </form>
            )}

            <div className="p-3 bg-[#13131c] rounded-xl border border-[#1f1f2e] text-[11px] font-mono text-gray-400 flex items-center space-x-2">
              <Info className="w-4 h-4 text-rog-red flex-shrink-0" />
              <span>Live hardware specifications synchronize with Dashboard and Telemetry views.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
