import React, { useState } from 'react';
import { FileSearch, ShieldAlert, CheckCircle, AlertTriangle, FileBox } from 'lucide-react';

const FileScanner = () => {
    const [filename, setFilename] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState(null);

    const scanFile = (e) => {
        e.preventDefault();
        if (!filename) return;

        setIsScanning(true);
        setResults(null);

        // Mock file analysis logic
        setTimeout(() => {
            const lowerFile = filename.toLowerCase();
            let riskLevel = 'Low';
            const indicators = [];

            // Double extension detection
            if (lowerFile.match(/\.(pdf|doc|docx|xls|xlsx|jpg|png|txt)\.(exe|js|bat|vbs|cmd|scr|pif)$/)) {
                riskLevel = 'Critical';
                indicators.push('Double extension malware technique detected. File is masking an executable as a safe document.');
            } else if (lowerFile.match(/\.(exe|bat|vbs|cmd|scr|pif|msi|ps1)$/)) {
                riskLevel = 'High';
                indicators.push('Executable or script file type detected. These files can modify your system.');
            } else if (lowerFile.match(/\.(zip|rar|7z|tar|gz)$/)) {
                riskLevel = 'Moderate';
                indicators.push('Compressed archive detected. Contents cannot be verified without extraction. Proceed with caution if source is unknown.');
            } else if (lowerFile.match(/\.(pdf|doc|docx|xls|xlsx)$/)) {
                riskLevel = 'Moderate';
                indicators.push('Document file detected. Documents can contain malicious macros. Ensure macros are disabled and source is trusted.');
            }

            if (indicators.length === 0) {
                indicators.push('Standard, non-executable file type detected. Risk is generally low, but zero-day exploits in viewers are still possible.');
            }

            setResults({ riskLevel, indicators, filename });
            setIsScanning(false);
        }, 1200);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <FileSearch className="text-[#2563EB]" size={32} />
                    File Type Malware Scanner
                </h1>
                <p className="text-white/70 mt-2">
                    Analyze file names and extensions for suspicious patterns, hidden executables, and common malware delivery mechanisms.
                </p>
            </header>

            {/* Input Section */}
            <div className="glass-card p-6 flex flex-col gap-4 items-center justify-center border-dashed">
                <div className="p-4 bg-transparent rounded-full text-white/70 mb-2">
                    <FileBox size={40} />
                </div>
                <p className="text-white text-center mb-4">Enter a file name or extension to analyze its static risk profile.</p>

                <form onSubmit={scanFile} className="flex gap-4 w-full max-w-2xl">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            placeholder="e.g., invoice_2024.pdf.exe"
                            className="w-full bg-transparent border border-[#334155] rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-[#2563EB] transition-colors text-center font-mono"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!filename || isScanning}
                        className="px-6 py-3 glass-btn-primary hover:bg-[#1D4ED8] disabled:bg-[#334155] disabled:text-white/50 text-white font-medium rounded-lg transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2 flex-shrink-0"
                    >
                        {isScanning ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Scanning
                            </>
                        ) : (
                            'Scan File'
                        )}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            {results && (
                <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={`p-6 rounded-lg border mb-6 flex flex-col items-center justify-center text-center ${results.riskLevel === 'Critical' || results.riskLevel === 'High'
                            ? 'bg-[#EF4444]/10 border-red-500/30'
                            : results.riskLevel === 'Moderate'
                                ? 'bg-[#F59E0B]/10 border-amber-500/30'
                                : 'bg-[#22C55E]/10 border-green-500/30'
                        }`}>
                        <div className="mb-4">
                            {results.riskLevel === 'Low' ? <CheckCircle className="text-[#22C55E]" size={48} /> :
                                <ShieldAlert className={results.riskLevel === 'Critical' || results.riskLevel === 'High' ? 'text-[#EF4444]' : 'text-[#F59E0B]'} size={48} />}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 font-mono">{results.filename}</h3>
                        <p className="text-white/70 mb-4">Risk Level: <span className={`font-bold ${results.riskLevel === 'Critical' || results.riskLevel === 'High' ? 'text-red-400' :
                                results.riskLevel === 'Moderate' ? 'text-amber-400' : 'text-green-400'
                            }`}>{results.riskLevel}</span></p>
                    </div>

                    <div className="bg-transparent rounded-lg p-5 border border-[#334155]">
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <AlertTriangle size={18} className="text-[#2563EB]" /> Detected Threat Indicators
                        </h4>
                        <ul className="space-y-3">
                            {results.indicators.map((indicator, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-white">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500 flex-shrink-0" />
                                    <span>{indicator}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileScanner;
