# ⚡ ASUS ROG Armoury Crate // ROG Gaming Vault

An ultra-immersive, futuristic gaming portfolio and library web application styled after the **ASUS ROG Armoury Crate** software interface. Built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**, featuring real-time simulated hardware telemetry, custom operating mode performance profiles, interactive game launching HUDs, and Aura Sync RGB lighting synchronization.

---

## 🎮 Key Features & Armoury Crate Aesthetic

### 1. 1:1 Armoury Crate Home Dashboard Homage
- **Futuristic ROG Strix Gaming Laptop Visualizer**: Interactive 3D chassis illustration with dynamic underglow lightbar and illuminated per-key keyboard reacting to Aura Sync.
- **Hardware Telemetry HUD (Live Sensors)**:
  - **GPU**: Core Clock (MHz), GPU Load %, Memory Clock, Hotspot Thermals, Voltage, and Dynamic TGP (Watts).
  - **CPU**: Frequency (MHz with pink-to-red gradient bar), Usage %, RAM Clock, Core Temp (°C), and Voltage (mV).
  - **Cooling Fan**: CPU Fan (RPM), GPU Fan (RPM), and Sound Pressure Acoustics (dBA).
  - **Memory & Storage**: High-speed NVMe allocation and DDR5 Dual Channel RAM utilization.
- **Connected Peripherals (`/// Devices`)**: Manage ROG Chakram X mouse, Strix Flare II keyboard, Delta S headset, and Swift OLED monitor.

### 2. ROG Operating Mode Selector Dock
- Toggle between **5 authentic ROG performance modes**:
  - `[Windows ®]` (OS balanced profile)
  - `[Silent]` (Whisper quiet 0dB, low-frequency passive cooling)
  - `[Performance]` (Balanced dynamic boost for high framerate gaming)
  - `[Turbo]` (Maximum 175W TGP unleash, aggressive fan curve, overclocked clocks)
  - `[Manual]` (Custom CPU PL1/PL2 thresholds, GPU clock offsets, and fan curves)
- Mode switching dynamically adapts hardware telemetry, fan speeds, CPU clock frequencies, and ambient lighting glow.
- Includes **Web Audio API** mechanical sound effects for authentic tactile feedback.

### 3. Game Vault & Library Grid (Blank & Placeholder Ready)
- **Decoupled Data Architecture**: All game titles, metadata, hours played, achievements, and hardware specs live in `src/data/gamesData.js`.
- **Placeholder Ready Slots**: Features dedicated styled empty slots (`+ Add Game`, `SECTOR-GAMMA // UNALLOCATED`, etc.) ready for future game entries.
- **Filter & Sort Toolbar**:
  - Status categories: *All Games*, *Recently Played*, *Favorites*, *Completed*, *Wishlist*.
  - Genre filters & Platform filters (Steam, Epic, Xbox Game Pass, GOG, Custom).
  - Instant live fuzzy search and playtime sorting.
- **Interactive Game Launcher Simulation**:
  - Fullscreen cyber HUD launch overlay with system optimization checks.
  - Sound effects and victory confetti celebrations for completed titles.
  - Quick "+1h" playtime logger and personal review benchmark notes.

### 4. Aura Sync RGB Lighting Controller
- Configure RGB lighting effects: *Static*, *Breathing*, *Strobing*, *Color Cycle*, *Rainbow Wave*, *Smart Thermal*.
- Real-time color palette selector that immediately shifts the application's ambient backdrop glow and laptop chassis lightbar.

### 5. Local Storage Persistence & Backup
- Built-in React Context with LocalStorage syncing so any added games, playtime, operating mode selections, and benchmark notes persist across browser sessions.
- Full **Export JSON** and **Import JSON Backup** utilities in System Settings.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (Obsidian `#0a0a0c`, ROG Crimson `#ff0033`, Pink gradient `#ff007f`, Cyber Cyan `#00f0ff`)
- **Typography**: Google Fonts (*Rajdhani*, *Orbitron*, *Inter*)
- **Icons**: Lucide React (`lucide-react`)
- **Audio Synthesizer**: Self-contained Web Audio API (zero external asset dependencies)
- **Effects**: Canvas Confetti (`canvas-confetti`)

