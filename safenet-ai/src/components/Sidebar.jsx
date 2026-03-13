import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    MailWarning,
    Globe,
    Smartphone,
    Key,
    MessageSquare,
    Activity,
    TrendingUp,
    Settings,
    ShieldCheck,
    Search,
    Database,
    MessageSquareWarning,
    FileSearch,
    KeyRound,
    Footprints,
    Presentation,
    Target,
    DownloadCloud,
    BookOpen
} from 'lucide-react';

const Sidebar = ({ isOpen, onOpenSettings }) => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Target, label: 'Security Score', path: '/tool/score' },
        { icon: MailWarning, label: 'Phishing Detector', path: '/tool/phishing' },
        { icon: Search, label: 'Domain Impersonation', path: '/tool/domain' },
        { icon: Globe, label: 'URL Scanner', path: '/tool/url' },
        { icon: DownloadCloud, label: 'Safe Download', path: '/tool/download' },
        { icon: Key, label: 'Password Analyzer', path: '/tool/password' },
        { icon: KeyRound, label: 'Password Breach', path: '/tool/pw-breach' },
        { icon: Database, label: 'Data Breach Check', path: '/tool/breach' },
        { icon: Smartphone, label: 'App Permissions', path: '/tool/permissions' },
        { icon: MessageSquare, label: 'AI Assistant', path: '/tool/chat' },
    ];

    return (
        <aside className={`fixed left-0 top-16 bottom-0 w-[260px] glass-sidebar border-r border-white/10 transition-transform duration-300 ease-in-out z-40 overflow-y-auto scrollbar-hide ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="flex flex-col h-full py-6 min-h-max">
                <div className="px-6 mb-4 shrink-0">
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Navigation</p>
                </div>

                <nav className="flex-1 space-y-1 px-3">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200
                                ${isActive
                                    ? 'glass-sidebar-active relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2/3 before:w-1 before:bg-white before:rounded-r-md'
                                    : 'text-white/70 hover:text-white hover:bg-[#1E293B]'}
                            `}
                        >
                            <item.icon size={18} className="flex-shrink-0" />
                            <span className="font-medium text-sm">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="px-4 mt-auto">
                    <div className="p-4 rounded-xl bg-[#1E293B] border border-[#334155]">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-1.5 bg-blue-500/10 text-[#2563EB] rounded-md">
                                <ShieldCheck size={16} />
                            </div>
                            <span className="text-sm font-semibold text-white">System Status</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-white/70 font-medium">Uptime</span>
                            <span className="text-xs text-[#22C55E] font-medium">99.9%</span>
                        </div>
                        <div className="w-full bg-[#334155] h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-[#22C55E] h-full w-[99.9%]"></div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={onOpenSettings}
                            className="flex items-center gap-3 px-3 py-2 w-full text-white/70 hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors font-medium text-sm"
                        >
                            <Settings size={18} />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
