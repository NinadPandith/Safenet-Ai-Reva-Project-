/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    Users,
    Search,
    Database,
    MessageSquareWarning,
    FileSearch,
    KeyRound,
    Footprints,
    Presentation,
    Target,
    DownloadCloud,
    BookOpen,
    PlayCircle,
    FileText,
    Loader2,
    CheckCircle2
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
            icon: Target,
            title: "Security Score",
            description: "Your holistic security posture calculated from all active sensors.",
            link: "/tool/score"
        },
        {
            icon: Search,
            title: "Domain Impersonation",
            description: "Analyze domains for brand impersonation and typosquatting.",
            link: "/tool/domain"
        },
        {
            icon: DownloadCloud,
            title: "Safe Download",
            description: "Analyze file type and domain reputation before downloading.",
            link: "/tool/download"
        },
        {
            icon: KeyRound,
            title: "Password Breach",
            description: "Verify if your password resembles known compromised patterns.",
            link: "/tool/pw-breach"
        },
        {
            icon: Database,
            title: "Data Breach Check",
            description: "Verify if your email has been exposed in public data breaches.",
            link: "/tool/breach"
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

    const [isDemoRunning, setIsDemoRunning] = useState(false);
    const [demoStep, setDemoStep] = useState(0);
    const [showDemoSummary, setShowDemoSummary] = useState(false);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const reportRef = useRef(null);

    const demoSteps = [
        "Scanning email content...",
        "Analyzing domain reputation...",
        "Checking password entropy...",
        "Evaluating privacy exposure..."
    ];

    const runDemo = () => {
        setIsDemoRunning(true);
        setDemoStep(0);
        setShowDemoSummary(false);

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            if (currentStep < demoSteps.length) {
                setDemoStep(currentStep);
            } else {
                clearInterval(interval);
                setShowDemoSummary(true);
                setTimeout(() => {
                    setIsDemoRunning(false);
                    setShowDemoSummary(false);
                }, 4000); // Show summary for 4 seconds then close
            }
        }, 1500);
    };

    const generateReport = async () => {
        setIsGeneratingReport(true);
        try {
            const canvas = await html2canvas(reportRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('SafeNet-AI_Assessment_Report.pdf');
        } catch (error) {
            console.error("Failed to generate report", error);
        } finally {
            setIsGeneratingReport(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Command Center Header */}
            <header className="glass-card p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                            Security Overview
                        </h1>
                        <p className="text-white/70 text-sm mb-6">
                            Monitor your organization's security posture and access intelligence tools.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={runDemo}
                                className="flex items-center gap-2 px-5 py-2.5 glass-btn-primary"
                            >
                                <PlayCircle size={18} /> Run Demo Security Scan
                            </button>
                            <button
                                onClick={generateReport}
                                disabled={isGeneratingReport}
                                className="flex items-center gap-2 px-5 py-2.5 glass-btn-secondary text-white text-sm font-medium rounded-lg transition duration-200 ease-in-out disabled:opacity-50"
                            >
                                {isGeneratingReport ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
                                Generate Security Report
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex-1 lg:flex-none flex items-center gap-4 glass-card px-5 py-4 min-w-[200px]">
                                <div className="p-2 bg-blue-500/10 text-[#2563EB] rounded-lg">
                                    <stat.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-white/70 font-medium mb-0.5">{stat.label}</p>
                                    <p className="text-xl font-bold text-white leading-none">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Tools Grid */}
            <div>
                <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Intelligence Tools</h2>
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

            {/* Demo Mode Modal */}
            <AnimatePresence>
                {isDemoRunning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    >
                        <div className="bg-transparent border border-[#334155] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                            {!showDemoSummary ? (
                                <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center">
                                    <Loader2 className="animate-spin text-[#2563EB] mb-6" size={48} />
                                    <h3 className="text-xl font-bold text-white mb-2">Simulating Security Scan</h3>
                                    <p className="text-white/70 font-mono text-sm">{demoSteps[demoStep]}</p>

                                    <div className="w-full bg-[#1E293B] rounded-full h-2 mt-8 overflow-hidden">
                                        <div
                                            className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${((demoStep + 1) / demoSteps.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="summary" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex flex-col items-center">
                                    <CheckCircle2 className="text-[#22C55E] mb-6 mx-auto" size={48} />
                                    <h3 className="text-2xl font-bold text-white mb-2">Scan Complete</h3>
                                    <p className="text-white/70 mb-6">SafeNet-AI has secured your environment.</p>
                                    <div className="glass-card p-4 text-left space-y-2 w-full">
                                        <div className="flex justify-between text-sm"><span className="text-white/70">Threats Neutralized</span><span className="text-[#22C55E] font-bold">14</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-white/70">Overall Posture</span><span className="text-white font-bold">Strong</span></div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Report Template for PDF Generation */}
            <div className="absolute left-[-9999px] top-[-9999px]">
                <div ref={reportRef} className="bg-white text-slate-900 p-12 w-[800px] font-sans">
                    <div className="border-b-2 border-slate-200 pb-6 mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">SafeNet-AI</h1>
                            <p className="text-white/50 text-sm mt-1">Cybersecurity Assessment Report</p>
                        </div>
                        <div className="text-right text-sm text-white/50">
                            Generated: {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    <h2 className="text-xl font-bold bg-slate-100 p-3 mb-4 rounded">Scan Summary</h2>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 border border-slate-200 rounded">
                            <p className="text-sm text-white/50 uppercase">Phishing Risk</p>
                            <p className="text-lg font-bold text-red-600">High</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded">
                            <p className="text-sm text-white/50 uppercase">Malicious URL Exposure</p>
                            <p className="text-lg font-bold text-yellow-600">Medium</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded">
                            <p className="text-sm text-white/50 uppercase">Password Strength</p>
                            <p className="text-lg font-bold text-red-600">Weak</p>
                        </div>
                        <div className="p-4 border border-slate-200 rounded">
                            <p className="text-sm text-white/50 uppercase">Digital Footprint Risk</p>
                            <p className="text-lg font-bold text-yellow-600">Medium</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold bg-slate-100 p-3 mb-4 rounded">Detected Threat Indicators</h2>
                    <ul className="list-disc pl-6 mb-8 space-y-2 text-slate-700">
                        <li>Suspicious email patterns detected in recent communications.</li>
                        <li>Unsafe domain interactions flagged by reputation systems.</li>
                        <li>Weak password entropy and credential reuse identified.</li>
                    </ul>

                    <h2 className="text-xl font-bold bg-slate-100 p-3 mb-4 rounded">Recommendations</h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                        <li>Enable two factor authentication across all enterprise accounts.</li>
                        <li>Avoid suspicious links and implement email filtering.</li>
                        <li>Use a corporate password manager and enforce rotation policies.</li>
                        <li>Limit public personal information to reduce targeted social engineering attacks.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
