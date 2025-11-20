
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, Tab, Notification } from '../types';
import { checkAchievements } from '../utils/achievementSystem';
import { WATER_GOAL, SMOKING_LIMIT, NICOTINE_LIMIT, MANDATORY_PRAYERS, DHIKR_GOAL, FITNESS_PLAN } from '../constants';

const initialState: AppState = {
  currentTab: 'dashboard',
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  privacyMode: false,
  oledMode: false,
  
  globalTimer: { active: false, seconds: 0, totalSeconds: 0, type: 'rest', minimized: false },
  
  notifications: [],
  
  prayerStreak: 0,
  prayerMaxStreak: 0,
  dailyPrayerStatus: { tahajjud: false, fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
  dailyPrayerMeta: {},
  prayerLogTimes: {},
  qazaCount: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, witr: 0 },
  prayerHistory: { daily: [] },
  
  astaghfirullahCount: 0,
  rabbiCount: 0,
  dhikrStreak: 0,
  dhikrMaxStreak: 0,
  dhikrHistory: { daily: [] },
  
  sleepProtection: { mulk: false, baqarah: false },
  sleepStreak: 0,
  
  quranParahClicks: 0,
  quranCompletedParahs: 0,
  quransRecited: 0,
  quranBookmark: { surah: 1, ayah: 1 }, 
  quranHistory: { daily: [] },
  
  mdfLastResetTime: Date.now(),
  mdfStreakDays: 0,
  mdfMaxStreak: 0,
  mdfJournal: [],
  
  hygieneStreak: 0,
  hygieneMaxStreak: 0,
  hygieneCompleted: { brush: false, shower: false, water: 0 },
  hygieneHistory: { daily: [] },
  
  habitStreak: 0,
  habitMaxStreak: 0,
  habitCompleted: { smokingCount: 0, nicotineCount: 0 },
  habitHistory: { daily: [] },
  
  fitnessStreak: 0,
  fitnessMaxStreak: 0,
  fitnessCounters: {},
  weightLog: [],
  fitnessHistory: { daily: [] },
  
  todos: [],
  
  ramadanMode: false,
  ramadanDaily: { fasting: false, taraweeh: false, charity: false },
  ramadanYaseenCount: 0,
  ramadanQuranCount: 0,
  ramadanStreak: 0,

  jumuah: { ghusl: false, kahf: false, miswak: false, durood: false },
  
  lastSuccessfulCheckDate: Date.now(),
};

interface AppContextType {
  state: AppState;
  setTab: (tab: Tab) => void;
  updateState: (updates: Partial<AppState>) => void;
  resetData: (section: string) => void;
  addNotification: (title: string, msg: string, type: 'success'|'info'|'warning'|'achievement') => void;
  markAllRead: () => void;
  importData: (json: string) => boolean;
  
  // Timer Controls
  startTimer: (type: 'rest'|'focus', seconds: number, label?: string) => void;
  stopTimer: () => void;
  minimizeTimer: (val: boolean) => void;
  
  // System Status
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [loaded, setLoaded] = useState(false);

