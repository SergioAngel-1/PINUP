import React from 'react';
import { motion } from 'framer-motion';

interface Student {
  name: string;
}

interface RecentStudentsProps {
  students: Student[];
}

export default function RecentStudents({ students }: RecentStudentsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
      border border-purple-500/20"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Estudiantes Recientes</h2>
      <div className="space-y-4">
        {students.length > 0 ? (
          students.map((student, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 
                to-pink-500 flex items-center justify-center text-white font-semibold">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white">{student.name}</p>
                  <p className="text-sm text-gray-400">Nuevo estudiante</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">
            No hay estudiantes recientes
          </div>
        )}
      </div>
    </motion.div>
  );
}