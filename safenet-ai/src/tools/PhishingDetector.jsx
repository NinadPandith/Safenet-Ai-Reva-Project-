import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    ShieldAlert,
    ShieldCheck,
    Globe,
    AlertCircle,
    Cpu,
    Zap,
    Activity,
    MailWarning,
    Scan
} from 'lucide-react';

const PhishingDetector = () => {
    const [input, setInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);

    const scanContent = () => {
        if (!input.trim()) return;
        setIsScanning(true);
        setResult(null);

        // Simulated scan
        setTimeout(() => {
            const lowerInput = input.toLowerCase();
            const isMalicious = lowerInput.includes('urgent') || lowerInput.includes('verify') || lowerInput.includes('password');
            const score = isMalicious ? 88 : 12;

            setResult({
                status: isMalicious ? 'CRITICAL' : 'SECURE',
                riskScore: score,
                indicators: [
                    { label: 'Keyword Heuristics', status: true },
                    { label: 'Semantic Threat Analysis', status: !isMalicious },
                    { label: 'Cross-Vector Matching', status: !isMalicious },
                    { label: 'Sender Reputation', status: true }
                ],
                details: isMalicious
                    ? "Analysis detected high semantic overlap with known spear-phishing templates. Recommendation: Do not click any links."
                    : "Content structure appears normal. No obvious malicious indicators found."
            });
            setIsScanning(false);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex items-center gap-6 shadow-sm">
                <div className="p-4 bg-blue-500/10 rounded-xl">
                    <MailWarning className="text-blue-500" size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-200 tracking-tight">
                        Phishing Detector
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Use advanced heuristics to analyze emails and messages for malicious intent.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Content Input Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Search size={20} className="text-slate-400" />
                        <h2 className="text-lg font-bold text-slate-200">
                            Content Scanner
                        </h2>
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste suspicious email content, messages, or text for analysis..."
                        className="w-full h-48 bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm font-medium text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500 resize-none mb-6"
                    ></textarea>

                    <div className="flex items-center gap-4 mt-auto">
                        <button
                            onClick={scanContent}
                            disabled={isScanning || !input.trim()}
                            className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all
                                ${isScanning || !input.trim()
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'}`}
                        >
                            <span className="flex items-center gap-2">
                                {isScanning ? <><Cpu size={16} className="animate-spin" /> Scanning...</> : "Initiate Scan"}
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* 2. Results Indicator Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center"
                >
                    <AnimatePresence mode="wait">
                        {!result && !isScanning ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center text-slate-500"
                            >
                                <Globe size={48} className="mb-4 opacity-50" />
                                <p className="text-sm font-medium">Ready for input.</p>
                            </motion.div>
                        ) : isScanning ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center text-blue-500"
                            >
                                <Cpu size={48} className="animate-spin mb-4" />
                                <p className="text-sm font-semibold">Analyzing Content...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center w-full"
                            >
                                <div className={`w-32 h-32 rounded-full border-[6px] flex flex-col items-center justify-center mb-6
                                    ${result.status === 'SECURE' ? 'border-emerald-500' : 'border-red-500'}`}>
                                    <span className={`text-4xl font-bold leading-none ${result.status === 'SECURE' ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {result.riskScore}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-400 mt-1 uppercase">Risk Score</span>
                                </div>
                                <div className={`w-full py-2 rounded-lg font-bold text-sm uppercase tracking-wider
                                    ${result.status === 'SECURE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {result.status}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* 3. Indicators Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-200 mb-4">
                            <Activity size={18} className="text-blue-500" />
                            <h3 className="font-bold">Heuristic Validation</h3>
                        </div>
                        <div className="space-y-2">
                            {(result?.indicators || [
                                { label: 'Keyword Heuristics', status: null },
                                { label: 'Semantic Threat Analysis', status: null },
                                { label: 'Cross-Vector Matching', status: null },
                                { label: 'Sender Reputation', status: null }
                            ]).map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                                    <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                                    {item.status === null ? (
                                        <div className="w-4 h-0.5 bg-slate-600 rounded"></div>
                                    ) : item.status ? (
                                        <ShieldCheck size={16} className="text-emerald-500" />
                                    ) : (
                                        <ShieldAlert size={16} className="text-red-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 md:border-l md:border-slate-800 md:pl-8">
                        <div className="flex items-center gap-2 text-slate-200 mb-4">
                            <Zap size={18} className="text-blue-500" />
                            <h3 className="font-bold">Analysis Output</h3>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 h-[172px] overflow-y-auto">
                            <p className="text-sm font-medium text-slate-300 leading-relaxed">
                                {result ? result.details : <span className="text-slate-500">Awaiting scan initiation to generate analysis report...</span>}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 4. Awareness Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <AlertCircle size={20} className="text-blue-500" />
                        <h3 className="text-lg font-bold text-slate-200">Standard Protocols</h3>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="flex gap-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                            <div>
                                <h5 className="text-sm font-bold text-slate-200 mb-1">Verify Source</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">Cross-validate sender address with known contacts.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                            <div>
                                <h5 className="text-sm font-bold text-slate-200 mb-1">Avoid Links</h5>
                                <p className="text-xs text-slate-400 leading-relaxed">Do not click on links in unsolicited messages.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PhishingDetector;
