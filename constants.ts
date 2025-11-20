

export const PARAH_NAMES = [
  "آلم", "سَيَقُولُ", "تِلْكَ ٱلرُّسُلُ", "لَنْ تَنَالُوا", "وَٱلْمُحْصَنَاتُ", 
  "لَا يُحِبُّ ٱللهُ", "وَإِذَا سَمِعُوا", "وَلَوْ أَنَّنَا", "قَالَ ٱلْمَلَأُ", "وَٱعْلَمُوا", 
  "يَعْتَذِرُونَ", "وَمَا مِنْ دَابَّةٍ", "وَمَا أُبَرِّئُ", "رُبَمَا", "سُبْحَانَ ٱلَّذِى", 
  "قَالَ أَلَمْ", "ٱقْتَرَبَ لِلنَّاسِ", "قَدْ أَفْلَحَ", "وَقَالَ ٱلَّذِينَ", "أَمَّنْ خَلَقَ", 
  "ٱتْلُ مَا أُوحِيَ", "وَمَنْ يَقْنُتْ", "وَمَا لِيَ", "فَمَنْ أَظْلَمُ", "إِلَيْهِ يُرَدُّ", 
  "حم", "قَالَ فَمَا خَطْبُكُمْ", "قَدْ سَمِعَ ٱللهُ", "تَبَارَكَ ٱلَّذِى", "عَمَّ يَتَسَاءَلُونَ"
];

export const DHIKR_GOAL = 2100;
export const DHIKR_INCREMENT = 100;
export const WATER_GOAL = 8;
export const SMOKING_LIMIT = 1;
export const NICOTINE_LIMIT = 3;

export const MANDATORY_PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

export const PRAYER_NAMES_URDU: Record<string, string> = {
  tahajjud: 'تهجد',
  fajr: 'فجر',
  dhuhr: 'ظهر',
  asr: 'عصر',
  maghrib: 'مغرب',
  isha: 'عشاء'
};

export const ARABIC_NUMERALS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export const toArabicNum = (n: number): string => {
  return n.toString().replace(/\d/g, d => ARABIC_NUMERALS[parseInt(d)]);
};

export const ISLAMIC_VIRTUES = [
  { arabic: "صبر", transliteration: "Sabr", meaning: "Patience", description: "Endure trials with grace." },
  { arabic: "توكل", transliteration: "Tawakkul", meaning: "Trust", description: "Rely on Allah's plan." },
  { arabic: "شكر", transliteration: "Shukr", meaning: "Gratitude", description: "Be thankful for blessings." },
  { arabic: "إخلاص", transliteration: "Ikhlas", meaning: "Sincerity", description: "Pure intention for Allah." },
  { arabic: "تقوى", transliteration: "Taqwa", meaning: "Consciousness", description: "Awareness of the Divine." },
  { arabic: "إحسان", transliteration: "Ihsan", meaning: "Excellence", description: "Worship as if you see Him." },
  { arabic: "توبة", transliteration: "Tawbah", meaning: "Repentance", description: "Return to the path." },
  { arabic: "حياء", transliteration: "Haya", meaning: "Modesty", description: "Shyness from sin." },
  { arabic: "صدق", transliteration: "Sidq", meaning: "Truthfulness", description: "Honesty in word and deed." },
  { arabic: "رحمة", transliteration: "Rahmah", meaning: "Mercy", description: "Compassion for creation." }
];

export const URDU_FOCUS_WORDS = [
  { word: "صبر", meaning: "Patience (Sabr)" },
  { word: "توكل", meaning: "Trust (Tawakkul)" },
  { word: "شكر", meaning: "Gratitude (Shukr)" },
  { word: "إخلاص", meaning: "Sincerity (Ikhlas)" },
  { word: "تقوى", meaning: "Piety (Taqwa)" },
  { word: "حياء", meaning: "Modesty (Haya)" },
  { word: "استقامة", meaning: "Steadfastness (Istiqamah)" }
];

