import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    ShieldCheck,
    ShieldAlert,
    ChevronRight,
    RefreshCcw,
    Award,
    Target,
    Zap,
    Cpu,
    Fingerprint,
    Shield,
    Radar
} from 'lucide-react';

const RiskScoreQuiz = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const questions = [
        {
            id: 'mfa',
            question: "Is Multi-Factor Authentication (MFA) deployed on all critical infrastructure nodes?",
            options: [
                { label: "Universal Deployment", score: 25, hint: "Maximum posture" },
                { label: "Partial Deployment", score: 15, hint: "Vulnerable to bypass" },
                { label: "Not Deployed", score: 0, hint: "Critical security gap" }
            ]
        },
        {
            id: 'passwords',
            question: "Specify the string management protocol for access keys.",
            options: [
                { label: "Enforced Vault (Unique/Complex)", score: 25, hint: "Optimal entropy management" },
                { label: "Pattern-based Reuse", score: 5, hint: "Susceptible to matching" },
                { label: "Unsecured Records", score: 0, hint: "Immediate exposure risk" }
            ]
        },
        {
            id: 'updates',
            question: "Determine the latency for critical patch deployment.",
            options: [
                { label: "Near-Zero Latency (Auto)", score: 20, hint: "Real-time threat mitigation" },
                { label: "Scheduled Weekly", score: 10, hint: "Minor exploit window" },
                { label: "Ad-hoc / Delayed", score: 0, hint: "Significant zero-day vulnerability" }
            ]
        },
        {
            id: 'wifi',
            question: "Protocol for connecting to unsecured public network nodes.",
            options: [
                { label: "Universal VPN Tunneling", score: 15, hint: "Encrypted endpoint posture" },
                { label: "Selective Encryption", score: 5, hint: "Potential traffic leak" },
                { label: "Direct Unsecured Access", score: 0, hint: "High-risk snooping vector" }
            ]
        },
        {
            id: 'phishing',
            question: "Awareness during link interaction and email processing.",
            options: [
                { label: "Universal Source Validation", score: 15, hint: "Maximum awareness" },
                { label: "Selective Heuristics", score: 5, hint: "Suboptimal threat detection" },
                { label: "Impulse Interaction", score: 0, hint: "Primary infection vector" }
            ]
        }
    ];

    const handleAnswer = (score) => {
        const nextAnswers = { ...answers, [questions[step].id]: score };
        setAnswers(nextAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setIsFinished(true);
        }
    };

    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

    const getGrade = (s) => {
        if (s >= 90) return { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: ShieldCheck, advice: "Security posture is highly secure. Infrastructure shows exemplary hygiene." };
        if (s >= 70) return { label: "Good", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: Shield, advice: "Strong foundation. Minor hardening recommended for multi-vector defense." };
        if (s >= 40) return { label: "Fair", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: ShieldAlert, advice: "Significant structural weaknesses detected. Immediate reinforcement required." };
        return { label: "Poor", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", icon: ShieldAlert, advice: "Infrastructure compromised or highly vulnerable. Total security reset protocol recommended." };
    };

    const grade = getGrade(totalScore);
    const GradeIcon = grade.icon;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-blue-500/10 rounded-xl">
                        <Radar className="text-blue-500" size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-200 tracking-tight">
                            Risk Assessment Quiz
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Evaluate organizational security hygiene and structural integrity posture.
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto py-4">
                <div className="bg-slate-900 border border-slate-700 rounded-xl min-h-[500px] flex flex-col relative overflow-hidden shadow-sm">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1.5 bg-slate-800 w-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + (isFinished ? 1 : 0)) / questions.length) * 100}%` }}
                            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {!isFinished ? (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="p-8 md:p-12 flex-1 flex flex-col relative"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            {[...Array(questions.length)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'bg-blue-500 w-6' : i < step ? 'bg-emerald-500 w-1.5' : 'bg-slate-700 w-1.5'}`}
                                                ></div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-2">Question {step + 1}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                        <Activity size={14} className="animate-pulse" />
                                        Assessment Active
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-200 mb-8 leading-tight">
                                    {questions[step].question}
                                </h3>

                                <div className="grid grid-cols-1 gap-4 mt-auto">
                                    {questions[step].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(opt.score)}
                                            className="w-full text-left p-5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-800/80 hover:border-blue-500/50 transition-all flex items-center justify-between group"
                                        >
                                            <div>
                                                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors block mb-1">{opt.label}</span>
                                                <span className="text-xs text-slate-500 font-medium group-hover:text-slate-400 transition-colors">{opt.hint}</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center border border-slate-600 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                                                <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-all" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 md:p-12 flex flex-col items-center justify-center text-center flex-1"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', damping: 20 }}
                                    className="relative mb-8 mt-4"
                                >
                                    <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center ${grade.bg} ${grade.border}`}>
                                        <GradeIcon size={48} className={grade.color} />
                                    </div>
                                </motion.div>

                                <div className="mb-10 w-full max-w-md">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Final Score Composite</p>
                                    <div className={`text-6xl font-black ${grade.color} mb-4 tracking-tight`}>
                                        {totalScore}<span className="text-2xl font-bold ml-1 opacity-50">/100</span>
                                    </div>
                                    <div className={`text-lg font-bold uppercase tracking-wider px-4 py-1.5 rounded-full inline-block border ${grade.color} ${grade.bg} ${grade.border}`}>{grade.label}</div>
                                </div>

                                <div className="p-6 md:p-8 bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-xl text-left relative overflow-hidden mb-8">
                                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">Analysis Report</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                        {grade.advice}
                                    </p>
                                </div>

                                <button
                                    onClick={() => { setStep(0); setAnswers({}); setIsFinished(false); }}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white"
                                >
                                    <RefreshCcw size={16} /> Retake Assessment
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default RiskScoreQuiz;
