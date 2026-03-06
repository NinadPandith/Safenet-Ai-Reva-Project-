import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Copy, Check, RefreshCw } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const APIKeysModal = ({ isOpen, onClose }) => {
    const { addToast } = useToast();
    const [apiKey, setApiKey] = useState('sk-live-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6');
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    if (!isOpen) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            addToast("API Key copied to clipboard", "success");
        } catch (err) {
            addToast("Failed to copy API key", "error");
        }
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const newKey = 'sk-live-' + Array.from({ length: 32 }, () => Math.random().toString(36)[2] || 'a').join('');
            setApiKey(newKey);
            setIsGenerating(false);
            addToast("New API Key generated successfully. Previous key revoked.", "success");
        }, 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0B1220]/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="relative w-full max-w-lg bg-[#1F2937] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#374151]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Key size={20} className="text-[#3B82F6]" />
                                </div>
                                <h2 className="text-xl font-bold text-white tracking-tight">API Access Keys</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-white/50 hover:text-white hover:bg-[#374151] rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            <p className="text-sm text-white/70 leading-relaxed">
                                Use this key to authenticate your backend servers with the SafeNet-AI API infrastructure. Do not expose this key in client-side code.
                            </p>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-white uppercase tracking-wider">Live Secret Key</label>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-[#111827] border border-[#374151] rounded-xl p-3 flex items-center justify-between font-mono text-sm">
                                        <span className="text-white font-medium break-all">{apiKey}</span>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="p-3 bg-[#374151] hover:bg-[#4B5563] border border-[#4B5563] rounded-xl transition-colors shrink-0"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-white/70" />}
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
                                <span className="text-orange-500 mt-0.5">⚠️</span>
                                <p className="text-xs text-orange-200/80 leading-relaxed">
                                    Generating a new key will immediately invalidate your existing key. Any services using the old key will lose API access until updated.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-[#111827] border-t border-[#374151] flex justify-between gap-3 items-center">
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="px-4 py-2.5 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                                Generate New Key
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default APIKeysModal;
