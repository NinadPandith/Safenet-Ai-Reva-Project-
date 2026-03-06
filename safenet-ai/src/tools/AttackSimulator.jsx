import React, { useState } from 'react';
import { Presentation, ShieldAlert, GitMerge, FileLock, Network, ArrowRight } from 'lucide-react';

const AttackSimulator = () => {
    const [activeSimulation, setActiveSimulation] = useState('phishing');
    const [step, setStep] = useState(0);

    const simulations = {
        phishing: {
            title: 'Phishing Attack Flow',
            icon: <Network className="text-[#2563EB]" size={24} />,
            steps: [
                { title: 'Attacker sends deceptive email', desc: 'A sophisticated email impersonating a trusted entity is sent to the victim.' },
                { title: 'Victim clicks malicious link', desc: 'The email creates urgency, tricking the user into clicking a link to a fake login portal.' },
                { title: 'Credentials harvested', desc: 'The victim enters their username and password on the fake site, which are saved by the attacker.' },
                { title: 'Account Compromise', desc: 'The attacker uses the stolen credentials to access the real account and steal data or funds.' }
            ]
        },
        stuffing: {
            title: 'Credential Stuffing',
            icon: <GitMerge className="text-purple-500" size={24} />,
            steps: [
                { title: 'Attacker obtains breached data', desc: 'Lists of usernames and passwords from a previous data breach are acquired.' },
                { title: 'Automated login attempts', desc: 'Botnets rapidly test these credential pairs across hundreds of different websites.' },
                { title: 'Password reuse exploited', desc: 'If the victim reused the breached password on a new site, the bot successfully logs in.' },
                { title: 'Account Takeover', desc: 'The attacker gains control of the newly compromised account.' }
            ]
        },
        ransomware: {
            title: 'Ransomware Infection',
            icon: <FileLock className="text-[#EF4444]" size={24} />,
            steps: [
                { title: 'Initial Access', desc: 'Malware is delivered via a phishing attachment or by exploiting an unpatched software vulnerability.' },
                { title: 'Execution & Discovery', desc: 'The payload executes, communicating with a command server and mapping the local network.' },
                { title: 'Data Encryption', desc: 'Files across the network are rapidly encrypted using military-grade encryption keys.' },
                { title: 'Extortion Demand', desc: 'A ransom note is displayed, demanding cryptocurrency in exchange for the decryption key.' }
            ]
        }
    };

    const currentSim = simulations[activeSimulation];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Presentation className="text-[#2563EB]" size={32} />
                    Cyber Attack Simulator
                </h1>
                <p className="text-white/70 mt-2">
                    Visualize and understand the anatomy of common cyber attacks through interactive step-by-step breakdowns.
                </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Sidebar Selector */}
                <div className="w-full lg:w-72 flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">Select Scenario</h3>
                    {Object.entries(simulations).map(([key, sim]) => (
                        <button
                            key={key}
                            onClick={() => { setActiveSimulation(key); setStep(0); }}
                            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${activeSimulation === key
                                    ? 'bg-[#1E293B] border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                                    : 'bg-transparent border-[#334155] hover:border-slate-500 opacity-70 hover:opacity-100'
                                }`}
                        >
                            <div className="p-2 bg-[#1E293B] rounded-lg shrink-0">
                                {sim.icon}
                            </div>
                            <span className="font-semibold text-white">{sim.title}</span>
                        </button>
                    ))}
                </div>

                {/* Main Display Area */}
                <div className="flex-1 glass-card p-8 flex flex-col min-h-[500px]">
                    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[#334155]">
                        <div className="p-3 bg-transparent rounded-xl border border-[#334155]">
                            {currentSim.icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{currentSim.title}</h2>
                            <p className="text-white/70">Step {step + 1} of {currentSim.steps.length}</p>
                        </div>
                    </div>

                    {/* Step Visualization (Mock Diagram) */}
                    <div className="flex-1 flex flex-col items-center justify-center py-8">
                        <div className="relative w-full max-w-lg mb-12">
                            {/* Progress Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-[#334155] -translate-y-1/2 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${(step / (currentSim.steps.length - 1)) * 100}%` }}
                                />
                            </div>

                            {/* Nodes */}
                            <div className="relative flex justify-between">
                                {currentSim.steps.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-6 h-6 rounded-full border-4 flexitems-center justify-center transition-all duration-300 z-10 ${idx <= step ? 'bg-blue-500 border-slate-800 scale-125' : 'bg-[#334155] border-slate-800'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="text-center max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300" key={step}>
                            <ShieldAlert className={`mx-auto mb-4 ${step === currentSim.steps.length - 1 ? 'text-[#EF4444]' : 'text-[#2563EB]'}`} size={48} />
                            <h3 className="text-xl font-bold text-white mb-3">{currentSim.steps[step].title}</h3>
                            <p className="text-white/70 leading-relaxed">{currentSim.steps[step].desc}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-center mt-auto pt-6 border-t border-[#334155]">
                        <button
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className="px-6 py-2 rounded-lg font-medium text-white hover:text-white disabled:opacity-30 disabled:hover:text-white transition-colors"
                        >
                            Previous
                        </button>

                        <button
                            onClick={() => setStep(Math.min(currentSim.steps.length - 1, step + 1))}
                            disabled={step === currentSim.steps.length - 1}
                            className="px-6 py-2 glass-btn-primary hover:bg-[#1D4ED8] disabled:bg-[#334155] disabled:text-white/50 text-white font-medium rounded-lg transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
                        >
                            Next Step <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AttackSimulator;
