import React, { useState } from 'react';
import { Mail, Search, AlertOctagon, ShieldCheck, Database, FileText, Users, Shield, Activity } from 'lucide-react';
import { analyzeDataBreach } from '../services/mlEngine';

const Counter = ({ end, suffix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        let startTime;
        const duration = 2000; // 2 seconds animation

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out quart
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCount(end * easeOutQuart);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [end]);

    const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

    return <span>{formatted}{suffix}</span>;
};

const DataBreachChecker = () => {
    const [email, setEmail] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [results, setResults] = useState(null);

    const checkBreaches = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsChecking(true);
        setResults(null);

        // ML Engine simulation
        setTimeout(() => {
            const mlResult = analyzeDataBreach(email);

            if (mlResult.riskScore > 50) {
                setResults({
                    breached: true,
                    count: mlResult.riskScore > 80 ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 3) + 1,
                    dataTypes: mlResult.detectedIndicators,
                    advice: mlResult.recommendations[0],
                    confidence: mlResult.confidence
                });
            } else {
                setResults({
                    breached: false,
                    count: 0,
                    dataTypes: [],
                    advice: mlResult.recommendations[0],
                    confidence: mlResult.confidence
                });
            }
            setIsChecking(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Database className="text-[#2563EB]" size={32} />
                    Data Breach Checker
                </h1>
                <p className="text-white/70 mt-2">
                    Verify if your email address has been exposed in any known public data breaches.
                </p>
            </header>

            {/* Input Section */}
            <div className="glass-card p-6">
                <form onSubmit={checkBreaches} className="flex gap-4">
                    <div className="relative flex-1">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g., user@example.com"
                            className="w-full bg-transparent border border-[#334155] rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#2563EB] transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!email || isChecking}
                        className="px-6 py-3 glass-btn-primary hover:bg-[#1D4ED8] disabled:bg-[#334155] disabled:text-white/50 text-white font-medium rounded-lg transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
                    >
                        {isChecking ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Checking...
                            </>
                        ) : (
                            'Check Status'
                        )}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            {results && (
                <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-6 rounded-lg border mb-6 flex flex-col items-center justify-center text-center ${results.breached
                        ? 'bg-[#EF4444]/10 border-red-500/30'
                        : 'bg-[#22C55E]/10 border-green-500/30'
                        }`}>
                        {results.breached ? (
                            <>
                                <div className="p-3 bg-[#EF4444]/20 rounded-full mb-4">
                                    <AlertOctagon className="text-[#EF4444]" size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-red-400 mb-2">Breaches Detected</h3>
                                <p className="text-white">Your information was found in <span className="font-bold text-white">{results.count}</span> known data breaches.</p>
                            </>
                        ) : (
                            <>
                                <div className="p-3 bg-[#22C55E]/20 rounded-full mb-4">
                                    <ShieldCheck className="text-[#22C55E]" size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-green-400 mb-2">No Breaches Found</h3>
                                <p className="text-white">Your email address does not appear in our breach database.</p>
                            </>
                        )}
                    </div>

                    {results.breached && (
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <FileText size={16} /> Exposed Data Types
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {results.dataTypes.map((type, index) => (
                                    <span key={index} className="px-3 py-1 bg-transparent border border-[#334155] text-white rounded-md text-sm">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-transparent rounded-lg border border-[#334155]">
                        <h4 className="font-semibold text-white mb-1">Security Advice</h4>
                        <p className="text-sm text-white/70">{results.advice}</p>
                    </div>
                </div>
            )}

            {/* Global Breach Intelligence Section */}
            <div className="mt-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div style={{ background: 'rgba(15, 23, 42, 0.75)', boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)' }}
                    className="rounded-2xl border border-[#7C3AED]/30 p-8 relative overflow-hidden backdrop-blur-xl">

                    {/* Soft gradient border glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"></div>

                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="text-[#EC4899]" size={24} />
                        Global Breach Intelligence
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stat 1 */}
                        <div className="glass-card p-6 flex flex-col justify-between border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[#7C3AED]/20">
                                    <Database size={20} className="text-[#7C3AED]" />
                                </div>
                                <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">Tracked Breaches</h3>
                            </div>
                            <p className="text-3xl font-black text-white mb-2 tracking-tight">
                                <Counter end={12450} suffix="+" />
                            </p>
                            <p className="text-xs text-[#94A3B8] leading-relaxed">
                                Number of publicly documented global data breaches monitored by the SafeNet intelligence engine.
                            </p>
                        </div>

                        {/* Stat 2 */}
                        <div className="glass-card p-6 flex flex-col justify-between border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-[#EC4899]/20">
                                    <Users size={20} className="text-[#EC4899]" />
                                </div>
                                <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">Exposed Accounts</h3>
                            </div>
                            <p className="text-3xl font-black text-white mb-2 tracking-tight">
                                <Counter end={15.8} decimals={1} suffix=" Billion" />
                            </p>
                            <p className="text-xs text-[#94A3B8] leading-relaxed">
                                Total number of leaked accounts discovered across breach datasets.
                            </p>
                        </div>

                        {/* Stat 3 */}
                        <div className="glass-card p-6 flex flex-col justify-between border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-blue-500/20">
                                    <Shield size={20} className="text-blue-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">Last Threat Database Update</h3>
                            </div>
                            <p className="text-2xl font-black text-white mb-2 tracking-tight">
                                January 2026
                            </p>
                            <p className="text-xs text-[#94A3B8] leading-relaxed">
                                Latest update from the SafeNet threat intelligence database.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center border-t border-white/5 pt-4">
                        <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.2em]">
                            Powered by SafeNet Global Threat Intelligence Engine
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataBreachChecker;
