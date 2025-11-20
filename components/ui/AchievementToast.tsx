
import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useAppContext';
import { Trophy, X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const AchievementToast: React.FC = () => {
  const { state } = useApp();
  const [visible, setVisible] = useState(false);
  const [currentToast, setCurrentToast] = useState<any>(null);

  useEffect(() => {
    const latest = state.notifications[0];
    // Show toast for any unread notification created in the last 2 seconds
    if (latest && !latest.read && Date.now() - latest.timestamp < 2000) {
      setCurrentToast(latest);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [state.notifications]);

  if (!visible || !currentToast) return null;

  const getStyles = (type: string) => {
    switch(type) {
      case 'achievement': 
        return { 
          bg: 'bg-gradient-to-r from-amber-500/10 to-purple-500/10',
          border: 'border-amber-500/30',
          iconBg: 'bg-gradient-to-br from-amber-400 to-orange-600',
          iconShadow: 'shadow-orange-500/20',
          icon: <Trophy size={24} className="text-white animate-bounce" />,
          titleColor: 'text-amber-500'
        };
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10',
          border: 'border-emerald-500/30',
          iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-600',
          iconShadow: 'shadow-emerald-500/20',
          icon: <CheckCircle size={24} className="text-white" />,
          titleColor: 'text-emerald-400'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-rose-500/10 to-red-500/10',
          border: 'border-rose-500/30',
          iconBg: 'bg-gradient-to-br from-rose-400 to-red-600',
          iconShadow: 'shadow-rose-500/20',
          icon: <AlertTriangle size={24} className="text-white" />,
          titleColor: 'text-rose-400'
        };
      default: // info
        return {
          bg: 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10',
          border: 'border-blue-500/30',
          iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-600',
          iconShadow: 'shadow-blue-500/20',
          icon: <Info size={24} className="text-white" />,
          titleColor: 'text-blue-400'
        };
    }
  };

  const styles = getStyles(currentToast.type);

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[100] animate-slideLeft">
      <div className={`relative overflow-hidden bg-slate-900 text-white p-1 rounded-2xl shadow-2xl border ${styles.border} max-w-sm`}>
        <div className={`absolute inset-0 ${styles.bg}`} />
        <div className="relative bg-[#0f172a] rounded-xl p-4 flex items-center gap-4">
            <div className={`${styles.iconBg} p-3 rounded-xl shadow-lg ${styles.iconShadow}`}>
                {styles.icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-xs font-black uppercase tracking-widest mb-0.5 ${styles.titleColor}`}>
                   {currentToast.type === 'achievement' ? 'Unlocked' : currentToast.type.toUpperCase()}
                </div>
                <div className="font-bold text-sm md:text-base text-white truncate">{currentToast.title}</div>
                <div className="text-xs text-slate-400 truncate">{currentToast.message}</div>
            </div>
            <button onClick={() => setVisible(false)} className="text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
        </div>
      </div>
    </div>
  );
};
