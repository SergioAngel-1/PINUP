import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from './AuthContext';
import { usersDb, classesDb } from '../lib/db';
import { Calendar, Clock, User, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import alertify from 'alertifyjs';

export default function Classes() {
  const { user } = useAuthContext();
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        let loadedClasses = [];
        if (user.role === 'student') {
          loadedClasses = await classesDb.getClassesByStudent(user.id);
          const teachersList = await usersDb.getTeachers();
          setTeachers(teachersList);
        } else if (user.role === 'teacher') {
          loadedClasses = await classesDb.getClassesByTeacher(user.id);
        } else if (user.role === 'admin') {
          loadedClasses = await classesDb.getAllClasses();
        }
        
        setClasses(loadedClasses);
      } catch (error) {
        console.error('Error cargando datos:', error);
        alertify.error('Error al cargar los datos. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleBookClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await classesDb.createClass({
        student_id: user.id,
        teacher_id: parseInt(selectedTeacher),
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        payment_status: 'pending',
        is_paid: false,
        price: 50000
      });

      const updatedClasses = await classesDb.getClassesByStudent(user.id);
      setClasses(updatedClasses);

      setSelectedTeacher('');
      setSelectedDate('');
      setSelectedTime('');

      alertify.success('¡Clase agendada exitosamente!');
    } catch (error) {
      console.error('Error al agendar clase:', error);
      alertify.error('Error al agendar la clase. Por favor, inténtalo de nuevo.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 
        text-transparent bg-clip-text mb-4">
          {user?.role === 'student' ? 'Agenda tu Clase' : 
           user?.role === 'teacher' ? 'Tus Clases' : 
           'Gestión de Clases'}
        </h2>
      </motion.div>

      {user?.role === 'student' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
          border border-purple-500/20"
        >
          <form onSubmit={handleBookClass} className="space-y-6">
            <div>
              <label className="block text-gray-200 mb-2">Profesor</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                  text-white focus:outline-none focus:border-purple-500 transition"
                  required
                >
                  <option value="">Selecciona un profesor</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Fecha</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                  text-white focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Hora</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                  text-white focus:outline-none focus:border-purple-500 transition"
                  required
                >
                  <option value="">Selecciona una hora</option>
                  {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg
              font-semibold hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105"
            >
              Agendar Clase
            </button>
          </form>
        </motion.div>
      )}

      <div className="space-y-6">
        {classes.map((classItem, index) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-purple-900/20 to-black/40 rounded-xl p-6 
            border border-purple-500/20"
          >
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span>{format(new Date(classItem.date), 'PPP', { locale: es })}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>{classItem.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="w-5 h-5 text-purple-400" />
                  <span>
                    {user?.role === 'student' ? classItem.teacher_name :
                     user?.role === 'teacher' ? classItem.student_name :
                     `${classItem.student_name} - ${classItem.teacher_name}`}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                  <span>${classItem.price?.toLocaleString()}</span>
                </div>
              </div>

              <div className={`px-4 py-2 rounded-full text-sm ${
                classItem.is_paid 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {classItem.is_paid ? 'Pagada' : 'Pendiente de Pago'}
              </div>
            </div>
          </motion.div>
        ))}

        {classes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            {user?.role === 'student' 
              ? 'No tienes clases agendadas. ¡Agenda tu primera clase arriba!'
              : 'No hay clases encontradas.'}
          </motion.div>
        )}
      </div>
    </div>
  );
}