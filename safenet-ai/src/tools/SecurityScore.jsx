import React from 'react';
import { Target, ShieldCheck, AlertOctagon, Activity, Lock, AlertTriangle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const SecurityScore = () => {
    // Mock data representing a unified security posture
    const overallScore = 68;

    const radarData = [
        { subject: 'Email Security', A: 45, fullMark: 100 },
        { subject: 'URL Safety', A: 30, fullMark: 100 },
        { subject: 'Password Strength', A: 20, fullMark: 100 },
        { subject: 'Privacy Exposure', A: 50, fullMark: 100 },
        { subject: 'Malware Risk', A: 90, fullMark: 100 },
    ];

    const breakdownData = [
        { label: 'Email Security', risk: 'Medium Risk', percentage: 45, color: 'bg-[#F59E0B]' },
        { label: 'URL Safety', risk: 'High Risk', percentage: 70, color: 'bg-[#EF4444]' },
        { label: 'Password Strength', risk: 'Weak', percentage: 80, color: 'bg-[#EF4444]' },
        { label: 'Privacy Exposure', risk: 'Medium', percentage: 50, color: 'bg-[#F59E0B]' },
        { label: 'Malware Risk', risk: 'Low', percentage: 10, color: 'bg-[#22C55E]' },
    ];

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Target className="text-[#2563EB]" size={32} />
                    Unified Security Score Dashboard
                </h1>
                <p className="text-white/70 mt-2">
                    Your holistic security posture calculated from all active SafeNet-AI sensors and analyzes.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Score Card */}
                <div className="glass-card p-8 flex flex-col items-center justify-center relative overflow-hidden lg:col-span-1">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Target size={120} />
                    </div>
                    <p className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-6">Aggregate Posture</p>

                    <div className="relative flex items-center justify-center mb-6">
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-700" />
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={88 * 2 * Math.PI} strokeDashoffset={88 * 2 * Math.PI - (overallScore / 100) * 88 * 2 * Math.PI} className="text-[#2563EB] drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-5xl font-bold text-white tracking-tighter">{overallScore}</span>
                            <span className="text-sm text-white/70 font-medium">/ 100</span>
                        </div>
                    </div>

                    <div className="text-center z-10">
                        {overallScore > 80 ? (
                            <p className="text-green-400 font-medium flex items-center justify-center gap-2"><ShieldCheck size={18} /> Excellent Security</p>
                        ) : overallScore > 50 ? (
                            <p className="text-amber-400 font-medium flex items-center justify-center gap-2"><Activity size={18} /> Moderate Vulnerability</p>
                        ) : (
                            <p className="text-red-400 font-medium flex items-center justify-center gap-2"><AlertOctagon size={18} /> Critical Action Needed</p>
                        )}
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="glass-card p-6 lg:col-span-2 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-2">Threat Vector Breakdown</h3>
                    <p className="text-sm text-white/70 mb-6">Analysis across 5 core security domains.</p>

                    <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Breakdown Progress Bars */}
                <div className="glass-card p-6 lg:col-span-3 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-6">Detailed Risk Breakdown</h3>
                    <div className="space-y-6">
                        {breakdownData.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-white">{item.label}</span>
                                    <span className={`font-semibold ${item.risk.includes('High') || item.risk.includes('Weak') ? 'text-red-400' :
                                            item.risk.includes('Medium') ? 'text-amber-400' : 'text-green-400'
                                        }`}>{item.risk}</span>
                                </div>
                                <div className="h-2 w-full bg-transparent rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <h3 className="text-xl font-bold text-white mt-8 mb-4">Improvement Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-[#1E293B]/50 rounded-lg p-5 border border-[#334155]/50 flex gap-4 items-center">
                    <div className="p-3 bg-blue-500/10 rounded-full h-fit border border-blue-500/20 text-[#2563EB] shrink-0">
                        <Lock size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-1">Enable two factor authentication</h4>
                        <p className="text-sm text-white/70">Add an extra layer of security to your critical accounts.</p>
                    </div>
                </div>

                <div className="bg-[#1E293B]/50 rounded-lg p-5 border border-[#334155]/50 flex gap-4 items-center">
                    <div className="p-3 bg-[#F59E0B]/10 rounded-full h-fit border border-amber-500/20 text-[#F59E0B] shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-1">Avoid suspicious links</h4>
                        <p className="text-sm text-white/70">Be cautious of unsolicited emails or messages containing URLs.</p>
                    </div>
                </div>

                <div className="bg-[#1E293B]/50 rounded-lg p-5 border border-[#334155]/50 flex gap-4 items-center">
                    <div className="p-3 bg-[#EF4444]/10 rounded-full h-fit border border-red-500/20 text-[#EF4444] shrink-0">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-1">Use stronger passwords</h4>
                        <p className="text-sm text-white/70">Replace weak passwords with complex, unique passphrases.</p>
                    </div>
                </div>

                <div className="bg-[#1E293B]/50 rounded-lg p-5 border border-[#334155]/50 flex gap-4 items-center">
                    <div className="p-3 bg-[#22C55E]/10 rounded-full h-fit border border-green-500/20 text-[#22C55E] shrink-0">
                        <Activity size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-1">Reduce digital footprint</h4>
                        <p className="text-sm text-white/70">Limit public personal information to minimize exposure.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SecurityScore;
