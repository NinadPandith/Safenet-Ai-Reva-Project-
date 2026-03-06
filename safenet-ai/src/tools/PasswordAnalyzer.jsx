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

const PasswordAnalyzer = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [entropy, setEntropy] = useState(0);
    const [crackTime, setCrackTime] = useState('N/A');
    const [suggestions, setSuggestions] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

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
            analyzePassword(password);
            setIsAnalyzing(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [password]);

    const analyzePassword = (pwd) => {
        let score = 0;

        // Basic Length
        if (pwd.length >= 8) score += 20;
        if (pwd.length >= 12) score += 20;

        // Complexity
        if (/[A-Z]/.test(pwd)) score += 15;
        if (/[0-9]/.test(pwd)) score += 15;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 30;

        setStrength(Math.min(score, 100));

        // Entropy Calculation
        const charsetSize =
            (/[a-z]/.test(pwd) ? 26 : 0) +
            (/[A-Z]/.test(pwd) ? 26 : 0) +
            (/[0-9]/.test(pwd) ? 10 : 0) +
            (/[^A-Za-z0-9]/.test(pwd) ? 32 : 0);

        const ent = Math.log2(Math.pow(charsetSize || 1, pwd.length));
        setEntropy(ent.toFixed(2));

        // Crack Time Estimation
        const guessesPerSec = 1e9; // 1 Billion guesses/sec
        const seconds = Math.pow(2, ent) / guessesPerSec;

        if (seconds < 1) setCrackTime('Instant');
        else if (seconds < 60) setCrackTime(`${Math.round(seconds)} seconds`);
        else if (seconds < 3600) setCrackTime(`${Math.round(seconds / 60)} minutes`);
        else if (seconds < 86400) setCrackTime(`${Math.round(seconds / 3600)} hours`);
        else if (seconds < 31536000) setCrackTime(`${Math.round(seconds / 86400)} days`);
        else if (seconds < 3153600000) setCrackTime(`${Math.round(seconds / 31536000)} years`);
        else setCrackTime(`100+ years`);

        // Suggestions
        let suggs = [];
        if (pwd.length < 12) suggs.push("Increase length to at least 12 characters to improve resistance against brute-force attacks.");
        if (!/[A-Z]/.test(pwd)) suggs.push("Include uppercase letters to expand the character set.");
        if (!/[^A-Za-z0-9]/.test(pwd)) suggs.push("Add special characters (e.g. !@#$%) to significantly increase entropy.");
        setSuggestions(suggs);
    };

    const getStrengthColor = () => {
        if (strength < 40) return 'text-red-500 bg-red-500/10 border-red-500/20';
        if (strength < 70) return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    };

    const getStrengthCircleColor = () => {
        if (strength < 40) return 'text-red-500';
        if (strength < 70) return 'text-amber-500';
        return 'text-emerald-500';
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex items-center gap-6 shadow-sm">
                <div className="p-4 bg-blue-500/10 rounded-xl">
                    <Key className="text-blue-500" size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-200 tracking-tight">
                        Password Analyzer
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Evaluate password strength, calculate entropy, and estimate brute-force resistance time.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Password Input Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col justify-center"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                            <Lock size={18} className="text-slate-400" /> Evaluate Password
                        </h2>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password to analyze..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-4 px-6 pr-16 text-lg font-medium text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {isAnalyzing && (
                                <Cpu size={18} className="text-blue-500 animate-spin" />
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center text-slate-500 text-xs font-semibold uppercase tracking-wider">
                        <Shield size={14} className="mr-2" /> All processing happens locally in your browser.
                    </div>
                </motion.div>

                {/* 2. Strength Metric Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center relative"
                >
                    <h3 className="text-sm font-bold text-slate-300 mb-6 w-full text-left">Overall Strength</h3>

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
                            <span className={`text-3xl font-bold leading-none ${strength === 0 ? 'text-slate-600' : 'text-slate-200'}`}>
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
                    className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-200 mb-2">
                            <Activity size={18} className="text-blue-500" />
                            <h4 className="font-bold">Calculated Entropy</h4>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className={`text-4xl font-bold leading-none ${entropy > 0 ? 'text-slate-200' : 'text-slate-600'}`}>{entropy}</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Bits</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-4">
                            Entropy measures password unpredictability. Higher bit-entropy values exponentially increase the difficulty of guessing.
                        </p>
                    </div>

                    <div className="space-y-4 md:border-l md:border-slate-800 md:pl-8">
                        <div className="flex items-center gap-2 text-slate-200 mb-2">
                            <Zap size={18} className="text-blue-500" />
                            <h4 className="font-bold">Estimated Crack Time</h4>
                        </div>
                        <div className="flex items-end gap-2 min-h-[40px]">
                            <span className={`text-2xl font-bold text-slate-200 leading-tight ${crackTime === 'N/A' ? 'text-slate-600' : 'text-slate-200'}`}>
                                {crackTime}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-4">
                            Estimated time to crack using a fast offline cluster computing at 1 billion guesses per second.
                        </p>
                    </div>
                </motion.div>

                {/* 4. AI Suggestions Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <ChevronRight size={20} className="text-blue-500" />
                        <h3 className="text-lg font-bold text-slate-200">Improvement Suggestions</h3>
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
                                        className="flex gap-3 p-4 rounded-lg bg-slate-800 border border-slate-700"
                                    >
                                        <div className="shrink-0 mt-0.5">
                                            <AlertTriangle size={16} className="text-amber-500" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-300 leading-relaxed">
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
                                <div className="p-4 rounded-full bg-emerald-500/10 mb-4 text-emerald-500">
                                    <Shield size={32} />
                                </div>
                                <p className="text-sm font-bold text-emerald-500 mb-1">Password Optimal</p>
                                <p className="text-xs text-slate-400">Excellent entropy and complexity detected.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default PasswordAnalyzer;
