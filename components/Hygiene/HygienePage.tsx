
import React, { useState } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { ArrowLeft, BarChart2, Trophy, Calendar, ShieldCheck, Droplets, Wind, Flame } from 'lucide-react';
import { WATER_GOAL, SMOKING_LIMIT, NICOTINE_LIMIT } from '../../constants';
import { StatsChart } from '../Shared/StatsChart';
import { generateAchievements } from '../../utils/achievementSystem';
import { GrowthVisual } from '../Shared/GrowthVisual';

export const HygienePage: React.FC = () => {
  const { state, updateState, setTab, addNotification } = useApp();
  const [subTab, setSubTab] = useState<'tracker'|'stats'|'awards'>('tracker');
  
  const achievements = [
      ...generateAchievements('Hygiene'),
      ...generateAchievements('Habit')
  ];

  const toggleHygiene = (key: 'brush' | 'shower') => {
    const newValue = !state.hygieneCompleted[key];
    updateState({
      hygieneCompleted: { ...state.hygieneCompleted, [key]: newValue }
    });
    
    if (newValue) {
        addNotification('Hygiene', `${key === 'brush' ? 'Brushed Teeth' : 'Shower Taken'} logged.`, 'success');
    }
  };

  const addWater = () => {
    if (state.hygieneCompleted.water < WATER_GOAL) {
      const newVal = state.hygieneCompleted.water + 1;
      updateState({
        hygieneCompleted: { ...state.hygieneCompleted, water: newVal }
      });
      if (newVal === WATER_GOAL) {
          addNotification('Hydration', 'Daily Water Goal Reached! 💧', 'success');
      } else {
          addNotification('Hydration', 'Water recorded.', 'info');
      }
    }
  };

  const incrementHabit = (key: 'smokingCount' | 'nicotineCount') => {
    const current = state.habitCompleted[key];
    const limit = key === 'smokingCount' ? SMOKING_LIMIT : NICOTINE_LIMIT;
    const newValue = current + 1;
    
    updateState({
        habitCompleted: { ...state.habitCompleted, [key]: newValue }
    });

    if (newValue > limit) {
        addNotification('Control Alert', `Limit exceeded for ${key === 'smokingCount' ? 'Smoking' : 'Nicotine'}. Stay strong.`, 'warning');
    } else {
        addNotification('Tracker', 'Usage recorded.', 'info');
    }
  };

  const styles = {
    sky: {
        border: 'border-sky-500/50',
        text: 'text-sky-400',
        bg: 'bg-sky-500',
        bgHover: 'hover:bg-sky-400',
        iconBg: 'bg-sky-500'
    },
    blue: {
        border: 'border-blue-500/50',
        text: 'text-blue-400',
        bg: 'bg-blue-500',
        bgHover: 'hover:bg-blue-400',
        iconBg: 'bg-blue-500'
    },
    amber: {
        border: 'border-amber-500/50',
        text: 'text-amber-400',
        bg: 'bg-amber-500',
        bgHover: 'hover:bg-amber-400',
        iconBg: 'bg-amber-500'
    },
    emerald: {
        border: 'border-emerald-500/50',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500',
        bgHover: 'hover:bg-emerald-400',
        iconBg: 'bg-emerald-500'
    }
  };

  const DetailCard = ({ title, icon: Icon, currentVal, currentLabel, overallVal, overallLabel, action, actionLabel, active, colorClass, limit }: any) => {
      const isLimitExceeded = limit && currentVal > limit;
      const s = styles[colorClass as keyof typeof styles];

      return (
          <div className={`relative p-6 rounded-[32px] border transition-all duration-500 overflow-hidden group ${active ? `bg-[#0f172a] ${s.border} shadow-[0_0_30px_rgba(0,0,0,0.2)]` : 'bg-slate-900/40 border-white/5 hover:bg-slate-900/60'}`}>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
               
               <div className="flex justify-between items-start mb-6 relative z-10">
                   <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 shadow-lg ${active ? `${s.iconBg} text-white scale-110 rotate-3` : `bg-slate-800 ${s.text}`}`}>
                           <Icon size={24} />
                       </div>
                       <div>
                           <h3 className="font-black text-white text-lg">{title}</h3>
                           <div className={`text-[10px] font-bold uppercase tracking-wider ${isLimitExceeded ? 'text-rose-500' : 'text-slate-500'}`}>
                               {isLimitExceeded ? 'Limit Exceeded' : 'Under Control'}
                           </div>
                       </div>
                   </div>
                   
                   {/* Overall Stat (Streak) */}
                   <div className="text-right">
                       <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">{overallLabel}</div>
                       <div className="font-mono font-bold text-xl text-white">{overallVal}</div>
                   </div>
               </div>

               {/* Current Stat (Today) */}
               <div className="flex items-end justify-between gap-4 relative z-10">
                   <div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">{currentLabel}</div>
                        <div className={`font-mono font-black text-4xl ${isLimitExceeded ? 'text-rose-500' : s.text}`}>
                            {currentVal} <span className="text-sm text-slate-600 font-sans font-medium">/ {limit || 'Goal'}</span>
                        </div>
                   </div>
                   
                   <button 
                    onClick={action}
                    className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition-all active:scale-95 shadow-lg ${active ? `${s.bg} text-white ${s.bgHover}` : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                   >
                       {actionLabel}
                   </button>
               </div>

               {/* Progress Bar if limit exists */}
               {limit && (
                   <div className="mt-5 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div 
                        className={`h-full transition-all duration-500 ${isLimitExceeded ? 'bg-rose-500' : s.bg}`}
                        style={{width: `${Math.min(100, (currentVal / limit) * 100)}%`}}
                       ></div>
                   </div>
               )}
          </div>
      );
  };

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto pb-28">
      
       {/* PREMIUM HEADER - SKY THEME */}
       <div className="relative mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#0c4a6e] to-[#0f172a] border border-sky-500/20 p-8 md:p-10 shadow-2xl group ring-1 ring-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                  <button onClick={() => setTab('dashboard')} className="flex items-center gap-2 text-sky-300 hover:text-white font-bold transition-colors text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 w-fit border border-white/5">
                      <ArrowLeft size={14} /> Dashboard
                  </button>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200 font-serif tracking-tight mb-2 drop-shadow-sm">
                      Pure Life
                  </h2>
                  <p className="text-sky-200/60 text-sm md:text-base font-medium tracking-wide">"Cleanliness is half of faith."</p>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-[2rem] bg-gradient-to-br from-sky-500/20 to-transparent flex items-center justify-center text-sky-400 border border-sky-500/30 shadow-[0_0_40px_rgba(14,165,233,0.2)] rotate-6 backdrop-blur-md">
                  <Droplets size={48} strokeWidth={1.5} />
              </div>
          </div>
      </div>

      <div className="flex bg-slate-900/80 backdrop-blur-sm p-1 rounded-2xl border border-white/10 shadow-lg sticky top-4 z-40 mb-10">
            <button onClick={() => setSubTab('tracker')} className={`flex-1 px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'tracker' ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50' : 'text-slate-400 hover:text-white'}`}><Calendar size={16}/><span className="hidden md:block text-xs font-bold uppercase tracking-wider">Tracker</span></button>
            <button onClick={() => setSubTab('stats')} className={`flex-1 px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'stats' ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50' : 'text-slate-400 hover:text-white'}`}><BarChart2 size={16}/><span className="hidden md:block text-xs font-bold uppercase tracking-wider">History</span></button>
            <button onClick={() => setSubTab('awards')} className={`flex-1 px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'awards' ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50' : 'text-slate-400 hover:text-white'}`}><Trophy size={16}/><span className="hidden md:block text-xs font-bold uppercase tracking-wider">Awards</span></button>
      </div>

      {subTab === 'tracker' && (
        <div className="animate-slideUp space-y-10">
            
            {/* VISUAL STREAK HEADER */}
            <div className="flex flex-col items-center justify-center relative mb-8">
                <div className="absolute inset-0 bg-sky-500/20 blur-[80px] rounded-full animate-pulse"></div>
                <div className="relative z-10 scale-110">
                    <GrowthVisual streak={state.hygieneStreak} type="water" size="lg" />
                </div>
                <div className="mt-6 flex items-center gap-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 bg-sky-900/30 px-4 py-1.5 rounded-full border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
                        Clean Streak: {state.privacyMode ? '***' : state.hygieneStreak} Days
                    </div>
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-900/30 px-4 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        Habit Streak: {state.privacyMode ? '***' : state.habitStreak} Days
                    </div>
                </div>
            </div>

            {/* SECTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hygiene Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.25em] pl-4 border-l-2 border-sky-500/50">Daily Rituals</h3>
                    
                    <DetailCard 
                        title="Dental Care"
                        icon={ShieldCheck}
                        currentVal={state.hygieneCompleted.brush ? 1 : 0}
                        currentLabel="Today's Status"
                        overallVal={`${state.hygieneStreak}d`}
                        overallLabel="Clean Streak"
                        action={() => toggleHygiene('brush')}
                        actionLabel={state.hygieneCompleted.brush ? "Completed" : "Mark Done"}
                        active={state.hygieneCompleted.brush}
                        colorClass="sky"
                        limit={1}
                    />

                    <DetailCard 
                        title="Shower"
                        icon={Droplets}
                        currentVal={state.hygieneCompleted.shower ? 1 : 0}
                        currentLabel="Today's Status"
                        overallVal={`${state.hygieneStreak}d`}
                        overallLabel="Clean Streak"
                        action={() => toggleHygiene('shower')}
                        actionLabel={state.hygieneCompleted.shower ? "Completed" : "Mark Done"}
                        active={state.hygieneCompleted.shower}
                        colorClass="sky"
                        limit={1}
                    />

                    <DetailCard 
                        title="Hydration"
                        icon={Droplets}
                        currentVal={state.hygieneCompleted.water}
                        currentLabel="Glasses Drunk"
                        overallVal={`${state.hygieneStreak}d`}
                        overallLabel="Streak"
                        action={addWater}
                        actionLabel="Add Glass"
                        active={state.hygieneCompleted.water >= WATER_GOAL}
                        colorClass="blue"
                        limit={WATER_GOAL}
                    />
                </div>

                {/* Habits Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.25em] pl-4 border-l-2 border-emerald-500/50">Control Center</h3>
                    
                    <DetailCard 
                        title="Smoking"
                        icon={Flame}
                        currentVal={state.habitCompleted.smokingCount}
                        currentLabel="Today's Count"
                        overallVal={`${state.habitStreak}d`}
                        overallLabel="Clean Streak"
                        action={() => incrementHabit('smokingCount')}
                        actionLabel="Log Usage"
                        active={state.habitCompleted.smokingCount <= SMOKING_LIMIT}
                        colorClass="amber"
                        limit={SMOKING_LIMIT}
                    />

                     <DetailCard 
                        title="Nicotine"
                        icon={Wind}
                        currentVal={state.habitCompleted.nicotineCount}
                        currentLabel="Today's Count"
                        overallVal={`${state.habitStreak}d`}
                        overallLabel="Clean Streak"
                        action={() => incrementHabit('nicotineCount')}
                        actionLabel="Log Usage"
                        active={state.habitCompleted.nicotineCount <= NICOTINE_LIMIT}
                        colorClass="emerald"
                        limit={NICOTINE_LIMIT}
                    />

                    <div className="p-6 rounded-[32px] bg-slate-900/30 border border-white/5 text-center">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Why track this?</div>
                        <p className="text-sm text-slate-400 italic">"The body is an Amanah (trust). Do not harm it."</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      {subTab === 'stats' && (
        <div className="animate-slideUp space-y-6">
            <div className="bg-[#1e293b]/60 p-10 rounded-[40px] border border-white/5 backdrop-blur-md shadow-2xl ring-1 ring-white/5">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-4"><div className="w-1.5 h-8 rounded-full bg-sky-500 shadow-[0_0_10px_#0ea5e9]"></div> Hygiene Consistency</h3>
                <StatsChart data={state.hygieneHistory.daily} color="#0ea5e9" />
            </div>
             <div className="bg-[#1e293b]/60 p-10 rounded-[40px] border border-white/5 backdrop-blur-md shadow-2xl ring-1 ring-white/5">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-4"><div className="w-1.5 h-8 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div> Control Consistency</h3>
                <StatsChart data={state.habitHistory.daily} color="#10b981" />
            </div>
        </div>
      )}

      {subTab === 'awards' && (
         <div className="animate-slideUp grid grid-cols-1 md:grid-cols-2 gap-4">
             {achievements.slice(0, 50).map((ach) => {
                 const isHygiene = ach.id.startsWith('hygiene');
                 const currentVal = isHygiene ? state.hygieneStreak : state.habitStreak;
                 const unlocked = currentVal >= ach.requiredCount;
                 return (
                    <div key={ach.id} className={`p-6 rounded-2xl border flex items-center gap-5 transition-all duration-500 ${unlocked ? 'bg-[#0f172a] border-sky-500/30 shadow-lg shadow-sky-900/20' : 'bg-slate-900/20 border-white/5 opacity-40 grayscale'}`}>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/5 ${unlocked ? 'bg-slate-800 shadow-sky-500/20' : 'bg-slate-900'}`}>
                             {unlocked ? (ach.tier === 'Gold' ? '🥇' : ach.tier === 'Silver' ? '🥈' : '🥉') : '🔒'}
                        </div>
                        <div>
                             <div className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-slate-500'}`}>{ach.title}</div>
                             <div className="text-xs text-slate-500 mt-1">{ach.description}</div>
                             {unlocked && <div className="text-[10px] text-sky-400 font-bold mt-2 uppercase tracking-wider">Unlocked</div>}
                        </div>
                    </div>
                 );
             })}
        </div>
      )}
    </div>
  );
};
