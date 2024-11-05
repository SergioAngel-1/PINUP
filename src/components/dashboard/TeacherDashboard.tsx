import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react';
import { useAuthContext } from '../AuthContext';
import { analyticsDb } from '../../lib/db';
import alertify from 'alertifyjs';
import StatCard from './stats/StatCard';
import TodaySchedule from './schedule/TodaySchedule';
import RecentStudents from './students/RecentStudents';

interface TeacherStats {
  monthlyClasses: number;
  totalHours: number;
  activeStudents: number;
  rating: number;
  todayClasses: Array<{
    time: string;
    student_name: string;
    is_paid: boolean;
  }>;
  recentStudents: Array<{
    name: string;
  }>;
}

const DEFAULT_STATS: TeacherStats = {
  monthlyClasses: 0,
  totalHours: 0,
  activeStudents: 0,
  rating: 0,
  todayClasses: [],
  recentStudents: []
};

export default function TeacherDashboard() {
  const { user } = useAuthContext();
  const [stats, setStats] = useState<TeacherStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!user?.id) return;
      
      try {
        const data = await analyticsDb.getTeacherStats(user.id);
        setStats({
          ...DEFAULT_STATS,
          ...data
        });
      } catch (error) {
        console.error('Error loading teacher stats:', error);
        alertify.error('Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center">
        <div className="text-gray-400">Cargando estadísticas...</div>
      </div>
    );
  }

  const dashboardStats = [
    {
      icon: Calendar,
      label: 'Clases este Mes',
      value: stats.monthlyClasses.toString(),
      change: '+3',
      positive: true
    },
    {
      icon: Clock,
      label: 'Horas Impartidas',
      value: stats.totalHours.toString(),
      change: '+12',
      positive: true
    },
    {
      icon: Users,
      label: 'Estudiantes Activos',
      value: stats.activeStudents.toString(),
      change: '+5',
      positive: true
    },
    {
      icon: TrendingUp,
      label: 'Valoración Media',
      value: stats.rating.toString(),
      change: '+0.2',
      positive: true
    }
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Panel del Profesor</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              index={index}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TodaySchedule classes={stats.todayClasses} />
          <RecentStudents students={stats.recentStudents} />
        </div>
      </div>
    </div>
  );
}