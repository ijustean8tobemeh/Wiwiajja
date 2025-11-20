
import React, { useState } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { ArrowLeft, Check, BarChart2, Trophy, Calendar, Users, Star, RotateCcw, MoonStar } from 'lucide-react';
import { MANDATORY_PRAYERS, PRAYER_NAMES_URDU, toArabicNum } from '../../constants';
import { StatsChart } from '../Shared/StatsChart';
import { generateAchievements } from '../../utils/achievementSystem';
import { GrowthVisual } from '../Shared/GrowthVisual';

export const PrayerPage: React.FC = () => {
  const { state, updateState, setTab, addNotification } = useApp();
  const [subTab, setSubTab] = useState<'tracker'|'qaza'|'stats'|'awards'>('tracker');
  
  const prayers = ['tahajjud', ...MANDATORY_PRAYERS];
  const achievements = generateAchievements('Prayer');

  const togglePrayer = (p: string) => {
    const key = p as keyof typeof state.dailyPrayerStatus;
    const newStatus = !state.dailyPrayerStatus[key];
    const time = new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'});
    
    const newLog = { ...state.prayerLogTimes };
    if (newStatus) newLog[key] = time; else delete newLog[key];
    
    const newDaily = { ...state.dailyPrayerStatus, [key]: newStatus };
    
    const newMeta = { ...state.dailyPrayerMeta };
    if (newStatus && !newMeta[p]) {
        newMeta[p] = { jamah: false, khushu: 3 };
    }

    updateState({ dailyPrayerStatus: newDaily, prayerLogTimes: newLog, dailyPrayerMeta: newMeta });
    
    if (newStatus) {
        addNotification('Spiritual Log', `${PRAYER_NAMES_URDU[p]} recorded successfully.`, 'success');
    }
  };

  const toggleJamah = (p: string) => {
      if (!state.dailyPrayerStatus[p as keyof typeof state.dailyPrayerStatus]) return;
      const current = state.dailyPrayerMeta[p] || { jamah: false, khushu: 3 };
      updateState({
          dailyPrayerMeta: { ...state.dailyPrayerMeta, [p]: { ...current, jamah: !current.jamah } }
      });
  };

  const setKhushu = (p: string, rating: number) => {
      if (!state.dailyPrayerStatus[p as keyof typeof state.dailyPrayerStatus]) return;
      const current = state.dailyPrayerMeta[p] || { jamah: false, khushu: 3 };
      updateState({
          dailyPrayerMeta: { ...state.dailyPrayerMeta, [p]: { ...current, khushu: rating } }
      });
  };

  const updateQaza = (p: string, change: number) => {
      const key = p as keyof typeof state.qazaCount;
      const current = state.qazaCount[key] || 0;
      const newVal = Math.max(0, current + change);
      updateState({ qazaCount: { ...state.qazaCount, [key]: newVal } });
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-28">
      {/* Animated Header */}
      <div className="relative mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] border border-indigo-500/20 p-8 md:p-10 shadow-2xl ring-1 ring-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                  <button onClick={() => setTab('dashboard')} className="flex items-center gap-2 text-indigo-300 hover:text-white font-bold transition-colors text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 w-fit border border-white/5">
                      <ArrowLeft size={14} /> Dashboard
                  </button>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 font-serif tracking-tight mb-2 drop-shadow-sm">
                      Salah Tracker
                  </h2>
                  <p className="text-indigo-200/60 text-sm md:text-base font-medium tracking-wide">"Success comes to those who pray."</p>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-transparent flex items-center justify-center text-indigo-400 border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.2)] rotate-6 backdrop-blur-md">
                  <MoonStar size={48} strokeWidth={1.5} />
              </div>
          </div>
      </div>

      <div className="flex bg-[#0f172a]/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar mb-10 sticky top-4 z-40 shadow-2xl ring-1 ring-black/20">
            <button onClick={() => setSubTab('tracker')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'tracker' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:text-white'}`}><Calendar size={18}/><span className="hidden md:inline text-xs font-black uppercase tracking-widest">Tracker</span></button>
            <button onClick={() => setSubTab('qaza')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'qaza' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:text-white'}`}><RotateCcw size={18}/><span className="hidden md:inline text-xs font-black uppercase tracking-widest">Qaza</span></button>
            <button onClick={() => setSubTab('stats')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'stats' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:text-white'}`}><BarChart2 size={18}/><span className="hidden md:inline text-xs font-black uppercase tracking-widest">Stats</span></button>
            <button onClick={() => setSubTab('awards')} className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${subTab === 'awards' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:text-white'}`}><Trophy size={18}/><span className="hidden md:inline text-xs font-black uppercase tracking-widest">Awards</span></button>
      </div>
      
      {subTab === 'tracker' && (
          <div className="mb-12 text-center animate-fadeIn">
               <div className="flex justify-center mb-6 relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full"></div>
                    <GrowthVisual streak={state.prayerStreak} type="nature" size="lg" />
               </div>
               <div className="font-serif text-5xl font-black text-white drop-shadow-2xl mb-2">{state.privacyMode ? '****' : toArabicNum(state.prayerStreak)}</div>
               <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] border border-indigo-500/30 px-3 py-1 rounded-full bg-indigo-500/10">Consistent Streak</span>
          </div>
      )}

      {subTab === 'tracker' && (
        <div className="animate-slideUp space-y-4">
            {prayers.map((p, idx) => {
            const active = state.dailyPrayerStatus[p as keyof typeof state.dailyPrayerStatus];
            const meta = state.dailyPrayerMeta[p] || { jamah: false, khushu: 3 };
            
            return (
                <div key={p} className="relative group perspective-1000">
                    {/* NEON GLOW BORDER */}
                    <div className={`absolute -inset-0.5 rounded-[26px] blur-md transition duration-500 ${active ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-60' : 'bg-white opacity-0 group-hover:opacity-5'}`}></div>
                    
                    <div className={`relative w-full p-6 md:p-7 rounded-[24px] border transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 ${active ? 'bg-[#0f172a] border-transparent shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]' : 'bg-[#1e293b]/40 border-white/5 hover:bg-[#1e293b]/60'}`}>
                        
                        <button onClick={() => togglePrayer(p)} className="flex items-center gap-6 flex-1 w-full md:w-auto group/btn">
                             <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 font-serif shrink-0 shadow-inner ${active ? 'bg-indigo-500 text-white rotate-3 scale-110 shadow-indigo-500/40' : 'bg-[#0f172a] border border-white/10 text-slate-600 group-hover/btn:border-indigo-500/30 group-hover/btn:text-indigo-400'}`}>
                                {active ? <Check size={28} strokeWidth={4} /> : toArabicNum(idx + 1)}
                            </div>
                            <div className="text-left flex-1">
                                <div className="flex items-baseline justify-between md:justify-start gap-6">
                                    <div className={`font-serif text-4xl font-bold transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} dir="rtl" lang="ur">
                                        {PRAYER_NAMES_URDU[p]}
                                    </div>
                                    <div className={`text-xs font-black uppercase tracking-[0.2em] ${active ? 'text-indigo-400' : 'text-slate-600'}`}>{p}</div>
                                </div>
                            </div>
                        </button>

                        {active && (
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-5 md:pt-0 animate-fadeIn">
                                <div className="flex flex-col items-end gap-1 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                                     <span className="text-[9px] font-bold text-slate-500 uppercase">Logged At</span>
                                     <span className="text-sm font-mono font-bold text-indigo-300">{state.prayerLogTimes[p]}</span>
                                </div>
                                
                                <div className="flex gap-1 bg-slate-900/50 p-1.5 rounded-xl border border-white/5">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button key={star} onClick={() => setKhushu(p, star)} className={`transition-transform hover:scale-125 p-1 ${star <= meta.khushu ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]' : 'text-slate-700'}`}>
                                            <Star size={16} fill={star <= meta.khushu ? "currentColor" : "none"} />
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => toggleJamah(p)} className={`p-3 rounded-xl transition-all ${meta.jamah ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-600 hover:text-emerald-400'}`}>
                                    <Users size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
            })}
        </div>
      )}

      {subTab === 'qaza' && (
          <div className="animate-slideUp max-w-2xl mx-auto">
              <div className="bg-indigo-900/10 p-10 rounded-[32px] border border-indigo-500/20 text-center mb-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-black text-white mb-2">Qaza Bank</h3>
                  <p className="text-sm text-indigo-200/70">"Allah does not burden a soul beyond that it can bear."</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                  {[...MANDATORY_PRAYERS, 'witr'].map(p => (
                      <div key={p} className="flex items-center justify-between p-5 bg-[#1e293b]/40 border border-white/5 rounded-2xl hover:border-white/10 transition-colors group">
                          <div className="font-bold text-xl text-slate-200 capitalize flex items-center gap-4">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:shadow-[0_0_10px_#6366f1] transition-all"></div>
                              {p}
                          </div>
                          <div className="flex items-center gap-6 bg-[#0f172a] p-2 rounded-xl border border-white/5 shadow-inner">
                              <button onClick={() => updateQaza(p, -1)} className="w-10 h-10 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-rose-500/20 transition-all flex items-center justify-center font-bold text-xl active:scale-90">-</button>
                              <div className="w-16 text-center font-mono font-bold text-2xl text-white">{state.qazaCount[p as keyof typeof state.qazaCount] || 0}</div>
                              <button onClick={() => updateQaza(p, 1)} className="w-10 h-10 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-900/20 active:scale-90">+</button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {subTab === 'stats' && (
        <div className="animate-slideUp">
            <div className="bg-[#0f172a]/60 p-8 rounded-[32px] border border-white/5 mb-6 shadow-2xl ring-1 ring-white/5">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3"><div className="w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></div> Weekly Consistency</h3>
                <StatsChart data={state.prayerHistory.daily} color="#818cf8" height={300} />
            </div>
        </div>
      )}

      {subTab === 'awards' && (
        <div className="animate-slideUp grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => {
                const unlocked = state.prayerStreak >= ach.requiredCount;
                return (
                    <div key={ach.id} className={`p-6 rounded-2xl border flex items-center gap-5 transition-all duration-500 group ${unlocked ? 'bg-gradient-to-br from-indigo-900/20 to-[#0f172a] border-indigo-500/30 shadow-lg shadow-indigo-900/20' : 'bg-[#0f172a]/40 border-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-80'}`}>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border transition-transform group-hover:scale-110 ${unlocked ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-slate-800 text-slate-600 border-slate-700'}`}>
                            {unlocked ? <Trophy size={24} className="animate-bounce-slow" /> : '🔒'}
                        </div>
                        <div>
                            <div className={`font-bold text-base ${unlocked ? 'text-white' : 'text-slate-500'}`}>{ach.title}</div>
                            <div className="text-xs text-slate-500 mt-1">{ach.description}</div>
                            {unlocked && <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mt-2 flex items-center gap-1"><Check size={10} /> Unlocked</div>}
                        </div>
                    </div>
                );
            })}
        </div>
      )}
    </div>
  );
};
