const fs = require('fs');
const files = [
    'src/components/FloatingAssistant.jsx',
    'src/components/Navbar.jsx',
    'src/components/ProfileModal.jsx',
    'src/components/SettingsModal.jsx',
    'src/components/ToolCard.jsx',
    'src/pages/Dashboard.jsx',
    'src/pages/LandingPage.jsx',
    'src/tools/AIChatbot.jsx',
    'src/tools/PasswordAnalyzer.jsx',
    'src/tools/PermissionAnalyzer.jsx',
    'src/services/mlEngine.js',
    'src/contexts/SettingsContext.jsx',
    'src/contexts/ToastContext.jsx'
];
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/\\n/g, '\n');
    fs.writeFileSync(f, c);
});
console.log('Fixed all files.');
