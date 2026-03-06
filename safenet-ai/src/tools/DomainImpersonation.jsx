import React, { useState } from 'react';
import { Globe, AlertTriangle, ShieldCheck, Search, Info } from 'lucide-react';

const DomainImpersonation = () => {
    const [domain, setDomain] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const analyzeDomain = (e) => {
        e.preventDefault();
        if (!domain) return;

        setIsAnalyzing(true);
        setResults(null);

        // Mock analysis logic
        setTimeout(() => {
            const lowerDomain = domain.toLowerCase();
            let detectedBrand = 'Unknown';
            let riskLevel = 'Low';
            let score = 12;
            let recommendation = 'No obvious impersonation attempts detected.';

            if (lowerDomain.includes('amazon') || lowerDomain.includes('amz')) {
                detectedBrand = 'Amazon';
                riskLevel = 'High';
                score = 82;
                recommendation = 'Possible phishing domain impersonating Amazon. Do not enter credentials.';
            } else if (lowerDomain.includes('paypal') || lowerDomain.includes('paypa1')) {
                detectedBrand = 'PayPal';
                riskLevel = 'Critical';
                score = 95;
                recommendation = 'Highly suspicious domain detected. Typosquatting identified.';
            } else if (lowerDomain.includes('apple') || lowerDomain.includes('appl')) {
                detectedBrand = 'Apple';
                riskLevel = 'Moderate';
                score = 55;
                recommendation = 'Domain uses similar keywords to Apple. Proceed with caution.';
            }

            setResults({ detectedBrand, riskLevel, score, recommendation });
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Globe className="text-[#2563EB]" size={32} />
                    Domain Impersonation Detector
                </h1>
                <p className="text-white/70 mt-2">
                    Analyze domains for brand impersonation, typosquatting, and homograph attacks.
                </p>
            </header>

            {/* Input Section */}
            <div className="glass-card p-6">
                <form onSubmit={analyzeDomain} className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                        <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="e.g., amazon-login-verification.xyz"
                            className="w-full bg-transparent border border-[#334155] rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#2563EB] transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!domain || isAnalyzing}
                        className="px-6 py-3 glass-btn-primary hover:bg-[#1D4ED8] disabled:bg-[#334155] disabled:text-white/50 text-white font-medium rounded-lg transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            'Scan Domain'
                        )}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            {results && (
                <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        Analysis Results
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-transparent rounded-lg p-4 border border-[#334155] flex flex-col items-center justify-center text-center">
                            <span className="text-white/70 text-sm mb-1">Detected Brand</span>
                            <span className="text-lg font-bold text-white">{results.detectedBrand}</span>
                        </div>

                        <div className="bg-transparent rounded-lg p-4 border border-[#334155] flex flex-col items-center justify-center text-center">
                            <span className="text-white/70 text-sm mb-1">Similarity Score</span>
                            <span className={`text-2xl font-bold ${results.score > 70 ? 'text-[#EF4444]' : results.score > 40 ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>
                                {results.score}%
                            </span>
                        </div>

                        <div className="bg-transparent rounded-lg p-4 border border-[#334155] flex flex-col items-center justify-center text-center">
                            <span className="text-white/70 text-sm mb-1">Risk Level</span>
                            <div className="flex items-center gap-2">
                                {results.riskLevel === 'Low' ? <ShieldCheck className="text-[#22C55E]" size={20} /> : <AlertTriangle className={results.riskLevel === 'Critical' || results.riskLevel === 'High' ? 'text-[#EF4444]' : 'text-[#F59E0B]'} size={20} />}
                                <span className={`text-lg font-bold ${results.riskLevel === 'Critical' || results.riskLevel === 'High' ? 'text-[#EF4444]' : results.riskLevel === 'Moderate' ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>
                                    {results.riskLevel}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border flex items-start gap-4 ${results.riskLevel === 'Critical' || results.riskLevel === 'High'
                            ? 'bg-[#EF4444]/10 border-red-500/30 text-red-400'
                            : results.riskLevel === 'Low'
                                ? 'bg-[#22C55E]/10 border-green-500/30 text-green-400'
                                : 'bg-[#F59E0B]/10 border-amber-500/30 text-amber-400'
                        }`}>
                        <Info className="flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-semibold mb-1">Security Recommendation</h4>
                            <p className="text-sm opacity-90">{results.recommendation}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DomainImpersonation;
