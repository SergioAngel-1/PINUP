import React from 'react';
import { motion } from 'framer-motion';

interface ClassSession {
  time: string;
  student_name: string;
  is_paid: boolean;
}

interface TodayScheduleProps {
  classes: ClassSession[];
}

export default function TodaySchedule({ classes }: TodayScheduleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
      border border-purple-500/20"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Horario de Hoy</h2>
      <div className="space-y-4">
        {classes.length > 0 ? (
          classes.map((session, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-purple-400 font-mono">{session.time}</span>
                <div>
                  <p className="text-white">{session.student_name}</p>
                  <p className="text-sm text-gray-400">
                    {session.is_paid ? 'Pagada' : 'Pendiente de pago'}
                  </p>
                </div>
              </div>
              <span className="text-sm text-purple-400">Próximo</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">
            No tienes clases programadas para hoy
          </div>
        )}
      </div>
    </motion.div>
  );
}