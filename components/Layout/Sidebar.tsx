
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
  LogOut,
  Moon,
  Target
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { state, setTab } = useApp();

  const handleLogout = () => {
      if (confirm("Lock Dashboard Session?")) {
          window.location.reload();
      }
  };

  const navItemClass = (t: Tab) => 
    `flex items-center gap-3 px-4 py-3 rounded-2xl w-full transition-all duration-200 ${
      state.currentTab === t 
        ? 'bg-gradient-to-r from-indigo-500/20 to-sky-500/20 text-white border border-white/5 shadow-sm' 
        : 'text-slate-400 hover:bg-white/5 hover:text-indigo-200'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-40px)] sticky top-5 glass-panel rounded-[22px] p-4 shadow-2xl">
      <div className="flex items-center gap-3 px-3 py-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20">
          Z
        </div>
        <span className="font-bold text-lg tracking-tight text-white">Zohaib's Tracker</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
        <button onClick={() => setTab('dashboard')} className={navItemClass('dashboard')}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </button>
        <button onClick={() => setTab('prayer')} className={navItemClass('prayer')}>
          <MoonStar size={20} />
          <span className="font-medium">Prayer</span>
        </button>
        <button onClick={() => setTab('dhikr')} className={navItemClass('dhikr')}>
          <Hand size={20} />
          <span className="font-medium">Dhikr</span>
        </button>
        <button onClick={() => setTab('quran')} className={navItemClass('quran')}>
          <BookOpen size={20} />
          <span className="font-medium">Quran</span>
        </button>
        <button onClick={() => setTab('mdf')} className={navItemClass('mdf')}>
          <Brain size={20} />
          <span className="font-medium">Retention</span>
        </button>
        <button onClick={() => setTab('focus')} className={navItemClass('focus')}>
          <Target size={20} />
          <span className="font-medium">Focus</span>
        </button>
        <button onClick={() => setTab('hygiene')} className={navItemClass('hygiene')}>
          <Droplets size={20} />
          <span className="font-medium">Hygiene</span>
        </button>
        <button onClick={() => setTab('fitness')} className={navItemClass('fitness')}>
          <Dumbbell size={20} />
          <span className="font-medium">Fitness</span>
        </button>
        {state.ramadanMode && (
          <button onClick={() => setTab('ramadan')} className={navItemClass('ramadan')}>
            <Moon size={20} />
            <span className="font-medium">Ramadan</span>
          </button>
        )}
      </nav>

      <div className="pt-4 mt-2 border-t border-dashed border-white/10">
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-400 w-full transition-colors rounded-2xl hover:bg-rose-500/10">
          <LogOut size={20} />
          <span className="font-medium">Lock Session</span>
        </button>
      </div>
    </aside>
  );
};
