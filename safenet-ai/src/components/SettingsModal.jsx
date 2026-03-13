/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Shield, Bell, HardDrive, Download, Trash2, RotateCcw } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useToast } from '../contexts/ToastContext';

// Reusable Toggle Switch Component
const ToggleSwitch = ({ checked, onChange }) => (
    <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-[#3B82F6]' : 'bg-[#374151]'
            }`}
    >
        <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                }`}
        />
    </button>
);

const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="mb-8">
        <h3 className="flex items-center gap-2 text-[#E5E7EB] font-semibold mb-4 text-sm uppercase tracking-wider">
            <Icon size={16} className="text-[#9CA3AF]" />
            {title}
        </h3>
        <div className="bg-[#1F2937] border border-[#374151] rounded-xl overflow-hidden divide-y divide-[#374151]">
            {children}
        </div>
    </div>
);

const SettingsRow = ({ title, description, control }) => (
    <div className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
        <div className="pr-4">
            <p className="text-sm font-medium text-white mb-0.5">{title}</p>
            {description && <p className="text-xs text-[#9CA3AF] leading-relaxed">{description}</p>}
        </div>
        <div className="shrink-0 ml-4">
            {control}
        </div>
    </div>
);

const SettingsModal = ({ isOpen, onClose }) => {
    const { settings, toggleSetting, resetSettings, clearCache, exportLogs } = useSettings();
    const { addToast } = useToast();

    // Local state for the Mock 2FA Modal
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState('');

    const handle2FAToggle = () => {
        if (!settings.twoFactorAuth) {
            // Turning it ON: user needs to verify first
            setShow2FAModal(true);
        } else {
            // Turning it OFF: happens instantly
            toggleSetting('twoFactorAuth');
        }
    };

    const confirm2FA = () => {
        if (twoFactorCode.length >= 6) {
            setShow2FAModal(false);
            toggleSetting('twoFactorAuth');
            addToast("Two-Factor Authentication Enabled", "success");
            setTwoFactorCode('');
        } else {
            addToast("Please enter a 6-digit code", "error");
        }
    };

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#111827] border border-[#374151] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#374151] bg-[#111827] z-10">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Settings className="text-[#3B82F6]" size={24} />
                                Configuration Panel
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            <SettingsSection title="General Settings" icon={Settings}>
                                <SettingsRow
                                    title="Dark Mode"
                                    description="Apply system-wide dark styling to reduce eye strain."
                                    control={<ToggleSwitch checked={settings.darkMode} onChange={() => toggleSetting('darkMode')} />}
                                />
                                <SettingsRow
                                    title="Glass UI"
                                    description="Enable modern frosted glass styling and layer blurs."
                                    control={<ToggleSwitch checked={settings.glassUI} onChange={() => toggleSetting('glassUI')} />}
                                />
                            </SettingsSection>

                            <SettingsSection title="Security Settings" icon={Shield}>
                                <SettingsRow
                                    title="2-Factor Authentication"
                                    description="Require a secondary code for administrative actions."
                                    control={<ToggleSwitch checked={settings.twoFactorAuth} onChange={handle2FAToggle} />}
                                />
                                <SettingsRow
                                    title="Auto-Scan Suspicious URLs"
                                    description="Automatically trigger real-time reputation checks on clicked links."
                                    control={<ToggleSwitch checked={settings.autoScanURLs} onChange={() => toggleSetting('autoScanURLs')} />}
                                />
                                <SettingsRow
                                    title="Email Threat Detection"
                                    description="Integrate with mailbox to proactively scan incoming comms."
                                    control={<ToggleSwitch checked={settings.emailThreatDetection} onChange={() => toggleSetting('emailThreatDetection')} />}
                                />
                            </SettingsSection>

                            <SettingsSection title="Notifications" icon={Bell}>
                                <SettingsRow
                                    title="Critical Email Alerts"
                                    description="Receive immediate emails for critical system events."
                                    control={<ToggleSwitch checked={settings.criticalEmailAlerts} onChange={() => toggleSetting('criticalEmailAlerts')} />}
                                />
                                <SettingsRow
                                    title="Threat Alert Notifications"
                                    description="Show real-time toast notifications for detected threats."
                                    control={<ToggleSwitch checked={settings.threatNotifications} onChange={() => toggleSetting('threatNotifications')} />}
                                />
                                <SettingsRow
                                    title="Daily Security Summary"
                                    description="Receive a digest of blocked threats and system posture."
                                    control={<ToggleSwitch checked={settings.dailySummary} onChange={() => toggleSetting('dailySummary')} />}
                                />
                            </SettingsSection>

                            <SettingsSection title="System Operations" icon={HardDrive}>
                                <div className="p-4 flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={clearCache}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1F2937] hover:bg-[#374151] border border-[#374151] text-white font-medium rounded-lg transition-colors text-sm"
                                    >
                                        <Trash2 size={16} className="text-red-400" />
                                        Clear Cache
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
                                                resetSettings();
                                            }
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1F2937] hover:bg-[#374151] border border-[#374151] text-white font-medium rounded-lg transition-colors text-sm"
                                    >
                                        <RotateCcw size={16} className="text-amber-400" />
                                        Reset Demo Data
                                    </button>
                                    <button
                                        onClick={exportLogs}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-lg transition-colors text-sm"
                                    >
                                        <Download size={16} />
                                        Export Logs
                                    </button>
                                </div>
                            </SettingsSection>
                        </div>
                    </motion.div>

                    {/* Mock 2FA Verification Modal overlay */}
                    <AnimatePresence>
                        {show2FAModal && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                                onClick={() => setShow2FAModal(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-[#111827] border border-[#374151] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative"
                                >
                                    <button onClick={() => setShow2FAModal(false)} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white">
                                        <X size={20} />
                                    </button>
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                                            <Shield size={32} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white text-center mb-2">Enable 2-Factor Auth</h3>
                                    <p className="text-sm text-[#9CA3AF] text-center mb-6">
                                        Enter the 6-digit code from your authenticator app to enable enhanced security.
                                    </p>
                                    <input
                                        type="text"
                                        value={twoFactorCode}
                                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="000000"
                                        className="w-full bg-[#1F2937] border border-[#374151] rounded-lg py-3 px-4 text-center text-2xl tracking-[0.5em] font-mono text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-6"
                                    />
                                    <button
                                        onClick={confirm2FA}
                                        className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold rounded-lg transition-colors"
                                    >
                                        Verify & Enable
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;
