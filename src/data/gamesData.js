/**
 * ROG GAMING VAULT - CENTRAL DATA ARCHITECTURE
 * Decoupled data source for games, system specs, operating profiles, and hardware telemetry.
 * All items can be easily updated, added, or cleared.
 */

export const ROG_SYSTEM_SPECS = {
  modelName: "ROG STRIX SCAR 16",
  subTitle: "G634JZ // REPUBLIC OF GAMERS",
  cpu: {
    model: "Intel(R) Core(TM) i9-13980HX CPU @ 2.50GHz",
    cores: "24 Cores (8P + 16E) / 32 Threads",
    baseClock: "2.20 GHz",
    boostClock: "5.60 GHz",
    l3Cache: "36 MB Intel Smart Cache",
    voltageDefault: "1171 mV"
  },
  gpu: {
    model: "NVIDIA GeForce RTX 4080 Laptop GPU @ 12GB GDDR6",
    tgpMax: "175 W",
    cudaCores: "7424",
    vram: "12288 MB GDDR6 (192-bit)",
    driverVersion: "551.86 Game Ready WHQL"
  },
  memory: {
    installedRam: "32.0 GB",
    type: "DDR5-4800 MHz (2 x 16GB Dual Channel)",
    slotsUsed: "2 / 2",
    totalCapacityGb: 32.0,
    usedCapacityGbDefault: 11.4
  },
  storage: {
    drive: "ROG HyperDrive 2TB NVMe M.2 Gen4x4 SSD",
    totalGb: 1907.5,
    usedGbDefault: 742.8
  },
  display: {
    panel: "16-inch QHD+ 240Hz ROG Nebula HDR Mini LED",
    resolution: "2560 x 1600 (16:10)",
    colorSpace: "100% DCI-P3 / Pantone Validated",
    response: "3ms with G-Sync & Advanced Optimus"
  },
  biosVersion: "G634JZ.324 (Aura Sync v3.19.12)"
};

export const OPERATING_MODES = [
  {
    id: "windows",
    name: "Windows",
    label: "Windows ®",
    icon: "LayoutGrid",
    badge: "DEFAULT",
    description: "OS default balanced power plan. Balances system response with modest energy conservation.",
    fanCpuRpm: 2400,
    fanGpuRpm: 2400,
    fanDba: "22.5 dBA",
    cpuClockMhz: 3800,
    cpuUsagePercent: 24,
    cpuTempC: 55,
    gpuTempC: 48,
    gpuClockMhz: 1450,
    tgpWatts: 65,
    accentColor: "#00f0ff",
    glowColor: "rgba(0, 240, 255, 0.35)",
    statusText: "Optimized for Productivity & Battery"
  },
  {
    id: "silent",
    name: "Silent",
    label: "Silent",
    icon: "Feather",
    badge: "WHISPER 0dB",
    description: "Prioritizes minimal acoustics under 20 dBA. Fans may shut down completely under light desktop work.",
    fanCpuRpm: 1500,
    fanGpuRpm: 1200,
    fanDba: "17.8 dBA",
    cpuClockMhz: 2400,
    cpuUsagePercent: 18,
    cpuTempC: 49,
    gpuTempC: 44,
    gpuClockMhz: 920,
    tgpWatts: 45,
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.3)",
    statusText: "Acoustic Prioritization (Passive Cooling Active)"
  },
  {
    id: "performance",
    name: "Performance",
    label: "Performance",
    icon: "Gauge",
    badge: "BALANCED GAMING",
    description: "ROG calibrated performance curve delivering high framerates with intelligent thermal control.",
    fanCpuRpm: 3900,
    fanGpuRpm: 4100,
    fanDba: "34.2 dBA",
    cpuClockMhz: 4650,
    cpuUsagePercent: 49,
    cpuTempC: 69,
    gpuTempC: 64,
    gpuClockMhz: 2150,
    tgpWatts: 140,
    accentColor: "#ff0033",
    glowColor: "rgba(255, 0, 51, 0.45)",
    statusText: "Optimized Dynamic Boost & Fan Curve"
  },
  {
    id: "turbo",
    name: "Turbo",
    label: "Turbo",
    icon: "Rocket",
    badge: "MAX OVERCLOCK",
    description: "Full throttle unleashed mode. Unlocks maximum 175W TGP, higher CPU PL1/PL2 thresholds, and aggressive fan curves.",
    fanCpuRpm: 5600,
    fanGpuRpm: 5750,
    fanDba: "47.6 dBA",
    cpuClockMhz: 5400,
    cpuUsagePercent: 88,
    cpuTempC: 81,
    gpuTempC: 75,
    gpuClockMhz: 2480,
    tgpWatts: 175,
    accentColor: "#ff0033",
    glowColor: "rgba(255, 0, 51, 0.8)",
    statusText: "Overclock Active: GPU +150MHz / VRAM +200MHz"
  },
  {
    id: "manual",
    name: "Manual",
    label: "Manual",
    icon: "Wrench",
    badge: "USER PROFILES",
    description: "Complete control over CPU PL1/PL2 wattage, GPU boost clocks, and custom 8-point fan curves.",
    fanCpuRpm: 4800,
    fanGpuRpm: 4900,
    fanDba: "41.0 dBA",
    cpuClockMhz: 5100,
    cpuUsagePercent: 65,
    cpuTempC: 76,
    gpuTempC: 70,
    gpuClockMhz: 2350,
    tgpWatts: 160,
    accentColor: "#ffaa00",
    glowColor: "rgba(255, 170, 0, 0.55)",
    statusText: "User Manual Profile: Fan Curve 85% / GPU Offset +100MHz"
  }
];

