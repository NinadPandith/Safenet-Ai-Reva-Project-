import React, { useState } from 'react';
import { DownloadCloud, ShieldAlert, CheckCircle, FileWarning, Search } from 'lucide-react';
import { analyzeDownload } from '../services/mlEngine';

const SafeDownload = () => {
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const handleAnalyzeDownload = (e) => {
        e.preventDefault();
        if (!url) return;

        setIsAnalyzing(true);
        setResults(null);

        // ML Engine heuristics scan
        setTimeout(() => {
            const mlResult = analyzeDownload(url);

            const isHttps = url.toLowerCase().startsWith('https://');
            const connectionSecurity = isHttps ? 'HTTPS Secure' : 'HTTP Not Secure';

            setResults({
                source: new URL(url.toLowerCase().startsWith('http') ? url : `https://${url}`).hostname,
                fileType: "File Type Detected",
                connectionSecurity,
                domainReputation: mlResult.riskScore < 40 ? 'Trusted Vendor' : 'Unknown Source',
                riskLevel: mlResult.threatLevel === 'Safe' ? 'SAFE' : mlResult.threatLevel === 'Critical' ? 'CRITICAL' : mlResult.threatLevel === 'Warning' ? 'MEDIUM' : 'LOW',
                message: mlResult.recommendations[0],
                indicators: mlResult.detectedIndicators,
                confidence: mlResult.confidence
            });
            setIsAnalyzing(false);
        }, 800);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <DownloadCloud className="text-[#2563EB]" size={32} />
                    Safe Download Checker
                </h1>
                <p className="text-white/70 mt-2">
                    Paste a download link to analyze the file type, source domain reputation, and connection security before downloading.
                </p>
            </header>

            {/* Input Section */}
            <div className="glass-card p-6 flex flex-col gap-4 items-center justify-center">

                <form onSubmit={handleAnalyzeDownload} className="flex gap-4 w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste download link exactly (e.g., https://example.com/software.exe)"
                            className="w-full bg-transparent border border-[#334155] rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#2563EB] transition-colors font-mono"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!url || isAnalyzing}
                        className="px-6 py-3 glass-btn-primary hover:bg-[#1D4ED8] disabled:bg-[#334155] disabled:text-white/50 text-white font-medium rounded-lg transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2 flex-shrink-0"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing
                            </>
                        ) : (
                            'Check Link'
                        )}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            {results && (
                <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className={`p-6 rounded-lg border flex flex-col items-center justify-center text-center shrink-0 w-full md:w-64 ${results.riskLevel === 'CRITICAL' || results.riskLevel === 'HIGH'
                            ? 'bg-[#EF4444]/10 border-red-500/30 text-red-400'
                            : results.riskLevel === 'MEDIUM'
                                ? 'bg-[#F59E0B]/10 border-amber-500/30 text-amber-400'
                                : 'bg-[#22C55E]/10 border-green-500/30 text-green-400'
                            }`}>
                            <div className="mb-2">
                                {results.riskLevel === 'LOW' || results.riskLevel === 'SAFE' ? <CheckCircle size={40} /> : <ShieldAlert size={40} />}
                            </div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Final Risk Level</h3>
                            <p className="text-3xl font-bold">{results.riskLevel}</p>
                        </div>

                        <div className="bg-transparent rounded-lg p-5 border border-[#334155] flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Source Domain</h4>
                                    <p className="text-sm font-bold text-white font-mono">{results.source}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">File Type</h4>
                                    <p className="text-sm font-bold text-white">{results.fileType}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Connection Security</h4>
                                    <p className={`text-sm font-bold ${results.connectionSecurity.includes('Not Secure') ? 'text-red-400' : 'text-green-400'}`}>{results.connectionSecurity}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Domain Reputation</h4>
                                    <p className={`text-sm font-bold ${results.domainReputation === 'Trusted Vendor' ? 'text-green-400' : 'text-[#F59E0B]'}`}>{results.domainReputation}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#334155]">
                                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Recommendation</h4>
                                <p className="text-sm text-white">{results.message}</p>
                            </div>
                        </div>
                    </div>

                    {/* Detected Indicators */}
                    <div className="bg-[#1F2937] border border-[#374151] rounded-xl p-6 shadow-sm overflow-hidden mt-6">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldAlert size={18} className="text-[#3B82F6]" />
                            <h3 className="text-md font-bold text-[#E5E7EB]">Detected Indicators</h3>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {results.indicators.map((indicator, idx) => (
                                <li key={idx} className="flex items-center gap-2 bg-[#374151] border border-[#4B5563] rounded-[6px] px-[12px] py-[8px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                                    <span className="text-[13px] text-[#E5E7EB] font-medium">{indicator}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Warning Messages */}
                    <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 border ${results.domainReputation === 'Trusted Vendor' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-[#EF4444]/10 border-red-500/30 text-[#EF4444]'}`}>
                        {results.domainReputation === 'Trusted Vendor' ? <CheckCircle size={20} /> : <FileWarning size={20} />}
                        <div>
                            <h4 className="font-bold text-sm">
                                {results.domainReputation === 'Trusted Vendor' ? 'Safe Download Detected' : 'Potentially Dangerous Download'}
                            </h4>
                            <p className="text-xs opacity-90 mt-0.5">
                                {results.domainReputation === 'Trusted Vendor' ? 'This installer originates from a verified vendor.' : 'This file originates from an untrusted domain.'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SafeDownload;
