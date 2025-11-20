
import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { ArrowLeft, Plus, Minus, Calendar, BarChart2, Trophy, Dumbbell, Scale, Trash2, Timer, X, Minimize2 } from 'lucide-react';
import { FITNESS_PLAN } from '../../constants';
import { StatsChart } from '../Shared/StatsChart';
import { generateAchievements } from '../../utils/achievementSystem';
import { GrowthVisual } from '../Shared/GrowthVisual';

export const FitnessPage: React.FC = () => {
  const { state, updateState, setTab, addNotification, startTimer, stopTimer, minimizeTimer } = useApp();
  const [subTab, setSubTab] = useState<'plan'|'weight'|'stats'|'awards'>('plan');
  const [weightInput, setWeightInput] = useState("");
  
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const plan = FITNESS_PLAN[dayName];
  const isRestDay = !Array.isArray(plan);
  const achievements = generateAchievements('Fitness');

  // Global Timer hooks
  const { active, seconds, type, minimized } = state.globalTimer;
  const isRestTimerActive = active && type === 'rest';

  const updateCount = (taskName: string, delta: number) => {
    const safeName = taskName.replace(/\s+/g, '');
    const current = state.fitnessCounters[safeName] || 0;
    const newVal = Math.max(0, current + delta);
    updateState({ fitnessCounters: { ...state.fitnessCounters, [safeName]: newVal } });
  };

  const addWeight = () => {
      if (!weightInput) return;
      const val = parseFloat(weightInput);
      if (isNaN(val)) return;
      updateState({
          weightLog: [...state.weightLog, { date: new Date().toISOString(), weight: val }]
      });
      setWeightInput("");
      addNotification('Body Log', 'Weight recorded successfully.', 'info');
  };

  let totalGoal = 0;
  let totalDone = 0;
  if (!isRestDay) {
    plan.forEach((t: any) => {
        totalGoal += t.total;
        const safeName = t.name.replace(/\s+/g, '');
        totalDone += Math.min(t.total, state.fitnessCounters[safeName] || 0);
    });
  }
  const progress = isRestDay ? 100 : totalGoal > 0 ? (totalDone / totalGoal) * 100 : 0;

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-28">
      {/* PREMIUM HEADER - PURPLE THEME */}
      <div className="relative mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#581c87] to-[#0f172a] border border-purple-500/20 p-8 md:p-10 shadow-2xl group ring-1 ring-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                  <button onClick={() => setTab('dashboard')} className="flex items-center gap-2 text-purple-300 hover:text-white font-bold transition-colors text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 w-fit border border-white/5">
                      <ArrowLeft size={14} /> Dashboard
                  </button>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300 tracking-tight mb-2 drop-shadow-sm font-serif">
                      Iron Temple
                  </h2>
                  <p className="text-purple-200/60 text-sm font-medium tracking-wide">"The strong believer is better and more beloved to Allah."</p>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-[2rem] bg-gradient-to-br from-purple-500/20 to-transparent flex items-center justify-center text-purple-400 border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] transform transition-transform group-hover:scale-110 group-hover:rotate-3 shrink-0 backdrop-blur-md">
                  <Dumbbell size={48} strokeWidth={1.5} />
              </div>
          </div>
      </div>

      <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar mb-10 backdrop-blur-md sticky top-4 z-40 shadow-xl ring-1 ring-black/20">
            <button onClick={() => setSubTab('plan')} className={`px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 flex-1 md:flex-none ${subTab === 'plan' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Calendar size={18}/><span className="text-xs font-black uppercase tracking-widest">Plan</span></button>
            <button onClick={() => setSubTab('weight')} className={`px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 flex-1 md:flex-none ${subTab === 'weight' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Scale size={18}/><span className="text-xs font-black uppercase tracking-widest">Weight</span></button>
            <button onClick={() => setSubTab('stats')} className={`px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 flex-1 md:flex-none ${subTab === 'stats' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><BarChart2 size={18}/><span className="text-xs font-black uppercase tracking-widest">Stats</span></button>
            <button onClick={() => setSubTab('awards')} className={`px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 flex-1 md:flex-none ${subTab === 'awards' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Trophy size={18}/><span className="text-xs font-black uppercase tracking-widest">Awards</span></button>
      </div>

      {subTab === 'plan' && (
        <div className="animate-slideUp">
             <div className="flex flex-col items-center mb-12 relative">
                <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full animate-pulse"></div>
                    <GrowthVisual streak={state.fitnessStreak} type="strength" size="lg" />
                </div>
                <div className="text-xs text-purple-400 font-black uppercase tracking-[0.3em] mt-6 bg-purple-900/20 px-4 py-1.5 rounded-full border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    Streak: {state.fitnessStreak} Days
                </div>
                
                <div className="w-full max-w-lg mb-8 mt-8">
                     <div className="flex justify-between text-xs text-purple-300 font-black uppercase tracking-widest mb-3">
                         <span>Training Load</span>
                         <span>{Math.round(progress)}%</span>
                     </div>
                     <div className="h-5 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/10 shadow-inner backdrop-blur-sm">
                         <div className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all duration-1000 ease-out relative shadow-[0_0_20px_#a855f7]" style={{width: `${progress}%`}}>
                             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_1s_infinite_linear]"></div>
                         </div>
                     </div>
                </div>

                <h2 className="text-3xl font-black text-white mb-1 text-center">{dayName} Protocol</h2>
                <div className="text-sm text-slate-400 font-medium">Build the body, sharpen the mind.</div>
            </div>

            {/* Rest Timer Controls */}
            <div className="flex justify-center gap-4 mb-10 flex-wrap">
                 {[30, 60, 90, 120].map(t => (
                    <button 
                        key={t}
                        onClick={() => startTimer('rest', t)} 
                        className="px-6 py-3 rounded-2xl bg-slate-800/50 border border-white/5 text-xs font-bold text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95"
                    >
                        {t}s Rest
                    </button>
                 ))}
            </div>

            {isRestDay ? (
                <div className="p-12 rounded-[32px] bg-[#111827]/50 border border-purple-500/10 text-center backdrop-blur-md shadow-2xl">
                    <div className="text-7xl mb-6 grayscale opacity-50 animate-pulse">🛌</div>
                    <div className="text-3xl font-black text-purple-300 mb-3">Active Recovery</div>
                    <div className="text-slate-400 max-w-md mx-auto leading-relaxed">Take this time to stretch and hydrate. The body grows during rest, not during work.</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5">
                    {plan.map((task: any) => {
                        const safeName = task.name.replace(/\s+/g, '');
                        const current = state.fitnessCounters[safeName] || 0;
                        const goal = task.total;
                        const isDone = current >= goal;

                        return (
                            <div key={safeName} className={`p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden group ${isDone ? 'bg-[#0f172a] border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' : 'bg-[#1e293b]/40 border-white/5 hover:bg-[#1e293b]/60'}`}>
                                <div className="absolute bottom-0 left-0 h-1.5 bg-purple-500/20 w-full">
                                    <div className="h-full bg-purple-500 transition-all duration-500 shadow-[0_0_10px_#a855f7]" style={{ width: `${Math.min(100, (current/goal)*100)}%`}}></div>
                                </div>

                                <div className="flex justify-between items-center mb-6 relative z-10">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500 shadow-lg ${isDone ? 'bg-purple-500 text-white shadow-purple-500/30 scale-110 rotate-3' : 'bg-slate-800 text-slate-500 border border-white/5'}`}>
                                            {isDone ? <Trophy size={24} className="animate-bounce-slow" /> : <Dumbbell size={24} />}
                                        </div>
                                        <div className="min-w-0">
                                            <div className={`font-black text-xl leading-none truncate mb-1.5 ${isDone ? 'text-white' : 'text-slate-200'}`}>{task.name}</div>
                                            <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isDone ? 'text-purple-300' : 'text-slate-500'}`}>Target: {state.privacyMode ? '**' : goal} reps</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between gap-4 relative z-10 md:pl-20">
                                    <button onClick={() => updateCount(task.name, -5)} className="w-14 h-12 rounded-xl bg-slate-800 border border-white/5 text-slate-400 flex items-center justify-center hover:text-white hover:bg-slate-700 transition-colors active:scale-95 hover:border-white/20"><Minus size={20} /></button>
                                    
                                    <div className="flex-1 text-center bg-black/30 rounded-xl py-2.5 border border-white/5 shadow-inner">
                                        <div className={`text-3xl font-mono font-bold ${isDone ? 'text-purple-400 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'text-white'}`}>{state.privacyMode ? '**' : current}</div>
                                    </div>
                                    
                                    <button onClick={() => updateCount(task.name, 5)} className={`w-14 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95 font-bold border ${isDone ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:bg-purple-500' : 'bg-slate-700 text-white border-white/10 hover:bg-purple-600 hover:border-purple-500'}`}><Plus size={20} /></button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
      )}

      {subTab === 'weight' && (
          <div className="animate-slideUp max-w-md mx-auto text-center">
               <div className="mb-8 bg-slate-800/30 p-8 rounded-[32px] border border-white/5 shadow-2xl">
                   <label className="text-xs font-black text-purple-400 uppercase tracking-[0.2em] block mb-6">Log Weight (kg/lbs)</label>
                   <div className="flex gap-4">
                       <input 
                        type="number" 
                        value={weightInput}
                        onChange={(e) => setWeightInput(e.target.value)}
                        placeholder="0.0" 
                        className="flex-1 bg-slate-900 border border-white/10 rounded-2xl p-5 text-4xl font-mono text-white text-center focus:border-purple-500 outline-none transition-colors shadow-inner"
                       />
                       <button onClick={addWeight} className="px-8 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-500 shadow-lg shadow-purple-900/30 transition-all active:scale-95">Save</button>
                   </div>
               </div>

               <div className="space-y-3">
                   {state.weightLog.length === 0 && <div className="text-slate-500 italic py-8">No records yet. Start tracking.</div>}
                   {state.weightLog.slice().reverse().map((entry, i) => (
                       <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-800/40 border border-white/5 hover:bg-slate-800/60 transition-colors group">
                           <span className="text-slate-400 text-sm font-mono font-bold group-hover:text-slate-300 transition-colors">{new Date(entry.date).toLocaleDateString()}</span>
                           <span className="text-white font-black text-2xl font-mono group-hover:text-purple-300 transition-colors">{entry.weight}</span>
                       </div>
                   ))}
               </div>
          </div>
      )}

      {subTab === 'stats' && (
        <div className="animate-slideUp max-w-3xl mx-auto">
             <div className="bg-[#1e293b]/60 p-10 rounded-[40px] border border-white/5 backdrop-blur-md shadow-2xl ring-1 ring-white/5">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-4"><div className="w-1.5 h-8 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div> Training Volume</h3>
                <StatsChart data={state.fitnessHistory.daily} color="#a855f7" />
            </div>
        </div>
      )}

      {subTab === 'awards' && (
        <div className="animate-slideUp grid grid-cols-1 md:grid-cols-2 gap-4">
             {achievements.slice(0, 20).map((ach) => {
                 const unlocked = state.fitnessStreak >= ach.requiredCount;
                 return (
                    <div key={ach.id} className={`p-6 rounded-2xl border flex items-center gap-5 transition-all duration-500 ${unlocked ? 'bg-purple-900/20 border-purple-500/30 shadow-lg shadow-purple-900/20' : 'bg-slate-900/20 border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-80'}`}>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform ${unlocked ? 'bg-purple-500 text-white shadow-purple-500/30 scale-110' : 'bg-slate-800 text-slate-500'}`}>
                            <Trophy size={24} />
                        </div>
                        <div>
                            <div className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-slate-500'}`}>{ach.title}</div>
                            <div className="text-xs text-slate-500 mt-1">{ach.description}</div>
                            {unlocked && <div className="text-[10px] text-purple-400 font-black uppercase tracking-wider mt-2">Unlocked</div>}
                        </div>
                    </div>
                 );
             })}
        </div>
      )}

      {/* REST TIMER OVERLAY */}
      {isRestTimerActive && !minimized && (
          <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center backdrop-blur-xl animate-fadeIn p-6">
               <div className="absolute top-8 right-8">
                    <button onClick={() => minimizeTimer(true)} className="p-3 rounded-full bg-white/10 text-slate-400 hover:text-white hover:bg-white/20 transition-all"><Minimize2 size={24} /></button>
               </div>

               <div className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-16 animate-pulse">Rest & Recovery</div>
               <div className="relative w-80 h-80 flex items-center justify-center mb-16">
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-[80px] animate-pulse"></div>
                    
                    <svg className="w-full h-full rotate-[-90deg] drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                        <circle cx="160" cy="160" r="140" fill="none" stroke="#1e293b" strokeWidth="16" />
                        <circle cx="160" cy="160" r="140" fill="none" stroke="#a855f7" strokeWidth="16" strokeDasharray="879" strokeDashoffset={879 - (879 * seconds) / state.globalTimer.totalSeconds} className="transition-all duration-1000 ease-linear" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-9xl font-mono font-black text-white tracking-tighter drop-shadow-2xl">{seconds}</span>
                        <span className="text-sm text-purple-400 uppercase font-bold mt-4 tracking-[0.3em]">Seconds</span>
                    </div>
               </div>
               <button onClick={stopTimer} className="px-12 py-5 rounded-full bg-slate-800 text-white font-bold border border-white/10 hover:bg-rose-600 hover:border-rose-500 hover:text-white transition-all flex items-center gap-4 group shadow-2xl active:scale-95">
                   <X size={24} className="group-hover:rotate-90 transition-transform duration-300" /> End Rest
               </button>
          </div>
      )}
    </div>
  );
};
