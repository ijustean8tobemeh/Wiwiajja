
export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Platinum';
  requiredCount: number;
}

export const generateAchievements = (section: string): AchievementDef[] => {
  const achievements: AchievementDef[] = [];
  
  // Standard tiers
  const tiers = [
    { name: 'Bronze', start: 1, end: 50, step: 1 },
    { name: 'Silver', start: 51, end: 150, step: 2 },
    { name: 'Gold', start: 151, end: 300, step: 5 },
    { name: 'Diamond', start: 301, end: 500, step: 10 },
    { name: 'Platinum', start: 501, end: 1000, step: 25 },
  ];

  tiers.forEach(tier => {
    for (let i = tier.start; i <= tier.end; i += tier.step) {
      achievements.push({
        id: `${section.toLowerCase()}_${i}`,
        title: `${section} ${tier.name} Lvl ${i}`,
        description: `Reach a streak/count of ${i} in ${section}`,
        tier: tier.name as any,
        requiredCount: i
      });
    }
  });

  // Special Ramadan Logic
  if (section === 'Ramadan') {
      // Fasting Milestones
      [1, 3, 7, 10, 15, 20, 25, 29, 30].forEach(d => {
          achievements.push({
              id: `ramadan_fast_${d}`,
              title: `Fasting Warrior ${d}`,
              description: `Completed ${d} days of fasting`,
              tier: d > 20 ? 'Gold' : d > 10 ? 'Silver' : 'Bronze',
              requiredCount: d 
          });
      });
  }

  return achievements;
};

export const checkAchievements = (currentVal: number, section: string): AchievementDef | null => {
  const list = generateAchievements(section);
  return list.find(a => a.requiredCount === currentVal) || null;
};
