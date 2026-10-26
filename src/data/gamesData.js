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
 * USER'S PLAYED GAMES COLLECTION
 */
export const INITIAL_GAMES = [
  {
    id: "game-gow",
    title: "God of War",
    genre: "Action / Adventure",
    platform: "PlayStation PC",
    hoursPlayed: 54.2,
    lastPlayed: "Yesterday",
    status: "Completed",
    rating: 5,
    completionPercentage: 100,
    profileMode: "Turbo",
    coverImage: "./covers/god-of-war.jpg",
    bannerImage: "./covers/god-of-war.jpg",
    description: "Venture into the brutal Norse realm of Midgard as Kratos alongside Atreus. Unlocked 4K graphics with DLSS and ultra-widescreen support.",
    tags: ["PlayStation PC", "Norse Mythology", "Action RPG", "Mastered"],
    achievementsUnlocked: 37,
    totalAchievements: 37,
    isFavorite: true,
    personalNotes: "Valkyrie Queen Sigrun defeated on Give Me God of War! Runs locked at 120 FPS on Turbo mode."
  },
  {
    id: "game-rdr2",
    title: "Red Dead Redemption 2",
    genre: "Action RPG / Open World",
    platform: "Steam",
    hoursPlayed: 168.4,
    lastPlayed: "3 days ago",
    status: "Completed",
    rating: 5,
    completionPercentage: 100,
    profileMode: "Performance",
    coverImage: "./covers/rdr2.png",
    bannerImage: "./covers/rdr2.png",
    description: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. Unrivaled photorealistic open world with Vulkan API.",
    tags: ["Open World", "Vulkan", "Masterpiece", "Story Rich"],
    achievementsUnlocked: 48,
    totalAchievements: 52,
    isFavorite: true,
    personalNotes: "One of the greatest stories ever told. Stunning visual fidelity on the ROG Nebula HDR display."
  },
  {
    id: "game-acodyssey",
    title: "Assassin's Creed Odyssey",
    genre: "Action RPG",
    platform: "Ubisoft Connect",
    hoursPlayed: 114.6,
    lastPlayed: "5 days ago",
    status: "Playing",
    rating: 5,
    completionPercentage: 84,
    profileMode: "Turbo",
    coverImage: "./covers/ac-odyssey.jpg",
    bannerImage: "./covers/ac-odyssey.jpg",
    description: "Write your own epic odyssey and become a legendary Spartan hero in Ancient Greece. Vast naval combat and mythical beast encounters.",
    tags: ["Ancient Greece", "Open World", "RPG", "Naval Combat"],
    achievementsUnlocked: 49,
    totalAchievements: 60,
    isFavorite: true,
    personalNotes: "Exploring the Aegean Sea and Athens. Flawless 95+ FPS on Ultra High graphics settings."
  },
  {
    id: "game-cod",
    title: "Call of Duty",
    genre: "FPS / Shooter",
    platform: "Battle.net",
    hoursPlayed: 142.0,
    lastPlayed: "Today",
    status: "Playing",
    rating: 5,
    completionPercentage: 76,
    profileMode: "Turbo",
    coverImage: "./covers/call-of-duty.jpg",
    bannerImage: "./covers/call-of-duty.jpg",
    description: "Visceral, high-stakes tactical campaign and multiplayer combat. Powered by NVIDIA Reflex ultra-low latency and DLSS 3.",
    tags: ["Tactical FPS", "Ray Tracing", "NVIDIA Reflex", "Multiplayer"],
    achievementsUnlocked: 28,
    totalAchievements: 35,
    isFavorite: false,
    personalNotes: "High-octane search & destroy and Warzone matches. 240Hz refresh rate gives extreme competitive response."
  },
  {
    id: "game-bf4",
    title: "Battlefield 4",
    genre: "FPS / Shooter",
    platform: "EA App",
    hoursPlayed: 186.5,
    lastPlayed: "1 week ago",
    status: "Completed",
    rating: 5,
    completionPercentage: 100,
    profileMode: "Performance",
    coverImage: "./covers/battlefield-4.jpg",
    bannerImage: "./covers/battlefield-4.jpg",
    description: "The genre-defining action blockbuster made from moments that blur the line between game and glory. Dynamic Levolution destruction.",
    tags: ["Levolution", "64 Players", "Vehicular Combat", "Classic FPS"],
    achievementsUnlocked: 42,
    totalAchievements: 42,
    isFavorite: true,
    personalNotes: "Timeless multiplayer shooter. Siege of Shanghai skyscraper collapse runs locked at maximum refresh rate."
  },
  {
    id: "game-bfv",
    title: "Battlefield V",
    genre: "FPS / Shooter",
    platform: "EA App",
    hoursPlayed: 96.2,
    lastPlayed: "2 weeks ago",
    status: "Playing",
    rating: 4,
    completionPercentage: 70,
    profileMode: "Turbo",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    bannerImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    description: "World War II as you've never seen it before. Immersive squad-focused warfare with real-time Ray-Traced ambient reflections.",
    tags: ["WWII", "Ray Tracing", "Frostbite Engine", "Large Scale"],
    achievementsUnlocked: 24,
    totalAchievements: 32,
    isFavorite: false,
    personalNotes: "Intense Pacific War breakthrough combat with zero thermal throttling on Turbo profile."
  },
  {
    id: "game-bf6",
    title: "Battlefield 6",
    genre: "FPS / Shooter",
    platform: "EA App",
    hoursPlayed: 48.0,
    lastPlayed: "Yesterday",
    status: "Playing",
    rating: 5,
    completionPercentage: 65,
    profileMode: "Turbo",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80",
    bannerImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1600&q=80",
    description: "Next-generation modern military all-out warfare. Unprecedented destruction physics, 128-player battles, and full Frostbite Next path tracing.",
    tags: ["Next-Gen FPS", "128 Players", "Path Tracing", "Destruction"],
    achievementsUnlocked: 18,
    totalAchievements: 36,
    isFavorite: true,
    personalNotes: "Running with DLSS 3.5 Frame Generation at over 140 FPS on Turbo mode. Breakthrough mode scale is insane."
  },
  {
    id: "game-fh6",
    title: "Forza Horizon 6",
    genre: "Racing / Open World",
    platform: "Xbox Game Pass",
    hoursPlayed: 62.5,
    lastPlayed: "Today",
    status: "Playing",
    rating: 5,
    completionPercentage: 78,
    profileMode: "Performance",
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    bannerImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    description: "The ultimate Horizon automotive festival. Explore breathtaking dynamic seasons, hundreds of real hypercars, and photorealistic ray-traced audio and visuals.",
    tags: ["Racing", "Open World", "Photorealistic", "Nebula HDR"],
    achievementsUnlocked: 44,
    totalAchievements: 65,
    isFavorite: true,
    personalNotes: "Jaw-dropping visual fidelity on the 240Hz Nebula HDR display. Ray Traced reflections in cockpit cam look sensational."
  }
];

