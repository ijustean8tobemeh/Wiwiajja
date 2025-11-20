
import React, { useState } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { ArrowLeft, RotateCw, BarChart2, Trophy, Hand, Moon, Check, Sparkles, Zap } from 'lucide-react';
import { DHIKR_GOAL, DHIKR_INCREMENT, DHIKR_BENEFITS, toArabicNum } from '../../constants';
import { StatsChart } from '../Shared/StatsChart';
import { generateAchievements } from '../../utils/achievementSystem';
import { GrowthVisual } from '../Shared/GrowthVisual';

export const DhikrPage: React.FC = () => {
  const { state, updateState, setTab, addNotification } = useApp();
  const [subTab, setSubTab] = useState<'tracker'|'night'|'stats'|'awards'>('tracker');
  const [animating, setAnimating] = useState<string | null>(null);

  const achievements = generateAchievements('Dhikr');

  const increment = (type: 'astaghfirullah' | 'rabbi') => {
    setAnimating(type);
    setTimeout(() => setAnimating(null), 150);

    if (type === 'astaghfirullah') {
      if (state.astaghfirullahCount < DHIKR_GOAL) {
        updateState({ astaghfirullahCount: state.astaghfirullahCount + DHIKR_INCREMENT });
      }
    } else {
      if (state.rabbiCount < DHIKR_GOAL) {
        updateState({ rabbiCount: state.rabbiCount + DHIKR_INCREMENT });
      }
    }
    
    if ((state.astaghfirullahCount + state.rabbiCount + DHIKR_INCREMENT) % 500 === 0) {
        addNotification('Dhikr Milestone', 'Keep your tongue moist with remembrance.', 'info');
    }
  };

  const toggleSleep = (type: 'mulk' | 'baqarah') => {
      const newVal = !state.sleepProtection[type];
      const newState = { ...state.sleepProtection, [type]: newVal };
      updateState({ sleepProtection: newState });
      
      if (newVal) {
          addNotification('Night Protocol', `${type === 'mulk' ? 'Surah Mulk' : 'Ayat al-Kursi'} Secure`, 'success');
      }
  };

  const DigitalCounter = ({ type, arabic, count, color, colorHex, isLong }: any) => {
      const percent = Math.min(100, (count / DHIKR_GOAL) * 100);
      const radius = 50;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;
      
      return (
        <button 
            onClick={() => increment(type)}
            className={`group relative w-full aspect-square rounded-[40px] bg-[#1e293b]/40 border border-white/5 hover:bg-[#1e293b]/60 active:scale-[0.98] transition-all duration-200 flex flex-col items-center justify-center overflow-hidden p-2`}
        >
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                 <svg className="w-full h-full max-w-[280px] rotate-[-90deg]" viewBox="0 0 120 120">
                     <circle cx="60" cy="60" r={radius} fill="none" stroke="#334155" strokeWidth="8" />
                     <circle 
                        cx="60" cy="60" r={radius} fill="none" stroke={colorHex} strokeWidth="8" 
                        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                     />
                 </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-2">
                <div className={`font-black text-white font-serif leading-tight drop-shadow-2xl transition-transform duration-200 ${isLong ? 'text-lg md:text-2xl' : 'text-3xl md:text-5xl'} ${animating === type ? 'scale-110' : 'scale-100'} text-center mb-2`} dir="rtl">
                    {arabic}
                </div>
                
                <div className="text-4xl font-mono font-bold text-slate-200 tabular-nums tracking-tighter mt-2">
                    {state.privacyMode ? '***' : count}
                </div>
                <div className="text-[10px] text-slate-500 font-sans font-bold mt-1 uppercase tracking-widest">
                     Target: {state.privacyMode ? '***' : DHIKR_GOAL}
                </div>
            </div>

            {animating === type && (
                <div className={`absolute inset-0 rounded-[40px] ring-4 ring-inset ${color.replace('text-', 'ring-')} opacity-20 animate-ping`}></div>
            )}
        </button>
      );
  };

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto pb-28">
      
      {/* PREMIUM HEADER - TEAL THEME */}
      <div className="relative mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#115e59] to-[#0f172a] border border-teal-500/20 p-8 md:p-10 shadow-2xl group ring-1 ring-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                  <button onClick={() => setTab('dashboard')} className="flex items-center gap-2 text-teal-300 hover:text-white font-bold transition-colors text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 w-fit border border-white/5">
                      <ArrowLeft size={14} /> Dashboard
                  </button>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 font-serif tracking-tight mb-2 drop-shadow-sm">
                      Digital Tasbih
                  </h2>
                  <p className="text-teal-200/60 text-sm md:text-base font-medium tracking-wide">"Remembrance of Allah polishes the heart."</p>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-[2rem] bg-gradient-to-br from-teal-500/20 to-transparent flex items-center justify-center text-teal-400 border border-teal-500/30 shadow-[0_0_40px_rgba(45,212,191,0.2)] rotate-6 backdrop-blur-md">
                  <Hand size={48} strokeWidth={1.5} />
              </div>
          </div>
      </div>

      <div className="flex bg-slate-900/50 backdrop-blur-md p-1 rounded-2xl border border-white/10 w-full overflow-x-auto no-scrollbar shadow-xl mb-8 sticky top-4 z-40 ring-1 ring-black/20">
          <button onClick={() => setSubTab('tracker')} className={`flex-1 px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'tracker' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-slate-400 hover:text-white'}`}><Sparkles size={18}/><span className="hidden md:inline text-xs font-black uppercase tracking-widest">Tasbih</span></button>
          <button onClick={() => setSubTab('night')} className={`flex-1 px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'night' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-slate-400 hover:text-white'}`}><Moon size={18}/><span className="hidden md:inline text-xs font-black uppercase tracking-widest">Night</span></button>
          <button onClick={() => setSubTab('stats')} className={`flex-1 px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'stats' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-slate-400 hover:text-white'}`}><BarChart2 size={18}/><span className="hidden md:inline text-xs font-black uppercase tracking-widest">Stats</span></button>
          <button onClick={() => setSubTab('awards')} className={`flex-1 px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'awards' ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'text-slate-400 hover:text-white'}`}><Trophy size={18}/><span className="hidden md:inline text-xs font-black uppercase tracking-widest">Awards</span></button>
      </div>
      
      {subTab === 'tracker' && (
          <div className="mb-8 flex flex-col items-center justify-center relative">
             <div className="absolute inset-0 bg-teal-500/20 blur-[60px] rounded-full animate-pulse"></div>
             <div className="relative z-10">
                <GrowthVisual streak={state.dhikrStreak} type="light" size="lg" />
             </div>
             <div className="mt-6 text-xs text-teal-400 font-black uppercase tracking-[0.2em] border border-teal-500/20 px-4 py-1.5 rounded-full bg-teal-900/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                Consistency Streak: {state.privacyMode ? '***' : state.dhikrStreak} Days
             </div>
          </div>
      )}

      {subTab === 'tracker' && (
        <div className="animate-slideUp space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DigitalCounter 
                    type="astaghfirullah"
                    arabic="أَسْتَغْفِرُ ٱللَّٰهَ"
                    count={state.astaghfirullahCount}
                    color="text-emerald-400"
                    colorHex="#34d399"
                    isLong={false}
                />
                <DigitalCounter 
                    type="rabbi"
                    arabic="رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ"
                    count={state.rabbiCount}
                    color="text-teal-400"
                    colorHex="#2dd4bf"
                    isLong={true}
                />
            </div>

            <div className="flex justify-center">
                <button 
                    onClick={() => { if(confirm('Reset today\'s count?')) updateState({ astaghfirullahCount: 0, rabbiCount: 0 }); }}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-rose-400 font-bold px-6 py-3 rounded-full hover:bg-rose-500/10 transition-colors border border-transparent hover:border-rose-500/20"
                >
                    <RotateCw size={14} /> Reset Session
                </button>
            </div>
        </div>
      )}

      {subTab === 'night' && (
        <div className="animate-slideUp max-w-3xl mx-auto">
            <div className="text-center mb-10 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/20 blur-[50px] rounded-full"></div>
                <h2 className="text-3xl font-black text-white mb-2 relative z-10">Night Fortress</h2>
                <p className="text-sm text-slate-400 relative z-10">"Sleep is the sister of death." Protect your soul before you rest.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <button 
                    onClick={() => toggleSleep('mulk')}
                    className={`group w-full p-6 rounded-[24px] border transition-all duration-300 flex items-center justify-between relative overflow-hidden ${state.sleepProtection.mulk ? 'bg-indigo-600 border-indigo-400 shadow-2xl shadow-indigo-900/50' : 'bg-[#1e293b]/60 border-white/5 hover:bg-[#1e293b]'}`}
                >
                    <div className="relative z-10 flex items-center gap-5">
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-serif transition-colors ${state.sleepProtection.mulk ? 'bg-white text-indigo-600' : 'bg-slate-800 text-slate-500'}`}>
                             م
                         </div>
                         <div className="text-left">
                             <div className={`font-bold text-xl ${state.sleepProtection.mulk ? 'text-white' : 'text-slate-200'}`}>Surah Mulk</div>
                             <div className={`text-xs ${state.sleepProtection.mulk ? 'text-indigo-200' : 'text-slate-500'}`}>Intercessor in the grave</div>
                         </div>
                    </div>
                    {state.sleepProtection.mulk && <div className="relative z-10 bg-white/20 p-2 rounded-full"><Check size={20} className="text-white" /></div>}
                    {state.sleepProtection.mulk && <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-100"></div>}
                </button>

                <button 
                    onClick={() => toggleSleep('baqarah')}
                    className={`group w-full p-6 rounded-[24px] border transition-all duration-300 flex items-center justify-between relative overflow-hidden ${state.sleepProtection.baqarah ? 'bg-indigo-600 border-indigo-400 shadow-2xl shadow-indigo-900/50' : 'bg-[#1e293b]/60 border-white/5 hover:bg-[#1e293b]'}`}
                >
                     <div className="relative z-10 flex items-center gap-5">
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-serif transition-colors ${state.sleepProtection.baqarah ? 'bg-white text-indigo-600' : 'bg-slate-800 text-slate-500'}`}>
                             ب
                         </div>
                         <div className="text-left">
                             <div className={`font-bold text-xl ${state.sleepProtection.baqarah ? 'text-white' : 'text-slate-200'}`}>Last 2 Ayats of Baqarah</div>
                             <div className={`text-xs ${state.sleepProtection.baqarah ? 'text-indigo-200' : 'text-slate-500'}`}>Suffice for the night</div>
                         </div>
                    </div>
                    {state.sleepProtection.baqarah && <div className="relative z-10 bg-white/20 p-2 rounded-full"><Check size={20} className="text-white" /></div>}
                    {state.sleepProtection.baqarah && <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-100"></div>}
                </button>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center">
                 <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Consistency Streak</div>
                 <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600">{state.privacyMode ? '****' : state.sleepStreak}</div>
            </div>
        </div>
      )}

      {subTab === 'stats' && (
        <div className="animate-slideUp max-w-3xl mx-auto">
             <div className="bg-[#1e293b]/60 p-8 rounded-[32px] border border-white/5 backdrop-blur-md shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Zap className="text-teal-400" size={18} /> Weekly Volume</h3>
                <StatsChart data={state.dhikrHistory.daily} color="#2dd4bf" />
            </div>
        </div>
      )}

      {subTab === 'awards' && (
        <div className="animate-slideUp grid grid-cols-1 md:grid-cols-2 gap-4">
             {achievements.slice(0, 20).map((ach) => {
                 const unlocked = state.dhikrStreak >= ach.requiredCount;
                 return (
                    <div key={ach.id} className={`p-5 rounded-2xl border flex items-center gap-4 transition-all ${unlocked ? 'bg-teal-900/20 border-teal-500/30 shadow-lg shadow-teal-900/10' : 'bg-slate-900/20 border-white/5 opacity-40 grayscale'}`}>
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${unlocked ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-600'}`}>
                            <Trophy size={20} />
                         </div>
                         <div>
                             <div className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-slate-500'}`}>{ach.title}</div>
                             <div className="text-xs text-slate-500">{ach.description}</div>
                         </div>
                     </div>
                 );
             })}
        </div>
      )}
    </div>
  );
};
