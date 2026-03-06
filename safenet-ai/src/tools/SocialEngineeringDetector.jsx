import React, { useState } from 'react';
import { MessageSquareWarning, ShieldAlert, Cpu, Activity, Info } from 'lucide-react';

const SocialEngineeringDetector = () => {
    const [message, setMessage] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const analyzeMessage = (e) => {
        e.preventDefault();
        if (!message) return;

        setIsAnalyzing(true);
        setResults(null);

        // Mock NLP logic based on keywords
        setTimeout(() => {
            const lowerMsg = message.toLowerCase();
            let threatLevel = 'Low';
            const indicators = [];
            const types = [];

            if (lowerMsg.match(/(urgent|immediately|action required|suspended|locked|within 24 hours)/)) {
                indicators.push('Urgency pressure');
                types.push('Action Coercion');
                threatLevel = 'Moderate';
            }

            if (lowerMsg.match(/(bank|irs|police|admin|support|ceo|manager|government)/)) {
                indicators.push('Authority impersonation');
                types.push('Pretexting');
                threatLevel = 'Moderate';
            }

            if (lowerMsg.match(/(arrest|fine|penalty|hacked|stolen|unauthorized)/)) {
                indicators.push('Fear tactics');
                types.push('Intimidation');
                threatLevel = 'High';
            }

            if (lowerMsg.match(/(wire|transfer|gift card|crypto|bitcoin|refund|payment|invoice)/)) {
                indicators.push('Financial fraud patterns');
                types.push('Financial Extortion');
                threatLevel = 'High';
            }

            // If no indicators found, but message is present
            if (indicators.length === 0) {
                setResults({
                    threatLevel: 'Low',
                    indicators: ['No obvious manipulation identified'],
                    types: ['Normal Communication'],
                    summary: 'This message does not exhibit common social engineering markers.'
                });
            } else {
                setResults({
                    threatLevel: indicators.length > 2 ? 'Critical' : threatLevel,
                    indicators,
                    types: [...new Set(types)], // Remove duplicates
                    summary: 'Warning: This message contains strong indicators of physiological manipulation typical of phishing or scam attempts.'
                });
            }

            setIsAnalyzing(false);
        }, 1800);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <MessageSquareWarning className="text-[#2563EB]" size={32} />
                    Social Engineering Detector
                </h1>
                <p className="text-white/70 mt-2">
                    Analyze suspicious texts or emails for psychological manipulation and fraud patterns.
                </p>
            </header>

            {/* Input Section */}
            <div className="glass-card p-6">
                <form onSubmit={analyzeMessage} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Message Content</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Paste the suspicious SMS or email text here..."
                            rows={5}
                            className="w-full bg-transparent border border-[#334155] rounded-lg p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#2563EB] transition-colors resize-none"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!message || isAnalyzing}
                            className="px-6 py-3 glass-btn-primary hover:bg-[#1D4ED8] disabled:bg-[#334155] disabled:text-white/50 text-white font-medium rounded-lg transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Cpu className="animate-spin" size={20} />
                                    Analyzing NLP...
                                </>
                            ) : (
                                <>
                                    <Activity size={20} />
                                    Analyze Text
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Section */}
            {results && (
                <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex border-b border-[#334155] pb-6 mb-6">
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-1">Threat Level</h3>
                            <div className="flex items-center gap-2">
                                <ShieldAlert className={
                                    results.threatLevel === 'Low' ? 'text-[#22C55E]' :
                                        results.threatLevel === 'Moderate' ? 'text-[#F59E0B]' : 'text-[#EF4444]'
                                } size={28} />
                                <span className={`text-2xl font-bold ${results.threatLevel === 'Low' ? 'text-[#22C55E]' :
                                        results.threatLevel === 'Moderate' ? 'text-[#F59E0B]' : 'text-[#EF4444]'
                                    }`}>
                                    {results.threatLevel}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-transparent rounded-lg p-5 border border-[#334155]">
                            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                <Info size={16} className="text-[#2563EB]" /> Detected Techniques
                            </h4>
                            <ul className="space-y-2">
                                {results.indicators.map((indicator, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-white">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500 flex-shrink-0" />
                                        {indicator}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-transparent rounded-lg p-5 border border-[#334155]">
                            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                <Cpu size={16} className="text-purple-500" /> Attack Classification
                            </h4>
                            <ul className="space-y-2">
                                {results.types.map((type, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-white">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500 flex-shrink-0" />
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${results.threatLevel === 'Low'
                            ? 'bg-[#22C55E]/10 border-green-500/30 text-green-400'
                            : 'bg-[#EF4444]/10 border-red-500/30 text-red-400'
                        }`}>
                        <p className="text-sm font-medium">{results.summary}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialEngineeringDetector;
