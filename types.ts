

export type Tab = 'dashboard' | 'prayer' | 'dhikr' | 'quran' | 'mdf' | 'hygiene' | 'fitness' | 'ramadan' | 'focus';

export interface DailyPrayerStatus {
  tahajjud: boolean;
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface PrayerMeta {
  jamah: boolean;
  khushu: number; // 1-5
}

export interface PrayerLogTimes {
  [key: string]: string;
}

export interface QazaCount {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  witr: number;
}

export interface SleepProtection {
  mulk: boolean;
  baqarah: boolean;
}

export interface HygieneCompleted {
  brush: boolean;
  shower: boolean;
  water: number;
}

export interface HabitCompleted {
  smokingCount: number;
  nicotineCount: number;
}

export interface FitnessCounters {
  [key: string]: number;
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface RamadanDaily {
  fasting: boolean;
  taraweeh: boolean;
  charity: boolean;
}

export interface JumuahState {
  ghusl: boolean;
  kahf: boolean;
  miswak: boolean;
  durood: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'achievement';
  timestamp: number;
  read: boolean;
}

export interface HistoryEntry {
  date: string;
  value: number;
}

export interface SectionHistory {
  daily: HistoryEntry[];
}

export interface JournalEntry {
  id: string;
  date: number;
  type: 'urge' | 'relapse' | 'reflection' | 'dream';
  content: string;
  trigger?: string;
}

export interface Todo {
  id: string;
  text: string;
  matrix: 'do' | 'decide' | 'delegate' | 'delete';
  completed: boolean;
}

export interface QuranBookmark {
  surah: number;
  ayah: number;
}

export interface GlobalTimer {
  active: boolean;
  seconds: number;
  totalSeconds: number;
  type: 'rest' | 'focus';
  label?: string;
  minimized: boolean;
}

export interface AppState {
  currentTab: Tab;
  isOnline: boolean; // New field for connectivity status
  
  // Settings
  privacyMode: boolean;
  oledMode: boolean;
  
  // Global Timer (Persistent across tabs)
  globalTimer: GlobalTimer;

  // Notification System
  notifications: Notification[];
  
  // Prayer
  prayerStreak: number;
  prayerMaxStreak: number;
  dailyPrayerStatus: DailyPrayerStatus;
  dailyPrayerMeta: Record<string, PrayerMeta>;
  prayerLogTimes: PrayerLogTimes;
  qazaCount: QazaCount;
  prayerHistory: SectionHistory;
  
  // Dhikr & Sleep Protection
  astaghfirullahCount: number;
  rabbiCount: number;
  dhikrStreak: number;
  dhikrMaxStreak: number;
  dhikrHistory: SectionHistory;
  
  // Sleep
  sleepProtection: SleepProtection;
  sleepStreak: number;
  
  // Quran
  quranParahClicks: number;
  quranCompletedParahs: number;
  quransRecited: number;
  quranBookmark: QuranBookmark; 
  quranHistory: SectionHistory;
  
  // MDF (Retention)
  mdfLastResetTime: number;
  mdfStreakDays: number;
  mdfMaxStreak: number;
  mdfJournal: JournalEntry[];
  
  // Hygiene
  hygieneStreak: number;
  hygieneMaxStreak: number;
  hygieneCompleted: HygieneCompleted;
  hygieneHistory: SectionHistory;
  
  // Habit
  habitStreak: number;
  habitMaxStreak: number;
  habitCompleted: HabitCompleted;
  habitHistory: SectionHistory;
  
  // Fitness
  fitnessStreak: number;
  fitnessMaxStreak: number;
  fitnessCounters: FitnessCounters;
  weightLog: WeightEntry[];
  fitnessHistory: SectionHistory;
  
  // Focus (Productivity)
  todos: Todo[];
  
  // Ramadan
  ramadanMode: boolean;
  ramadanDaily: RamadanDaily;
  ramadanYaseenCount: number; 
  ramadanQuranCount: number;  
  ramadanStreak: number;

  // Jumuah (Friday) Protocol
  jumuah: JumuahState;

  lastSuccessfulCheckDate: number;
}