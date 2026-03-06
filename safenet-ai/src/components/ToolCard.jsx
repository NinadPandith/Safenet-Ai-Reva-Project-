import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ToolCard = ({ icon: Icon, title, description, link }) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="h-full"
        >
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg flex flex-col h-full hover:border-slate-500 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                        <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">
                        {title}
                    </h3>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                    {description}
                </p>

                <Link
                    to={link}
                    className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors mt-auto"
                >
                    <span>Open Tool</span>
                    <ArrowRight size={16} />
                </Link>
            </div>
        </motion.div>
    );
};

export default ToolCard;
