/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle2 size={20} className="text-green-400" />;
            case 'error': return <XCircle size={20} className="text-red-400" />;
            case 'warning': return <AlertTriangle size={20} className="text-amber-400" />;
            case 'info':
            default: return <Info size={20} className="text-blue-400" />;
        }
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-20 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            className="bg-[#1F2937] border border-[#374151] shadow-2xl rounded-xl p-4 flex items-start gap-3 pointer-events-auto overflow-hidden relative"
                        >
                            {/* Accent Line */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${toast.type === 'success' ? 'bg-green-500' :
                                toast.type === 'error' ? 'bg-red-500' :
                                    toast.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                                }`} />

                            <div className="shrink-0 mt-0.5 ml-1">{getIcon(toast.type)}</div>
                            <div className="flex-1 pr-4">
                                <p className="text-sm font-medium text-white">{toast.message}</p>
                            </div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 text-[#9CA3AF] hover:text-white transition-colors p-0.5 rounded-md hover:bg-white/10"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
