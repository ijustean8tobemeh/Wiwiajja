
import React from 'react';
import { useApp } from '../../hooks/useAppContext';
import { Tab } from '../../types';
import { 
  LayoutDashboard, 
  MoonStar, 
  Hand, 
  BookOpen, 
  Brain, 
  Droplets, 
  Dumbbell,
  Moon,
  Target
} from 'lucide-react';

export const BottomDock: React.FC = () => {
  const { state, setTab } = useApp();

  const navItems: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'prayer', icon: MoonStar, label: 'Prayer' },
    { id: 'dhikr', icon: Hand, label: 'Dhikr' },
    { id: 'quran', icon: BookOpen, label: 'Quran' },
    { id: 'mdf', icon: Brain, label: 'Brain' },
    { id: 'hygiene', icon: Droplets, label: 'Clean' },
    { id: 'fitness', icon: Dumbbell, label: 'Fit' },
    { id: 'focus', icon: Target, label: 'Focus' },
  ];

  if (state.ramadanMode) {
    navItems.splice(1, 0, { id: 'ramadan', icon: Moon, label: 'Ramadan' });
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[900] flex justify-center pointer-events-none safe-area-pb px-4">
      <div className={`
        pointer-events-auto
        mx-auto
        ${state.oledMode ? 'bg-neutral-950 border-neutral-800' : 'bg-[#0f172a]/80 border-white/10'} 
        backdrop-blur-2xl 
        border rounded-full
        shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/5
        py-3 px-4 md:px-6
        flex gap-3 md:gap-4 overflow-x-auto no-scrollbar
        max-w-[95vw] md:max-w-fit justify-start md:justify-center items-center
        scrollbar-hide
        animate-slideUp
      `}>
        {navItems.map((item) => {
          const isActive = state.currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`group relative flex flex-col items-center justify-center 
                rounded-full transition-all duration-500 shrink-0
                w-12 h-12 md:w-14 md:h-14
                ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}
              `}
            >
              <div className={`
                transition-all duration-500 ease-out relative z-10
                ${isActive ? 'text-indigo-400 -translate-y-1 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'text-slate-500 group-hover:text-slate-200 group-hover:-translate-y-0.5'}
              `}>
                <item.icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
              </div>
              
              {/* Active Glow Dot */}
              <span className={`
                absolute bottom-2 w-1 h-1 rounded-full transition-all duration-500
                ${isActive ? 'bg-indigo-400 shadow-[0_0_6px_#6366f1] opacity-100 scale-100' : 'bg-slate-600 opacity-0 scale-0 group-hover:opacity-50'}
              `}></span>
              
              {/* Tooltip Label (Desktop Only) */}
              <span className="hidden md:block absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white pointer-events-none backdrop-blur-sm border border-white/10">
                  {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
