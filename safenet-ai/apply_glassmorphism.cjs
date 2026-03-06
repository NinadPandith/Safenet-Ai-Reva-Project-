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

    // Remove fixed background colors so the body gradient shows through
    content = content.replace(/bg-\[\#0F172A\]/g, 'bg-transparent');

    // Sidebar
    content = content.replace(/bg-\[\#0D1B2A\] border-r border-\[\#334155\]/g, 'glass-sidebar border-r border-white/10');
    content = content.replace(/bg-\[\#2563EB\] text-white relative/g, 'glass-sidebar-active relative');

    // Cards
    // Replace complex card classes with glass-card
    content = content.replace(/bg-\[\#1E293B\] rounded-xl border border-\[\#334155\] p-6 shadow-lg flex flex-col h-full hover:bg-\[\#263449\] hover:border-\[\#334155\] transition-colors duration-200/g, 'glass-card flex flex-col h-full p-6');
    content = content.replace(/bg-\[\#1E293B\] rounded-xl border border-\[\#334155\]/g, 'glass-card');
    content = content.replace(/bg-\[\#1E293B\] border border-\[\#334155\] rounded-xl/g, 'glass-card');
    content = content.replace(/bg-\[\#1E293B\] border border-\[\#334155\] rounded-2xl/g, 'glass-card');
    content = content.replace(/bg-\[\#1E293B\] rounded-lg p-5 border border-\[\#334155\]/g, 'glass-card p-5');
    content = content.replace(/bg-\[\#1E293B\] rounded-lg p-4 text-left space-y-2 border border-\[\#334155\] w-full hover:bg-\[\#263449\] transition-colors duration-200/g, 'glass-card p-4 text-left space-y-2 w-full');

    // Primary Buttons
    content = content.replace(/bg-\[\#2563EB\] hover:bg-\[\#1D4ED8\] text-white.*?transition duration-200 ease-in-out hover:shadow-\[0_0_15px_rgba\(37\,99\,235\,0\.3\)\]/g, 'glass-btn-primary');
    content = content.replace(/bg-\[\#2563EB\] hover:bg-\[\#1D4ED8\] text-white.*?transition-colors/g, 'glass-btn-primary');
    content = content.replace(/bg-\[\#2563EB\] text-white hover:bg-\[\#1D4ED8\] border border-transparent transition duration-200 ease-in-out hover:shadow-\[0_0_15px_rgba\(37\,99\,235\,0\.3\)\]/g, 'glass-btn-primary');
    content = content.replace(/bg-\[\#2563EB\]/g, 'glass-btn-primary'); // fallback

    // Secondary Buttons
    content = content.replace(/bg-\[\#334155\] hover:bg-\[\#475569\] border border-\[\#334155\] text-\[\#E2E8F0\]/g, 'glass-btn-secondary text-white');

    // Inputs
    content = content.replace(/bg-transparent border border-\[\#334155\] rounded-lg p-4 text-\[\#E2E8F0\] placeholder-\[\#64748B\] focus:outline-none focus:border-\[\#2563EB\] focus:ring-1 focus:ring-\[\#2563EB\] transition-colors/g, 'glass-input w-full p-4');
    content = content.replace(/bg-transparent border border-\[\#334155\] rounded-lg py-3 px-4 text-\[\#E2E8F0\] focus:outline-none focus:border-\[\#2563EB\]/g, 'glass-input w-full py-3 px-4');

    // Default remaining inputs (if transparent replacement missed some due to previous step)
    content = content.replace(/border border-\[\#334155\] rounded-lg p-4 text-\[\#E2E8F0\] placeholder-\[\#64748B\] focus:outline-none focus:border-\[\#2563EB\] focus:ring-1 focus:ring-\[\#2563EB\]/g, 'glass-input w-full p-4');

    // Navbar
    content = content.replace(/bg-transparent\/80 backdrop-blur-md z-50 flex items-center justify-between px-6 border-b border-\[\#334155\]/g, 'glass-sidebar bg-transparent z-50 flex items-center justify-between px-6 border-b border-white/10');

    // Text Colors
    content = content.replace(/text-\[\#E2E8F0\]/g, 'text-white');
    content = content.replace(/text-\[\#94A3B8\]/g, 'text-white/70');
    content = content.replace(/text-\[\#64748B\]/g, 'text-white/50');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Glassmorphism classes applied successfully!');
