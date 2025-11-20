
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './hooks/useAppContext';
import { Topbar } from './components/Layout/Topbar';
import { BottomDock } from './components/Layout/BottomDock';
import { DashboardHome } from './components/Dashboard/DashboardHome';
import { PrayerPage } from './components/Prayer/PrayerPage';
import { DhikrPage } from './components/Dhikr/DhikrPage';
import { QuranPage } from './components/Quran/QuranPage';
import { MDFPage } from './components/MDF/MDFPage';
import { HygienePage } from './components/Hygiene/HygienePage';
import { FitnessPage } from './components/Fitness/FitnessPage';
import { RamadanPage } from './components/Ramadan/RamadanPage';
import { FocusPage } from './components/Focus/FocusPage';
import { SettingsModal } from './components/Shared/SettingsModal';
import { AchievementToast } from './components/ui/AchievementToast';
import { Timer, Minimize2, Maximize2, X, Hexagon, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
          <AlertTriangle size={48} className="text-rose-500 mb-4" />
          <h1 className="text-2xl font-black mb-2">System Malfunction</h1>
          <p className="text-slate-400 mb-6 max-w-md">{this.state.error?.message || "An unexpected error occurred."}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-colors"
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const BootScreen = () => (
  <div className="fixed inset-0 bg-[#020617] z-[9999] flex flex-col items-center justify-center animate-fadeIn">
    <div className="relative w-24 h-24 mb-8">
       <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-ping"></div>
       <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
       <div className="absolute inset-4 bg-indigo-500/20 rounded-full backdrop-blur-md flex items-center justify-center border border-indigo-500/50">
         <Hexagon size={32} className="text-indigo-400 animate-pulse" />
       </div>
    </div>
    <div className="text-2xl font-black text-white tracking-widest font-mono animate-pulse">ZOHAIB OS v1.0</div>
    <div className="text-xs text-indigo-400 font-bold uppercase tracking-[0.3em] mt-3">Welcome Back, Zohaib</div>
  </div>
);

const GlobalTimerHUD: React.FC = () => {
  const { state, setTab, stopTimer, minimizeTimer } = useApp();
  const { active, seconds, totalSeconds, type, minimized } = state.globalTimer;

  if (!active) return null;

  const shouldShowHUD = minimized || (type === 'rest' && state.currentTab !== 'fitness') || (type === 'focus' && state.currentTab !== 'focus');

  if (!shouldShowHUD) return null;

  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  const isRest = type === 'rest';
  const color = isRest ? 'text-purple-400' : 'text-orange-400';
  const border = isRest ? 'border-purple-500' : 'border-orange-500';
  const bg = isRest ? 'bg-purple-500' : 'bg-orange-500';

  return (
      <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[800] animate-slideLeft">
          <div className={`relative overflow-hidden bg-[#0f172a]/90 backdrop-blur-xl border ${border}/30 rounded-2xl shadow-2xl flex items-center gap-4 p-4 w-64 group`}>
              <div className={`absolute bottom-0 left-0 h-1 ${bg} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
              
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}/20 ${color} shrink-0`}>
                  <Timer size={20} className="animate-pulse" />
              </div>
              
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setTab(isRest ? 'fitness' : 'focus')}>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{type.toUpperCase()}</div>
                  <div className="text-xl font-mono font-bold text-white leading-none mt-0.5">
                      {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
                  </div>
              </div>

              <div className="flex gap-1">
                   <button onClick={() => setTab(isRest ? 'fitness' : 'focus')} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                       <Maximize2 size={14} />
                   </button>
                   <button onClick={stopTimer} className="p-1.5 hover:bg-rose-500/20 rounded-lg text-slate-400 hover:text-rose-400 transition-colors">
                       <X size={14} />
                   </button>
              </div>
          </div>
      </div>
  );
}

const MainContent: React.FC = () => {
  const { state, setTab, isLoaded } = useApp();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [atmosphere, setAtmosphere] = useState({ top: 'bg-indigo-900/10', bottom: 'bg-purple-900/5' });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
        switch(e.key) {
            case '1': setTab('dashboard'); break;
            case '2': setTab('prayer'); break;
            case '3': setTab('dhikr'); break;
            case '4': setTab('quran'); break;
            case '5': setTab('mdf'); break;
            case '6': setTab('hygiene'); break;
            case '7': setTab('fitness'); break;
            case '8': setTab('focus'); break;
            case '9': if(state.ramadanMode) setTab('ramadan'); break;
            case 'Escape': setSettingsOpen(false); break;
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.ramadanMode]);

  useEffect(() => {
    const updateAtmosphere = () => {
        const h = new Date().getHours();
        if (h >= 5 && h < 12) {
             setAtmosphere({ top: 'bg-sky-500/10', bottom: 'bg-teal-500/10' });
        } else if (h >= 12 && h < 17) {
             setAtmosphere({ top: 'bg-amber-500/10', bottom: 'bg-blue-600/10' });
        } else if (h >= 17 && h < 20) {
             setAtmosphere({ top: 'bg-orange-600/10', bottom: 'bg-purple-800/10' });
        } else {
             setAtmosphere({ top: 'bg-indigo-900/20', bottom: 'bg-[#020617]' });
        }
    };
    updateAtmosphere();
    const interval = setInterval(updateAtmosphere, 60000 * 15);
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
      return <BootScreen />;
  }

  const renderContent = () => {
    switch (state.currentTab) {
      case 'dashboard': return <DashboardHome />;
      case 'prayer': return <PrayerPage />;
      case 'dhikr': return <DhikrPage />;
      case 'quran': return <QuranPage />;
      case 'mdf': return <MDFPage />;
      case 'hygiene': return <HygienePage />;
      case 'fitness': return <FitnessPage />;
      case 'ramadan': return <RamadanPage />;
      case 'focus': return <FocusPage />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className={`min-h-screen text-slate-200 font-sans ${state.oledMode ? 'bg-black' : 'bg-[#020617]'} selection:bg-indigo-500/30 pb-36 md:pb-32 overflow-x-hidden transition-colors duration-1000`}>
      {!state.oledMode && (
        <>
          <div className={`fixed top-0 left-0 w-full h-[600px] blur-[120px] pointer-events-none transition-colors duration-[3000ms] ease-in-out ${atmosphere.top}`} />
          <div className={`fixed bottom-0 right-0 w-full h-[400px] blur-[100px] pointer-events-none transition-colors duration-[3000ms] ease-in-out ${atmosphere.bottom}`} />
        </>
      )}

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Topbar onOpenSettings={() => setSettingsOpen(true)} />
        <main className="animate-fadeIn relative z-10">
          {renderContent()}
        </main>
      </div>

      <BottomDock />
      <GlobalTimerHUD />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <AchievementToast />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <ErrorBoundary>
        <MainContent />
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
