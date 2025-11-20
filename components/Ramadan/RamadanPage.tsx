
import React, { useState } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { ArrowLeft, Moon, Sun, CheckCircle, Heart, Star, BookOpen, Check, ChevronRight, CalendarDays, Calculator, X, Timer } from 'lucide-react';
import { GrowthVisual } from '../Shared/GrowthVisual';

export const RamadanPage: React.FC = () => {
  const { state, updateState, setTab, addNotification } = useApp();
  const [zakatModalOpen, setZakatModalOpen] = useState(false);
  const [zakatValues, setZakatValues] = useState({ savings: '', gold: '', silver: '' });
  const [zakatResult, setZakatResult] = useState<number | null>(null);

  const toggle = (key: 'fasting' | 'taraweeh' | 'charity') => {
    updateState({
      ramadanDaily: { ...state.ramadanDaily, [key]: !state.ramadanDaily[key] }
    });
  };

  const addYaseen = () => {
      if (state.ramadanYaseenCount < 30) {
          const newVal = state.ramadanYaseenCount + 1;
          updateState({ ramadanYaseenCount: newVal });
          if (newVal === 30) addNotification('Ramadan Goal', '30 Surah Yaseen Completed!', 'achievement');
      }
  };

  const calculateZakat = () => {
      const s = parseFloat(zakatValues.savings) || 0;
      const g = parseFloat(zakatValues.gold) || 0;
      const si = parseFloat(zakatValues.silver) || 0;
      setZakatResult((s + g + si) * 0.025);
  };

  const styles = {
    amber: {
        activeBg: 'bg-amber-900/20',
        activeBorder: 'border-amber-500/50',
        iconBg: 'bg-amber-500',
        glow: 'bg-amber-500/10'
    },
    indigo: {
        activeBg: 'bg-indigo-900/20',
        activeBorder: 'border-indigo-500/50',
        iconBg: 'bg-indigo-500',
        glow: 'bg-indigo-500/10'
    },
    rose: {
        activeBg: 'bg-rose-900/20',
        activeBorder: 'border-rose-500/50',
        iconBg: 'bg-rose-500',
        glow: 'bg-rose-500/10'
    }
  };

  const TaskCard = ({ id, title, sub, icon, active, color }: any) => {
      const s = styles[color as keyof typeof styles];
      return (
        <button 
          onClick={() => toggle(id)}
          className={`group relative p-6 rounded-[32px] border transition-all duration-500 flex flex-col items-center justify-center gap-4 overflow-hidden ${active ? `${s.activeBg} ${s.activeBorder} shadow-[0_0_30px_rgba(0,0,0,0.2)]` : 'bg-slate-900/50 border-white/5 hover:bg-slate-800'}`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${active ? `${s.iconBg} text-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-110 rotate-3` : `bg-slate-800 text-slate-500 group-hover:scale-105`}`}>
            {icon}
          </div>
          <div className="text-center z-10">
            <div className={`font-black text-lg ${active ? 'text-white' : 'text-slate-400'}`}>{title}</div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{sub}</div>
          </div>
          
          {/* Glow effect */}
          {active && <div className={`absolute inset-0 blur-xl ${s.glow}`}></div>}
          {active && <div className="absolute top-4 right-4 text-white animate-scaleIn"><CheckCircle size={20} /></div>}
        </button>
      );
  };

  const quranProgress = (state.quranCompletedParahs / 30) * 100;
  const currentDay = Math.min(30, state.ramadanStreak + 1);
  const daysUntilEid = 30 - state.ramadanStreak;
  
  // Ashra Logic
  const getAshra = () => {
      if (currentDay <= 10) return { name: "Mercy (Rahmat)", color: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/30" };
      if (currentDay <= 20) return { name: "Forgiveness (Maghfirah)", color: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/30" };
      return { name: "Salvation (Nijat)", color: "text-indigo-400", bg: "bg-indigo-500", border: "border-indigo-500/30" };
  };
  const ashra = getAshra();

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-24 md:pb-12">
      
      {/* PREMIUM HEADER - YELLOW THEME */}
      <div className="relative mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#422006] to-[#0f172a] border border-yellow-500/20 p-8 md:p-10 shadow-2xl group ring-1 ring-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                  <button onClick={() => setTab('dashboard')} className="flex items-center gap-2 text-yellow-300 hover:text-white font-bold transition-colors text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 w-fit border border-white/5">
                      <ArrowLeft size={14} /> Dashboard
                  </button>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200 font-serif tracking-tight mb-2 drop-shadow-sm">
                      Ramadan Mubarak
                  </h2>
                  <p className="text-yellow-200/60 text-sm md:text-base font-medium tracking-wide">"Whoever fasts Ramadan out of faith and hope for reward, his past sins will be forgiven."</p>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-[2rem] bg-gradient-to-br from-yellow-500/20 to-transparent flex items-center justify-center text-yellow-400 border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.2)] rotate-6 backdrop-blur-md">
                  <Moon size={48} strokeWidth={1.5} />
              </div>
          </div>
          
          {/* Eid Countdown Badge (Absolute Positioned) */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-slate-900/50 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-slow z-20">
             <Timer size={18} className="text-yellow-400 mb-1" />
             <span className="text-xl font-bold text-white leading-none">{Math.max(0, daysUntilEid)}</span>
             <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold mt-1">Days Left</span>
         </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-end mb-8 gap-3">
             <button onClick={() => setZakatModalOpen(true)} className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all">
                 <Calculator size={14} /> Zakat Calc
             </button>
      </div>

      {/* ASHRA & STREAK BANNER */}
      <div className={`bg-gradient-to-r from-slate-900 to-[#0f172a] border ${ashra.border} p-6 md:p-8 rounded-[32px] mb-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden gap-8 shadow-2xl group ring-1 ring-white/5`}>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
         
         <div className="relative z-10 w-full md:w-auto text-center md:text-left">
             <div className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Fasting Streak</div>
             <div className="text-5xl md:text-6xl font-black text-white mb-4 md:mb-0 tracking-tighter drop-shadow-2xl">{state.ramadanStreak} <span className="text-lg font-bold text-slate-500 tracking-normal">Days</span></div>
         </div>

         <div className="flex-1 w-full md:max-w-lg relative z-10 bg-black/30 p-6 rounded-3xl border border-white/5 backdrop-blur-md shadow-inner">
             <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                 <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${ashra.bg} animate-pulse`}></div>
                     <span className={`text-xs font-black uppercase tracking-wider ${ashra.color}`}>{ashra.name}</span>
                 </div>
                 <span className="text-xs font-mono text-slate-400 font-bold">Day {currentDay}/30</span>
             </div>
             
             {/* Segmented Progress Bar */}
             <div className="flex gap-1.5 h-4 w-full mb-3">
                 {/* Ashra 1 */}
                 <div className="flex-1 bg-slate-800 rounded-l-lg overflow-hidden relative border border-white/5">
                     <div className={`h-full bg-emerald-500 transition-all duration-1000 ${currentDay > 10 ? 'w-full' : currentDay <= 0 ? 'w-0' : ''}`} style={{ width: currentDay <= 10 ? `${(currentDay/10)*100}%` : '100%' }}></div>
                 </div>
                 {/* Ashra 2 */}
                 <div className="flex-1 bg-slate-800 overflow-hidden relative border border-white/5">
                     <div className={`h-full bg-amber-500 transition-all duration-1000 ${currentDay > 20 ? 'w-full' : currentDay <= 10 ? 'w-0' : ''}`} style={{ width: (currentDay > 10 && currentDay <= 20) ? `${((currentDay-10)/10)*100}%` : (currentDay > 20 ? '100%' : '0%') }}></div>
                 </div>
                 {/* Ashra 3 */}
                 <div className="flex-1 bg-slate-800 rounded-r-lg overflow-hidden relative border border-white/5">
                     <div className={`h-full bg-indigo-500 transition-all duration-1000`} style={{ width: currentDay > 20 ? `${((currentDay-20)/10)*100}%` : '0%' }}></div>
                 </div>
             </div>
             <div className="flex justify-between text-[8px] text-slate-500 font-bold px-1 uppercase tracking-widest">
                 <span>Mercy</span>
                 <span>Forgiveness</span>
                 <span>Salvation</span>
             </div>
         </div>
         
         {/* Ambient Glow matching Ashra */}
         <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-15 ${ashra.bg}`}></div>
      </div>

      {/* Daily Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        <TaskCard 
            id="fasting"
            title="Fasting"
            sub="Suhoor & Iftar"
            icon={<Sun size={32} />}
            active={state.ramadanDaily.fasting}
            color="amber"
        />
        <TaskCard 
            id="taraweeh"
            title="Taraweeh"
            sub="Night Prayers"
            icon={<Moon size={32} />}
            active={state.ramadanDaily.taraweeh}
            color="indigo"
        />
         <TaskCard 
            id="charity"
            title="Sadaqah"
            sub="Daily Act"
            icon={<Heart size={32} />}
            active={state.ramadanDaily.charity}
            color="rose"
        />
      </div>

      {/* Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Quran Goal */}
          <div className="p-8 rounded-[40px] bg-[#0f172a] border border-emerald-500/20 relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-2xl group hover:border-emerald-500/40 transition-colors">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[60px]"></div>
              
              <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                       <div>
                           <div className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><BookOpen size={12}/> Khatam Progress</div>
                           <div className="font-black text-white text-3xl font-serif">Holy Quran</div>
                       </div>
                       <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-900/20">
                           <CheckCircle size={28} />
                       </div>
                  </div>
                  
                  <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-400 font-bold">
                          <span>Current: Juz {state.quranCompletedParahs}</span>
                          <span>Goal: 30</span>
                      </div>
                      <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner ring-1 ring-white/5">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-1000 ease-out relative" 
                            style={{width: `${quranProgress}%`}}
                          >
                              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_1s_infinite_linear]"></div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="relative z-10 mt-6 flex items-center justify-between pt-6 border-t border-white/5">
                   <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">{state.quranCompletedParahs >= 30 ? "Completed" : `${30 - state.quranCompletedParahs} Juz remaining`}</div>
                   <button 
                     onClick={() => setTab('quran')} 
                     className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 transition-all text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
                   >
                       Open Tracker <ChevronRight size={14} />
                   </button>
              </div>
          </div>

          {/* Yaseen Goal */}
          <div className="p-8 rounded-[40px] bg-[#0f172a] border border-amber-500/20 relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-2xl group hover:border-amber-500/40 transition-colors">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
               <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[60px]"></div>

               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                       <div>
                           <div className="text-[10px] text-amber-400 font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Star size={12}/> Heart of Quran</div>
                           <div className="font-black text-white text-3xl font-serif">Surah Yaseen</div>
                       </div>
                       <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-900/20">
                           <BookOpen size={28} />
                       </div>
                  </div>
                  
                  <div className="mt-2">
                      <div className="flex justify-between text-xs text-slate-400 mb-2 font-bold">
                          <span>Recitations</span>
                          <span>{state.ramadanYaseenCount} / 30</span>
                      </div>
                      <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden ring-1 ring-white/5 shadow-inner">
                          <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-500" style={{width: `${(state.ramadanYaseenCount/30)*100}%`}}></div>
                      </div>
                  </div>
              </div>
              
              <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex justify-end">
                    <button 
                    onClick={addYaseen}
                    disabled={state.ramadanYaseenCount >= 30}
                    className="w-full px-4 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
                    >
                        <Check size={18} /> Log Recitation
                    </button>
              </div>
          </div>
      </div>

      {/* ZAKAT CALCULATOR MODAL */}
      {zakatModalOpen && (
          <div className="fixed inset-0 z-[9999] bg-[#020617]/80 flex items-center justify-center p-6 backdrop-blur-xl animate-fadeIn">
              <div className="bg-[#0f172a] border border-white/10 rounded-[40px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden ring-1 ring-white/5">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center mb-8 relative z-10">
                      <h3 className="text-2xl font-black text-white tracking-tight">Zakat Calculator</h3>
                      <button onClick={() => setZakatModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500 transition-all"><X size={20} /></button>
                  </div>
                  
                  <div className="space-y-5 mb-8 relative z-10">
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Cash / Savings</label>
                          <input 
                            type="number" 
                            value={zakatValues.savings}
                            onChange={e => setZakatValues({...zakatValues, savings: e.target.value})}
                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-colors font-mono font-bold"
                            placeholder="0.00"
                          />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Value of Gold</label>
                          <input 
                            type="number" 
                            value={zakatValues.gold}
                            onChange={e => setZakatValues({...zakatValues, gold: e.target.value})}
                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white focus:border-amber-500 outline-none transition-colors font-mono font-bold"
                            placeholder="0.00"
                          />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Value of Silver</label>
                          <input 
                            type="number" 
                            value={zakatValues.silver}
                            onChange={e => setZakatValues({...zakatValues, silver: e.target.value})}
                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white focus:border-slate-500 outline-none transition-colors font-mono font-bold"
                            placeholder="0.00"
                          />
                      </div>
                  </div>

                  {zakatResult !== null && (
                      <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl mb-6 text-center relative z-10 animate-slideUp">
                          <div className="text-xs text-emerald-400 font-black uppercase tracking-[0.2em] mb-2">Total Zakat Due (2.5%)</div>
                          <div className="text-4xl font-mono font-black text-white tracking-tighter">{zakatResult.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                      </div>
                  )}

                  <button onClick={calculateZakat} className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-900/50 relative z-10 uppercase tracking-widest text-sm active:scale-95">
                      Calculate Amount
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};
