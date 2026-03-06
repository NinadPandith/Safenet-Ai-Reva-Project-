const fs = require('fs');
const path = require('path');

const toolsDir = path.join(process.cwd(), 'src', 'tools');
if (!fs.existsSync(toolsDir)) {
    console.error('Directory not found:', toolsDir);
    process.exit(1);
}

const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(toolsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Status Colors
    content = content.replace(/emerald-/g, 'green-');
    content = content.replace(/yellow-/g, 'amber-');

    // Button Glow
    let lines = content.split('\n');
    let newLines = lines.map(line => {
        if (line.includes('bg-blue-600') && line.includes('transition-colors')) {
            return line.replace('transition-colors', 'transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]');
        }
        if (line.includes('bg-blue-600 text-white hover:bg-blue-700 border border-transparent')) {
            return line.replace('bg-blue-600 text-white hover:bg-blue-700 border border-transparent', 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent transition duration-200 ease-in-out hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]');
        }
        return line;
    });

    // Replace Dashboard specifically if missed
    let finalContent = newLines.join('\n')
        .replace(/bg-slate-800\s+border\s+border-slate-700\s+rounded-lg\s+py-3\s+px-4\s+text-slate-200\s+focus:outline-none\s+focus:border-blue-500/g, 'bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-slate-200 focus:outline-none focus:border-blue-600')
        .replace(/focus:ring-blue-500/g, 'focus:ring-blue-600');

    fs.writeFileSync(filePath, finalContent, 'utf8');
});
console.log('Colors replaced successfully!');
