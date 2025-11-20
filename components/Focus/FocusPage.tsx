
import React, { useState } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { ArrowLeft, Plus, Trash2, CheckSquare, Square, Target, Clock, AlertOctagon, Zap, Filter, Play, Square as Stop, LayoutGrid, Timer, CheckCircle } from 'lucide-react';

export const FocusPage: React.FC = () => {
  const { state, updateState, setTab, startTimer, stopTimer } = useApp();
  const [subTab, setSubTab] = useState<'matrix'|'neural'>('matrix');
  const [input, setInput] = useState("");
  const [matrixType, setMatrixType] = useState<'do'|'decide'|'delegate'|'delete'>('do');

  // Neural Sync state
  const { active, seconds, type, totalSeconds } = state.globalTimer;
  const isFocusTimer = active && type === 'focus';

  const addTodo = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      updateState({
          todos: [...state.todos, {
              id: Date.now().toString(),
              text: input,
              matrix: matrixType,
              completed: false
          }]
      });
      setInput("");
  };

  const toggleTodo = (id: string) => {
      updateState({
          todos: state.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      });
  };

  const deleteTodo = (id: string) => {
      updateState({
          todos: state.todos.filter(t => t.id !== id)
      });
  };

  const styles = {
    do: {
        border: 'border-emerald-500/20 hover:border-emerald-500/30',
        borderActive: 'border-emerald-500/50',
        bgLine: 'bg-emerald-500',
        iconBg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        textDark: 'text-emerald-500',
        shadow: 'shadow-emerald-900/50',
        itemHover: 'hover:bg-emerald-500/10 hover:border-emerald-500/20',
        btn: 'bg-emerald-500'
    },
    decide: {
        border: 'border-blue-500/20 hover:border-blue-500/30',
        borderActive: 'border-blue-500/50',
        bgLine: 'bg-blue-500',
        iconBg: 'bg-blue-500/10',
        text: 'text-blue-400',
        textDark: 'text-blue-500',
        shadow: 'shadow-blue-900/50',
        itemHover: 'hover:bg-blue-500/10 hover:border-blue-500/20',
        btn: 'bg-blue-500'
    },
    delegate: {
        border: 'border-amber-500/20 hover:border-amber-500/30',
        borderActive: 'border-amber-500/50',
        bgLine: 'bg-amber-500',
        iconBg: 'bg-amber-500/10',
        text: 'text-amber-400',
        textDark: 'text-amber-500',
        shadow: 'shadow-amber-900/50',
        itemHover: 'hover:bg-amber-500/10 hover:border-amber-500/20',
        btn: 'bg-amber-500'
    },
    delete: {
        border: 'border-rose-500/20 hover:border-rose-500/30',
        borderActive: 'border-rose-500/50',
        bgLine: 'bg-rose-500',
        iconBg: 'bg-rose-500/10',
        text: 'text-rose-400',
        textDark: 'text-rose-500',
        shadow: 'shadow-rose-900/50',
        itemHover: 'hover:bg-rose-500/10 hover:border-rose-500/20',
        btn: 'bg-rose-500'
    }
  };

  const MatrixSection = ({ title, type, icon: Icon, desc }: any) => {
      const items = state.todos.filter(t => t.matrix === type);
      const s = styles[type as keyof typeof styles];
      const isActive = type === matrixType;

      return (
          <div className={`relative group overflow-hidden rounded-[32px] border transition-all duration-500 flex flex-col h-full bg-[#0f172a]/60 backdrop-blur-xl ${isActive ? `${s.borderActive} shadow-[0_0_30px_rgba(0,0,0,0.3)]` : s.border}`}>
              <div className={`absolute top-0 left-0 w-full h-1 ${s.bgLine} opacity-50`}></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
              
              <div className="p-5 border-b border-white/5 flex items-center gap-3 relative z-10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.iconBg} ${s.text} border border-white/5 shadow-lg`}>
                      <Icon size={18} />
                  </div>
                  <div>
                      <h3 className={`font-black ${s.text} text-xs uppercase tracking-[0.2em]`}>{title}</h3>
                      <p className="text-[10px] text-slate-500 font-medium">{desc}</p>
                  </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4 no-scrollbar relative z-10">
                  {items.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center opacity-30">
                          <Icon size={40} className={`${s.textDark} mb-2`} />
                          <span className="text-xs font-bold uppercase tracking-wider">No Tasks</span>
                      </div>
                  )}
                  {items.map(t => (
                      <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group/item ${t.completed ? 'bg-slate-900/50 border-transparent opacity-60' : `bg-slate-800/40 border-white/5 ${s.itemHover}`}`}>
                          <button onClick={() => toggleTodo(t.id)} className={`transition-colors ${t.completed ? 'text-slate-500' : `${s.text} hover:text-white`}`}>
                              {t.completed ? <CheckSquare size={18} /> : <Square size={18} />}
                          </button>
                          <span className={`text-sm font-medium flex-1 leading-tight ${t.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{t.text}</span>
                          <button onClick={() => deleteTodo(t.id)} className="opacity-0 group-hover/item:opacity-100 text-slate-500 hover:text-rose-500 transition-all p-2 hover:bg-rose-500/10 rounded-lg">
                              <Trash2 size={14} />
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  return (
      <div className="animate-fadeIn max-w-6xl mx-auto pb-28">
          {/* PREMIUM HEADER - ORANGE THEME */}
          <div className="relative mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0f172a] via-[#7c2d12] to-[#0f172a] border border-orange-500/20 p-8 md:p-10 shadow-2xl group ring-1 ring-white/5">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/20 blur-[100px] pointer-events-none animate-pulse"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                      <button onClick={() => setTab('dashboard')} className="flex items-center gap-2 text-orange-300 hover:text-white font-bold transition-colors text-xs uppercase tracking-widest mb-4 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 w-fit border border-white/5">
                          <ArrowLeft size={14} /> Dashboard
                      </button>
                      <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200 font-serif tracking-tight mb-2 drop-shadow-sm">
                          Command Matrix
                      </h2>
                      <p className="text-orange-200/60 text-sm md:text-base font-medium tracking-wide">"Focus on being productive instead of busy."</p>
                  </div>
                  <div className="hidden md:flex w-24 h-24 rounded-[2rem] bg-gradient-to-br from-orange-500/20 to-transparent flex items-center justify-center text-orange-400 border border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.2)] rotate-6 backdrop-blur-md">
                      <Target size={48} strokeWidth={1.5} />
                  </div>
              </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl ring-1 ring-white/5 sticky top-4 z-40 mb-8 max-w-md mx-auto">
            <button onClick={() => setSubTab('matrix')} className={`flex-1 px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 ${subTab === 'matrix' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50' : 'text-slate-400 hover:text-white'}`}><LayoutGrid size={16}/><span className="text-xs font-black uppercase tracking-widest">Matrix</span></button>
            <button onClick={() => setSubTab('neural')} className={`flex-1 px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition-all shrink-0 ${subTab === 'neural' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50' : 'text-slate-400 hover:text-white'}`}><Timer size={16}/><span className="text-xs font-black uppercase tracking-widest">Neural Sync</span></button>
          </div>

          {subTab === 'matrix' && (
            <div className="animate-slideUp">
                {/* Input Area */}
                <div className="mb-8 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-2 shadow-xl flex flex-col md:flex-row gap-2 relative z-20">
                    <div className="flex p-1 gap-1 bg-slate-900/80 rounded-[24px] border border-white/5 overflow-x-auto no-scrollbar">
                        {([
                            { id: 'do', label: 'Do', style: styles.do },
                            { id: 'decide', label: 'Plan', style: styles.decide },
                            { id: 'delegate', label: 'Msg', style: styles.delegate },
                            { id: 'delete', label: 'Kill', style: styles.delete }
                        ] as const).map((t) => (
                            <button 
                                key={t.id}
                                type="button" 
                                onClick={() => setMatrixType(t.id)}
                                className={`px-5 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${matrixType === t.id ? `${t.style.btn} text-white shadow-lg ${t.style.shadow}` : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                    
                    <form onSubmit={addTodo} className="flex-1 flex gap-2 p-1">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Add task...`} 
                            className="flex-1 bg-transparent px-4 text-white placeholder:text-slate-600 font-medium focus:outline-none min-w-0"
                        />
                        <button type="submit" className="w-12 h-12 bg-orange-500 text-white rounded-[20px] flex items-center justify-center hover:bg-orange-400 transition-colors shadow-lg shadow-orange-900/20 active:scale-95 shrink-0">
                            <Plus size={24} />
                        </button>
                    </form>
                </div>

                {/* The Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-[700px] md:h-[600px]">
                    <MatrixSection 
                        title="Do First" 
                        type="do" 
                        icon={Zap} 
                        desc="Urgent & Important. Do immediately."
                    />
                    <MatrixSection 
                        title="Schedule" 
                        type="decide" 
                        icon={Clock} 
                        desc="Important, Not Urgent. Plan for later."
                    />
                    <MatrixSection 
                        title="Delegate" 
                        type="delegate" 
                        icon={Filter} 
                        desc="Urgent, Not Important. Automate or outsource."
                    />
                    <MatrixSection 
                        title="Eliminate" 
                        type="delete" 
                        icon={AlertOctagon} 
                        desc="Neither. Distractions to avoid."
                    />
                </div>
            </div>
          )}

          {subTab === 'neural' && (
              <div className="animate-slideUp flex flex-col items-center justify-center py-10">
                  
                  {/* REACTOR CORE TIMER */}
                  <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center mb-12">
                      <div className={`absolute inset-0 rounded-full bg-orange-500/10 blur-[100px] transition-opacity duration-1000 ${isFocusTimer ? 'opacity-100' : 'opacity-20'}`}></div>
                      
                      {/* Outer Rotating Ring */}
                      <div className={`absolute inset-0 border-2 border-dashed border-orange-500/30 rounded-full ${isFocusTimer ? 'animate-spin-slow' : ''}`}></div>
                      <div className={`absolute inset-4 border border-white/5 rounded-full ${isFocusTimer ? 'animate-reverse-spin' : ''}`}></div>
                      
                      {/* Active Progress Ring */}
                      <svg className="absolute inset-0 w-full h-full rotate-[-90deg] drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                          <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#1e293b" strokeWidth="2" />
                          {isFocusTimer && (
                             <circle cx="50%" cy="50%" r="48%" fill="none" stroke="#f97316" strokeWidth="4" strokeDasharray="301" strokeDashoffset={301 - (301 * seconds) / totalSeconds} className="transition-all duration-1000 ease-linear" strokeLinecap="round" />
                          )}
                      </svg>

                      {/* Central Core */}
                      <div className="relative z-10 text-center">
                          {isFocusTimer ? (
                              <>
                                <div className="text-7xl md:text-8xl font-mono font-black text-white tracking-tighter drop-shadow-2xl tabular-nums">
                                    {Math.floor(seconds / 60)}:<span className="text-orange-500">{String(seconds % 60).padStart(2, '0')}</span>
                                </div>
                                <div className="text-sm text-orange-400 font-black uppercase tracking-[0.4em] mt-4 animate-pulse">System Engaged</div>
                              </>
                          ) : (
                              <div className="text-slate-600 font-black text-xl uppercase tracking-widest">Ready to Sync</div>
                          )}
                      </div>
                  </div>

                  {/* Controls */}
                  {isFocusTimer ? (
                      <button onClick={stopTimer} className="px-12 py-5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-lg shadow-rose-900/50 flex items-center gap-3 active:scale-95 group">
                          <Stop size={24} className="fill-current" /> Abort Session
                      </button>
                  ) : (
                      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                          <button onClick={() => startTimer('focus', 25 * 60)} className="p-6 rounded-3xl bg-[#0f172a] border border-orange-500/30 hover:border-orange-400 hover:bg-orange-500/10 transition-all group flex flex-col items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
                              <div className="font-black text-white uppercase tracking-wider text-sm">Deep Work</div>
                              <div className="text-xs text-slate-500 font-mono">25 Minutes</div>
                          </button>

                          <button onClick={() => startTimer('focus', 90 * 60)} className="p-6 rounded-3xl bg-[#0f172a] border border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/10 transition-all group flex flex-col items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform"><Target size={24} /></div>
                              <div className="font-black text-white uppercase tracking-wider text-sm">Monk Mode</div>
                              <div className="text-xs text-slate-500 font-mono">90 Minutes</div>
                          </button>
                          
                          <button onClick={() => startTimer('focus', 5 * 60)} className="col-span-2 p-4 rounded-2xl bg-slate-800/50 border border-white/5 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 text-slate-400 hover:text-white">
                              <Clock size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Quick Recharge (5m)</span>
                          </button>
                      </div>
                  )}
              </div>
          )}
      </div>
  );
};
