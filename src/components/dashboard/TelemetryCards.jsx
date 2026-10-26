import React from 'react';
import { useRog } from '../../context/RogContext';
import RogSlashes from '../common/RogSlashes';

export default function TelemetryCards() {
  const { telemetry, operatingMode, theme } = useRog();
  const isLight = theme === 'light';

  const isPowerSaving = operatingMode === 'silent' && telemetry.gpuUsage < 15;

  const cardBg = isLight 
    ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300' 
    : 'bg-[#101016]/95 border-[#1e1e2c] hover:border-[#2f2f45]';

  const titleColor = isLight ? 'text-gray-900' : 'text-white';
  const dividerColor = isLight ? 'border-slate-100' : 'border-[#181824]';
  const labelColor = isLight ? 'text-gray-500' : 'text-gray-400';
  const valColor = isLight ? 'text-gray-900 font-semibold' : 'text-gray-200';
  const trackBg = isLight ? 'bg-slate-100' : 'bg-[#181822]';

  return (
    <div className="flex flex-col space-y-3 select-none">
      {/* Header: /// System Usage */}
      <div className={`flex items-center text-sm font-bold tracking-wide ${isLight ? 'text-gray-900' : 'text-gray-200'}`}>
        <RogSlashes count={3} />
        <span>System Usage</span>
      </div>

      {/* 2x2 Grid matching the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* ================= GPU CARD ================= */}
        <div className={`${cardBg} rounded-xl p-4 flex flex-col justify-between transition-all`}>
          <div>
            <div className={`flex items-center justify-between border-b ${dividerColor} pb-2 mb-3`}>
              <h3 className={`text-xl font-bold font-sans tracking-wide ${titleColor}`}>GPU</h3>
              <div className="flex space-x-1 opacity-50">
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Frequency</span>
                <span className={valColor}>
                  {isPowerSaving ? "Power Saving" : `${telemetry.gpuClock} MHz`}
                </span>
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Usage</span>
                <span className={valColor}>
                  {isPowerSaving ? "Power Saving" : `${telemetry.gpuUsage} %`}
                </span>
              </div>

              {!isPowerSaving && (
                <div className={`w-full ${trackBg} h-1.5 rounded-full overflow-hidden my-1`}>
                  <div
                    className="h-full rog-telemetry-bar rounded-full transition-all duration-700"
                    style={{ width: `${telemetry.gpuUsage}%` }}
                  />
                </div>
              )}

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Memory Frequency</span>
                <span className={valColor}>
                  {isPowerSaving ? "Power Saving" : "18000 MHz"}
                </span>
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Temperature</span>
                <span className={valColor}>
                  {isPowerSaving ? "Power Saving" : `${telemetry.gpuTemp} °C`}
                </span>
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Voltage</span>
                <span className={valColor}>
                  {isPowerSaving ? "Power Saving" : `${telemetry.gpuVoltage} mV`}
                </span>
              </div>

              <div className={`flex justify-between items-center ${labelColor} pt-1 border-t ${dividerColor}`}>
                <span>TGP</span>
                <span className="text-rog-red font-bold">{telemetry.gpuTgp} W</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CPU CARD ================= */}
        <div className={`${cardBg} rounded-xl p-4 flex flex-col justify-between transition-all`}>
          <div>
            <div className={`flex items-center justify-between border-b ${dividerColor} pb-2 mb-3`}>
              <h3 className={`text-xl font-bold font-sans tracking-wide ${titleColor}`}>CPU</h3>
              <div className="flex space-x-1 opacity-50">
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Frequency</span>
                <span className={valColor}>{telemetry.cpuClock} MHz</span>
              </div>

              {/* Pink-to-red gradient bar for Frequency */}
              <div className={`w-full ${trackBg} h-1.5 rounded-full overflow-hidden my-1`}>
                <div
                  className="h-full rog-telemetry-bar rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (telemetry.cpuClock / 5600) * 100)}%` }}
                />
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Usage</span>
                <span className={valColor}>{telemetry.cpuUsage} %</span>
              </div>

              {/* Pink-to-red gradient bar for Usage */}
              <div className={`w-full ${trackBg} h-1.5 rounded-full overflow-hidden my-1`}>
                <div
                  className="h-full rog-telemetry-bar rounded-full transition-all duration-500"
                  style={{ width: `${telemetry.cpuUsage}%` }}
                />
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Memory Frequency</span>
                <span className={valColor}>4800 MHz</span>
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Temperature</span>
                <span className={valColor}>{telemetry.cpuTemp} °C</span>
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Voltage</span>
                <span className={valColor}>{telemetry.cpuVoltage} mV</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FAN CARD ================= */}
        <div className={`${cardBg} rounded-xl p-4 flex flex-col justify-between transition-all`}>
          <div>
            <div className={`flex items-center justify-between border-b ${dividerColor} pb-2 mb-3`}>
              <h3 className={`text-xl font-bold font-sans tracking-wide ${titleColor}`}>Fan</h3>
              <div className="flex space-x-1 opacity-50">
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>CPU Fan</span>
                <span className={valColor}>{telemetry.fanCpuRpm} RPM</span>
              </div>

              {/* Fan RPM Progress Bar */}
              <div className={`w-full ${trackBg} h-1.5 rounded-full overflow-hidden my-1`}>
                <div
                  className="h-full rog-telemetry-bar rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (telemetry.fanCpuRpm / 6000) * 100)}%` }}
                />
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>GPU Fan</span>
                <span className={valColor}>{telemetry.fanGpuRpm} RPM</span>
              </div>

              {/* Fan RPM Progress Bar */}
              <div className={`w-full ${trackBg} h-1.5 rounded-full overflow-hidden my-1`}>
                <div
                  className="h-full rog-telemetry-bar rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (telemetry.fanGpuRpm / 6000) * 100)}%` }}
                />
              </div>

              <div className={`flex justify-between items-center ${labelColor} pt-1`}>
                <span>Fan Acoustics</span>
                <span className={valColor}>{telemetry.fanDba}</span>
              </div>
              <div className={`flex justify-between items-center ${isLight ? 'text-gray-500' : 'text-gray-500'} text-[11px]`}>
                <span>Cooling Profile</span>
                <span className="uppercase text-rog-red font-semibold">{operatingMode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MEMORY CARD ================= */}
        <div className={`${cardBg} rounded-xl p-4 flex flex-col justify-between transition-all`}>
          <div>
            <div className={`flex items-center justify-between border-b ${dividerColor} pb-2 mb-3`}>
              <h3 className={`text-xl font-bold font-sans tracking-wide ${titleColor}`}>Memory</h3>
              <div className="flex space-x-1 opacity-50">
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
                <span className={`w-1 h-3 ${isLight ? 'bg-slate-400' : 'bg-gray-500'} transform -skew-x-[24deg]`} />
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>Storage</span>
                <span className={valColor}>
                  {telemetry.storageUsedGb} / {telemetry.storageTotalGb} GB
                </span>
              </div>

              {/* Storage Progress Bar */}
              <div className={`w-full ${trackBg} h-1.5 rounded-full overflow-hidden my-1`}>
                <div
                  className="h-full rog-telemetry-bar rounded-full transition-all duration-500"
                  style={{ width: `${(telemetry.storageUsedGb / telemetry.storageTotalGb) * 100}%` }}
                />
              </div>

              <div className={`flex justify-between items-center ${labelColor}`}>
                <span>RAM</span>
                <span className={valColor}>
                  {telemetry.ramUsedGb} / {telemetry.ramTotalGb} GB
                </span>
              </div>

              {/* RAM Progress Bar */}
              <div className={`w-full ${trackBg} h-1.5 rounded-full overflow-hidden my-1`}>
                <div
                  className="h-full rog-telemetry-bar rounded-full transition-all duration-500"
                  style={{ width: `${(telemetry.ramUsedGb / telemetry.ramTotalGb) * 100}%` }}
                />
              </div>

              <div className={`flex justify-between items-center ${labelColor} pt-1`}>
                <span>Memory Bandwidth</span>
                <span className={valColor}>76.8 GB/s</span>
              </div>
              <div className={`flex justify-between items-center ${isLight ? 'text-gray-500' : 'text-gray-500'} text-[11px]`}>
                <span>Architecture</span>
                <span className={isLight ? 'text-gray-700 font-medium' : 'text-gray-300'}>DDR5 Dual Channel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
