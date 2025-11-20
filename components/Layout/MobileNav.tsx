
import React from 'react';
import { useApp } from '../../hooks/useAppContext';
import { LayoutDashboard, MoonStar, Brain, Droplets, Dumbbell } from 'lucide-react';
import { Tab } from '../../types';

export const MobileNav: React.FC = () => {
  const { state, setTab } = useApp();

  const btnClass = (t: Tab) => 
    `relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
      state.currentTab === t 
        ? 'text-white bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] -translate-y-2 scale-110' 
        : 'text-slate-400 hover:text-indigo-300 hover:bg-white/5'
    }`;

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 h-16 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl flex items-center justify-evenly z-50 animate-slideUp">
      <button onClick={() => setTab('dashboard')} className={btnClass('dashboard')}>
        <LayoutDashboard size={20} />
      </button>
      <button onClick={() => setTab('prayer')} className={btnClass('prayer')}>
        <MoonStar size={20} />
      </button>
      <button onClick={() => setTab('mdf')} className={btnClass('mdf')}>
        <Brain size={20} />
      </button>
      <button onClick={() => setTab('hygiene')} className={btnClass('hygiene')}>
        <Droplets size={20} />
      </button>
      <button onClick={() => setTab('fitness')} className={btnClass('fitness')}>
        <Dumbbell size={20} />
      </button>
    </div>
  );
};
