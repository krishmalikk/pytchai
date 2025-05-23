import React from 'react';
import { motion } from 'framer-motion';

interface PreviewWindowProps {
  children: React.ReactNode;
  title: string;
  onOpenFull: () => void;
}

export function PreviewWindow({ children, title, onOpenFull }: PreviewWindowProps) {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gray-100 z-50">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full h-full pt-16 relative"
      >
        <div className="absolute inset-0 overflow-auto">
          <div className="min-h-full relative">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 