/**
 * INITIAL GAMES REPOSITORY
 * Cleaned and ready for your personalized game collection!
 */
export const INITIAL_GAMES = [];

/**
 * Empty / Blank placeholder slots ready for future game entries.
 * Styled with tech indicators, empty card borders, and quick registration cues.
 */
export const EMPTY_PLACEHOLDER_SLOTS = [
  {
    id: "placeholder-slot-1",
    slotNumber: "01",
    sectorCode: "SECTOR-ALPHA // UNALLOCATED",
    titlePrompt: "Click to Register Game",
    description: "Empty high-performance slot. Ready for direct library synchronization."
  },
  {
    id: "placeholder-slot-2",
    slotNumber: "02",
    sectorCode: "SECTOR-BETA // STANDBY",
    titlePrompt: "Empty Vault Slot",
    description: "Awaiting local executable or cloud game deployment."
  },
  {
    id: "placeholder-slot-3",
    slotNumber: "03",
    sectorCode: "SECTOR-GAMMA // READY",
    titlePrompt: "Mount New Title",
    description: "Reserved Armoury Crate profile container."
  },
  {
    id: "placeholder-slot-4",
    slotNumber: "04",
    sectorCode: "SECTOR-DELTA // RESERVED",
    titlePrompt: "Unassigned Sector",
    description: "Awaiting custom user game metadata."
  },
  {
    id: "placeholder-slot-5",
    slotNumber: "05",
    sectorCode: "SECTOR-EPSILON // VACANT",
    titlePrompt: "Vacant Slot",
    description: "Ready for game installation."
  }
];

export const CONNECTED_DEVICES = [
  {
    id: "dev-1",
    name: "ROG Gladius III Wireless AimPoint",
    type: "Mouse",
    status: "Connected (2.4GHz)",
    battery: "92%",
    dpi: 16000,
    auraSync: true,
    icon: "Mouse"
  },
  {
    id: "dev-2",
    name: "ROG Strix Flare II Animate",
    type: "Keyboard",
    status: "Connected (USB)",
    battery: "AC Powered",
    pollingRate: "8000Hz",
    auraSync: true,
    icon: "Keyboard"
  },
  {
    id: "dev-3",
    name: "ROG Delta S Wireless",
    type: "Headset",
    status: "Connected (Bluetooth)",
    battery: "85%",
    audioProfile: "FPS Gaming Hi-Res",
    auraSync: true,
    icon: "Headphones"
  },
  {
    id: "dev-4",
    name: "ROG Swift OLED PG32UCDM",
    type: "Monitor",
    status: "Connected (DisplayPort 2.1)",
    refreshRate: "240Hz 4K",
    auraSync: true,
    icon: "Monitor"
  }
];

export const AURA_EFFECTS = [
  { id: "static", name: "Static", icon: "Lightbulb", description: "Constant single color glow" },
  { id: "breathing", name: "Breathing", icon: "Activity", description: "Smooth pulsating rhythm" },
  { id: "strobing", name: "Strobing", icon: "Zap", description: "Sharp strobe flashes" },
  { id: "cycle", name: "Color Cycle", icon: "RefreshCw", description: "Continuous spectrum transition" },
  { id: "rainbow", name: "Rainbow Wave", icon: "Sparkles", description: "Flowing multi-color waves" },
  { id: "smart", name: "Smart Thermal", icon: "Thermometer", description: "Changes color based on CPU heat" }
];

export const GENRES = [
  "All",
  "Action RPG",
  "Action / Adventure",
  "FPS / Shooter",
  "Racing / Open World",
  "Souls-like",
  "Strategy / Simulation",
  "Sports / Fighting",
  "Survival Horror",
  "Indie"
];

export const PLATFORMS = [
  "All Platforms",
  "Steam",
  "Epic Games",
  "Xbox Game Pass",
  "PlayStation PC",
  "GOG",
  "Battle.net",
  "EA App",
  "Ubisoft Connect",
  "Custom Executable"
];
