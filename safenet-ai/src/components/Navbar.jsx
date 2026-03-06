import React, { useState } from 'react';
import { Shield, Bell, User, Search, Menu, Settings, LogOut, Key, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onMenuClick, onOpenProfile, onOpenSettings, onOpenSecurity, onOpenAPIKeys, onOpenSignOut }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 glass-sidebar bg-transparent z-50 flex items-center justify-between px-6 border-b border-white/10 transition-all">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="lg:hidden p-2 text-white/70 hover:text-white hover:bg-[#1E293B] rounded-md transition-colors">
                    <Menu size={20} />
                </button>
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <div className="p-1.5 glass-btn-primary rounded-lg flex items-center justify-center">
                        <Shield size={20} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">
                        SafeNet-AI
                    </span>
                </div>
            </div>

            {/* Mid Section - Search */}
            <div className="hidden md:flex items-center flex-1 justify-center max-w-lg mx-auto px-8">
                <div className="relative w-full">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                    <input
                        type="text"
                        placeholder="Search resources, threats, or documentation..."
                        className="w-full bg-[#1E293B] border border-[#334155] rounded-lg py-1.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-white/50"
                    />
                </div>
            </div>

            {/* Right Section - Utilities & Profile */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-white/70 hover:text-white hover:bg-[#1E293B] rounded-lg relative transition-colors hidden sm:block">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full border-2 border-slate-900"></span>
                </button>

                <div className="h-8 w-px bg-[#334155] hidden sm:block mx-1"></div>

                <div className="relative">
                    <div
                        className="flex items-center gap-3 cursor-pointer p-1 pr-2 hover:bg-[#1E293B] rounded-lg transition-colors"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="w-8 h-8 rounded-full bg-[#334155] overflow-hidden border border-[#334155] flex items-center justify-center">
                            <User size={16} className="text-white/70" />
                        </div>
                        <div className="hidden xl:flex flex-col">
                            <span className="text-sm font-medium text-white leading-none mb-1">Admin User</span>
                            <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold leading-none">Workspace Owner</span>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <>
                                {/* Invisible overlay for outside click */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsDropdownOpen(false)}
                                ></div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-[260px] rounded-xl bg-[#1F2937] border border-[#374151] shadow-[0_12px_30px_rgba(0,0,0,0.35)] z-50 overflow-hidden origin-top-right py-2"
                                >
                                    {/* User Header Section */}
                                    <div className="px-4 py-3 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center shrink-0">
                                            <span className="text-white font-bold text-lg">A</span>
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-bold text-[#E5E7EB] truncate">Admin User</span>
                                            <span className="text-xs text-[#9CA3AF] truncate">Workspace Owner</span>
                                        </div>
                                    </div>

                                    <div className="h-px bg-[#374151] w-full my-1"></div>

                                    {/* Menu Items */}
                                    <div className="px-2 py-1 space-y-1">
                                        <button
                                            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-[#E5E7EB] hover:bg-[#374151] rounded-lg transition-colors"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                onOpenProfile();
                                            }}
                                        >
                                            <User size={16} />
                                            Profile
                                        </button>
                                        <button
                                            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-[#E5E7EB] hover:bg-[#374151] rounded-lg transition-colors"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                onOpenSettings();
                                            }}
                                        >
                                            <Settings size={16} />
                                            Account Settings
                                        </button>
                                        <button
                                            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-[#E5E7EB] hover:bg-[#374151] rounded-lg transition-colors"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                onOpenSecurity();
                                            }}
                                        >
                                            <ShieldCheck size={16} />
                                            Security Preferences
                                        </button>
                                        <button
                                            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-[#E5E7EB] hover:bg-[#374151] rounded-lg transition-colors"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                onOpenAPIKeys();
                                            }}
                                        >
                                            <Key size={16} />
                                            API Keys
                                        </button>
                                    </div>

                                    <div className="h-px bg-[#374151] w-full my-1"></div>

                                    <div className="px-2 pt-1 pb-1">
                                        <button
                                            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-bold text-[#EF4444] hover:bg-[#EF4444]/15 rounded-lg transition-colors"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                onOpenSignOut();
                                            }}
                                        >
                                            <LogOut size={16} />
                                            Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
