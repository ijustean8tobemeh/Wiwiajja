
import React, { useState } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { ArrowLeft, BookOpen, Star, BarChart2, Trophy, Calendar, Bookmark } from 'lucide-react';
import { PARAH_NAMES } from '../../constants';
import { StatsChart } from '../Shared/StatsChart';
import { generateAchievements } from '../../utils/achievementSystem';
import { GrowthVisual } from '../Shared/GrowthVisual';

export const QuranPage: React.FC = () => {
  const { state, updateState, setTab, addNotification } = useApp();
  const [subTab, setSubTab] = useState<'tracker'|'stats'|'awards'>('tracker');
  const [animating, setAnimating] = useState(false);

  // Bookmark State
  const [bmSurah, setBmSurah] = useState(state.quranBookmark?.surah || 1);
  const [bmAyah, setBmAyah] = useState(state.quranBookmark?.ayah || 1);

  const currentParahIndex = Math.min(state.quranCompletedParahs, 29);
  const parahName = PARAH_NAMES[currentParahIndex];
  const achievements = generateAchievements('Quran');

  const advance = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);

    let clicks = state.quranParahClicks + 1;
    let parahs = state.quranCompletedParahs;
    let recited = state.quransRecited;

    if (clicks >= 4) {
      clicks = 0;
      parahs++;
      addNotification('Quran Tracker', `Parah ${parahs} Completed.`, 'success');
      if (parahs >= 30) {
        parahs = 0;
        recited++;
        addNotification('Completion', 'Alhamdulillah! Quran Khatam Recorded.', 'achievement');
      }
    }
    updateState({ quranParahClicks: clicks, quranCompletedParahs: parahs, quransRecited: recited });
  };

  const saveBookmark = () => {
      updateState({ quranBookmark: { surah: bmSurah, ayah: bmAyah } });
      addNotification('Bookmark', `Saved: Surah ${bmSurah}, Ayah ${bmAyah}`, 'success');
  };

  const steps = [
      { label: "رُبْع", eng: "Rub'" },
      { label: "نِصْف", eng: "Nisf" },
      { label: "ثَلَاثَة", eng: "Thalatha" },
      { label: "كَامِل", eng: "Kamil" }
  ];

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-12">
      
      {/* PREMIUM HEADER - AMBER THEME */}
      <div className="relative mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#78350f] to-[#0f172a] border border-amber-500/20 p-8 md:p-10 shadow-2xl group ring-1 ring-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                  <button onClick={() => setTab('dashboard')} className="flex items-center gap-2 text-amber-300 hover:text-white font-bold transition-colors text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 w-fit border border-white/5">
                      <ArrowLeft size={14} /> Dashboard
                  </button>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200 font-serif tracking-tight mb-2 drop-shadow-sm">
                      Noble Quran
                  </h2>
                  <p className="text-amber-200/60 text-sm md:text-base font-medium tracking-wide">"The best among you are those who learn the Quran and teach it."</p>
              </div>
              <div className="hidden md:flex w-24 h-24 rounded-[2rem] bg-gradient-to-br from-amber-500/20 to-transparent flex items-center justify-center text-amber-400 border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)] rotate-6 backdrop-blur-md">
                  <BookOpen size={48} strokeWidth={1.5} />
              </div>
          </div>
      </div>

      <div className="flex bg-slate-900/80 backdrop-blur-sm p-1 rounded-xl border border-white/10 sticky top-4 z-40 shadow-xl mb-8 overflow-x-auto no-scrollbar">
            <button onClick={() => setSubTab('tracker')} className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${subTab === 'tracker' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50' : 'text-slate-400 hover:text-white'}`}><Calendar size={16}/><span className="hidden md:block text-xs font-bold uppercase tracking-wider">Tracker</span></button>
            <button onClick={() => setSubTab('stats')} className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${subTab === 'stats' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50' : 'text-slate-400 hover:text-white'}`}><BarChart2 size={16}/><span className="hidden md:block text-xs font-bold uppercase tracking-wider">History</span></button>
            <button onClick={() => setSubTab('awards')} className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${subTab === 'awards' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50' : 'text-slate-400 hover:text-white'}`}><Trophy size={16}/><span className="hidden md:block text-xs font-bold uppercase tracking-wider">Awards</span></button>
      </div>

      {subTab === 'tracker' && (
        <div className="animate-slideUp max-w-2xl mx-auto">
            
            {/* Growth Visual */}
            <div className="flex justify-center mb-6 relative">
               <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full animate-pulse"></div>
               <GrowthVisual streak={state.quranCompletedParahs} type="knowledge" size="lg" />
            </div>

            {/* Main Display Card */}
            <div className="glass-card p-10 rounded-[32px] text-center border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-slate-900 mb-8 shadow-[0_0_50px_-10px_rgba(245,158,11,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-amber-500">
                    <BookOpen size={120} />
                </div>
                
                <div className="relative z-10">
                    <div className="text-xs font-bold text-amber-400/80 uppercase tracking-[0.2em] mb-8">Current Recitation</div>
                    <div className={`text-5xl md:text-7xl font-black text-white font-serif mb-10 drop-shadow-2xl leading-tight transition-all duration-500 ${animating ? 'scale-110 opacity-50' : 'scale-100 opacity-100'}`}>
                        {parahName}
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-amber-500/20 pt-6">
                        <div className="text-left">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Overall Progress</div>
                            <div className="text-2xl font-black text-white font-serif">{state.quranCompletedParahs} <span className="text-sm text-slate-500 font-sans font-normal">/ 30</span></div>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-bold flex items-center gap-2 shadow-lg">
                            <Star size={16} fill="currentColor" />
                            <span>Completed: {state.quransRecited}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bookmark Section */}
            <div className="mb-10 p-6 bg-slate-900/50 rounded-3xl border border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center">
                         <Bookmark size={18} />
                     </div>
                     <div>
                         <div className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Current Position</div>
                         <div className="flex items-center gap-2">
                             <label className="text-xs text-slate-500">Surah:</label>
                             <input 
                                type="number" 
                                value={bmSurah} 
                                onChange={e => setBmSurah(parseInt(e.target.value))} 
                                className="w-16 bg-slate-800 border border-white/10 rounded px-2 py-1 text-white text-sm font-bold text-center focus:border-amber-500 outline-none"
                             />
                             <label className="text-xs text-slate-500 ml-2">Ayah:</label>
                             <input 
                                type="number" 
                                value={bmAyah} 
                                onChange={e => setBmAyah(parseInt(e.target.value))} 
                                className="w-16 bg-slate-800 border border-white/10 rounded px-2 py-1 text-white text-sm font-bold text-center focus:border-amber-500 outline-none"
                             />
                         </div>
                     </div>
                 </div>
                 <button onClick={saveBookmark} className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-500">Save</button>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-4 gap-4 mb-10">
                {steps.map((step, i) => {
                    const active = i < state.quranParahClicks;
                    const isNext = i === state.quranParahClicks;
                    return (
                        <button 
                            key={i}
                            onClick={() => isNext && advance()}
                            disabled={!isNext}
                            className={`py-6 rounded-2xl font-bold transition-all duration-300 border shadow-lg flex flex-col items-center justify-center gap-2 ${
                                active 
                                    ? 'bg-amber-500 text-white border-amber-400 shadow-amber-500/20 scale-95 opacity-60' 
                                    : isNext
                                        ? 'bg-slate-800 text-amber-200 border-amber-500/50 hover:bg-amber-900/20 cursor-pointer ring-2 ring-amber-500/20 hover:-translate-y-1'
                                        : 'bg-slate-900/30 text-slate-700 border-transparent cursor-not-allowed'
                            }`}
                        >
                            <div className="text-xl md:text-2xl font-serif">{step.label}</div>
                            <div className={`w-2 h-2 rounded-full ${active || isNext ? 'bg-current' : 'bg-slate-800'}`}></div>
                        </button>
                    )
                })}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
                <div className="absolute inset-0 bg-white/5 bg-[size:20px_20px] opacity-20" style={{backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,0.1) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.1) 75%,transparent 75%,transparent)'}}></div>
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-700 ease-out shadow-[0_0_20px_rgba(245,158,11,0.5)]" style={{ width: `${((state.quranCompletedParahs * 4 + state.quranParahClicks) / (30 * 4)) * 100}%` }}></div>
            </div>
        </div>
      )}

      {subTab === 'stats' && (
          <div className="animate-slideUp max-w-3xl mx-auto">
             <div className="bg-[#1e293b]/60 p-8 rounded-[24px] border border-white/5 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><span className="w-1 h-5 rounded-full bg-amber-500"></span> Reading Consistency</h3>
                <StatsChart data={state.quranHistory.daily} color="#f59e0b" />
            </div>
          </div>
      )}

       {subTab === 'awards' && (
        <div className="animate-slideUp grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
             {achievements?.length ? achievements.slice(0, 20).map((ach) => (
                 <div key={ach.id} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center gap-4">
                     <Trophy className="text-slate-600" />
                     <div>
                         <div className="font-bold text-slate-400">{ach.title}</div>
                         <div className="text-xs text-slate-600">{ach.description}</div>
                     </div>
                 </div>
             )) : <div className="text-center text-slate-500 p-10 col-span-2">Milestones loading...</div>}
        </div>
      )}
    </div>
  );
};
