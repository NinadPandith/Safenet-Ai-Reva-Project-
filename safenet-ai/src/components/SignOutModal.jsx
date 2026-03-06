import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignOutModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSignOut = () => {
        onClose();
        navigate('/');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0B1220]/90 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="relative w-full max-w-sm bg-[#1F2937] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <LogOut size={28} className="text-[#EF4444] ml-1" />
                        </div>

                        <h2 className="text-xl font-bold text-white tracking-tight mb-2">Sign Out Confirmation</h2>
                        <p className="text-sm text-white/60 mb-8">
                            Are you sure you want to securely end your current session and sign out of the platform?
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleSignOut}
                                className="w-full py-3 px-4 bg-[#EF4444] hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                            >
                                Sign Out
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-3 px-4 bg-[#111827] hover:bg-[#374151] border border-[#374151] text-white font-semibold rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SignOutModal;
