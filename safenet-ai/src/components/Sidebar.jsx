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
    ShieldCheck
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: MailWarning, label: 'Phishing Detector', path: '/tool/phishing' },
        { icon: Globe, label: 'URL Scanner', path: '/tool/url' },
        { icon: Key, label: 'Password Analyzer', path: '/tool/password' },
        { icon: Smartphone, label: 'App Permissions', path: '/tool/permissions' },
        { icon: Activity, label: 'Cyber Risk Score', path: '/tool/risk' },
        { icon: TrendingUp, label: 'Threat Intelligence', path: '/tool/intel' },
        { icon: MessageSquare, label: 'AI Assistant', path: '/tool/chat' },
    ];

    return (
        <aside className={`fixed left-0 top-16 bottom-0 w-[260px] bg-slate-900 border-r border-slate-700 transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="flex flex-col h-full py-6">
                <div className="px-6 mb-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Navigation</p>
                </div>

                <nav className="flex-1 space-y-1 px-3">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200
                                ${isActive
                                    ? 'bg-blue-600/10 text-blue-500 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2/3 before:w-1 before:bg-blue-500 before:rounded-r-md'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}
                            `}
                        >
                            <item.icon size={18} className="flex-shrink-0" />
                            <span className="font-medium text-sm">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="px-4 mt-auto">
                    <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-md">
                                <ShieldCheck size={16} />
                            </div>
                            <span className="text-sm font-semibold text-slate-200">System Status</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-slate-400 font-medium">Uptime</span>
                            <span className="text-xs text-emerald-400 font-medium">99.9%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[99.9%]"></div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className="flex items-center gap-3 px-3 py-2 w-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors font-medium text-sm">
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
