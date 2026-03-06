import React from 'react';
import { Shield, Bell, User, Search, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-between px-6 border-b border-slate-700 transition-all">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors">
                    <Menu size={20} />
                </button>
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <div className="p-1.5 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Shield size={20} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-slate-200 tracking-tight">
                        SafeNet-AI
                    </span>
                </div>
            </div>

            {/* Mid Section - Search */}
            <div className="hidden md:flex items-center flex-1 justify-center max-w-lg mx-auto px-8">
                <div className="relative w-full">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search resources, threats, or documentation..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-1.5 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Right Section - Utilities & Profile */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg relative transition-colors hidden sm:block">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full border-2 border-slate-900"></span>
                </button>

                <div className="h-8 w-px bg-slate-700 hidden sm:block mx-1"></div>

                <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 hover:bg-slate-800 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-slate-600 flex items-center justify-center">
                        <User size={16} className="text-slate-400" />
                    </div>
                    <div className="hidden xl:flex flex-col">
                        <span className="text-sm font-medium text-slate-200 leading-none mb-1">Admin User</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold leading-none">Workspace Owner</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
