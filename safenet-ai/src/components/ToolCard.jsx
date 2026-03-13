/* eslint-disable no-unused-vars */
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
            <div className="glass-card p-6 shadow-lg flex flex-col h-full hover:bg-[#263449] hover:border-[#334155] transition-colors duration-200">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/10 text-[#2563EB] rounded-lg">
                        <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                        {title}
                    </h3>
                </div>

                <p className="text-sm text-white/70 leading-relaxed mb-6 flex-1">
                    {description}
                </p>

                <Link
                    to={link}
                    className="inline-flex items-center justify-center gap-2 w-full glass-btn-primary mt-auto"
                >
                    <span>Open Tool</span>
                    <ArrowRight size={16} />
                </Link>
            </div>
        </motion.div>
    );
};

export default ToolCard;
