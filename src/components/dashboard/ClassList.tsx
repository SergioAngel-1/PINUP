import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import db from '../../lib/db';
import { useAuthContext } from '../AuthContext';
import alertify from 'alertifyjs';

export default function ClassList() {
  const { user } = useAuthContext();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const teachersList = await db.getTeachers();
        setTeachers(teachersList);
        setError('');
      } catch (err) {
        console.error('Error getting teachers:', err);
        setError('Error al cargar los profesores');
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      await db.createClass({
        student_id: user.id,
        teacher_id: parseInt(selectedTeacher),
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        payment_status: 'pending'
      });

      alertify.success('Clase agendada exitosamente');
      setSelectedTeacher('');
      setSelectedDate('');
      setSelectedTime('');
    } catch (err) {
      alertify.error('Error al agendar la clase');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 
      text-transparent bg-clip-text">
        Agendar Clase
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Profesor</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
              className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-10
              text-white focus:outline-none focus:border-purple-500 appearance-none"
            >
              <option value="">Seleccionar profesor</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Fecha</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              required
              className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-10
              text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Hora</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-10
              text-white focus:outline-none focus:border-purple-500 appearance-none"
            >
              <option value="">Seleccionar hora</option>
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
    </div>
  );
}