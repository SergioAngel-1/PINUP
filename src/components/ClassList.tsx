import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Class } from '../lib/db';

interface ClassListProps {
  classes: Class[];
  userRole: string;
  onTogglePayment?: (classId: number) => void;
  onGeneratePayment?: (classInfo: Class) => void;
}

export default function ClassList({ 
  classes, 
  userRole, 
  onTogglePayment, 
  onGeneratePayment 
}: ClassListProps) {
  return (
    <div className="space-y-6">
      {classes.map((classInfo) => (
        <motion.div
          key={classInfo.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-xl
          border border-purple-500/20 backdrop-blur-sm"
        >
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Calendar size={18} className="text-purple-400" />
                <span>{format(new Date(classInfo.date), 'PPP', { locale: es })}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock size={18} className="text-purple-400" />
                <span>{classInfo.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <User size={18} className="text-purple-400" />
                <span>
                  {userRole === 'student' ? classInfo.teacher_name : 
                   userRole === 'teacher' ? classInfo.student_name :
                   `${classInfo.student_name} - ${classInfo.teacher_name}`}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <DollarSign size={18} className="text-purple-400" />
                <span>${classInfo.price}</span>
              </div>
            </div>

            {userRole === 'student' && !classInfo.is_paid && onGeneratePayment && (
              <button
                onClick={() => onGeneratePayment(classInfo)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full
                flex items-center space-x-2 transition transform hover:scale-105"
              >
                <span>Pagar por WhatsApp</span>
              </button>
            )}

            {userRole === 'admin' && onTogglePayment && (
              <button
                onClick={() => onTogglePayment(classInfo.id)}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full transition
                ${classInfo.is_paid ? 
                  'bg-purple-600 hover:bg-purple-700' : 
                  'bg-pink-600 hover:bg-pink-700'} text-white`}
              >
                {classInfo.is_paid ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Pagado</span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} />
                    <span>Pendiente</span>
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}