import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
    darkMode: false,
    glassUI: true,
    twoFactorAuth: true,
    autoScanURLs: true,
    emailThreatDetection: false,
    criticalEmailAlerts: true,
    threatNotifications: true,
    dailySummary: false,
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        // Hydrate from localStorage on initial load
        const stored = localStorage.getItem('safenet_settings');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse settings manually:", e);
                return DEFAULT_SETTINGS;
            }
        }
        return DEFAULT_SETTINGS;
    });

    const { addToast } = useToast();

    // Persist to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem('safenet_settings', JSON.stringify(settings));

        // Apply Global CSS Overrides
        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        if (!settings.glassUI) {
            document.body.classList.add('no-glass');
        } else {
            document.body.classList.remove('no-glass');
        }

    }, [settings]);

    const toggleSetting = (key) => {
        setSettings(prev => {
            const newValue = !prev[key];

            // Show toast feedback
            if (key === 'twoFactorAuth' && newValue) {
                // To be handled specifically by the component for the mock modal
            } else {
                const message = newValue ? `${formatKeyName(key)} enabled` : `${formatKeyName(key)} disabled`;
                addToast(message, newValue ? 'success' : 'info');
            }

            return {
                ...prev,
                [key]: newValue
            };
        });
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
        addToast("System reset completed. Demo defaults restored.", "success");
    };

    const clearCache = () => {
        localStorage.clear();
        // Keep current settings but commit them fresh
        localStorage.setItem('safenet_settings', JSON.stringify(settings));
        addToast("Cache successfully cleared", "success");
    };

    const exportLogs = () => {
        const payload = {
            timestamp: new Date().toISOString(),
            currentUser: "admin@safenet.ai",
            activeSettings: settings,
            systemHealth: "Optimal",
            recentThreatsBlocked: 42
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "safenet_security_logs.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        addToast("Security logs exported successfully", "success");
    };

    // Helper to make toast messages look nice (e.g. 'glassUI' -> 'Glass UI')
    const formatKeyName = (key) => {
        const names = {
            darkMode: "Dark Mode",
            glassUI: "Glass UI",
            twoFactorAuth: "Two-Factor Authentication",
            autoScanURLs: "Auto-Scan URLs",
            emailThreatDetection: "Email Threat Detection",
            criticalEmailAlerts: "Critical Email Alerts",
            threatNotifications: "Threat Notifications",
            dailySummary: "Daily Summary"
        };
        return names[key] || key;
    };

    return (
        <SettingsContext.Provider value={{
            settings,
            toggleSetting,
            resetSettings,
            clearCache,
            exportLogs
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
