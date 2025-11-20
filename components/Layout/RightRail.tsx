
import React, { useState, useEffect } from 'react';
import { User, BellRing, Droplets, MoonStar, ChevronRight, Activity, Database, Smartphone } from 'lucide-react';
import { Sparkline } from '../ui/Sparkline';
import { useApp } from '../../hooks/useAppContext';
import { MANDATORY_PRAYERS, WATER_GOAL } from '../../constants';

export const RightRail: React.FC = () => {
  const { state, setTab } = useApp();
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);

  // Calculate Next Prayer
  useEffect(() => {
    const calcNext = () => {
      // Simple logic: finding the first unchecked mandatory prayer
      const next = MANDATORY_PRAYERS.find(p => !state.dailyPrayerStatus[p as keyof typeof state.dailyPrayerStatus]);
      setNextPrayer(next ? next.charAt(0).toUpperCase() + next.slice(1) : "All Done");
    };
    calcNext();
    const timer = setInterval(calcNext, 60000);
    return () => clearInterval(timer);
  }, [state.dailyPrayerStatus]);

  // Prepare History Data for Sparkline (Last 7 entries)
  const historyValues = state.prayerHistory.daily.map(d => d.value);
  
  const waterLeft = Math.max(0, WATER_GOAL - state.hygieneCompleted.water);

  return (
    <aside className="hidden xl:flex flex-col w-80 h-[calc(100vh-40px)] sticky top-5 gap-4">
      
      {/* Profile / Status Card */}
      <div className="glass-panel rounded-[24px] p-5 flex items-center gap-4 bg-gradient-to-b from-indigo-500/10 to-sky-500/5 border border-white/10">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg">
          <User className="text-indigo-400" size={24} />
        </div>
        <div>
          <div className="font-black text-white text-sm uppercase tracking-wide">Zohaib's Dashboard</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5 font-bold">
            <Smartphone size={10} />
            <span>System Synchronized</span>
          </div>
        </div>
      </div>

      {/* Real-Time Stats Chart */}
      <div className="glass-panel rounded-[24px] p-6 border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-slate-200 text-sm flex items-center gap-2"><Activity size={14} className="text-indigo-400"/> Prayer Activity</span>
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20">7 Days</span>
        </div>
        <Sparkline data={historyValues} color="#6366f1" />
        <div className="text-xs text-slate-500 mt-4 text-center font-medium">
          Current consistency streak: <span className="text-white font-bold">{state.prayerStreak} days</span>.
        </div>
      </div>

      {/* Dynamic Reminders Panel */}
      <div className="glass-panel rounded-[24px] p-6 flex-1 border border-white/10 flex flex-col">
        <div className="flex items-center gap-2 mb-6 text-sky-300">
          <BellRing size={18} />
          <span className="font-bold text-sm uppercase tracking-wider">Live Status</span>
        </div>
        
        <div className="space-y-4">
            {/* Next Prayer Widget */}
            <button 
                onClick={() => setTab('prayer')}
                className="w-full p-4 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center gap-4 hover:bg-slate-800 transition-colors group text-left"
            >
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <MoonStar size={18} />
                </div>
                <div className="flex-1">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Next Prayer</div>
                    <div className="text-white font-bold">{nextPrayer}</div>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-white" />
            </button>

            {/* Water Widget */}
            <button 
                onClick={() => setTab('hygiene')}
                className="w-full p-4 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center gap-4 hover:bg-slate-800 transition-colors group text-left"
            >
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <Droplets size={18} />
                </div>
                <div className="flex-1">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Hydration</div>
                    <div className="text-white font-bold">{waterLeft > 0 ? `${waterLeft} cups remaining` : 'Daily Goal Met!'}</div>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-white" />
            </button>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
            <div className="text-[10px] text-slate-600 text-center italic flex items-center justify-center gap-2">
                <Database size={10} /> Data safe on Refresh/Close
            </div>
        </div>
      </div>
    </aside>
  );
};
