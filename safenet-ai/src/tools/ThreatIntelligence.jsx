import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Radar, Globe, Activity, Cpu, Server, Brain, ShieldAlert } from 'lucide-react';

const ThreatIntelligence = () => {
    const [liveCount, setLiveCount] = useState(4291012);

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveCount(prev => prev + Math.floor(Math.random() * 50));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const attackData = [
        { time: '00:00', phishing: 4000, malware: 2400, exploits: 1200 },
        { time: '04:00', phishing: 3000, malware: 1398, exploits: 2100 },
        { time: '08:00', phishing: 2000, malware: 9800, exploits: 2290 },
        { time: '12:00', phishing: 2780, malware: 3908, exploits: 4500 },
        { time: '16:00', phishing: 1890, malware: 4800, exploits: 2181 },
        { time: '20:00', phishing: 2390, malware: 3800, exploits: 5500 },
        { time: '23:59', phishing: 3490, malware: 4300, exploits: 2100 },
    ];

    const regionData = [
        { name: 'North America', value: 85, color: '#3b82f6' },
        { name: 'Europe', value: 72, color: '#0ea5e9' },
        { name: 'Asia-Pacific', value: 94, color: '#ef4444' },
        { name: 'Middle East', value: 45, color: '#f59e0b' },
        { name: 'South America', value: 38, color: '#8b5cf6' },
    ];

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
                            Threat Intelligence
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Real-time global telemetry and heuristic threat analysis.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-5 py-3 rounded-lg border border-red-500/20 bg-red-500/10 flex items-center gap-4">
                        <div className="relative flex items-center justify-center w-3 h-3">
                            <div className="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full relative z-10"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-red-400 uppercase tracking-widest mb-0.5">Critical Alert</span>
                            <span className="text-sm font-medium text-slate-200">Ransomware Spike Detected in EU-Finance</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* 1. Live Streaming Metric Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col justify-center relative overflow-hidden"
                >
                    <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                        <Globe size={160} />
                    </div>
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <Globe size={20} className="text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-200">Node Telemetry</h3>
                    </div>
                    <div className="mb-8 relative z-10">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Active Neural Nodes</p>
                        <h2 className="text-4xl font-bold text-slate-200 tracking-tight">
                            {liveCount.toLocaleString()}
                        </h2>
                    </div>
                    <div className="space-y-3 relative z-10">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800 border border-slate-700">
                            <span className="text-xs font-semibold text-slate-400">Health Index</span>
                            <span className="text-sm font-bold text-emerald-500">99.98%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800 border border-slate-700">
                            <span className="text-xs font-semibold text-slate-400">Global Δ</span>
                            <span className="text-sm font-bold text-blue-500">+1,204 SEC</span>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Primary Visualization Card (Large) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-3 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col min-h-[450px]"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                                <Activity size={18} className="text-slate-400" /> Multi-Vector Ingress Analysis
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">Telemetry window: Last 24 Hours</p>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                <span className="text-xs font-semibold text-slate-300">Exploits</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                                <span className="text-xs font-semibold text-slate-300">Malware</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={attackData}>
                                <defs>
                                    <linearGradient id="colorExploitsSaaS" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMalwareSaaS" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        borderRadius: '8px',
                                        border: '1px solid #334155',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '600' }}
                                    labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}
                                />
                                <Area type="monotone" dataKey="exploits" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExploitsSaaS)" />
                                <Area type="monotone" dataKey="malware" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMalwareSaaS)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* 3. Global Reach Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm flex flex-col lg:flex-row gap-8"
                >
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                                <Globe size={18} className="text-slate-400" /> Regional Intensity
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">Cross-Region Threat Saturation</p>
                        </div>
                        <div className="space-y-5">
                            {regionData.map((region, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-slate-300">{region.name}</span>
                                        <span className="text-xs font-bold text-slate-400">{region.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${region.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: region.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-48 flex flex-col items-center justify-center p-6 bg-slate-800 border border-slate-700 rounded-xl text-center shrink-0 h-full">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                            <ShieldAlert size={28} className="text-red-500" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overall Saturation</h4>
                        <p className="text-2xl font-bold text-slate-200">HIGH</p>
                    </div>
                </motion.div>

                {/* 4. Infrastructure Health Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                    <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                <Server size={18} />
                                <h4 className="text-sm font-bold text-slate-200">Core Fabric</h4>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-slate-200">STABLE</p>
                                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Replication: Online</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                            <p className="text-xs font-semibold text-slate-400 mb-1">IO Latency</p>
                            <p className="text-lg font-bold text-blue-500">0.84ms</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                <Brain size={18} />
                                <h4 className="text-sm font-bold text-slate-200">Neural Engine</h4>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-slate-200">94% LOAD</p>
                                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Cluster: Analyzing</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                            <p className="text-xs font-semibold text-slate-400 mb-1">Processors</p>
                            <p className="text-lg font-bold text-blue-500">4,096 Cores</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ThreatIntelligence;