  // Connectivity Listener
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem('zohaib_dashboard_data_v11');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with initial state to ensure new fields (like globalTimer) exist
        setState(prev => ({ 
            ...prev, 
            ...parsed,
            globalTimer: parsed.globalTimer || prev.globalTimer, 
            jumuah: parsed.jumuah || prev.jumuah,
            qazaCount: parsed.qazaCount || prev.qazaCount,
            notifications: parsed.notifications || [],
            isOnline: navigator.onLine // Ensure this is fresh
        }));
      } catch (e) {
        console.error("Failed to load data", e);
      }
    }
    // Simulate a small delay for the boot effect if needed, or just set true
    setTimeout(() => setLoaded(true), 800);
  }, []);

  // Save Data
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('zohaib_dashboard_data_v11', JSON.stringify(state));
    }
  }, [state, loaded]);

  // GLOBAL TIMER LOGIC
  useEffect(() => {
    let interval: any;
    if (state.globalTimer.active && state.globalTimer.seconds > 0) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          globalTimer: { ...prev.globalTimer, seconds: prev.globalTimer.seconds - 1 }
        }));
      }, 1000);
    } else if (state.globalTimer.active && state.globalTimer.seconds === 0) {
      // Timer Finished
      const isRest = state.globalTimer.type === 'rest';
      addNotification(
          isRest ? 'Recovery Complete' : 'Focus Session Done', 
          isRest ? 'Time to get back to work!' : 'Great job! Take a break.', 
          'success'
      );
      // Play sound effect could go here
      setState(prev => ({ ...prev, globalTimer: { ...prev.globalTimer, active: false, minimized: false } }));
    }
    return () => clearInterval(interval);
  }, [state.globalTimer.active, state.globalTimer.seconds]);

  const startTimer = (type: 'rest'|'focus', seconds: number, label?: string) => {
      setState(prev => ({
          ...prev,
          globalTimer: { active: true, seconds, totalSeconds: seconds, type, label, minimized: false }
      }));
  };

  const stopTimer = () => {
      setState(prev => ({
          ...prev,
          globalTimer: { ...prev.globalTimer, active: false, minimized: false }
      }));
  };

  const minimizeTimer = (val: boolean) => {
      setState(prev => ({
          ...prev,
          globalTimer: { ...prev.globalTimer, minimized: val }
      }));
  };

  const addNotification = (title: string, message: string, type: 'success'|'info'|'warning'|'achievement') => {
    const newNotif: Notification = {
      id: Date.now().toString() + Math.random(),
      title,
      message,
      type,
      timestamp: Date.now(),
      read: false
    };
    setState(prev => ({ ...prev, notifications: [newNotif, ...prev.notifications].slice(0, 50) }));
  };

  const markAllRead = () => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true }))
    }));
  };

  // Achievement Check
  useEffect(() => {
    if(!loaded) return;
    [
        {val: state.prayerStreak, sec: 'Prayer'},
        {val: state.dhikrStreak, sec: 'Dhikr'},
        {val: state.fitnessStreak, sec: 'Fitness'},
        {val: state.mdfStreakDays, sec: 'MDF'},
        {val: state.hygieneStreak, sec: 'Hygiene'},
        {val: state.ramadanStreak, sec: 'Ramadan'}
    ].forEach(item => {
        const ach = checkAchievements(item.val, item.sec);
        if (ach) addNotification('Milestone Unlocked', `${ach.title} acquired.`, 'achievement');
    });
  }, [state.prayerStreak, state.dhikrStreak, state.fitnessStreak, state.mdfStreakDays, state.hygieneStreak, state.ramadanStreak]);

  // STRICT DAILY RESET LOGIC
  useEffect(() => {
    if (!loaded) return;
    
    const now = new Date();
    const lastCheck = new Date(state.lastSuccessfulCheckDate);
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastMidnight = new Date(lastCheck.getFullYear(), lastCheck.getMonth(), lastCheck.getDate());
    
    const diffTime = todayMidnight.getTime() - lastMidnight.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return;

    const isFriday = now.getDay() === 5;
    const wasYesterday = diffDays === 1;

    setState(prev => {
        // --- STREAK EVALUATION ---
        const allPrayersDone = MANDATORY_PRAYERS.every(p => prev.dailyPrayerStatus[p as keyof typeof prev.dailyPrayerStatus]);
        const newPrayerStreak = (wasYesterday && allPrayersDone) ? prev.prayerStreak + 1 : (wasYesterday ? 0 : 0);

        const hygieneDone = prev.hygieneCompleted.brush && prev.hygieneCompleted.shower && prev.hygieneCompleted.water >= WATER_GOAL;
        const newHygieneStreak = (wasYesterday && hygieneDone) ? prev.hygieneStreak + 1 : 0;

        const habitsKept = prev.habitCompleted.smokingCount <= SMOKING_LIMIT && prev.habitCompleted.nicotineCount <= NICOTINE_LIMIT;
        const newHabitStreak = (wasYesterday && habitsKept) ? prev.habitStreak + 1 : 0;

        const dhikrTotal = prev.astaghfirullahCount + prev.rabbiCount;
        const dhikrDone = dhikrTotal >= (DHIKR_GOAL * 0.5);
        const newDhikrStreak = (wasYesterday && dhikrDone) ? prev.dhikrStreak + 1 : 0;

        const sleepDone = prev.sleepProtection.mulk && prev.sleepProtection.baqarah;
        const newSleepStreak = (wasYesterday && sleepDone) ? prev.sleepStreak + 1 : 0;

        const dayName = lastCheck.toLocaleDateString('en-US', { weekday: 'long' });
        const plan = FITNESS_PLAN[dayName];
        let fitnessDone = false;
        if (!Array.isArray(plan)) {
            fitnessDone = true; 
        } else {
            let goal = 0, done = 0;
            plan.forEach((t: any) => {
                goal += t.total;
                done += prev.fitnessCounters[t.name.replace(/\s+/g, '')] || 0;
            });
            fitnessDone = done >= (goal * 0.5); 
        }
        const newFitnessStreak = (wasYesterday && fitnessDone) ? prev.fitnessStreak + 1 : 0;
        const ramadanStreak = prev.ramadanMode && prev.ramadanDaily.fasting ? prev.ramadanStreak + 1 : prev.ramadanStreak;

        const addToHistory = (hist: {daily: any[]}, val: number, dateLabel: string) => ({
             daily: [...hist.daily, { date: dateLabel, value: val }].slice(-7)
        });
        const dateLabel = lastCheck.toLocaleDateString('en-US', { weekday: 'short' });

        return {
          ...prev,
          lastSuccessfulCheckDate: Date.now(),
          
          prayerStreak: newPrayerStreak,
          prayerMaxStreak: Math.max(prev.prayerMaxStreak, newPrayerStreak),
          
          hygieneStreak: newHygieneStreak,
          hygieneMaxStreak: Math.max(prev.hygieneMaxStreak, newHygieneStreak),
          
          habitStreak: newHabitStreak,
          habitMaxStreak: Math.max(prev.habitMaxStreak, newHabitStreak),
          
          dhikrStreak: newDhikrStreak,
          dhikrMaxStreak: Math.max(prev.dhikrMaxStreak, newDhikrStreak),
          
          sleepStreak: newSleepStreak,
          
          fitnessStreak: newFitnessStreak,
          fitnessMaxStreak: Math.max(prev.fitnessMaxStreak, newFitnessStreak),
          
          ramadanStreak: ramadanStreak,

          dailyPrayerStatus: { tahajjud: false, fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
          dailyPrayerMeta: {},
          prayerLogTimes: {},
          hygieneCompleted: { brush: false, shower: false, water: 0 },
          habitCompleted: { smokingCount: 0, nicotineCount: 0 },
          ramadanDaily: { fasting: false, taraweeh: false, charity: false },
          fitnessCounters: {},
          astaghfirullahCount: 0,
          rabbiCount: 0,
          sleepProtection: { mulk: false, baqarah: false },

          jumuah: isFriday ? { ghusl: false, kahf: false, miswak: false, durood: false } : prev.jumuah,
          
          prayerHistory: addToHistory(prev.prayerHistory, allPrayersDone ? 100 : 50, dateLabel),
          hygieneHistory: addToHistory(prev.hygieneHistory, hygieneDone ? 100 : 50, dateLabel),
          habitHistory: addToHistory(prev.habitHistory, habitsKept ? 100 : 0, dateLabel),
          dhikrHistory: addToHistory(prev.dhikrHistory, dhikrTotal, dateLabel),
          fitnessHistory: addToHistory(prev.fitnessHistory, fitnessDone ? 100 : 0, dateLabel),
        };
    });

    const msg = wasYesterday ? "Daily stats reset. Streaks updated." : "Missed a day! Streaks reset to 0.";
    addNotification("System", isFriday ? `Jumuah Mubarak! ${msg}` : msg, wasYesterday ? 'info' : 'warning');

  }, [loaded, state.lastSuccessfulCheckDate]);

  const updateState = (updates: Partial<AppState>) => setState(prev => {
     const nextState = { ...prev, ...updates };
     if (updates.mdfStreakDays && updates.mdfStreakDays > nextState.mdfMaxStreak) {
         nextState.mdfMaxStreak = updates.mdfStreakDays;
     }
     return nextState;
  });

  const setTab = (tab: Tab) => updateState({ currentTab: tab });
  
  const resetData = (section: string) => {
    if (section === 'all') {
      localStorage.removeItem('zohaib_dashboard_data_v11');
      setState(initialState);
      window.location.reload();
    }
  };

  const importData = (json: string) => {
    try {
      setState({ ...JSON.parse(json), lastSuccessfulCheckDate: Date.now() });
      addNotification('System', 'Database imported successfully.', 'success');
      return true;
    } catch (e) {
      addNotification('Error', 'Corrupt data file.', 'warning');
      return false;
    }
  };

  return (
    <AppContext.Provider value={{ state, setTab, updateState, resetData, addNotification, markAllRead, importData, startTimer, stopTimer, minimizeTimer, isLoaded: loaded }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
