import React, { useState } from 'react';
import { Footprints, Activity, Shield, AlertTriangle, Fingerprint } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DigitalFootprint = () => {
    const [accounts, setAccounts] = useState(3);
    const [passwordReuse, setPasswordReuse] = useState(false);
    const [publicEmail, setPublicEmail] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const analyzeFootprint = (e) => {
        e.preventDefault();
        setIsAnalyzing(true);
        setResults(null);

        setTimeout(() => {
            let score = 100;
            let identityRisk = 10;
            let privacyRisk = 10;
            let dataRisk = 10;

            // Penalties
            score -= Math.min(accounts * 2, 30); // Max 30 point penalty for accounts
            identityRisk += Math.min(accounts * 1, 20);
            privacyRisk += Math.min(accounts * 1.5, 30);
            dataRisk += Math.min(accounts * 1, 20);

            if (passwordReuse) {
                score -= 25;
                dataRisk += 40;
                identityRisk += 30;
            }

            if (publicEmail) {
                score -= 15;
                privacyRisk += 30;
            }

            if (!twoFactor) {
                score -= 20;
                identityRisk += 30;
                dataRisk += 20;
            }

            // Constraints
            score = Math.max(0, Math.min(100, score));
            identityRisk = Math.min(100, identityRisk);
            privacyRisk = Math.min(100, privacyRisk);
            dataRisk = Math.min(100, dataRisk);

            const chartData = [
                { name: 'Identity Risk', value: identityRisk, color: '#ef4444' },
                { name: 'Privacy Risk', value: privacyRisk, color: '#eab308' },
                { name: 'Data Exposure Risk', value: dataRisk, color: '#3b82f6' },
            ];

            setResults({ score, chartData, identityRisk, privacyRisk, dataRisk });
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Footprints className="text-[#2563EB]" size={32} />
                    Digital Footprint Analyzer
                </h1>
                <p className="text-white/70 mt-2">
                    Estimate your online exposure and identify vulnerabilities in your digital identity.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Form */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Fingerprint size={20} className="text-white/70" /> Profiling Parameters
                    </h2>
                    <form onSubmit={analyzeFootprint} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-white mb-2 mt-4 flex justify-between">
                                Estimated Public Social/Service Accounts
                                <span className="text-blue-400">{accounts}</span>
                            </label>
                            <input
                                type="range"
                                min="1" max="50"
                                value={accounts}
                                onChange={(e) => setAccounts(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-[#334155]">
                            <label className="flex items-center gap-3 text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={passwordReuse}
                                    onChange={(e) => setPasswordReuse(e.target.checked)}
                                    className="w-5 h-5 rounded border-[#334155] bg-transparent text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-slate-800"
                                />
                                <span>I reuse the same password across multiple accounts.</span>
                            </label>

                            <label className="flex items-center gap-3 text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={publicEmail}
                                    onChange={(e) => setPublicEmail(e.target.checked)}
                                    className="w-5 h-5 rounded border-[#334155] bg-transparent text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-slate-800"
                                />
                                <span>My primary email address is publicly visible online.</span>
                            </label>

                            <label className="flex items-center gap-3 text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={twoFactor}
                                    onChange={(e) => setTwoFactor(e.target.checked)}
                                    className="w-5 h-5 rounded border-[#334155] bg-transparent text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-slate-800"
                                />
                                <span>I use Two-Factor Authentication (2FA) on critical accounts.</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isAnalyzing}
                            className="w-full py-3 glass-btn-primary hover:bg-[#1D4ED8] disabled:bg-[#334155] disabled:text-white/50 text-white font-medium rounded-lg transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 mt-6"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Activity className="animate-spin" size={20} />
                                    Calculating Footprint...
                                </>
                            ) : (
                                'Analyze Digital Footprint'
                            )}
                        </button>
                    </form>
                </div>

                {/* Results */}
                <div className="glass-card p-6 flex flex-col relative overflow-hidden">
                    {!results ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-white/50 opacity-50 space-y-4">
                            <Shield size={64} />
                            <p className="text-center font-medium max-w-xs">Adjust parameters and analyze to generate your digital exposure report.</p>
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-[#1E293B] p-6 flex flex-col pt-8 animate-in fade-in zoom-in-95 duration-500">
                            <div className="text-center mb-8">
                                <p className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">Exposure Score</p>
                                <div className="flex items-end justify-center gap-1">
                                    <span className={`text-5xl font-bold ${results.score > 70 ? 'text-[#22C55E]' : results.score > 40 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>{results.score}</span>
                                    <span className="text-xl text-white/50 mb-1">/100</span>
                                </div>
                            </div>

                            <div className="h-48 w-full mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={results.chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {results.chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                                            itemStyle={{ color: '#e2e8f0' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-4 mt-auto">
                                {results.identityRisk > 50 && (
                                    <div className="flex items-start gap-3 text-red-400 bg-[#EF4444]/10 p-3 rounded-lg border border-red-500/20 text-sm">
                                        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                                        <p>High Identity Risk. Enable 2FA immediately and use unique passwords to prevent credential stuffing.</p>
                                    </div>
                                )}
                                {results.privacyRisk > 50 && (
                                    <div className="flex items-start gap-3 text-amber-400 bg-[#F59E0B]/10 p-3 rounded-lg border border-amber-500/20 text-sm">
                                        <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                                        <p>Privacy Risk detected. Consider using a masked email address for public or untrusted registrations.</p>
                                    </div>
                                )}
                                {results.score > 70 && (
                                    <div className="flex items-start gap-3 text-green-400 bg-[#22C55E]/10 p-3 rounded-lg border border-green-500/20 text-sm">
                                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                                        <p>Good digital hygiene. Keep accounts minimal and maintain 2FA across critical services.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DigitalFootprint;
