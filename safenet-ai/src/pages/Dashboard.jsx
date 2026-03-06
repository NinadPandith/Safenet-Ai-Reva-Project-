import React from 'react';
import { motion } from 'framer-motion';
import ToolCard from '../components/ToolCard';
import {
    MailWarning,
    Globe,
    Smartphone,
    Key,
    MessageSquare,
    Activity,
    TrendingUp,
    ShieldCheck,
    Server,
    Users
} from 'lucide-react';

const Dashboard = () => {
    const tools = [
        {
            icon: MailWarning,
            title: "Phishing Detector",
            description: "Analyze emails and messages for malicious intent using advanced heuristics.",
            link: "/tool/phishing"
        },
        {
            icon: Globe,
            title: "URL Scanner",
            description: "Verify domain reputation and detect malicious endpoints before connection.",
            link: "/tool/url"
        },
        {
            icon: Key,
            title: "Password Analyzer",
            description: "Evaluate password strength, entropy, and estimate brute-force resistance time.",
            link: "/tool/password"
        },
        {
            icon: Smartphone,
            title: "App Permissions",
            description: "Review comprehensive application access logs to detect privacy violations.",
            link: "/tool/permissions"
        },
        {
            icon: Activity,
            title: "Cyber Risk Score",
            description: "Assess your organization's security posture through quantified risk scoring.",
            link: "/tool/risk"
        },
        {
            icon: TrendingUp,
            title: "Threat Intelligence",
            description: "Monitor global threat telemetry and zero-day vulnerability alerts in real-time.",
            link: "/tool/intel"
        },
        {
            icon: MessageSquare,
            title: "AI Assistant",
            description: "Consult with an autonomous security expert for policy governance and response.",
            link: "/tool/chat"
        }
    ];

    const stats = [
        { label: "Active Monitored Nodes", value: "2,491", icon: Server },
        { label: "Threats Blocked (24h)", value: "14,021", icon: ShieldCheck },
        { label: "Active Team Members", value: "24", icon: Users }
    ];

    return (
        <div className="space-y-8">
            {/* Command Center Header */}
            <header className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-200 tracking-tight mb-2">
                            Security Overview
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Monitor your organization's security posture and access intelligence tools.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex-1 lg:flex-none flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 min-w-[200px]">
                                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                    <stat.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium mb-0.5">{stat.label}</p>
                                    <p className="text-xl font-bold text-slate-200 leading-none">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Tools Grid */}
            <div>
                <h2 className="text-xl font-bold text-slate-200 mb-6 tracking-tight">Intelligence Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ToolCard {...tool} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