/**
 * Empty / Blank placeholder slots ready for future game entries.
 */
export const EMPTY_PLACEHOLDER_SLOTS = [
  {
    id: "placeholder-slot-1",
    slotNumber: "09",
    sectorCode: "SECTOR-GAMMA // UNALLOCATED",
    titlePrompt: "Click to Register Game",
    description: "Empty high-performance slot. Ready for direct library synchronization."
  },
  {
    id: "placeholder-slot-2",
    slotNumber: "10",
    sectorCode: "SECTOR-DELTA // STANDBY",
    titlePrompt: "Empty Vault Slot",
    description: "Awaiting local executable or cloud game deployment."
  },
  {
    id: "placeholder-slot-3",
    slotNumber: "11",
    sectorCode: "SECTOR-EPSILON // RESERVED",
    titlePrompt: "Mount New Title",
    description: "Reserved Armoury Crate profile container."
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
  "Action / Adventure",
  "Action RPG / Open World",
  "Action RPG",
  "FPS / Shooter",
  "Souls-like",
  "Strategy / Simulation",
  "Sports / Fighting",
  "Survival Horror",
  "Indie"
];

export const PLATFORMS = [
  "All Platforms",
  "Steam",
  "PlayStation PC",
  "Battle.net",
  "EA App",
  "Ubisoft Connect",
  "Xbox Game Pass",
  "GOG",
  "Custom Executable"
];
