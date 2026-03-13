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
    try {
        let c = fs.readFileSync(f, 'utf8');
        let newC = c.replace(/\\n/g, '\n');
        if (c !== newC) {
            fs.writeFileSync(f, newC);
        }
    } catch (e) { }
});
console.log('Fixed all files.');
