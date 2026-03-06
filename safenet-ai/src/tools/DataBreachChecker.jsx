import React, { useState } from 'react';
import { Mail, Search, AlertOctagon, ShieldCheck, Database, FileText } from 'lucide-react';

const DataBreachChecker = () => {
    const [email, setEmail] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [results, setResults] = useState(null);

    const checkBreaches = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsChecking(true);
        setResults(null);

        // Mock breach data logic
        setTimeout(() => {
            const isBreached = email.includes('admin') || email.includes('test') || email.length > 15;

            if (isBreached) {
                setResults({
                    breached: true,
                    count: Math.floor(Math.random() * 5) + 1,
                    dataTypes: ['Email', 'Password Hash', 'Phone Number', 'IP Address'].slice(0, Math.floor(Math.random() * 3) + 2),
                    advice: 'Change your passwords immediately across all compromised services. Enable Two-Factor Authentication (2FA).'
                });
            } else {
                setResults({
                    breached: false,
                    count: 0,
                    dataTypes: [],
                    advice: 'No breaches found for this email address. Continue practicing good security habits.'
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
        </div>
    );
};

export default DataBreachChecker;
