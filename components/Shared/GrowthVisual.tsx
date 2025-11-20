

import React from 'react';
import { 
  Sprout, TreePine, Flower2, Leaf, Zap, Flame, Droplets, Waves, 
  Sparkles, Sun, Anchor, Moon, Star, BookOpen, Scroll, PenTool, 
  Shield, ShieldAlert, ShieldCheck, Box, Hexagon, Mountain,
  CloudRain, Hammer, Sword, Crown, Lightbulb, Feather, GraduationCap,
  Gift, Hand, Building2, Tent, Target, BrainCircuit, Focus
} from 'lucide-react';

interface GrowthVisualProps {
  streak: number;
  type: 'nature' | 'strength' | 'water' | 'light' | 'knowledge' | 'shield' | 'ramadan' | 'focus';
  size?: 'sm' | 'md' | 'lg';
}

export const GrowthVisual: React.FC<GrowthVisualProps> = ({ streak, type, size = 'md' }) => {
  
  const isRamadan = type === 'ramadan';
  const cycleLength = isRamadan ? 30 : 365;
  
  const prestige = Math.floor(streak / cycleLength);
  const currentProgress = streak % (cycleLength + 1);

  const getSize = () => {
    switch(size) {
      case 'sm': return { box: 'w-10 h-10', icon: 18, text: 'text-[8px]' };
      case 'md': return { box: 'w-16 h-16', icon: 32, text: 'text-[10px]' };
      case 'lg': return { box: 'w-20 h-20 md:w-24 md:h-24', icon: 40, text: 'text-xs' };
    }
  };
  
  const dim = getSize();

  // --- EVOLUTION CONFIGURATION ---
  const getEvolution = () => {
    
    // 0. RAMADAN (30 Day Cycle)
    if (type === 'ramadan') {
        if (currentProgress >= 30) return { icon: Gift, color: 'text-rose-400', bg: 'bg-rose-500/20', label: 'Eid Mubarak!' };
        if (currentProgress >= 27) return { icon: Star, color: 'text-yellow-200', bg: 'bg-indigo-900', label: 'Laylatul Qadr' };
        if (currentProgress >= 21) return { icon: Building2, color: 'text-emerald-400', bg: 'bg-emerald-500/20', label: 'Itikaf' };
        if (currentProgress >= 15) return { icon: Moon, color: 'text-indigo-300', bg: 'bg-indigo-500/20', label: 'Full Moon' };
        if (currentProgress >= 11) return { icon: Hand, color: 'text-amber-300', bg: 'bg-amber-500/20', label: 'Forgiveness' };
        if (currentProgress >= 6)  return { icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/20', label: 'Lantern' };
        if (currentProgress >= 3)  return { icon: Tent, color: 'text-slate-300', bg: 'bg-slate-800', label: 'Discipline' };
        if (currentProgress >= 1)  return { icon: Moon, color: 'text-slate-400', bg: 'bg-slate-900', label: 'Hilal' };
        return { icon: Hexagon, color: 'text-slate-600', bg: 'bg-slate-950', label: 'Preparation' };
    }

    // 1. PRAYER (Nature)
    if (type === 'nature') {
       if (currentProgress >= 365) return { icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Jannatul Firdaus' };
       if (currentProgress >= 300) return { icon: TreePine, color: 'text-amber-400', bg: 'bg-amber-500/20', label: 'Golden Tree' };
       if (currentProgress >= 240) return { icon: TreePine, color: 'text-emerald-600', bg: 'bg-emerald-600/20', label: 'Ancient Oak' };
       if (currentProgress >= 180) return { icon: TreePine, color: 'text-emerald-500', bg: 'bg-emerald-500/20', label: 'Forest Giant' };
       if (currentProgress >= 120) return { icon: TreePine, color: 'text-green-500', bg: 'bg-green-500/20', label: 'Mature Tree' };
       if (currentProgress >= 90)  return { icon: TreePine, color: 'text-lime-500', bg: 'bg-lime-500/20', label: 'Young Tree' };
       if (currentProgress >= 60)  return { icon: Flower2, color: 'text-teal-400', bg: 'bg-teal-500/20', label: 'Blossom' };
       if (currentProgress >= 30)  return { icon: Sprout, color: 'text-green-400', bg: 'bg-green-500/20', label: 'Sapling' };
       if (currentProgress >= 14)  return { icon: Leaf, color: 'text-green-300', bg: 'bg-green-500/10', label: 'Seedling' };
       if (currentProgress >= 3)   return { icon: Sprout, color: 'text-emerald-200', bg: 'bg-emerald-500/10', label: 'Sprout' };
       return { icon: Hexagon, color: 'text-slate-500', bg: 'bg-slate-800', label: 'Seed' };
    }

    // 2. DHIKR (Light)
    if (type === 'light') {
       if (currentProgress >= 365) return { icon: Sun, color: 'text-yellow-300', bg: 'bg-yellow-500/20', label: 'Supernova' };
       if (currentProgress >= 300) return { icon: Sun, color: 'text-orange-400', bg: 'bg-orange-500/20', label: 'Solar Star' };
       if (currentProgress >= 240) return { icon: Star, color: 'text-amber-300', bg: 'bg-amber-500/20', label: 'Guiding Star' };
       if (currentProgress >= 180) return { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Thunderbolt' };
       if (currentProgress >= 120) return { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/20', label: 'Bonfire' };
       if (currentProgress >= 90)  return { icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10', label: 'Torch' };
       if (currentProgress >= 60)  return { icon: Lightbulb, color: 'text-yellow-200', bg: 'bg-yellow-500/10', label: 'Lantern' };
       if (currentProgress >= 30)  return { icon: Lightbulb, color: 'text-slate-200', bg: 'bg-slate-700', label: 'Lamp' };
       if (currentProgress >= 14)  return { icon: Sparkles, color: 'text-yellow-100', bg: 'bg-slate-800', label: 'Candle' };
       if (currentProgress >= 3)   return { icon: Sparkles, color: 'text-slate-400', bg: 'bg-slate-900', label: 'Spark' };
       return { icon: Hexagon, color: 'text-slate-600', bg: 'bg-slate-900', label: 'Darkness' };
    }

    // 3. QURAN (Knowledge)
    if (type === 'knowledge') {
       if (currentProgress >= 365) return { icon: Sun, color: 'text-white', bg: 'bg-indigo-500/50', label: 'Divine Noor' };
       if (currentProgress >= 300) return { icon: GraduationCap, color: 'text-indigo-300', bg: 'bg-indigo-500/20', label: 'Sage' };
       if (currentProgress >= 240) return { icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-500/20', label: 'Scholar' };
       if (currentProgress >= 180) return { icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Hafiz' };
       if (currentProgress >= 120) return { icon: BookOpen, color: 'text-sky-400', bg: 'bg-sky-500/20', label: 'Library' };
       if (currentProgress >= 90)  return { icon: BookOpen, color: 'text-cyan-400', bg: 'bg-cyan-500/20', label: 'Volume' };
       if (currentProgress >= 60)  return { icon: Scroll, color: 'text-teal-300', bg: 'bg-teal-500/10', label: 'Book' };
       if (currentProgress >= 30)  return { icon: Scroll, color: 'text-emerald-300', bg: 'bg-emerald-500/10', label: 'Scroll' };
       if (currentProgress >= 14)  return { icon: Feather, color: 'text-slate-300', bg: 'bg-slate-700', label: 'Quill' };
       if (currentProgress >= 3)   return { icon: PenTool, color: 'text-slate-400', bg: 'bg-slate-800', label: 'Ink' };
       return { icon: PenTool, color: 'text-slate-600', bg: 'bg-slate-900', label: 'Empty Page' };
    }

    // 4. MDF (Defense/Shield)
    if (type === 'shield') {
       if (currentProgress >= 365) return { icon: ShieldCheck, color: 'text-rose-500', bg: 'bg-rose-500/20', label: 'Aura Forcefield' };
       if (currentProgress >= 300) return { icon: ShieldCheck, color: 'text-pink-500', bg: 'bg-pink-500/20', label: 'Titanium' };
       if (currentProgress >= 240) return { icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/20', label: 'Diamond' };
       if (currentProgress >= 180) return { icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-500/20', label: 'Obsidian' };
       if (currentProgress >= 120) return { icon: Shield, color: 'text-blue-500', bg: 'bg-blue-500/20', label: 'Reinforced' };
       if (currentProgress >= 90)  return { icon: Shield, color: 'text-cyan-500', bg: 'bg-cyan-500/20', label: 'Steel' };
       if (currentProgress >= 60)  return { icon: Shield, color: 'text-teal-500', bg: 'bg-teal-500/20', label: 'Iron' };
       if (currentProgress >= 30)  return { icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/20', label: 'Stone' };
       if (currentProgress >= 14)  return { icon: ShieldAlert, color: 'text-orange-400', bg: 'bg-orange-500/10', label: 'Wood' };
       if (currentProgress >= 3)   return { icon: ShieldAlert, color: 'text-amber-200', bg: 'bg-amber-500/10', label: 'Paper' };
       return { icon: ShieldAlert, color: 'text-slate-600', bg: 'bg-slate-900', label: 'Vulnerable' };
    }

    // 5. HYGIENE (Water)
    if (type === 'water') {
       if (currentProgress >= 365) return { icon: Waves, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Tsunami' };
       if (currentProgress >= 300) return { icon: Waves, color: 'text-cyan-400', bg: 'bg-cyan-500/20', label: 'Ocean' };
       if (currentProgress >= 240) return { icon: Waves, color: 'text-sky-400', bg: 'bg-sky-500/20', label: 'Sea' };
       if (currentProgress >= 180) return { icon: Waves, color: 'text-indigo-400', bg: 'bg-indigo-500/20', label: 'Lake' };
       if (currentProgress >= 120) return { icon: CloudRain, color: 'text-blue-300', bg: 'bg-blue-500/10', label: 'Waterfall' };
       if (currentProgress >= 90)  return { icon: CloudRain, color: 'text-sky-300', bg: 'bg-sky-500/10', label: 'River' };
       if (currentProgress >= 60)  return { icon: Droplets, color: 'text-cyan-300', bg: 'bg-cyan-500/10', label: 'Brook' };
       if (currentProgress >= 30)  return { icon: Droplets, color: 'text-teal-300', bg: 'bg-teal-500/10', label: 'Stream' };
       if (currentProgress >= 14)  return { icon: Droplets, color: 'text-emerald-300', bg: 'bg-emerald-500/10', label: 'Puddle' };
       if (currentProgress >= 3)   return { icon: Droplets, color: 'text-slate-300', bg: 'bg-slate-700', label: 'Drop' };
       return { icon: Droplets, color: 'text-slate-600', bg: 'bg-slate-900', label: 'Dry' };
    }

    // 6. FITNESS (Strength)
    if (type === 'strength') {
       if (currentProgress >= 365) return { icon: Crown, color: 'text-rose-500', bg: 'bg-rose-500/20', label: 'Olympian' };
       if (currentProgress >= 300) return { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/20', label: 'Titan' };
       if (currentProgress >= 240) return { icon: Sword, color: 'text-red-500', bg: 'bg-red-500/20', label: 'Gladiator' };
       if (currentProgress >= 180) return { icon: Hammer, color: 'text-purple-500', bg: 'bg-purple-500/20', label: 'Beast' };
       if (currentProgress >= 120) return { icon: Anchor, color: 'text-indigo-500', bg: 'bg-indigo-500/20', label: 'Machine' };
       if (currentProgress >= 90)  return { icon: Box, color: 'text-blue-500', bg: 'bg-blue-500/20', label: 'Iron' };
       if (currentProgress >= 60)  return { icon: Box, color: 'text-sky-500', bg: 'bg-sky-500/20', label: 'Steel' };
       if (currentProgress >= 30)  return { icon: Mountain, color: 'text-cyan-500', bg: 'bg-cyan-500/20', label: 'Rock' };
       if (currentProgress >= 14)  return { icon: Mountain, color: 'text-teal-500', bg: 'bg-teal-500/20', label: 'Pebble' };
       if (currentProgress >= 3)   return { icon: Droplets, color: 'text-slate-300', bg: 'bg-slate-700', label: 'Sweat' };
       return { icon: Droplets, color: 'text-slate-600', bg: 'bg-slate-900', label: 'Inertia' };
    }

    // 7. FOCUS (Mental)
    if (type === 'focus') {
       if (currentProgress >= 365) return { icon: BrainCircuit, color: 'text-orange-500', bg: 'bg-orange-500/20', label: 'Supercomputer' };
       if (currentProgress >= 180) return { icon: BrainCircuit, color: 'text-amber-500', bg: 'bg-amber-500/20', label: 'Neural Network' };
       if (currentProgress >= 90) return { icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/20', label: 'Laser Focus' };
       if (currentProgress >= 30) return { icon: Target, color: 'text-sky-400', bg: 'bg-sky-500/20', label: 'Clear Mind' };
       return { icon: Target, color: 'text-slate-400', bg: 'bg-slate-800', label: 'Wandering' };
    }

    // Default
    return { icon: Sparkles, color: 'text-slate-400', bg: 'bg-slate-800', label: 'Start' };
  };

  const { icon: Icon, color, bg, label } = getEvolution();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative">
            <div className={`${dim.box} rounded-[22px] flex items-center justify-center ${bg} ${color} border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-500 relative z-10`}>
                <Icon size={dim.icon} strokeWidth={1.5} className={currentProgress > 300 ? 'animate-pulse' : ''} />
            </div>
            
            {/* Prestige Glow */}
            {prestige > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-500 border-2 border-[#020617] flex items-center justify-center text-[10px] font-black text-black z-20 shadow-lg">
                    {prestige}x
                </div>
            )}
        </div>
        
        {size !== 'sm' && (
            <div className={`${dim.text} font-black uppercase tracking-widest ${color} opacity-90 drop-shadow-lg text-center`}>
                {label}
            </div>
        )}
    </div>
  );
};
