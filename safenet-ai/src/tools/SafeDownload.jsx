import React, { useState } from 'react';
import { DownloadCloud, ShieldAlert, CheckCircle, FileWarning, Search } from 'lucide-react';

const SafeDownload = () => {
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const analyzeDownload = (e) => {
        e.preventDefault();
        if (!url) return;

        setIsAnalyzing(true);
        setResults(null);

        // Mock analysis logic
        setTimeout(() => {
            const lowerUrl = url.toLowerCase();
            let riskLevel = 'Low';
            const warnings = [];

            if (lowerUrl.includes('.exe') || lowerUrl.includes('.msi') || lowerUrl.includes('.bat')) {
                riskLevel = 'High';
                warnings.push('Executable file detected. High risk of system modification if malicious.');
            } else if (lowerUrl.includes('.zip') || lowerUrl.includes('.rar')) {
                riskLevel = 'Moderate';
                warnings.push('Archive file detected. Contents cannot be verified until extracted.');
            }

            if (!lowerUrl.startsWith('https://')) {
                if (riskLevel === 'Low') riskLevel = 'Moderate';
                else if (riskLevel === 'Moderate') riskLevel = 'High';
                warnings.push('Insecure connection (HTTP). The download could be intercepted or modified in transit.');
            }

            if (lowerUrl.includes('torrent') || lowerUrl.includes('crack') || lowerUrl.includes('free-download')) {
                riskLevel = 'Critical';
                warnings.push('Suspicious domain keywords detected associated with pirated or malicious software delivery.');
            }

            if (warnings.length === 0) {
                warnings.push('Standard file type over secure connection. Ensure you trust the source domain.');
            }

            setResults({ riskLevel, warnings, source: new URL(url.startsWith('http') ? url : `https://${url}`).hostname });
            setIsAnalyzing(false);
        }, 1500);
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

                <form onSubmit={analyzeDownload} className="flex gap-4 w-full">
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
                        <div className={`p-6 rounded-lg border flex flex-col items-center justify-center text-center shrink-0 w-full md:w-64 ${results.riskLevel === 'Critical' || results.riskLevel === 'High'
                                ? 'bg-[#EF4444]/10 border-red-500/30 text-red-400'
                                : results.riskLevel === 'Moderate'
                                    ? 'bg-[#F59E0B]/10 border-amber-500/30 text-amber-400'
                                    : 'bg-[#22C55E]/10 border-green-500/30 text-green-400'
                            }`}>
                            <div className="mb-2">
                                {results.riskLevel === 'Low' ? <CheckCircle size={40} /> : <ShieldAlert size={40} />}
                            </div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Download Risk</h3>
                            <p className="text-3xl font-bold">{results.riskLevel}</p>
                        </div>

                        <div className="bg-transparent rounded-lg p-5 border border-[#334155] flex-1 flex flex-col justify-center">
                            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">Source Domain</h4>
                            <p className="text-xl font-bold text-white font-mono mb-4">{results.source}</p>

                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                <FileWarning size={16} className="text-[#2563EB]" /> Security Warnings
                            </h4>
                            <ul className="space-y-2">
                                {results.warnings.map((warning, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-white">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500 flex-shrink-0" />
                                        <span>{warning}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SafeDownload;
