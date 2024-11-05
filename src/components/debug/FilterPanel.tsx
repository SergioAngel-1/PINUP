import React from "react";
import { motion } from "framer-motion";

interface FilterPanelProps {
  activeTab: "users" | "classes";
  filters: {
    role: string;
    status: string;
    dateRange: string;
  };
  onChange: (filters: any) => void;
}

export default function FilterPanel({
  activeTab,
  filters,
  onChange,
}: FilterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeTab === "users" && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Rol
            </label>
            <select
              value={filters.role}
              onChange={(e) => onChange({ ...filters, role: e.target.value })}
              className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-3
              text-white focus:outline-none focus:border-purple-500 transition"
            >
              <option value="all">Todos</option>
              <option value="admin">Administrador</option>
              <option value="teacher">Profesor</option>
              <option value="student">Estudiante</option>
            </select>
          </div>
        )}

        {activeTab === "classes" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Estado
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  onChange({ ...filters, status: e.target.value })
                }
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-3
                text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendiente</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Rango de Fecha
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) =>
                  onChange({ ...filters, dateRange: e.target.value })
                }
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-3
                text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="all">Todas las fechas</option>
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
              </select>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
