const fs = require('fs');
const path = require('path');

const dirsToScan = [
    path.join(__dirname, 'src', 'tools')
];

dirsToScan.forEach(toolsDir => {
    if (!fs.existsSync(toolsDir)) return;
    const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.jsx'));

    files.forEach(file => {
        const filePath = path.join(toolsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Status Colors
        content = content.replace(/emerald-/g, 'green-');
        content = content.replace(/yellow-/g, 'amber-');

        // Button Glow
        const lines = content.split('\n');
        const newLines = lines.map(line => {
            if (line.includes('bg-blue-600') && line.includes('transition-colors')) {
                return line.replace('transition-colors', 'transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]');
            }
            if (line.includes('bg-blue-600 text-white hover:bg-blue-700 border border-transparent')) {
                return line.replace('bg-blue-600 text-white hover:bg-blue-700 border border-transparent', 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]');
            }
            return line;
        });

        // Inputs
        let finalContent = newLines.join('\n')
            .replace(/bg-slate-800(.*?)focus:border-blue-500/g, 'bg-slate-900$1focus:border-blue-600')
            .replace(/focus:ring-blue-500/g, 'focus:ring-blue-600');

        fs.writeFileSync(filePath, finalContent, 'utf8');
    });
});
console.log('Colors replaced successfully!');
