import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Mail, Smartphone, KeyRound } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const SecurityPreferencesModal = ({ isOpen, onClose }) => {
    const { addToast } = useToast();
    const [twoFactor, setTwoFactor] = useState(true);
    const [loginAlerts, setLoginAlerts] = useState(true);

    if (!isOpen) return null;

    const handlePasswordChange = () => {
        addToast("Password reset link sent to registered email.", "info");
    };

    const handleSave = () => {
        addToast("Security preferences updated successfully.", "success");
        onClose();
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
                        className="relative w-full max-w-md bg-[#1F2937] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#374151]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <ShieldCheck size={20} className="text-[#3B82F6]" />
                                </div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Security Preferences</h2>
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
                            {/* 2FA Toggle */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Smartphone size={18} className="text-white/70" />
                                    <div>
                                        <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
                                        <p className="text-xs text-white/50">Require a code from your mobile device.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setTwoFactor(!twoFactor)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#1F2937] ${twoFactor ? 'bg-[#3B82F6]' : 'bg-[#374151]'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="h-px bg-[#374151]" />

                            {/* Login Alerts Toggle */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-white/70" />
                                    <div>
                                        <p className="text-sm font-semibold text-white">Login Alerts</p>
                                        <p className="text-xs text-white/50">Notify via email on new sign-ins.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setLoginAlerts(!loginAlerts)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:ring-offset-[#1F2937] ${loginAlerts ? 'bg-[#3B82F6]' : 'bg-[#374151]'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${loginAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="h-px bg-[#374151]" />

                            {/* Password Change */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <KeyRound size={18} className="text-white/70" />
                                    <div>
                                        <p className="text-sm font-semibold text-white">Account Password</p>
                                        <p className="text-xs text-white/50">Last changed 45 days ago.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handlePasswordChange}
                                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#374151] hover:bg-[#4B5563] rounded-lg transition-colors border border-[#4B5563]"
                                >
                                    Update
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-[#111827] border-t border-[#374151] flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-transparent hover:bg-[#1F2937] border border-[#374151] rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SecurityPreferencesModal;
