const fs = require('fs');
const path = require('path');

const traverseDir = (dir, callback) => {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath, callback);
        } else if (fullPath.endsWith('.jsx')) {
            callback(fullPath);
        }
    });
};

traverseDir(path.join(process.cwd(), 'src'), (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');

    // Global Background / Input Background -> #0F172A
    content = content.replace(/bg-slate-900/g, 'bg-[#0F172A]');

    // Sidebar Background -> #0D1B2A
    // Already did this in Sidebar.jsx but just to be sure
    content = content.replace(/bg-\[\#0D1B2A\]/g, 'bg-[#0D1B2A]');

    // Card Background -> #1E293B
    content = content.replace(/bg-slate-800/g, 'bg-[#1E293B]');

    // Card Hover -> #263449
    content = content.replace(/hover:bg-\[\#263449\]/g, 'hover:bg-[#263449]');

    // Borders -> #334155
    content = content.replace(/border-slate-700/g, 'border-[#334155]');
    content = content.replace(/border-slate-600/g, 'border-[#334155]');

    // Texts
    content = content.replace(/text-slate-200/g, 'text-[#E2E8F0]');
    content = content.replace(/text-slate-400/g, 'text-[#94A3B8]');
    content = content.replace(/text-slate-500/g, 'text-[#64748B]');
    content = content.replace(/text-slate-300/g, 'text-[#E2E8F0]');

    // Primary Button
    content = content.replace(/bg-blue-600/g, 'bg-[#2563EB]');
    content = content.replace(/hover:bg-blue-700/g, 'hover:bg-[#1D4ED8]');
    content = content.replace(/text-blue-500/g, 'text-[#2563EB]');

    // Secondary Button
    content = content.replace(/bg-slate-700/g, 'bg-[#334155]');
    content = content.replace(/hover:bg-slate-600/g, 'hover:bg-[#475569]');

    // Status Colors
    content = content.replace(/text-green-500/g, 'text-[#22C55E]');
    content = content.replace(/text-amber-500/g, 'text-[#F59E0B]');
    content = content.replace(/text-red-500/g, 'text-[#EF4444]');
    content = content.replace(/bg-green-500/g, 'bg-[#22C55E]');
    content = content.replace(/bg-amber-500/g, 'bg-[#F59E0B]');
    content = content.replace(/bg-red-500/g, 'bg-[#EF4444]');

    // Input Focus
    content = content.replace(/focus:border-blue-600/g, 'focus:border-[#2563EB]');
    content = content.replace(/focus:ring-blue-600/g, 'focus:ring-[#2563EB]');

    // Shadow
    content = content.replace(/shadow-\[0_0_15px_rgba\(59\,130\,246\,0\.3\)\]/g, 'shadow-[0_0_15px_rgba(37,99,235,0.3)]'); // #2563EB rgb version

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Explicit Hex colors applied successfully!');
