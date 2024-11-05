import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  index: number;
}

export default function StatCard({ icon: Icon, label, value, change, positive, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
      border border-purple-500/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
        <span className={`text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{label}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
}