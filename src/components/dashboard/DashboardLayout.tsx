import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../AuthContext";
import {
  Menu,
  X,
  Home,
  Calendar,
  Settings,
  ArrowLeft,
  User,
  LogOut,
  Users,
  Database,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import alertify from "alertifyjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const menuItems = [
    {
      icon: Home,
      label: "Inicio",
      path: "/dashboard",
      roles: ["admin", "teacher", "student"],
    },
    {
      icon: Calendar,
      label: "Clases",
      path: "/dashboard/classes",
      roles: ["teacher", "student"],
    },
    {
      icon: Users,
      label: "Gestión de usuarios",
      path: "/dashboard/users",
      roles: ["admin"],
    },
    {
      icon: Database,
      label: "Inspector de Base de Datos",
      path: "/dashboard/debug/database",
      roles: ["admin"],
    },
    {
      icon: Settings,
      label: "Configuración de perfil",
      path: "/dashboard/settings",
      roles: ["admin", "teacher", "student"],
    },
  ];

  const handleLogout = () => {
    logout();
    alertify.success("Sesión cerrada exitosamente");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen ||
          !window.matchMedia("(max-width: 768px)").matches) && (
          <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden fixed inset-0 bg-black/60 z-40"
              />
            )}

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed md:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b 
              from-purple-900/20 to-black/95 backdrop-blur-lg border-r border-purple-500/20 
              z-50 md:z-0 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center space-x-2">
                    <img src="/favicon.svg" alt="PINUP" className="w-8 h-8" />
                    <span
                      className="text-2xl font-bold bg-gradient-to-r from-purple-500 
                    via-pink-500 to-green-400 text-transparent bg-clip-text"
                    >
                      PINUP
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden text-gray-400 hover:text-white transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg">
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 
                    to-pink-500 flex items-center justify-center"
                    >
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-sm text-gray-400">
                        {user.role === "admin"
                          ? "Administrador"
                          : user.role === "teacher"
                          ? "Profesor"
                          : "Estudiante"}
                      </div>
                    </div>
                  </div>
                </div>

                <nav className="space-y-1">
                  {menuItems
                    .filter((item) => item.roles.includes(user.role))
                    .map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition
                        ${
                          isActive(item.path)
                            ? "bg-purple-500/20 text-white"
                            : "text-gray-400 hover:text-white hover:bg-purple-500/10"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-6 right-6">
                  <Link
                    to="/"
                    className="hidden md:flex items-center space-x-2 text-gray-400 hover:text-white 
                    transition mb-4"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Volver al inicio</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                    px-4 py-2 rounded-lg flex items-center justify-center space-x-2 
                    hover:from-purple-700 hover:to-pink-700 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 md:ml-0">
        {/* Mobile Header */}
        <div
          className="md:hidden bg-black/80 backdrop-blur-md sticky top-0 z-30 
        border-b border-purple-500/20"
        >
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white"
            >
              <Menu size={24} />
            </button>
            <span className="text-white font-medium">{user.name}</span>
            <Link to="/" className="text-gray-400 hover:text-white transition">
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
