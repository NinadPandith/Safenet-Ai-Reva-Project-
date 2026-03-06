import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Shield, Mail, Calendar, Edit3 } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#111827] border border-[#374151] rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
                    >
                        {/* Header Background */}
                        <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-80"></div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="px-6 pb-6 pt-0 relative">
                            {/* Avatar */}
                            <div className="flex justify-center -mt-12 mb-4">
                                <div className="w-24 h-24 bg-[#1F2937] border-4 border-[#111827] rounded-full flex items-center justify-center shadow-lg">
                                    <User size={40} className="text-[#E5E7EB]" />
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white mb-1">Admin User</h2>
                                <div className="flex items-center justify-center gap-2 text-blue-400 font-medium text-sm mb-4">
                                    <Shield size={14} />
                                    <span>Workspace Owner</span>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-3 mb-6 bg-[#1F2937] p-4 rounded-xl border border-[#374151]">
                                <div className="flex items-center gap-3 text-[#E5E7EB] text-sm">
                                    <Mail size={16} className="text-[#9CA3AF]" />
                                    <span>admin@safenet.ai</span>
                                </div>
                                <div className="h-px bg-[#374151] w-full"></div>
                                <div className="flex items-center gap-3 text-[#E5E7EB] text-sm">
                                    <Calendar size={16} className="text-[#9CA3AF]" />
                                    <span>Last Login: Today, 09:41 AM</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-xl transition duration-200">
                                <Edit3 size={16} />
                                Edit Profile
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;
