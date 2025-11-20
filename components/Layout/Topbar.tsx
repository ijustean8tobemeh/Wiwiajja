

import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { Settings, Bell, Check, Info, AlertTriangle, Trophy, X, Hexagon, Star, Zap, Activity, Wifi, WifiOff } from 'lucide-react';

interface TopbarProps {
  onOpenSettings: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenSettings }) => {
  const { state, markAllRead } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const unreadCount = state.notifications.filter(n => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const dateStr = new Intl.DateTimeFormat('en-GB', { 
    day: 'numeric', month: 'short', year: 'numeric' 
  }).format(time);

  const timeStr = time.toLocaleTimeString('en-GB', { 
    hour: '2-digit', minute: '2-digit', hour12: false 
  });

  const getGreeting = () => {
      const h = time.getHours();
      if (h >= 4 && h < 12) return "Good Morning, Zohaib";
      if (h >= 12 && h < 17) return "Good Afternoon, Zohaib";
      if (h >= 17 && h < 21) return "Good Evening, Zohaib";
      return "Good Night, Zohaib";
  };

  // --- GLOBAL SOUL LEVEL CALCULATION ---
  const calculateLevel = () => {
      const xp = (state.prayerStreak * 15) + 
                 (state.dhikrStreak * 2) + 
                 (state.fitnessStreak * 10) + 
                 (state.quranCompletedParahs * 100) + 
                 (state.mdfStreakDays * 10) +
                 (state.ramadanStreak * 20);
      
      const level = 1 + Math.floor(xp / 500);
      const progress = (xp % 500) / 500 * 100;
      return { level, progress, xp };
  };

  const { level, progress } = calculateLevel();

  const getIcon = (type: string) => {
    switch(type) {
      case 'achievement': return <Trophy size={16} className="text-amber-400" />;
      case 'warning': return <AlertTriangle size={16} className="text-rose-400" />;
      case 'success': return <Check size={16} className="text-emerald-400" />;
      default: return <Info size={16} className="text-sky-400" />;
    }
  };

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 relative z-50 pointer-events-auto">
      
      {/* Brand / User Identity */}
      <div className="flex items-center justify-between w-full md:w-auto gap-4">
        <div className="flex items-center gap-4 group cursor-default">
            <div className="relative w-12 h-12 flex-shrink-0">
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity"></div>
                <div className="relative z-10 w-full h-full bg-[#0f172a] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl group-hover:border-indigo-500/50 transition-colors duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <Hexagon size={24} className="text-indigo-400 group-hover:rotate-90 transition-transform duration-700 ease-out relative z-10" strokeWidth={2} />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-[#0f172a] rounded-full border border-white/10 flex items-center justify-center z-20`}>
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${state.isOnline ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'}`}></div>
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <h1 className="text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-2 truncate font-serif">
                    {getGreeting()}
                </h1>
                {/* Mobile: Shows Time. Desktop: Shows System Status */}
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    {state.isOnline ? <Wifi size={10} className="text-emerald-400" /> : <WifiOff size={10} className="text-rose-400" />}
                    <span className="md:hidden text-indigo-300 font-mono">{timeStr}</span>
                    <span className="hidden md:inline">{state.isOnline ? "System Online" : "Offline Mode"}</span>
                </div>
            </div>
        </div>

        {/* HUD: SOUL LEVEL (Responsive) */}
        <div className="hidden md:flex flex-col items-end bg-[#0f172a]/80 backdrop-blur-2xl px-5 py-3 rounded-2xl border border-white/10 shadow-lg min-w-[160px] group hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
            <div className="flex items-center justify-between w-full mb-2 gap-4 relative z-10">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">SOUL LVL</div>
                <div className="text-sm font-black text-amber-400 flex items-center gap-1 shadow-amber-500/20 drop-shadow-sm">
                    <Star size={12} fill="currentColor" /> {level}
                </div>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner relative z-10 border border-white/5">
                <div 
                    className="absolute h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-200 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                    style={{width: `${progress}%`}} 
                >
                    <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite] skew-x-12"></div>
                </div>
            </div>
        </div>

        {/* Mobile Notification/Settings Toggles */}
        <div className="md:hidden flex items-center gap-3 ml-auto">
           <button 
              onClick={() => { setNotifOpen(!notifOpen); if(!notifOpen) markAllRead(); }}
              className="w-10 h-10 rounded-xl bg-slate-800/50 border border-white/10 flex items-center justify-center text-slate-400 relative active:scale-95 backdrop-blur-md"
            >
               <Bell size={18} className={unreadCount > 0 ? 'animate-[swing_1s_ease-in-out_infinite]' : ''} />
               {unreadCount > 0 && <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0f172a] shadow-[0_0_8px_#f43f5e]"></div>}
           </button>
           <button 
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-xl bg-slate-800/50 border border-white/10 flex items-center justify-center text-slate-400 active:scale-95 backdrop-blur-md"
            >
               <Settings size={18} className="animate-[spin_4s_linear_infinite_paused] hover:animate-running" />
           </button>
        </div>
      </div>

      {/* Desktop Actions & Clock */}
      <div className="hidden md:flex items-center gap-4">
        
        <div className="px-6 py-2 bg-[#0f172a]/60 backdrop-blur-2xl border border-white/5 rounded-2xl flex flex-col items-end shadow-sm hover:bg-[#1e293b]/60 transition-colors duration-300 group cursor-default">
             <div className="text-xl font-mono font-bold text-white leading-none tracking-wider group-hover:text-indigo-300 transition-colors">{timeStr}</div>
             <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1.5">{dateStr}</div>
        </div>
        
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-2"></div>
        
        <div className="flex items-center gap-3 relative">
          <button 
            onClick={() => { setNotifOpen(!notifOpen); if(!notifOpen) markAllRead(); }}
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group relative overflow-hidden ${notifOpen ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'bg-[#0f172a]/50 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800/80 hover:border-white/20'}`}
          >
            <div className="relative z-10">
                <Bell size={20} className={`transition-transform group-hover:scale-110 ${unreadCount > 0 ? 'animate-[swing_1s_ease-in-out_infinite]' : ''}`} />
            </div>
            {unreadCount > 0 && <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0f172a] shadow-[0_0_5px_#f43f5e] z-20"></span>}
          </button>
          
          <button 
            onClick={onOpenSettings}
            className="w-12 h-12 rounded-2xl border border-white/10 bg-[#0f172a]/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 hover:border-white/20 transition-all duration-300 group backdrop-blur-md"
          >
            <Settings size={20} className="group-hover:rotate-90 transition-transform duration-700 ease-out" />
          </button>
        </div>
      </div>

      {/* Notification Dropdown - Glassmorphism 2.0 */}
      {notifOpen && (
        <>
        <div className="fixed inset-0 z-[998]" onClick={() => setNotifOpen(false)}></div>
        <div className="absolute right-0 top-20 w-full md:w-[420px] bg-[#020617]/90 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-2xl z-[999] overflow-hidden animate-slideUp origin-top-right ring-1 ring-white/5 max-h-[70vh] flex flex-col">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
            
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-indigo-900/10 to-transparent shrink-0 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_#6366f1]"></div>
                    <span className="font-black text-white text-xs uppercase tracking-[0.25em]">Command Log</span>
                </div>
                <button onClick={() => setNotifOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={14} className="text-slate-400 hover:text-white"/></button>
            </div>
            
            <div className="overflow-y-auto no-scrollbar p-3 relative z-10 space-y-1">
            {state.notifications.length === 0 ? (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5"><Bell size={24} className="opacity-50" /></div>
                    <span className="text-sm font-medium">All systems quiet.</span>
                </div>
            ) : (
                state.notifications.map(n => (
                <div key={n.id} className={`p-4 rounded-2xl border transition-all relative group ${!n.read ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                    {!n.read && <div className="absolute left-0 top-4 bottom-4 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_10px_#6366f1]" />}
                    <div className="flex gap-4 pl-2">
                        <div className={`mt-1 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border border-white/5 ${!n.read ? 'bg-[#020617] shadow-lg' : 'bg-white/5'}`}>
                            {getIcon(n.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                                <div className={`font-bold text-sm truncate ${!n.read ? 'text-white' : 'text-slate-400'}`}>{n.title}</div>
                                <div className="text-xs text-slate-600 font-mono">{new Date(n.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors">{n.message}</div>
                        </div>
                    </div>
                </div>
                ))
            )}
            </div>
            
            <div className="p-3 border-t border-white/5 bg-[#020617]/50 backdrop-blur-sm flex justify-center">
                <button onClick={markAllRead} className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">Mark all read</button>
            </div>
        </div>
        </>
    )}
    </header>
  );
};