
import React from 'react';
import { Trophy, ArrowUpRight } from 'lucide-react';

interface WidgetCardProps {
  title: string;
  icon: React.ReactNode;
  currentValue: string | number;
  currentLabel: string;
  overallValue: string | number;
  overallLabel: string;
  colorClass: string;
  onClick: () => void;
  visual: React.ReactNode;
  status?: 'success' | 'warning' | 'neutral';
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ 
  title, icon, 
  currentValue, currentLabel,
  overallValue, overallLabel,
  colorClass, onClick, visual, status = 'neutral'
}) => {
  
  const baseColorMatch = colorClass.match(/bg-([a-z]+)-/);
  const baseColor = baseColorMatch ? baseColorMatch[1] : 'slate';

  // Explicit map for gradient 'from' classes to ensure Tailwind picks them up
  const glowMap: Record<string, string> = {
    indigo: 'from-indigo-500',
    teal: 'from-teal-500',
    emerald: 'from-emerald-500',
    sky: 'from-sky-500',
    purple: 'from-purple-500',
    rose: 'from-rose-500',
    fuchsia: 'from-fuchsia-500',
    amber: 'from-amber-500',
    slate: 'from-slate-500',
  };

  const blurMap: Record<string, string> = {
    indigo: 'bg-indigo-500/10 group-hover:bg-indigo-500/20',
    teal: 'bg-teal-500/10 group-hover:bg-teal-500/20',
    emerald: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    sky: 'bg-sky-500/10 group-hover:bg-sky-500/20',
    purple: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    rose: 'bg-rose-500/10 group-hover:bg-rose-500/20',
    fuchsia: 'bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20',
    amber: 'bg-amber-500/10 group-hover:bg-amber-500/20',
    slate: 'bg-slate-500/10 group-hover:bg-slate-500/20',
  };

  const glowClass = glowMap[baseColor] || 'from-slate-500';
  const blurClass = blurMap[baseColor] || 'bg-slate-500/10 group-hover:bg-slate-500/20';

  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col justify-between h-[22rem] p-7 rounded-[40px] hover:-translate-y-2 active:scale-[0.98] transition-all duration-500 overflow-hidden text-left w-full shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5 bg-[#0f172a] ring-1 ring-white/5 hover:ring-white/10"
    >
      {/* Dynamic Background & Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07] mix-blend-overlay pointer-events-none"></div>
      
      {/* Interactive Glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ease-out bg-gradient-to-br ${glowClass} via-transparent to-transparent`}></div>
      <div className={`absolute -right-24 -top-24 w-72 h-72 rounded-full blur-[100px] transition-all duration-1000 group-hover:scale-125 ${blurClass}`}></div>
      <div className={`absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-white/5 blur-[80px] transition-all duration-1000 group-hover:scale-110`}></div>

      {/* TOP ROW */}
      <div className="flex items-center justify-between w-full z-10 relative">
        <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] transition-all duration-500 ${colorClass} relative overflow-hidden ring-1 ring-white/5 group-hover:ring-white/20 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">{icon}</div>
            </div>
            <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">{title}</div>
                <div className="flex items-center gap-2 mt-1.5">
                     <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-slate-600'}`}></div>
                     <span className="text-[11px] font-bold text-slate-500 tracking-wide">{status === 'success' ? 'Active' : status === 'warning' ? 'Attention' : 'Idle'}</span>
                </div>
            </div>
        </div>
        
        <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/5 text-slate-600 bg-slate-800/50 group-hover:text-white group-hover:bg-white/10 transition-all duration-500 rotate-45 group-hover:rotate-0 shadow-lg">
            <ArrowUpRight size={16} strokeWidth={3} />
        </div>
      </div>

      {/* MIDDLE: Visual */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 scale-[0.9] group-hover:scale-110 transition-transform duration-700 opacity-100 pointer-events-none drop-shadow-2xl filter group-hover:brightness-110">
          {visual}
      </div>

      {/* BOTTOM ROW */}
      <div className="z-10 relative mt-auto w-full backdrop-blur-md bg-[#0f172a]/60 p-4 rounded-3xl border border-white/5 shadow-lg group-hover:border-white/10 transition-colors duration-500">
          <div className="grid grid-cols-2 gap-6 divide-x divide-white/5">
              {/* Current */}
              <div className="flex flex-col min-w-0 px-1">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">{currentLabel}</div>
                  <div className="text-2xl md:text-3xl font-sans font-black text-white tracking-tighter truncate drop-shadow-sm">
                      {currentValue}
                  </div>
              </div>

              {/* Overall */}
              <div className="flex flex-col items-end pl-6 min-w-0">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5 truncate">
                      {overallLabel} <Trophy size={10} className="text-amber-500" />
                  </div>
                  <div className={`text-xl md:text-2xl font-sans font-bold tracking-tight transition-colors ${baseColor === 'rose' ? 'text-rose-200' : 'text-indigo-200'} group-hover:text-white truncate`}>
                      {overallValue}
                  </div>
              </div>
          </div>
      </div>
    </button>
  );
};
