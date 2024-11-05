import React, { useState, useEffect } from 'react';
import { Users, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../AuthContext';
import { analyticsDb } from '../../lib/db';
import alertify from 'alertifyjs';

interface AdminStats {
  activeUsers: number;
  monthlyClasses: number;
  retentionRate: number;
  monthlyRevenue: number;
  recentUsers: any[];
  recentClasses: any[];
}

const DEFAULT_STATS: AdminStats = {
  activeUsers: 0,
  monthlyClasses: 0,
  retentionRate: 0,
  monthlyRevenue: 0,
  recentUsers: [],
  recentClasses: []
};

export default function AdminDashboard() {
  const { user } = useAuthContext();
  const [stats, setStats] = useState<AdminStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;
      
      try {
        const data = await analyticsDb.getAdminStats();
        setStats({
          ...DEFAULT_STATS,
          ...data
        });
      } catch (error) {
        console.error('Error loading admin stats:', error);
        alertify.error('Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center">
        <div className="text-gray-400">Cargando estadísticas...</div>
      </div>
    );
  }

  const dashboardStats = [
    {
      icon: Users,
      label: 'Usuarios Activos',
      value: stats.activeUsers.toString(),
      change: '+12%',
      positive: true
    },
    {
      icon: Calendar,
      label: 'Clases este Mes',
      value: stats.monthlyClasses.toString(),
      change: '+8%',
      positive: true
    },
    {
      icon: TrendingUp,
      label: 'Tasa de Retención',
      value: `${stats.retentionRate}%`,
      change: '+5%',
      positive: true
    },
    {
      icon: DollarSign,
      label: 'Ingresos Mensuales',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: '+15%',
      positive: true
    }
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Panel de Administración</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
              border border-purple-500/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <span className={`text-sm ${
                  stat.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
            border border-purple-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Clases Recientes</h2>
            <div className="space-y-4">
              {stats.recentClasses.map((classInfo, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-white">
                      {classInfo.student_name} con {classInfo.teacher_name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {classInfo.date} • {classInfo.time}
                    </p>
                  </div>
                  <span className={`text-sm ${
                    classInfo.is_paid ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {classInfo.is_paid ? 'Pagada' : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}