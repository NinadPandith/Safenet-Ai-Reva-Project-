/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Zap,
    Lock,
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    Activity,
    Cpu,
    Server,
    Eye,
    EyeOff,
    Key
} from 'lucide-react';
import { analyzePassword } from '../services/mlEngine';

const PasswordAnalyzer = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [entropy, setEntropy] = useState(0);
    const [crackTime, setCrackTime] = useState('N/A');
    const [suggestions, setSuggestions] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    function handleAnalyzePassword(pwd) {
        const mlResult = analyzePassword(pwd);

        // Strength is 100 - riskScore in mlEngine output
        setStrength(100 - mlResult.riskScore);

        // mlResult returns _entropy as string fixed to 1 decimal, we can parse it or use directly
        const ent = parseFloat(mlResult._entropy || 0);
        setEntropy(ent.toFixed(2));

        // Crack Time Estimation based on entropy from mlEngine
        const guessesPerSec = 1e9; // 1 Billion guesses/sec
        const seconds = Math.pow(2, ent) / guessesPerSec;

        if (seconds < 1) setCrackTime('Instant');
        else if (seconds < 60) setCrackTime(`${Math.round(seconds)} seconds`);
        else if (seconds < 3600) setCrackTime(`${Math.round(seconds / 60)} minutes`);
        else if (seconds < 86400) setCrackTime(`${Math.round(seconds / 3600)} hours`);
        else if (seconds < 31536000) setCrackTime(`${Math.round(seconds / 86400)} days`);
        else if (seconds < 3153600000) setCrackTime(`${Math.round(seconds / 31536000)} years`);
        else setCrackTime(`100+ years`);

        // Suggestions combined
        const suggs = [...(mlResult.recommendations || []), ...(mlResult.detectedIndicators || [])];
        setSuggestions(suggs.slice(0, 3)); // Keep top 3 for UI
    };

    useEffect(() => {
        if (!password) {
            setStrength(0);
            setEntropy(0);
            setCrackTime('N/A');
            setSuggestions([]);
            return;
        }

        setIsAnalyzing(true);
        const timer = setTimeout(() => {
            handleAnalyzePassword(password);
            setIsAnalyzing(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [password]);

    const getStrengthColor = () => {
        if (strength < 40) return 'text-[#EF4444] bg-[#EF4444]/10 border-red-500/20';
        if (strength < 70) return 'text-[#F59E0B] bg-[#F59E0B]/10 border-amber-500/20';
        return 'text-[#22C55E] bg-[#22C55E]/10 border-green-500/20';
    };

    const getStrengthCircleColor = () => {
        if (strength < 40) return 'text-[#EF4444]';
        if (strength < 70) return 'text-[#F59E0B]';
        return 'text-[#22C55E]';
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="bg-transparent border border-[#334155] rounded-2xl p-8 flex items-center gap-6 shadow-sm">
                <div className="p-4 bg-blue-500/10 rounded-xl">
                    <Key className="text-[#2563EB]" size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Password Analyzer
                    </h1>
                    <p className="text-white/70 text-sm mt-1">
                        Evaluate password strength, calculate entropy, and estimate brute-force resistance time.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Password Input Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-transparent border border-[#334155] rounded-xl p-8 shadow-sm flex flex-col justify-center"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Lock size={18} className="text-white/70" /> Evaluate Password
                        </h2>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password to analyze..."
                            className="w-full bg-[#1E293B] border border-[#334155] rounded-lg py-4 px-6 pr-16 text-lg font-medium text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#2563EB] transition-all placeholder:text-white/50"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {isAnalyzing && (
                                <Cpu size={18} className="text-[#2563EB] animate-spin" />
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center text-white/50 text-xs font-semibold uppercase tracking-wider">
                        <Shield size={14} className="mr-2" /> All processing happens locally in your browser.
                    </div>
                </motion.div>

                {/* 2. Strength Metric Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-transparent border border-[#334155] rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center relative"
                >
                    <h3 className="text-sm font-bold text-white mb-6 w-full text-left">Overall Strength</h3>

                    <div className="relative w-36 h-36 mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="72" cy="72" r="64"
                                fill="none"
                                stroke="currentColor"
                                className="text-slate-800"
                                strokeWidth="12"
                            />
                            <motion.circle
                                cx="72" cy="72" r="64"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                strokeDasharray="402.12"
                                initial={{ strokeDashoffset: 402.12 }}
                                animate={{ strokeDashoffset: 402.12 - (402.12 * strength) / 100 }}
                                className={getStrengthCircleColor()}
                                strokeLinecap="round"
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-3xl font-bold leading-none ${strength === 0 ? 'text-slate-600' : 'text-white'}`}>
                                {strength}%
                            </span>
                        </div>
                    </div>

                    <div className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${getStrengthColor()}`}>
                        {password ? (strength < 40 ? 'Weak' : strength < 70 ? 'Moderate' : 'Strong') : 'Not Checked'}
                    </div>
                </motion.div>

                {/* 3. Entropy & Crack Time Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-transparent border border-[#334155] rounded-xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white mb-2">
                            <Activity size={18} className="text-[#2563EB]" />
                            <h4 className="font-bold">Calculated Entropy</h4>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className={`text-4xl font-bold leading-none ${entropy > 0 ? 'text-white' : 'text-slate-600'}`}>{entropy}</span>
                            <span className="text-xs font-bold text-white/70 uppercase tracking-widest pb-1">Bits</span>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed max-w-sm mt-4">
                            Entropy measures password unpredictability. Higher bit-entropy values exponentially increase the difficulty of guessing.
                        </p>
                    </div>

                    <div className="space-y-4 md:border-l md:border-slate-800 md:pl-8">
                        <div className="flex items-center gap-2 text-white mb-2">
                            <Zap size={18} className="text-[#2563EB]" />
                            <h4 className="font-bold">Estimated Crack Time</h4>
                        </div>
                        <div className="flex items-end gap-2 min-h-[40px]">
                            <span className={`text-2xl font-bold text-white leading-tight ${crackTime === 'N/A' ? 'text-slate-600' : 'text-white'}`}>
                                {crackTime}
                            </span>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed max-w-sm mt-4">
                            Estimated time to crack using a fast offline cluster computing at 1 billion guesses per second.
                        </p>
                    </div>
                </motion.div>

                {/* 4. AI Suggestions Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-transparent border border-[#334155] rounded-xl p-8 shadow-sm flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <ChevronRight size={20} className="text-[#2563EB]" />
                        <h3 className="text-lg font-bold text-white">Improvement Suggestions</h3>
                    </div>

                    <AnimatePresence mode="wait">
                        {suggestions.length > 0 ? (
                            <div className="space-y-3 flex-1">
                                {suggestions.map((sugg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-3 p-4 rounded-lg bg-[#1E293B] border border-[#334155]"
                                    >
                                        <div className="shrink-0 mt-0.5">
                                            <AlertTriangle size={16} className="text-[#F59E0B]" />
                                        </div>
                                        <p className="text-sm font-medium text-white leading-relaxed">
                                            {sugg}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center flex-1 text-center py-6"
                            >
                                <div className="p-4 rounded-full bg-[#22C55E]/10 mb-4 text-[#22C55E]">
                                    <Shield size={32} />
                                </div>
                                <p className="text-sm font-bold text-[#22C55E] mb-1">Password Optimal</p>
                                <p className="text-xs text-white/70">Excellent entropy and complexity detected.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default PasswordAnalyzer;