export const SLEEP_BENEFITS = [
  "Surah Mulk intercedes for its reciter until they are forgiven.",
  "The last two verses of Baqarah suffice for the one who recites them at night.",
  "Protect yourself from the punishment of the grave.",
  "Sleep in a state of wudu and dhikr to have angels pray for you."
];

export const DHIKR_BENEFITS = {
  astaghfirullah: [
    "Relieves anxiety and opens doors of sustenance.",
    "Polishes the heart from the rust of sins.",
    "A means of strength and blessings in wealth and family."
  ],
  rabbi: [
    "The Dua of Musa (AS) for any good Allah sends.",
    "Expresses total dependence on Allah's mercy.",
    "Attracts divine help in times of need."
  ]
};

export const PANIC_QUOTES = [
    "Indeed, prayer prohibits immorality and wrongdoing. (29:45)",
    "And do not go near zina. Indeed, it is ever an immorality and is evil as a way. (17:32)",
    "Whoever leaves something for the sake of Allah, Allah will replace it with something better.",
    "Patience is bitter, but its fruit is sweet.",
    "Does he not know that Allah sees? (96:14)",
    "This moment of pain is temporary. The glory of discipline is forever."
];

export const RELAPSE_TRIGGERS = [
    "Stress / Anxiety",
    "Boredom / Loneliness",
    "Social Media / Internet",
    "Insomnia / Late Night",
    "Lack of Prayer",
    "Overconfidence"
];

export const MOTIVATION_QUOTES = [
  "Discipline is doing what needs to be done, even if you don't want to do it.",
  "The pain of discipline is far less than the pain of regret.",
  "Your future is created by what you do today, not tomorrow.",
  "Consistency is the key to breaking the chains of the self.",
  "Small habits, when compounded, create massive change.",
  "A river cuts through rock not because of its power, but because of its persistence."
];

export const FITNESS_PLAN: Record<string, any> = {
  Monday: [{name:"Push-ups",total:45},{name:"Squats",total:60},{name:"Chest Press",total:45},{name:"Plank",total:90},{name:"Cobra Stretch",total:60}],
  Tuesday: [{name:"Sit-ups",total:45},{name:"Leg Raises",total:45},{name:"Biceps Curls",total:60},{name:"Lunges",total:30},{name:"Plank",total:90},{name:"Cobra Stretch",total:60}],
  Wednesday: [{name:"Push-ups",total:45},{name:"Squats",total:60},{name:"Chest Press",total:45},{name:"Plank",total:90},{name:"Cobra Stretch",total:60}],
  Thursday: [{name:"Sit-ups",total:45},{name:"Leg Raises",total:45},{name:"Triceps Dips",total:60},{name:"Lunges",total:30},{name:"Plank",total:90},{name:"Cobra Stretch",total:60}],
  Friday: {message:"Rest Day 🛌",total:1},
  Saturday: [{name:"Push-ups",total:45},{name:"Squats",total:60},{name:"Chest Press",total:45},{name:"Plank",total:90},{name:"Cobra Stretch",total:60}],
  Sunday: [{name:"Sit-ups",total:45},{name:"Leg Raises",total:45},{name:"Biceps Curls",total:60},{name:"Lunges",total:30},{name:"Plank",total:90},{name:"Cobra Stretch",total:60}]
};

export const DUAS = [
  {arabic:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً',english:'Our Lord, grant us good in this world and the Hereafter.'},
  {arabic:'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ',english:'O Allah, I ask You for well-being.'},
  {arabic:'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ',english:'My Lord, forgive me and my parents.'},
  {arabic:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ العَظِيمِ',english:'Glory be to Allah and His praise, Glory be to Allah the Great.'},
  {arabic:'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ', english: 'O Allah, help me to remember You, to thank You, and to worship You in the best manner.'}
];

export const STREAK_LADDER = [7, 14, 30, 60, 90, 150, 210, 365];
