import React, { useState, useEffect } from 'react';
import { classesDb } from '../lib/db';
import type { User } from '../lib/db';
import alertify from 'alertifyjs';

interface BookingFormProps {
  studentId: number;
  onBookingComplete: () => void;
}

export default function BookingForm({ studentId, onBookingComplete }: BookingFormProps) {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const teachersList = await classesDb.getTeachers();
        setTeachers(teachersList);
      } catch (error) {
        alertify.error('Error al cargar los profesores');
      }
    };
    
    loadTeachers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await classesDb.createClass({
        student_id: studentId,
        teacher_id: parseInt(selectedTeacher),
        date: selectedDate,
        time: selectedTime,
        price: 50000, // Fixed price for now
        is_paid: false
      });
      
      alertify.success('Clase agendada exitosamente');
      onBookingComplete();
      
      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setSelectedTeacher('');
    } catch (error) {
      alertify.error('Error al agendar la clase');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-200 mb-2">Fecha</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
            text-white focus:outline-none focus:border-purple-500 transition"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-200 mb-2">Hora</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
            text-white focus:outline-none focus:border-purple-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200 mb-2">Profesor</label>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
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