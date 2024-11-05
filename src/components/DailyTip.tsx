import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function DailyTip() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-lg rounded-xl p-6 md:p-8 
      max-w-4xl mx-auto my-16 shadow-2xl border border-purple-500/20"
    >
      <div className="flex items-start space-x-4">
        <div className="bg-purple-500/20 p-3 rounded-full">
          <Lightbulb className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Tip del Día</h3>
          <p className="text-gray-300">
            "La danza es poesía en movimiento. Mantén tu centro fuerte y deja que tu energía fluya 
            naturalmente a través de cada movimiento."
          </p>
          <p className="text-purple-400 mt-2 text-sm">- María González, Instructora Principal</p>
        </div>
      </div>
    </motion.div>
  );
}