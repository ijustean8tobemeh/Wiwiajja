
import React, { useRef, useState } from 'react';
import { X, RotateCcw, Download, Upload, Moon, Shield, Palette, Database, AlertTriangle, ChevronRight, Smartphone, Activity, Zap, Settings, Trash2, EyeOff, Monitor, Bell, Share, MoreVertical, PlusSquare, CheckCircle } from 'lucide-react';
import { useApp } from '../../hooks/useAppContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'general' | 'data' | 'install' | 'system';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { state, updateState, resetData, importData, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zohaib_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addNotification('System', 'Backup exported successfully.', 'success');
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const success = importData(event.target.result as string);
        if (success) onClose();
      }
    };
    reader.readAsText(file);
  };

  const TabButton = ({ id, label, icon: Icon }: { id: SettingsTab, label: string, icon: any }) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex-1 py-4 flex flex-col items-center justify-center gap-2 rounded-2xl transition-all duration-300 relative overflow-hidden ${activeTab === id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 ring-1 ring-white/20' : 'bg-slate-900/50 text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'}`}
      >
          <Icon size={20} className={activeTab === id ? 'scale-110' : ''} />
          <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </button>
  );

  const ToggleCard = ({ title, desc, active, onClick, icon: Icon, color }: any) => (
    <button 
        onClick={onClick}
        className={`p-6 rounded-[24px] border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-5 text-left group relative overflow-hidden w-full ${active ? `bg-${color}-500/10 border-${color}-500/40 shadow-[0_0_30px_rgba(0,0,0,0.2)]` : 'bg-slate-800/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10'}`}
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg transition-colors shrink-0 ${active ? `bg-${color}-500 text-white` : `bg-slate-900 text-slate-500 group-hover:text-${color}-400 border border-white/5`}`}>
            <Icon size={24} />
        </div>
        <div className="flex-1 z-10">
            <div className={`font-bold text-base ${active ? 'text-white' : 'text-slate-300'} mb-1`}>{title}</div>
            <div className="text-xs text-slate-500 leading-relaxed pr-8">{desc}</div>
        </div>
        <div className={`absolute top-6 right-6 w-12 h-7 rounded-full transition-colors duration-300 border flex items-center px-1 ${active ? `bg-${color}-500 border-${color}-400` : 'bg-slate-900 border-slate-700'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
    </button>
  );

  return (
    <>
      <div 
        className="fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-[9990] transition-opacity animate-fadeIn" 
        onClick={onClose} 
      />
      
      <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none p-4 md:p-8">
        <div className="pointer-events-auto w-full max-w-4xl bg-[#0f172a] border border-white/10 shadow-2xl rounded-[48px] flex flex-col overflow-hidden max-h-[90vh] animate-slideUp ring-1 ring-white/5 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
            
            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-md flex justify-between items-center shrink-0 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20">
                        <Settings size={28} className="animate-[spin_10s_linear_infinite]" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">System Control</h2>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Configuration & Data</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={onClose} 
                    className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500 hover:rotate-90 transition-all duration-300"
                >
                    <X size={24}/>
                </button>
            </div>

            {/* Navigation */}
            <div className="p-2 bg-slate-900/30 mx-8 mt-8 rounded-3xl flex gap-2 shrink-0 border border-white/5 backdrop-blur-sm relative z-10 overflow-x-auto">
                <TabButton id="general" label="Interface" icon={Monitor} />
                <TabButton id="data" label="Database" icon={Database} />
                <TabButton id="install" label="Mobile App" icon={Smartphone} />
                <TabButton id="system" label="Danger Zone" icon={AlertTriangle} />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 no-scrollbar relative z-10">
                
                {activeTab === 'general' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fadeIn">
                        <ToggleCard 
                            title="Ramadan Mode" 
                            desc="Unlock specific trackers for fasting, taraweeh & zakat calculation." 
                            active={state.ramadanMode} 
                            onClick={() => updateState({ ramadanMode: !state.ramadanMode })} 
                            icon={Moon}
                            color="amber"
                        />
                        <ToggleCard 
                            title="Privacy Shield" 
                            desc="Obfuscate all sensitive numbers and counters on the dashboard." 
                            active={state.privacyMode} 
                            onClick={() => updateState({ privacyMode: !state.privacyMode })} 
                            icon={EyeOff}
                            color="indigo"
                        />
                        <ToggleCard 
                            title="OLED Matrix" 
                            desc="True black background for maximum battery saving on OLED screens." 
                            active={state.oledMode} 
                            onClick={() => updateState({ oledMode: !state.oledMode })} 
                            icon={Smartphone}
                            color="emerald"
                        />
                    </div>
                )}

                {activeTab === 'data' && (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fadeIn">
                        <div className="col-span-1 lg:col-span-2 bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-3xl flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 animate-pulse">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-emerald-300">Auto-Save System Active</div>
                                <div className="text-xs text-emerald-200/60">Data is persisted to this device automatically on every change. Safe to refresh/close.</div>
                                <div className="text-[10px] text-emerald-400/50 mt-1 font-bold uppercase">Warning: Clearing browser cache removes data.</div>
                            </div>
                        </div>

                        <button 
                            onClick={handleExport}
                            className="p-8 rounded-[32px] bg-[#1e293b]/40 border border-white/5 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all group text-left relative overflow-hidden flex flex-col gap-4"
                        >
                            <div className="absolute -top-10 -right-10 text-white/5 group-hover:text-indigo-500/10 transition-colors transform group-hover:scale-110 duration-500">
                                <Download size={120} />
                            </div>
                            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors border border-white/5 shadow-lg">
                                <Database size={28} className="text-slate-400 group-hover:text-indigo-400" />
                            </div>
                            <div>
                                <div className="font-black text-white text-xl group-hover:text-indigo-300 transition-colors">Backup Data</div>
                                <div className="text-sm text-slate-500 mt-1 max-w-[200px]">Export your entire history to a JSON file for safekeeping.</div>
                            </div>
                        </button>

                        <button 
                            onClick={handleImportClick}
                            className="p-8 rounded-[32px] bg-[#1e293b]/40 border border-white/5 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all group text-left relative overflow-hidden flex flex-col gap-4"
                        >
                             <div className="absolute -top-10 -right-10 text-white/5 group-hover:text-teal-500/10 transition-colors transform group-hover:scale-110 duration-500">
                                <Upload size={120} />
                            </div>
                             <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-teal-500/20 transition-colors border border-white/5 shadow-lg">
                                <Activity size={28} className="text-slate-400 group-hover:text-teal-400" />
                            </div>
                            <div>
                                <div className="font-black text-white text-xl group-hover:text-teal-300 transition-colors">Restore Data</div>
                                <div className="text-sm text-slate-500 mt-1 max-w-[200px]">Load a previously saved backup file to recover streaks.</div>
                            </div>
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />
                    </div>
                )}

                {activeTab === 'install' && (
                    <div className="animate-fadeIn space-y-6">
                        <div className="p-6 rounded-[32px] bg-slate-900/50 border border-white/5 flex items-start gap-6">
                             <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0">
                                 <Smartphone size={24} />
                             </div>
                             <div>
                                 <h3 className="font-bold text-white text-lg mb-2">Install as Native App</h3>
                                 <p className="text-sm text-slate-400 leading-relaxed">
                                     This dashboard is built as a Progressive Web App (PWA). You can install it directly to your home screen without an app store. It works offline and full-screen.
                                 </p>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-[24px] bg-[#1e293b]/40 border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <Monitor size={20} className="text-slate-500" />
                                    <span className="font-black text-slate-300 text-sm uppercase tracking-wider">Android (Chrome)</span>
                                </div>
                                <ol className="space-y-4 text-sm text-slate-400 list-decimal list-inside">
                                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white shrink-0">1</span> Tap the <MoreVertical size={14} className="inline mx-1" /> menu button.</li>
                                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white shrink-0">2</span> Select <b>"Install App"</b> or <b>"Add to Home Screen"</b>.</li>
                                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white shrink-0">3</span> Confirm by tapping <b>Install</b>.</li>
                                </ol>
                            </div>

                            <div className="p-6 rounded-[24px] bg-[#1e293b]/40 border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <Monitor size={20} className="text-slate-500" />
                                    <span className="font-black text-slate-300 text-sm uppercase tracking-wider">iOS (Safari)</span>
                                </div>
                                <ol className="space-y-4 text-sm text-slate-400 list-decimal list-inside">
                                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white shrink-0">1</span> Tap the <Share size={14} className="inline mx-1" /> Share button.</li>
                                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white shrink-0">2</span> Scroll down and tap <b>"Add to Home Screen"</b> <PlusSquare size={14} className="inline mx-1" />.</li>
                                    <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white shrink-0">3</span> Tap <b>Add</b> in the top right.</li>
                                </ol>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-white/5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">v1.0 Final</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'system' && (
                    <div className="animate-fadeIn space-y-4">
                        <button 
                            onClick={() => addNotification('System Test', 'Notifications are functioning correctly.', 'success')}
                            className="w-full p-6 rounded-[24px] bg-[#1e293b]/40 border border-white/5 hover:bg-white/5 flex items-center gap-4 text-left group transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-500/20 transition-colors">
                                <Bell size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-white">Test Notifications</div>
                                <div className="text-xs text-slate-500">Verify alert system functionality</div>
                            </div>
                        </button>

                        <div className="bg-rose-500/5 border border-rose-500/20 rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(244,63,94,0.05)_10px,rgba(244,63,94,0.05)_20px)]"></div>
                            
                            <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 mb-6 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.2)] relative z-10">
                                <AlertTriangle size={40} />
                            </div>
                            
                            <h4 className="font-black text-white text-2xl relative z-10">Factory Reset</h4>
                            <p className="text-base text-rose-200/60 mt-2 max-w-md relative z-10 leading-relaxed">
                                This action is irreversible. It will permanently delete all streaks, logs, journals, and custom settings.
                            </p>
                            
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-500/30 to-transparent my-8 relative z-10"></div>

                            <button 
                                onClick={() => { if(confirm("Are you absolutely sure? This cannot be undone.")) {resetData('all'); onClose();} }} 
                                className="group relative px-8 py-4 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-500 transition-all shadow-lg shadow-rose-900/40 overflow-hidden z-10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <span className="flex items-center gap-3"><Trash2 size={20} /> Delete Everything</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
};
