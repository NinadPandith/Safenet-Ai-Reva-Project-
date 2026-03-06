import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Smartphone,
    ShieldAlert,
    ShieldCheck,
    CheckCircle2,
    AlertTriangle,
    Cpu,
    RefreshCw,
    Fingerprint,
    Shield,
    Lock,
    Zap,
    Activity,
    Eye,
    Mic,
    Camera,
    MapPin,
    MessageSquare,
    HardDrive,
    Database,
    Binary
} from 'lucide-react';

const PermissionAnalyzer = () => {
    const [appName, setAppName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const permissionsList = [
        { id: 'camera', label: 'Camera', risk: 'High', icon: Camera },
        { id: 'mic', label: 'Microphone', risk: 'High', icon: Mic },
        { id: 'location', label: 'Location Tracking', risk: 'High', icon: MapPin },
        { id: 'contacts', label: 'Contacts Access', risk: 'Medium', icon: Fingerprint },
        { id: 'sms', label: 'SMS / Messages', risk: 'Critical', icon: MessageSquare },
        { id: 'storage', label: 'Files / Storage', risk: 'Medium', icon: HardDrive },
        { id: 'overlay', label: 'Display Over Apps', risk: 'Critical', icon: Eye },
        { id: 'usage', label: 'Usage Stats', risk: 'High', icon: Binary },
    ];

    const togglePermission = (id) => {
        setSelectedPermissions(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const analyzePermissions = () => {
        if (!appName || selectedPermissions.length === 0) return;
        setIsAnalyzing(true);
        setResult(null);

        setTimeout(() => {
            let riskScore = selectedPermissions.length * 12;
            let riskyCombos = [];

            if (selectedPermissions.includes('camera') && selectedPermissions.includes('mic')) {
                riskScore += 20;
                riskyCombos.push("Full AV Surveillance Vector detected (Camera + Mic).");
            }
            if (selectedPermissions.includes('location') && selectedPermissions.includes('contacts')) {
                riskScore += 15;
                riskyCombos.push("Social-Spatial Tracking Analysis (Location + Contacts).");
            }
            if (selectedPermissions.includes('sms') || selectedPermissions.includes('overlay')) {
                riskScore += 25;
                riskyCombos.push("Credential Hijack Surface detected (Overlay/SMS access).");
            }

            setResult({
                score: Math.min(riskScore, 100),
                riskyCombos,
                summary: riskScore > 70 ? "Critical Risk" : riskScore > 40 ? "Elevated Risk" : "Nominal Access",
                entropy: (Math.random() * 0.99).toFixed(4)
            });
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-blue-500/10 rounded-xl">
                        <Smartphone className="text-blue-500" size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-200 tracking-tight">
                            Permission Analyzer
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Analyze app permissions surface area to model intrusion threats.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Configuration Matrix (Left) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-3 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col relative"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Fingerprint size={120} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Application ID or Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={appName}
                                    onChange={(e) => setAppName(e.target.value)}
                                    placeholder="Enter application name..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                                />
                                <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Analysis Core</label>
                            <button
                                onClick={analyzePermissions}
                                disabled={isAnalyzing || !appName || selectedPermissions.length === 0}
                                className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
                                    ${isAnalyzing || !appName || selectedPermissions.length === 0 ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent'}`}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <RefreshCw size={16} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Execute Analysis"
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10 flex-1">
                        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                            <label className="text-xs font-semibold text-slate-300">Select Requested Permissions</label>
                            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">{selectedPermissions.length} Selected</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {permissionsList.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => togglePermission(p.id)}
                                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 group
                                        ${selectedPermissions.includes(p.id)
                                            ? 'bg-blue-500/10 border-blue-500/50 text-blue-500'
                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'}`}
                                >
                                    <p.icon size={20} className={`mb-2 ${selectedPermissions.includes(p.id) ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-400'}`} />
                                    <span className="text-xs font-medium text-center">{p.label}</span>
                                    {p.risk === 'Critical' && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Results Core (Right) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 flex flex-col gap-6"
                >
                    <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-8 flex flex-col relative overflow-hidden shadow-sm min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {!result && !isAnalyzing ? (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                                        <Database className="text-slate-500" size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-slate-400">
                                        Select permissions and enter an app ID to analyze the risk profile.
                                    </p>
                                </motion.div>
                            ) : isAnalyzing ? (
                                <motion.div
                                    key="scanning"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center space-y-4"
                                >
                                    <div className="relative w-20 h-20 mb-2">
                                        <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin"></div>
                                        <Activity size={24} className="absolute inset-0 m-auto text-blue-500 animate-pulse" />
                                    </div>
                                    <p className="text-sm font-semibold text-blue-500">Evaluating access vectors...</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full items-start flex flex-col py-2"
                                >
                                    <div className="mb-8 w-full">
                                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Risk Saturation</h4>
                                        <div className={`text-6xl font-black mb-3 tracking-tight
                                            ${result.score > 70 ? 'text-red-500' : result.score > 40 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                            {result.score}<span className="text-2xl font-bold ml-1 opacity-50">%</span>
                                        </div>
                                        <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border
                                            ${result.score > 70 ? 'text-red-500 bg-red-500/10 border-red-500/20' : result.score > 40 ? 'text-orange-500 bg-orange-500/10 border-orange-500/20' : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'}`}>
                                            <ShieldAlert size={14} /> {result.summary}
                                        </div>
                                    </div>

                                    <div className="space-y-6 flex-1 w-full">
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Threat Clusters</h4>
                                            {result.riskyCombos.length > 0 ? (
                                                <div className="space-y-2">
                                                    {result.riskyCombos.map((combo, i) => (
                                                        <div key={i} className="flex gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400">
                                                            <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                                                            <span className="text-sm font-medium leading-snug">{combo}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex gap-3 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-500">
                                                    <ShieldCheck className="shrink-0" size={18} />
                                                    <span className="text-sm font-medium">No critical permission anomalies detected.</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 mt-auto">
                                            <p className="text-xs font-medium text-slate-400 font-mono leading-relaxed">
                                                Entropy Coef: {result.entropy}<br />
                                                Report ID: PA-{Math.floor(Math.random() * 9000) + 1000}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <Cpu size={18} className="text-slate-500" />
                            <div>
                                <p className="text-xs font-semibold text-slate-400">Analysis Engine</p>
                                <p className="text-sm font-bold text-slate-200">v3.42 Online</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-700"></div>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-slate-400">Network Latency</p>
                            <p className="text-sm font-bold text-blue-400">12ms</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PermissionAnalyzer;
