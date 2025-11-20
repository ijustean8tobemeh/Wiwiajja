
import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { WidgetCard } from './WidgetCard';
import { MoonStar, Hand, BookOpen, Brain, Droplets, Dumbbell, Target, Moon, CheckSquare, Square, ShieldCheck, AlertTriangle } from 'lucide-react';
import { DUAS, ISLAMIC_VIRTUES, MANDATORY_PRAYERS, WATER_GOAL, SMOKING_LIMIT, NICOTINE_LIMIT } from '../../constants';
import { GrowthVisual } from '../Shared/GrowthVisual';
import { CircularProgress } from '../ui/CircularProgress';

export const DashboardHome: React.FC = () => {
  const { state, setTab, updateState } = useApp();
  const [dua, setDua] = useState(DUAS[0]);
  const [virtue, setVirtue] = useState(ISLAMIC_VIRTUES[0]);

  useEffect(() => {
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 100 / 60 / 60 / 24);
    setDua(DUAS[dayOfYear % DUAS.length]);
    setVirtue(ISLAMIC_VIRTUES[dayOfYear % ISLAMIC_VIRTUES.length]);
  }, []);

  // --- METRIC CALCULATIONS ---
  
  // 1. Prayer
  const prayersDoneCount = MANDATORY_PRAYERS.filter(p => state.dailyPrayerStatus[p as keyof typeof state.dailyPrayerStatus]).length;
  
  // 2. Dhikr
  const dhikrToday = state.astaghfirullahCount + state.rabbiCount;
  
  // 3. Habits (Smoking/Nicotine)
  const habitUsageToday = state.habitCompleted.smokingCount + state.habitCompleted.nicotineCount;
  const isHabitClean = state.habitCompleted.smokingCount <= SMOKING_LIMIT && state.habitCompleted.nicotineCount <= NICOTINE_LIMIT;
  
  // 5. Hygiene
  const hygieneSteps = (state.hygieneCompleted.brush ? 1 : 0) + (state.hygieneCompleted.shower ? 1 : 0) + (state.hygieneCompleted.water >= WATER_GOAL ? 1 : 0);
  const hygieneTotal = 3;
  
  // 6. Fitness
  const fitnessValues = Object.values(state.fitnessCounters) as number[];
  const fitnessTotal = fitnessValues.reduce((a, b) => a + b, 0);
  const fitnessDone = fitnessTotal > 0 || state.fitnessStreak > 0; 

  // 7. Focus
  const todoPending = state.todos.filter(t => !t.completed).length;
  const todoDone = state.todos.filter(t => t.completed).length;

  // Overall Efficiency Calculation
  const overallLevel = Math.round(
      ((prayersDoneCount / 5) * 40) + 
      ((hygieneSteps / 3) * 20) + 
      (state.habitStreak > 0 ? 20 : 0) + 
      (dhikrToday > 100 ? 20 : 0)
  );

  // Helper for Privacy Mode
  const formatValue = (val: number, isPrivacy: boolean) => isPrivacy ? '****' : val;

  // Jumuah (Friday) Check
  const isFriday = new Date().getDay() === 5;
  const toggleJumuah = (key: keyof typeof state.jumuah) => {
      updateState({ jumuah: { ...state.jumuah, [key]: !state.jumuah[key] } });
  };

  return (
    <div className="pb-32 md:pb-28 animate-fadeIn space-y-6 md:space-y-8 pt-2 md:pt-6">
      
      {/* HERO SECTION - VIRTUES */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#0f172a] border border-white/10 shadow-2xl group ring-1 ring-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-8 p-6 md:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                  <div className="flex items-start md:items-center gap-4 mb-6 md:mb-8">
                       <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400 shadow-lg shadow-amber-900/20 shrink-0">
                           <Target size={18} />
                       </div>
                       <div className="flex-1 min-w-0">
                           <div className="flex items-baseline gap-2 flex-wrap">
                               <span className="text-base md:text-lg font-bold text-white truncate">🎯 {virtue.transliteration}</span>
                               <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">Virtue</span>
                           </div>
                           <div className="text-xs text-slate-400 line-clamp-2">{virtue.meaning}: {virtue.description}</div>
                       </div>
                  </div>
                  <div className="mb-2 relative">
                      <div className="text-xl md:text-3xl font-bold text-white font-serif leading-relaxed mb-4 text-right drop-shadow-lg opacity-90 animate-[pulse_6s_ease-in-out_infinite] break-words" dir="rtl">
                         {dua.arabic}
                      </div>
                      <div className="flex justify-end">
                          <div className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-full md:max-w-md text-right border-r-2 border-indigo-500/50 pr-4 py-1">
                              {dua.english}
                          </div>
                      </div>
                  </div>
              </div>

              <div className="lg:col-span-4 bg-[#020617]/30 p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[180px]">
                  <div className="relative z-10">
                       <CircularProgress percent={overallLevel} size={120} strokeWidth={8} color="#6366f1" showText={false} />
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">{overallLevel}%</span>
                           <span className="text-[9px] md:text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Daily Load</span>
                       </div>
                  </div>
              </div>
          </div>
      </div>

      {/* JUMU'AH (FRIDAY) PROTOCOL WIDGET */}
      {isFriday && (
         <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-[32px] p-6 md:p-8 relative overflow-hidden animate-slideUp shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
             <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0">
                         <MoonStar size={20} />
                     </div>
                     <div>
                         <h3 className="text-lg md:text-xl font-black text-white tracking-tight">Blessed Jumu'ah</h3>
                         <p className="text-xs text-emerald-300 font-medium line-clamp-1">"The best day on which the sun has risen."</p>
                     </div>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                     {[
                         { id: 'ghusl', label: 'Ghusl' },
                         { id: 'kahf', label: 'Surah Kahf' },
                         { id: 'miswak', label: 'Miswak' },
                         { id: 'durood', label: 'Durood' }
                     ].map((item) => (
                         <button 
                            key={item.id}
                            onClick={() => toggleJumuah(item.id as any)}
                            className={`p-3 md:p-4 rounded-2xl border flex items-center gap-2 md:gap-3 transition-all group ${state.jumuah[item.id as keyof typeof state.jumuah] ? 'bg-emerald-500/20 border-emerald-500/50 text-white' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800'}`}
                         >
                             <div className={`transition-transform shrink-0 ${state.jumuah[item.id as keyof typeof state.jumuah] ? 'scale-110' : 'group-hover:scale-110'}`}>
                                 {state.jumuah[item.id as keyof typeof state.jumuah] ? <CheckSquare size={18} className="text-emerald-400" /> : <Square size={18} />}
                             </div>
                             <span className="font-bold text-xs md:text-sm text-left">{item.label}</span>
                         </button>
                     ))}
                 </div>
             </div>
         </div>
      )}

      {/* WIDGET GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {state.ramadanMode && (
             <WidgetCard 
             title="Ramadan" 
             icon={<Moon size={20} />} 
             currentValue={state.ramadanDaily.fasting ? 'Active' : 'Pending'}
             currentLabel="Today"
             overallValue={state.ramadanStreak}
             overallLabel="Fasted"
             colorClass="bg-amber-500/20 text-amber-300 border-amber-500/30"
             onClick={() => setTab('ramadan')}
             status={state.ramadanDaily.fasting ? 'success' : 'neutral'}
             visual={<GrowthVisual streak={state.ramadanStreak} type="ramadan" size="lg" />}
           />
        )}

        <WidgetCard 
          title="Prayer" 
          icon={<MoonStar size={20} />} 
          currentValue={`${prayersDoneCount}/5`}
          currentLabel="Today's Salah"
          overallValue={`${formatValue(state.prayerStreak, state.privacyMode)}d`}
          overallLabel="Streak"
          colorClass="bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
          onClick={() => setTab('prayer')}
          status={prayersDoneCount === 5 ? 'success' : 'warning'}
          visual={<GrowthVisual streak={state.prayerStreak} type="nature" size="lg" />}
        />

        <WidgetCard 
          title="Dhikr" 
          icon={<Hand size={20} />} 
          currentValue={formatValue(dhikrToday, state.privacyMode)}
          currentLabel="Today's Count"
          overallValue={`${formatValue(state.dhikrStreak, state.privacyMode)}d`}
          overallLabel="Streak"
          colorClass="bg-teal-500/20 text-teal-300 border-teal-500/30"
          onClick={() => setTab('dhikr')}
          status={dhikrToday > 100 ? 'success' : 'neutral'}
          visual={<GrowthVisual streak={state.dhikrStreak} type="light" size="lg" />}
        />

        {/* HABIT CONTROL WIDGET */}
        <WidgetCard 
          title="Habits: Smoking & Nicotine" 
          icon={<ShieldCheck size={20} />} 
          currentValue={habitUsageToday}
          currentLabel="Usage Today"
          overallValue={`${state.habitStreak}d`}
          overallLabel="Clean Streak"
          colorClass="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
          onClick={() => setTab('hygiene')}
          status={isHabitClean ? 'success' : 'warning'}
          visual={<GrowthVisual streak={state.habitStreak} type="shield" size="lg" />}
        />

        <WidgetCard 
          title="Hygiene" 
          icon={<Droplets size={20} />} 
          currentValue={`${Math.round((hygieneSteps / hygieneTotal) * 100)}%`}
          currentLabel="Routine Done"
          overallValue={`${formatValue(state.hygieneStreak, state.privacyMode)}d`}
          overallLabel="Streak"
          colorClass="bg-sky-500/20 text-sky-300 border-sky-500/30"
          onClick={() => setTab('hygiene')}
          status={hygieneSteps === 3 ? 'success' : 'neutral'}
          visual={<GrowthVisual streak={state.hygieneStreak} type="water" size="lg" />}
        />

        <WidgetCard 
          title="Quran" 
          icon={<BookOpen size={20} />} 
          currentValue={state.quranCompletedParahs}
          currentLabel="Current Juz"
          overallValue={state.quransRecited}
          overallLabel="Khatams"
          colorClass="bg-purple-500/20 text-purple-300 border-purple-500/30"
          onClick={() => setTab('quran')}
          status={state.quranParahClicks > 0 ? 'success' : 'neutral'}
          visual={<GrowthVisual streak={state.quranCompletedParahs} type="knowledge" size="lg" />}
        />

        <WidgetCard 
          title="Retention" 
          icon={<Brain size={20} />} 
          currentValue={`${formatValue(state.mdfStreakDays, state.privacyMode)}d`}
          currentLabel="NoFap Streak"
          overallValue={`${formatValue(state.mdfMaxStreak, state.privacyMode)}d`}
          overallLabel="Best Record"
          colorClass="bg-rose-500/20 text-rose-300 border-rose-500/30"
          onClick={() => setTab('mdf')}
          status={state.mdfStreakDays > 0 ? 'success' : 'warning'}
          visual={<GrowthVisual streak={state.mdfStreakDays} type="shield" size="lg" />}
        />

        <WidgetCard 
          title="Fitness" 
          icon={<Dumbbell size={20} />} 
          currentValue={fitnessDone ? 'Active' : 'Rest'}
          currentLabel="Today"
          overallValue={`${formatValue(state.fitnessStreak, state.privacyMode)}d`}
          overallLabel="Streak"
          colorClass="bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30"
          onClick={() => setTab('fitness')}
          status={fitnessDone ? 'success' : 'neutral'}
          visual={<GrowthVisual streak={state.fitnessStreak} type="strength" size="lg" />}
        />

      </div>
    </div>
  );
};
