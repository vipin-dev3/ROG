import React, { useState } from 'react';
import { 
  Home, 
  Gamepad2, 
  Cpu, 
  Palette, 
  Settings, 
  Menu, 
  Sliders, 
  Bell, 
  User, 
  Compass,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useRog } from '../../context/RogContext';
import { playUiClick } from '../../utils/soundEffects';

export default function Sidebar() {
  const { activeTab, setActiveTab, games, theme } = useRog();
  const isLight = theme === 'light';
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    {
      id: 'home',
      label: 'Home Dashboard',
      shortLabel: 'Home',
      icon: Home,
      badge: null
    },
    {
      id: 'library',
      label: 'Game Vault',
      shortLabel: 'Library',
      icon: Gamepad2,
      badge: games.length.toString()
    },
    {
      id: 'telemetry',
      label: 'System Telemetry',
      shortLabel: 'Telemetry',
      icon: Cpu,
      badge: 'LIVE'
    },
    {
      id: 'aura',
      label: 'Aura Sync Lighting',
      shortLabel: 'Aura Sync',
      icon: Palette,
      badge: null
    },
    {
      id: 'settings',
      label: 'System Settings',
      shortLabel: 'Settings',
      icon: Settings,
      badge: null,
      hasDot: true
    }
  ];

  const handleNavClick = (id) => {
    playUiClick();
    setActiveTab(id);
  };

  return (
    <aside 
      className={`border-r flex flex-col justify-between transition-all duration-300 z-30 select-none ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#0d0d12] border-[#1e1e28]'
      } ${
        isExpanded ? 'w-56' : 'w-14'
      }`}
    >
      {/* Top Menu Toggle */}
      <div>
        <div className={`h-12 flex items-center justify-center border-b ${isLight ? 'border-slate-100' : 'border-[#181822]'}`}>
          <button
            onClick={() => {
              playUiClick();
              setIsExpanded(!isExpanded);
            }}
            title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${
              isLight ? 'text-gray-500 hover:text-gray-900 hover:bg-slate-100' : 'text-gray-400 hover:text-white hover:bg-[#1a1a24]'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={item.label}
                className={`relative w-full flex items-center transition-all duration-200 group ${
                  isExpanded ? 'px-3.5 py-2.5 space-x-3 text-left' : 'h-12 justify-center'
                } ${
                  isActive
                    ? 'bg-rog-red text-white shadow-[0_0_15px_rgba(255,0,51,0.5)]'
                    : (isLight 
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-slate-100' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#151520]')
                }`}
              >
                {/* Active Indicator Accent Line on left */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                )}

                <div className="relative flex items-center justify-center">
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-white' : 'group-hover:scale-105'}`} />
                  {item.hasDot && !isActive && (
                    <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 bg-rog-red rounded-full ring-2 ${isLight ? 'ring-white' : 'ring-[#0d0d12]'}`} />
                  )}
                </div>

                {isExpanded && (
                  <div className="flex items-center justify-between flex-1 overflow-hidden">
                    <span className="text-sm font-semibold tracking-wide truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        isActive 
                          ? 'bg-black/30 text-white' 
                          : (isLight ? 'bg-slate-200 text-gray-800' : 'bg-[#222230] text-gray-300')
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Info in Sidebar */}
      <div className={`p-2 border-t space-y-2 ${isLight ? 'border-slate-100' : 'border-[#181822]'}`}>
        {/* User / Bell Quick Actions */}
        <div className={`flex items-center ${isExpanded ? 'justify-between px-2' : 'flex-col space-y-2'}`}>
          <button 
            onClick={() => playUiClick()}
            title="ROG Elite Profile"
            className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${
              isLight 
                ? 'bg-slate-100 border-slate-200 text-gray-600 hover:text-gray-900 hover:bg-slate-200' 
                : 'bg-[#181824] border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => playUiClick()}
            title="Armoury Notifications"
            className={`relative w-8 h-8 rounded border flex items-center justify-center transition-colors ${
              isLight 
                ? 'bg-slate-100 border-slate-200 text-gray-600 hover:text-gray-900 hover:bg-slate-200' 
                : 'bg-[#181824] border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rog-red rounded-full" />
          </button>
        </div>

        {isExpanded && (
          <div className={`pt-2 text-[10px] font-mono text-center tracking-widest border-t ${
            isLight ? 'border-slate-100 text-gray-400' : 'border-[#1a1a24] text-gray-500'
          }`}>
            REPUBLIC OF GAMERS
          </div>
        )}
      </div>
    </aside>
  );
}
