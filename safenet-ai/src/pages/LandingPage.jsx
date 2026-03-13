/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Zap, ArrowRight, Github } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-cyber-dark overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 cyber-grid-bg opacity-30"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-blue/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-purple/10 rounded-full blur-[120px]"></div>

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Shield size={32} className="text-cyber-blue" />
                    <span className="text-2xl font-black bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent tracking-tighter">
                        SafeNet-AI
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/60">
                    <a href="#features" className="hover:text-cyber-blue transition-colors">Infrastructure</a>
                    <a href="#about" className="hover:text-cyber-blue transition-colors">Intelligence</a>
                    <Link to="/dashboard" className="px-5 py-2 glass-card border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 transition-all">
                        Open Dashboard
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 relative z-10 container mx-auto px-6 mt-20 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-cyber-blue text-xs font-bold uppercase tracking-[0.5em] mb-4 block">
                            Autonomous Cybersecurity Framework
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 tracking-tighter">
                            SafeNet-AI — <br />
                            <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">Intelligent Protection.</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl mb-10 leading-relaxed font-medium">
                            Enterprise-grade AI security architecture designed to detect phishing, analyze malicious assets, and safeguard your digital perimeter in real-time.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <Link
                                to="/dashboard"
                                className="group relative px-10 py-5 bg-cyber-blue text-cyber-dark font-black rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                                <span className="relative flex items-center justify-center gap-2 tracking-widest text-xs">
                                    START SECURITY SCAN <ArrowRight size={18} />
                                </span>
                            </Link>
                            <Link
                                to="/tool/chat"
                                className="px-10 py-5 glass-card border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-center tracking-widest text-xs flex items-center justify-center"
                            >
                                ASK AI ASSISTANT
                            </Link>
                        </div>
                    </motion.div>

                    <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Lock, label: "Encrypted" },
                            { icon: Eye, label: "Real-time" },
                            { icon: Zap, label: "AI Powered" },
                            { icon: Shield, label: "Certified" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-white/40 group">
                                <item.icon size={20} className="group-hover:text-cyber-blue transition-colors" />
                                <span className="text-[11px] uppercase tracking-[0.3em] font-black font-mono">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 relative hidden lg:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-[500px] glass-card border-cyber-blue/20 rounded-[40px] relative overflow-hidden flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-1000"
                    >
                        <div className="absolute inset-0 bg-cyber-blue/5 animate-pulse"></div>
                        <div className="scan-line"></div>
                        <div className="text-center p-12">
                            <Shield size={120} className="text-cyber-blue opacity-50 mx-auto mb-8 animate-pulse-glow" />
                            <p className="text-cyber-blue font-mono text-sm leading-6 opacity-60">
                                [SYSTEM]: NETWORK INITIALIZED... <br />
                                [SYSTEM]: FIREWALL ACTIVE... <br />
                                [SYSTEM]: THREAT ANALYZER READY
                            </p>
                        </div>

                        {/* Visual elements */}
                        <div className="absolute top-10 right-10 w-24 h-1 bg-cyber-blue/20 rounded-full"></div>
                        <div className="absolute top-14 right-10 w-16 h-1 bg-cyber-blue/10 rounded-full"></div>
                        <div className="absolute bottom-10 left-10 text-[8px] font-mono text-white/20">
                            SEC_CORE_v2.09 <br />
                            LAST_SCAN: 3ms ago
                        </div>
                    </motion.div>
                </div>
            </main>

            <footer className="relative z-10 p-12 mt-20 border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Shield size={24} className="text-cyber-blue" />
                        <span className="font-bold">SafeNet-AI</span>
                    </div>
                    <p className="text-white/20 text-xs">
                        High-Level Cybersecurity for the Modern Web. 2026.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-all"><Github size={20} /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
