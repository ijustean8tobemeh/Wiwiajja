
import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { ArrowLeft, Fingerprint, Activity, BarChart2, Trophy, Lock, Shield, Zap, AlertOctagon, Book, HeartPulse, X } from 'lucide-react';
import { generateAchievements } from '../../utils/achievementSystem';
import { PANIC_QUOTES, RELAPSE_TRIGGERS } from '../../constants';
import { GrowthVisual } from '../Shared/GrowthVisual';

export const MDFPage: React.FC = () => {
  const { state, updateState, setTab, addNotification } = useApp();
  const [subTab, setSubTab] = useState<'tracker'|'journal'|'awards'>('tracker');
  const [displayTime, setDisplayTime] = useState("");
  const [days, setDays] = useState(0);
  const [panicMode, setPanicMode] = useState(false);
  const [relapseModal, setRelapseModal] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale'|'hold'|'exhale'>('inhale');
  
  // Journal State
  const [journalText, setJournalText] = useState("");
  
  const achievements = generateAchievements('MDF');

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - state.mdfLastResetTime;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setDays(d);
      setDisplayTime(`${d}d ${h}h ${m}m ${s}s`);
      
      if (d > state.mdfStreakDays) {
        updateState({ mdfStreakDays: d });
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [state.mdfLastResetTime]);

  // Breathing Logic for Panic Mode
  useEffect(() => {
      if (!panicMode) return;
      
      const cycle = () => {
          setBreathPhase('inhale');
          setTimeout(() => {
              setBreathPhase('hold');
              setTimeout(() => {
                  setBreathPhase('exhale');
              }, 4000);
          }, 4000);
      };
      
      cycle();
      const interval = setInterval(cycle, 12000); // 4-4-4 cycle
      return () => clearInterval(interval);
  }, [panicMode]);

  const handleRelapse = (trigger: string) => {
    updateState({ 
        mdfLastResetTime: Date.now(), 
        mdfStreakDays: 0,
        mdfJournal: [
            { id: Date.now().toString(), date: Date.now(), type: 'relapse', content: `Relapsed due to ${trigger}`, trigger },
            ...state.mdfJournal
        ]
    });
    setRelapseModal(false);
    addNotification('System', 'Streak reset. Trigger recorded for analysis.', 'warning');
  };

  const saveJournal = () => {
      if (!journalText.trim()) return;
      updateState({
          mdfJournal: [
              { id: Date.now().toString(), date: Date.now(), type: 'reflection', content: journalText },
              ...state.mdfJournal
          ]
      });
      setJournalText("");
      addNotification('Journal', 'Entry saved successfully.', 'success');
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto text-center pb-28">
      
      {/* PREMIUM HEADER - ROSE THEME */}
      <div className="relative mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#881337] to-[#0f172a] border border-rose-500/20 p-8 md:p-10 shadow-2xl group ring-1 ring-white/5 text-left">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                  <button onClick={() => setTab('dashboard')} className="flex items-center gap-2 text-rose-300 hover:text-white font-bold transition-colors text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 w-fit border border-white/5">
                      <ArrowLeft size={14} /> Dashboard
                  </button>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-200 font-serif tracking-tight mb-2 drop-shadow-sm">
                      Self Mastery
                  </h2>
                  <p className="text-rose-200/60 text-sm md:text-base font-medium tracking-wide">"He who conquers himself is the mightiest warrior."</p>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-[2rem] bg-gradient-to-br from-rose-500/20 to-transparent flex items-center justify-center text-rose-400 border border-rose-500/30 shadow-[0_0_40px_rgba(225,29,72,0.2)] rotate-6 backdrop-blur-md">
                  <Shield size={48} strokeWidth={1.5} />
              </div>
          </div>
      </div>

      <div className="flex bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl ring-1 ring-white/5 sticky top-4 z-40 mb-10">
            <button onClick={() => setSubTab('tracker')} className={`flex-1 px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 ${subTab === 'tracker' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50' : 'text-slate-400 hover:text-white'}`}><Activity size={16}/><span className="hidden md:block text-xs font-black uppercase tracking-widest">Bio-Data</span></button>
            <button onClick={() => setSubTab('journal')} className={`flex-1 px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 ${subTab === 'journal' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50' : 'text-slate-400 hover:text-white'}`}><Book size={16}/><span className="hidden md:block text-xs font-black uppercase tracking-widest">Journal</span></button>
            <button onClick={() => setSubTab('awards')} className={`flex-1 px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 ${subTab === 'awards' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50' : 'text-slate-400 hover:text-white'}`}><Trophy size={16}/><span className="hidden md:block text-xs font-black uppercase tracking-widest">Rank</span></button>
      </div>

      {subTab === 'tracker' && (
        <div className="animate-slideUp max-w-xl mx-auto">
            
            {/* Visual */}
            <div className="flex justify-center mb-12 relative">
                <div className="absolute inset-0 bg-rose-500/20 blur-[100px] rounded-full animate-pulse"></div>
                <div className="relative z-10 transition-transform hover:scale-105 duration-500">
                    <GrowthVisual streak={days} type="shield" size="lg" />
                </div>
            </div>

            {/* Timer Card - Reactor Core Style */}
            <div className="p-10 rounded-[48px] bg-[#020617] border border-rose-500/30 backdrop-blur-xl mb-10 relative overflow-hidden shadow-[0_0_80px_rgba(225,29,72,0.15)] group ring-1 ring-rose-500/20">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                
                {/* Core Animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-600/10 blur-[80px] rounded-full animate-pulse"></div>
                
                <div className="relative z-10">
                    <div className="text-[10px] font-black text-rose-400 uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-2"><Zap size={12} /> Current Streak</div>
                    <div className="text-4xl md:text-6xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] tabular-nums">{displayTime}</div>
                </div>
                
                {/* Scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/80 to-transparent animate-[scan_3s_ease-in-out_infinite] opacity-50 shadow-[0_0_10px_#f43f5e]"></div>
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-rose-500/20">
                    <div className="h-full bg-rose-500 w-[30%] animate-[shimmer_2s_infinite] relative overflow-hidden"></div>
                </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-2 gap-5 mb-8">
                 <button 
                    onClick={() => setPanicMode(true)}
                    className="p-8 rounded-[32px] bg-gradient-to-br from-rose-600 to-rose-800 text-white font-bold shadow-[0_20px_40px_-10px_rgba(225,29,72,0.4)] hover:shadow-[0_30px_60px_-15px_rgba(225,29,72,0.5)] hover:-translate-y-1 active:scale-95 transition-all flex flex-col items-center gap-4 border border-rose-400/30 relative overflow-hidden group"
                 >
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                     <HeartPulse size={40} className="animate-[pulse_0.5s_ease-in-out_infinite] relative z-10" strokeWidth={2.5} />
                     <span className="text-base tracking-[0.2em] uppercase font-black relative z-10">PANIC</span>
                 </button>
                 
                 <button 
                    onClick={() => setRelapseModal(true)}
                    className="p-8 rounded-[32px] bg-[#1e293b]/40 border border-white/5 text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 hover:border-rose-500/30 transition-all flex flex-col items-center gap-4 active:scale-95 backdrop-blur-md group"
                 >
                     <AlertOctagon size={40} className="group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                     <span className="text-base tracking-[0.2em] uppercase font-black group-hover:text-rose-400 transition-colors">Relapse</span>
                 </button>
            </div>
        </div>
      )}

      {subTab === 'journal' && (
          <div className="animate-slideUp text-left max-w-2xl mx-auto">
              <div className="mb-8 bg-slate-800/30 p-8 rounded-[32px] border border-white/5 shadow-xl backdrop-blur-md">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] block mb-6">Daily Reflection</label>
                  <textarea 
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    placeholder="How are you feeling today? Any urges? Triggers?"
                    className="w-full h-40 bg-[#020617] border border-white/10 rounded-2xl p-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500/50 transition-colors mb-6 resize-none shadow-inner"
                  />
                  <button onClick={saveJournal} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold text-sm hover:bg-rose-500 transition-all shadow-lg shadow-rose-900/30 tracking-widest uppercase">Save Entry</button>
              </div>

              <div className="space-y-4">
                  {state.mdfJournal.length === 0 && <div className="text-center text-slate-500 py-12 italic font-serif text-lg">Your journey is unwritten. Start today.</div>}
                  {state.mdfJournal.map(entry => (
                      <div key={entry.id} className={`p-6 rounded-3xl border transition-colors hover:border-white/10 ${entry.type === 'relapse' ? 'bg-rose-950/20 border-rose-500/20' : 'bg-slate-800/40 border-white/5'}`}>
                          <div className="flex justify-between items-start mb-4">
                              <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg tracking-wide ${entry.type === 'relapse' ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/20 text-indigo-300'}`}>{entry.type}</span>
                              <span className="text-xs text-slate-500 font-mono font-bold">{new Date(entry.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">{entry.content}</p>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {subTab === 'awards' && (
          <div className="animate-slideUp grid grid-cols-1 md:grid-cols-2 gap-4">
             {achievements.slice(0, 20).map((ach) => {
                 const unlocked = state.mdfStreakDays >= ach.requiredCount;
                 return (
                    <div key={ach.id} className={`p-6 rounded-3xl border flex items-center gap-5 transition-all duration-500 ${unlocked ? 'bg-[#0f172a] border-rose-500/30 shadow-lg shadow-rose-900/20' : 'bg-slate-900/20 border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-80'}`}>
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border border-white/5 transition-transform hover:scale-110 ${unlocked ? 'bg-slate-800 text-rose-500 shadow-rose-500/20' : 'bg-slate-900 text-slate-500'}`}>
                            <Trophy size={24} />
                         </div>
                         <div className="text-left">
                             <div className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-slate-500'}`}>{ach.title}</div>
                             <div className="text-xs text-slate-500 mt-1">{ach.description}</div>
                             {unlocked && <div className="text-[10px] text-rose-400 font-black mt-2 uppercase tracking-wider flex items-center gap-1"><Zap size={10}/> Unlocked</div>}
                         </div>
                     </div>
                 );
             })}
        </div>
      )}

      {/* PANIC MODAL WITH BREATHING */}
      {panicMode && (
          <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-6 animate-fadeIn backdrop-blur-xl">
              <button onClick={() => setPanicMode(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={24} /></button>
              
              <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg">
                  <div className="text-xs font-black text-rose-500 uppercase tracking-[0.5em] mb-16 animate-pulse">Emergency Protocol</div>
                  
                  {/* Breathing Circle */}
                  <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center mb-16">
                      <div className={`absolute inset-0 rounded-full border-2 border-rose-500/30 transition-all duration-[4000ms] ease-in-out ${breathPhase === 'inhale' ? 'scale-100 opacity-100' : breathPhase === 'exhale' ? 'scale-50 opacity-50' : 'scale-100 opacity-80'}`}></div>
                      <div className={`absolute inset-0 rounded-full bg-rose-500/10 blur-[80px] transition-all duration-[4000ms] ease-in-out ${breathPhase === 'inhale' ? 'scale-100 opacity-100' : 'scale-50 opacity-50'}`}></div>
                      
                      <div className={`w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full shadow-[0_0_80px_rgba(225,29,72,0.6)] flex items-center justify-center z-10 transition-all duration-[4000ms] ease-in-out ${breathPhase === 'inhale' ? 'scale-110' : breathPhase === 'exhale' ? 'scale-90' : 'scale-100'}`}>
                          <span className="text-white font-black text-2xl md:text-3xl uppercase tracking-widest drop-shadow-lg">{breathPhase}</span>
                      </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black text-white mb-6 text-center tracking-tight">Control Your Breath</h2>
                  <p className="text-lg text-slate-400 mb-12 leading-relaxed font-serif italic text-center max-w-md">
                      "{PANIC_QUOTES[Math.floor(Math.random() * PANIC_QUOTES.length)]}"
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-5 justify-center w-full">
                      <button onClick={() => setPanicMode(false)} className="flex-1 py-5 rounded-2xl bg-slate-800 text-white font-bold border border-white/10 hover:bg-slate-700 transition-colors uppercase tracking-widest text-sm">I'm Calm Now</button>
                      <a href="https://quran.com/12/23" target="_blank" rel="noreferrer" className="flex-1 py-5 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-500 flex items-center justify-center transition-colors shadow-lg shadow-rose-900/30 uppercase tracking-widest text-sm">Read Quran</a>
                  </div>
              </div>
          </div>
      )}

      {/* RELAPSE MODAL */}
      {relapseModal && (
          <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-6 backdrop-blur-xl animate-fadeIn">
               <div className="bg-[#0f172a] border border-white/10 rounded-[40px] p-10 max-w-md w-full shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-500 to-orange-500"></div>
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                   
                   <h3 className="text-3xl font-black text-white mb-3 relative z-10">Analyze Trigger</h3>
                   <p className="text-sm text-slate-400 mb-8 leading-relaxed relative z-10">Identify what led to this moment so you can build stronger defenses next time.</p>
                   
                   <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                       {RELAPSE_TRIGGERS.map(t => (
                           <button 
                            key={t} 
                            onClick={() => handleRelapse(t)}
                            className="p-4 rounded-2xl bg-slate-800/50 border border-white/5 text-xs font-bold text-slate-300 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 transition-all uppercase tracking-wide"
                           >
                               {t}
                           </button>
                       ))}
                   </div>
                   <button onClick={() => setRelapseModal(false)} className="w-full py-4 text-slate-500 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors relative z-10">Cancel Analysis</button>
               </div>
          </div>
      )}
    </div>
  );
};
