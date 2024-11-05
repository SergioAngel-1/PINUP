import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../AuthContext';
import { classesDb, analyticsDb } from '../../lib/db';
import { Calendar, Clock, DollarSign, BookOpen, Users, Award } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import alertify from 'alertifyjs';

interface Stats {
  totalClasses: number;
  completedClasses: number;
  upcomingClasses: number;
  totalSpent: number;
}

export default function StudentDashboard() {
  const { user } = useAuthContext();
  const [classes, setClasses] = useState<any[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const [fetchedClasses, studentStats] = await Promise.all([
          classesDb.getClassesByStudent(user.id),
          analyticsDb.getStudentStats(user.id)
        ]);
        setClasses(fetchedClasses);
        setStats(studentStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        alertify.error('Error loading dashboard data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Clases Totales</p>
              <p className="text-2xl font-bold text-white">{stats?.totalClasses || 0}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-pink-900/50 to-pink-800/30 p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-pink-500/20 p-3 rounded-lg">
              <Award className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Clases Completadas</p>
              <p className="text-2xl font-bold text-white">{stats?.completedClasses || 0}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-6 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Invertido</p>
              <p className="text-2xl font-bold text-white">
                ${stats?.totalSpent?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Classes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900/50 rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Clases Recientes</h3>
        {classes.length > 0 ? (
          <div className="space-y-4">
            {classes.slice(0, 5).map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Users className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium">{classItem.teacher_name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(classItem.date), "d 'de' MMMM, yyyy", { locale: es })}
                      </span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{classItem.time}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  classItem.is_paid 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {classItem.is_paid ? 'Pagada' : 'Pendiente'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No hay clases registradas aún.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}