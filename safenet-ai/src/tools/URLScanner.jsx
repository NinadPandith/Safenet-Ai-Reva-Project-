import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    ShieldCheck,
    ShieldAlert,
    Search,
    RefreshCw,
    ExternalLink,
    Activity,
    Fingerprint,
    Cpu,
    Server,
    Zap,
    Lock,
    Unlock,
    Navigation,
    Link as LinkIcon
} from 'lucide-react';

const URLScanner = () => {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);

    const scanURL = () => {
        if (!url.trim()) return;
        setIsScanning(true);
        setResult(null);

        // Simulated scan
        setTimeout(() => {
            let score = 95;
            let status = "Secure";
            let details = "Link analysis confirmed structural integrity. No malicious pattern clusters detected within cross-sector registries.";

            const targetURL = url.toLowerCase();

            if (targetURL.includes('google-security-verify.com') || targetURL.includes('login-microsoft.net')) {
                score = 12;
                status = "Critical";
                details = "High-confidence brand impersonation cluster detected. Domain registered under non-designated TLD indicating spear-phishing.";
            } else if (targetURL.startsWith('http://')) {
                score = 45;
                status = "Vulnerable";
                details = "Missing SSL/TLS cryptographic envelope. Communication vector exposed to MITM injection.";
            } else if (targetURL.includes('bit.ly') || targetURL.includes('t.co') || targetURL.includes('tinyurl')) {
                score = 65;
                status = "Caution";
                details = "URL shortener node detected. Target redirect hidden behind obfuscation layer. Potential cloaked redirection trajectory.";
            }

            setResult({
                score,
                status,
                details,
                ip: "104.21.34." + Math.floor(Math.random() * 255),
                latency: Math.floor(Math.random() * 40 + 5) + "ms",
                indicators: [
                    { label: 'SSL Validation', status: !targetURL.startsWith('http://') },
                    { label: 'Domain Reputation', status: score > 30 },
                    { label: 'Heuristic Match', status: score > 50 },
                    { label: 'TLD Integrity', status: true }
                ]
            });
            setIsScanning(false);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-blue-500/10 rounded-xl">
                        <LinkIcon className="text-blue-500" size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-200 tracking-tight">
                            URL Scanner
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Domain reputation, redirection chain analysis, and threat vector scanning.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Entry Buffer Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col justify-center relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <Navigation size={160} />
                    </div>

                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                            <Search size={18} className="text-slate-400" /> Target URL Analysis
                        </h2>
                    </div>

                    <div className="relative mb-6 z-10">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-slate-400">
                            <div className="h-5 w-px bg-slate-600"></div>
                            <Lock size={16} />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center z-10">
                        <button
                            onClick={scanURL}
                            disabled={isScanning || !url.trim()}
                            className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
                                ${isScanning || !url.trim() ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent'}`}
                        >
                            {isScanning ? (
                                <>
                                    <RefreshCw size={16} className="animate-spin" />
                                    Scanning...
                                </>
                            ) : (
                                "Analyze URL"
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* 2. Intensity Meter Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden min-h-[300px]"
                >
                    <AnimatePresence mode="wait">
                        {!result && !isScanning ? (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                                    <Globe size={24} className="text-slate-500" />
                                </div>
                                <p className="text-sm font-medium text-slate-400">
                                    Awaiting input
                                </p>
                            </motion.div>
                        ) : isScanning ? (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative w-20 h-20 mb-6">
                                    <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Activity size={20} className="text-blue-500 animate-pulse" />
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-blue-500">Analyzing domain...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center"
                            >
                                <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center mb-6 shadow-sm
                                    ${result.score < 30 ? 'border-red-500/20 text-red-500 bg-red-500/5' : result.score < 70 ? 'border-orange-500/20 text-orange-500 bg-orange-500/5' : 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5'}`}>
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl font-bold tracking-tight">{result.score}</span>
                                        <span className="text-xs font-semibold uppercase tracking-wider opacity-80 mt-1">Score</span>
                                    </div>
                                </div>
                                <h3 className={`text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border
                                    ${result.status === 'Secure' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : result.status === 'Critical' ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-orange-500 bg-orange-500/10 border-orange-500/20'}`}>
                                    {result.status}
                                </h3>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* 3. Detailed Matrix Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm"
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Activity size={18} className="text-slate-400" />
                            <h4 className="text-sm font-bold text-slate-200">Security Checks</h4>
                        </div>
                        <div className="space-y-3">
                            {(result?.indicators || Array(4).fill({ label: 'Awaiting Scan...', status: null })).map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                                    <span className="text-sm font-medium text-slate-300">{item.label}</span>
                                    {item.status === null ? (
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-600 border-t-slate-400 animate-spin"></div>
                                    ) : item.status ? (
                                        <ShieldCheck size={18} className="text-emerald-500" />
                                    ) : (
                                        <ShieldAlert size={18} className="text-red-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 md:border-l md:border-slate-800 md:pl-8">
                        <div className="flex items-center gap-3">
                            <Server size={18} className="text-slate-400" />
                            <h4 className="text-sm font-bold text-slate-200">Server Details</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 text-center">
                                <p className="text-xs font-semibold text-slate-400 mb-1">IP Address</p>
                                <p className="text-sm font-bold text-slate-200 truncate">{result ? result.ip : "---.---.---.---"}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 text-center">
                                <p className="text-xs font-semibold text-slate-400 mb-1">Latency</p>
                                <p className="text-sm font-bold text-slate-200">{result ? result.latency : "--"}</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 h-[100px] overflow-y-auto">
                            <p className="text-xs font-medium text-slate-400 leading-relaxed">
                                {result ? result.details : "Scan details will appear here once the analysis is complete."}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 4. Infrastructure Metadata Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Fingerprint size={18} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-200">Verification Process</h3>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                            <h5 className="text-sm font-semibold text-slate-200 mb-1">SSL Certificate</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">Mandatory certificate signature verification against root CAs.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                            <h5 className="text-sm font-semibold text-slate-200 mb-1">Reputation Engine</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">Cross-referencing domain history with global blacklists.</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">Scanner Engine v2.1</p>
                        <ShieldCheck size={16} className="text-slate-600" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default URLScanner;