---

## 📁 Modular Project Structure

```text
rog/
├── public/
│   └── favicon.svg                  # ROG stylized eye favicon
├── src/
│   ├── components/
│   │   ├── aura/
│   │   │   └── AuraSyncView.jsx     # Aura Sync RGB lighting controller
│   │   ├── common/
│   │   │   └── RogSlashes.jsx       # Signature triple red slashes (///)
│   │   ├── dashboard/
│   │   │   ├── DashboardView.jsx    # Armoury Crate Home view
│   │   │   ├── LaptopView.jsx       # 3D laptop render & peripherals
│   │   │   ├── OperatingModeBar.jsx # 5 ROG performance modes dock
│   │   │   └── TelemetryCards.jsx   # GPU, CPU, Fan, Memory metric HUDs
│   │   ├── header/
│   │   │   └── Header.jsx           # Window controls, live telemetry strip, audio switch
│   │   ├── library/
│   │   │   ├── GameCard.jsx         # Armoury Crate game launcher card
│   │   │   ├── LibraryToolbar.jsx   # Search, filters, sort, and "+ Add Game" button
│   │   │   ├── LibraryView.jsx      # Vault grid with blank placeholder slots
│   │   │   └── PlaceholderCard.jsx  # Blank / placeholder slots
│   │   ├── modals/
│   │   │   ├── AddGameModal.jsx     # Register new game modal with presets
│   │   │   ├── GameDetailModal.jsx  # Game profile, benchmark notes, achievements
│   │   │   ├── GameLaunchOverlay.jsx# Fullscreen launch sequence simulation
│   │   │   └── ManualModeModal.jsx  # Manual PL1/PL2 power & fan curves tuning
│   │   ├── settings/
│   │   │   └── SettingsView.jsx     # Audio toggles, backup import/export, machine specs
│   │   ├── sidebar/
│   │   │   └── Sidebar.jsx          # Collapsible navigation with active ROG red badge
│   │   └── telemetry/
│   │       └── TelemetryView.jsx    # Live wave history graph & thermal sensors
│   ├── context/
│   │   └── RogContext.jsx           # Central state & LocalStorage persistence
│   ├── data/
│   │   └── gamesData.js             # Decoupled games, specs, modes & placeholder slots
│   ├── utils/
│   │   └── soundEffects.js          # Web Audio API procedural sound engine
│   ├── App.jsx                      # Main application layout & modal containers
│   ├── index.css                    # Tailwind directives, scanlines & cyber gradients
│   └── main.jsx                     # Vite React entrypoint
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Run the Development Server
Start the local Vite dev server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to explore the ROG Gaming Vault.

---

## 📦 Production Build & Deployment

### Build for Production
To generate optimized production assets in the `dist` directory:
```bash
npm run build
```

### Preview the Production Build
```bash
npm run preview
```

### Deploying to Platforms

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
- Build command: `npm run build`
- Publish directory: `dist`

#### GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'`.
2. Run `npm run build`.
3. Deploy the `dist` directory to the `gh-pages` branch.

---

## ⚙️ Editing & Decoupling Data (`src/data/gamesData.js`)

To add games or change your machine specs:
1. Open [`src/data/gamesData.js`](src/data/gamesData.js).
2. Modify `INITIAL_GAMES` to customize your default library.
3. Edit `ROG_SYSTEM_SPECS` to display your personal laptop or desktop specifications.
4. Modify `EMPTY_PLACEHOLDER_SLOTS` to change the number or labeling of empty HUD slots.
5. In the UI, use the **"+ Add New Game"** button or click on any placeholder slot to dynamically insert games directly via your browser.

---

## 🛡️ License
Designed for Republic of Gamers enthusiasts. Built for high performance.
