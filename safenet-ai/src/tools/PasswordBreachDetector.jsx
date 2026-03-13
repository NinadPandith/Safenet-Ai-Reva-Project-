import React, { useState } from 'react';
import { KeyRound, ShieldAlert, CheckCircle2, EyeOff } from 'lucide-react';
import { analyzePasswordBreach } from '../services/mlEngine';

const PasswordBreachDetector = () => {
    const [password, setPassword] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [results, setResults] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const checkPassword = (e) => {
        e.preventDefault();
        if (!password) return;

        setIsChecking(true);
        setResults(null);

        // ML Engine simulation
        setTimeout(() => {
            const mlResult = analyzePasswordBreach(password);

            setResults({
                probability: mlResult.threatLevel,
                match: mlResult.detectedIndicators.join(' '),
                advice: mlResult.recommendations.join(' ')
            });
            setIsChecking(false);
        }, 800);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <KeyRound className="text-[#2563EB]" size={32} />
                    Password Breach Detector
                </h1>
                <p className="text-white/70 mt-2">
                    Securely verify if your password pattern resembles known compromised passwords found in public data breaches.
                </p>
            </header>

            {/* Input Section */}
            <div className="glass-card p-6">
                <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3 text-blue-400 text-sm">
                    <EyeOff size={18} className="flex-shrink-0 mt-0.5" />
                    <p>This check is entirely local. Your password is not transmitted, stored, or sent to any server during this simulation.</p>
                </div>
                <form onSubmit={checkPassword} className="flex gap-4">
                    <div className="relative flex-1">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password pattern to check..."
                            className="w-full bg-transparent border border-[#334155] rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#2563EB] transition-colors font-mono tracking-wider"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={!password || isChecking}
                        className="px-6 py-3 glass-btn-primary hover:bg-[#1D4ED8] disabled:bg-[#334155] disabled:text-white/50 text-white font-medium rounded-lg transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
                    >
                        {isChecking ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            'Verify Pattern'
                        )}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            {results && (
                <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-6 rounded-lg border mb-6 flex items-center justify-between gap-6 ${results.probability === 'Critical' || results.probability === 'High'
                        ? 'bg-[#EF4444]/10 border-red-500/30 text-red-400'
                        : results.probability === 'Warning' || results.probability === 'Moderate'
                            ? 'bg-[#F59E0B]/10 border-amber-500/30 text-amber-400'
                            : 'bg-[#22C55E]/10 border-green-500/30 text-green-400'
                        }`}>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Breach Probability</h3>
                            <span className="text-3xl font-bold">{results.probability}</span>
                        </div>
                        <div>
                            {results.probability === 'Safe' || results.probability === 'Low' ? <CheckCircle2 size={40} /> : <ShieldAlert size={40} />}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-transparent rounded-lg p-5 border border-[#334155]">
                            <h4 className="font-semibold text-white mb-2">Pattern Match Analysis</h4>
                            <p className="text-sm text-white/70 leading-relaxed">{results.match}</p>
                        </div>
                        <div className="bg-transparent rounded-lg p-5 border border-[#334155]">
                            <h4 className="font-semibold text-white mb-2">Security Advice</h4>
                            <p className="text-sm text-white/70 leading-relaxed">{results.advice}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasswordBreachDetector;
