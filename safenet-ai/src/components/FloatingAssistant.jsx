import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingAssistant = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-72 glass-card p-6 border-cyber-blue/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-cyber-dark/95"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-cyber-blue/10 rounded-lg">
                                <Shield size={20} className="text-cyber-blue" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-white">SafeNet AI</p>
                                <p className="text-[10px] text-green-400 font-bold uppercase">Online & Ready</p>
                            </div>
                        </div>

                        <p className="text-xs text-white/60 mb-6 leading-relaxed">
                            "I've detected some unusual activity in your network segment. Would you like to run a Phishing Scan?"
                        </p>

                        <div className="space-y-2">
                            <button
                                onClick={() => { navigate('/tool/phishing'); setIsOpen(false); }}
                                className="w-full py-2 bg-cyber-blue text-cyber-dark text-[10px] font-black uppercase rounded-lg hover:scale-105 transition-all"
                            >
                                Launch Scanner
                            </button>
                            <button
                                onClick={() => { navigate('/tool/chat'); setIsOpen(false); }}
                                className="w-full py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase rounded-lg hover:bg-white/10 transition-all text-white/70"
                            >
                                Ask Assistant
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] group ${isOpen ? 'bg-white/10 scale-90' : 'bg-cyber-blue'}`}
            >
                {isOpen ? (
                    <X className="text-white" />
                ) : (
                    <div className="relative">
                        <MessageSquare className="text-cyber-dark group-hover:scale-110 transition-transform" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full border-2 border-cyber-blue animate-pulse"></div>
                    </div>
                )}
            </button>
        </div>
    );
};

export default FloatingAssistant;
