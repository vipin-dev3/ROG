import React from 'react';
import LaptopView from './LaptopView';
import TelemetryCards from './TelemetryCards';
import OperatingModeBar from './OperatingModeBar';

export default function DashboardView({ onOpenManualModal }) {
  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Laptop 3D Render & Devices */}
        <div className="lg:col-span-5 xl:col-span-5">
          <LaptopView />
        </div>

        {/* Right Side: System Usage HUD Cards & Operating Mode Selector */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-6">
          <TelemetryCards />
          <OperatingModeBar onOpenManualModal={onOpenManualModal} />
        </div>
      </div>
    </div>
  );
}

