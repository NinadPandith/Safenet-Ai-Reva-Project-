/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Shield, Zap, Info, Cpu, Activity, Fingerprint, Lock, Sparkles, Terminal } from 'lucide-react';
import { analyzeChatIntent } from '../services/mlEngine';

const AIChatbot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Auth session verified. Secure interface established. I am SafeNet AI. How can I assist with your security posture today?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = {
            role: 'user',
            content: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const mlResult = analyzeChatIntent(input);
            let response = "I've processed your request. I recommend reviewing the main dashboard for active alerts or running a scan.";

            if (mlResult.intentClass === 'phishing') {
                response = "Phishing typically involves brand mimicry or urgent requests. Deploy our 'Phishing Detector' tool to scan suspicious emails or links.";
            } else if (mlResult.intentClass === 'password') {
                response = "Weak credentials are a high-value failpoint. I recommend testing your primary passwords using our 'Password Analyzer' module.";
            } else if (mlResult.intentClass === 'vpn') {
                response = "Public WiFi lacks strong cryptographic isolation. A VPN is highly recommended for secure operations on untrusted networks.";
            } else if (mlResult.intentClass === 'malware') {
                response = "Malware often disguises itself as legitimate files. Use our 'Safe Download Checker' before opening any suspicious attachments.";
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="space-y-6 h-[calc(100vh-160px)] flex flex-col pt-6 pb-2">
            {/* Header Section */}
            <header className="bg-transparent border border-[#334155] rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm shrink-0">
                <div className="flex items-center gap-5">
                    <div className="p-3.5 bg-blue-500/10 rounded-xl">
                        <MessageSquare className="text-[#2563EB]" size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            AI Security Assistant
                        </h1>
                        <p className="text-white/70 text-sm mt-0.5">Automated guidance & threat intelligence querying.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-4 py-1.5 rounded-lg border border-green-500/20 bg-[#22C55E]/10 text-[#22C55E] text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse"></div>
                        System Online
                    </div>
                </div>
            </header>

            {/* Chat Container */}
            <div className="flex-1 bg-transparent border border-[#334155] flex flex-col overflow-hidden shadow-sm rounded-xl relative">

                {/* Status Bar */}
                <div className="px-6 py-3 border-b border-slate-800 bg-transparent flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-white/50">
                            <Cpu size={14} />
                            <span className="text-xs font-semibold uppercase tracking-wider">SafeNet Core v4.2</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-white/50">
                            <Terminal size={14} />
                            <span className="text-xs font-semibold uppercase tracking-wider">Session ID: #8492</span>
                        </div>
                    </div>
                    <Lock size={14} className="text-slate-600" />
                </div>

                {/* Messages area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 relative z-10"
                >
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] sm:max-w-[75%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
                                    ${msg.role === 'user'
                                        ? 'glass-btn-primary text-white'
                                        : 'bg-[#1E293B] border border-[#334155] text-blue-400'}`}>
                                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                                </div>
                                <div className={`space-y-1.5 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                    <div className={`px-5 py-3.5 text-sm leading-relaxed shadow-sm relative group
                                        ${msg.role === 'user'
                                            ? 'glass-btn-primary text-white rounded-2xl rounded-tr-sm'
                                            : 'bg-[#1E293B] border border-[#334155] text-white rounded-2xl rounded-tl-sm'}`}>
                                        {msg.content}
                                    </div>
                                    <div className="flex items-center gap-2 px-1 opacity-70">
                                        <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                                            {msg.role === 'user' ? 'You' : 'SafeNet AI'}
                                        </span>
                                        <div className="w-1 h-1 rounded-full bg-[#334155]"></div>
                                        <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">{msg.time}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1E293B] border border-[#334155] text-blue-400 shadow-sm">
                                    <Bot size={20} />
                                </div>
                                <div className="bg-[#1E293B] border border-[#334155] px-5 py-4 flex gap-2 items-center rounded-2xl rounded-tl-sm shadow-sm">
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div className="p-4 sm:p-6 border-t border-slate-800 bg-transparent z-20 shrink-0">
                    <div className="relative max-w-4xl mx-auto flex flex-col gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your security question here..."
                                className="w-full glass-card py-4 pl-5 pr-28 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#2563EB] transition-all text-sm text-white placeholder:text-white/50 shadow-sm"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-slate-800
                                    ${!input.trim() ? 'bg-[#334155] text-white/50 cursor-not-allowed' : 'glass-btn-primary text-white hover:bg-[#1D4ED8] shadow-md'}`}
                            >
                                Send <Send size={16} />
                            </button>
                        </div>

                        {/* Prompt Suggestions */}
                        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
                            <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest shrink-0">Suggestions:</span>
                            <div className="flex gap-2">
                                {[
                                    { icon: Shield, text: "Public WiFi Safety", value: "Is public WiFi safe?" },
                                    { icon: Zap, text: "Report Phishing", value: "How to report a phishing email?" },
                                    { icon: Info, text: "VPN Benefits", value: "What are the benefits of a VPN?" }
                                ].map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setInput(prompt.value)}
                                        className="flex items-center gap-1.5 bg-[#1E293B] hover:bg-[#334155] border border-[#334155] px-3 py-1.5 rounded-full transition-colors text-xs font-medium text-white hover:text-white whitespace-nowrap"
                                    >
                                        <prompt.icon size={12} className="text-white/70" />
                                        {prompt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatbot;
