import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Check, X, Trash2 } from 'lucide-react';
import { usersDb } from '../../../lib/db';
import type { User as UserType } from '../../../lib/db/types';
import alertify from 'alertifyjs';

export default function UserManagement() {
  const [users, setUsers] = useState<Omit<UserType, 'password'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserType['role']>('student');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const usersList = await usersDb.getAllUsers();
      setUsers(usersList);
    } catch (error) {
      console.error('Error loading users:', error);
      alertify.error('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: number, newRole: UserType['role']) => {
    try {
      const updatedUser = await usersDb.updateUserRole(userId, newRole);
      setUsers(users.map(user => 
        user.id === userId ? updatedUser : user
      ));
      alertify.success('Rol actualizado exitosamente');
    } catch (error) {
      console.error('Error updating role:', error);
      alertify.error('Error al actualizar el rol');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await usersDb.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      alertify.success('Usuario eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting user:', error);
      alertify.error('Error al eliminar el usuario');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-4 md:p-6 
        border border-purple-500/20"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Gestión de Usuarios</h2>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 
              bg-purple-900/20 rounded-lg border border-purple-500/10 space-y-4 md:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  {selectedUser === user.id ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as UserType['role'])}
                        className="bg-purple-900/30 border border-purple-500/30 rounded px-2 py-1 
                        text-white text-sm focus:outline-none focus:border-purple-500"
                      >
                        <option value="student">Estudiante</option>
                        <option value="teacher">Profesor</option>
                        <option value="admin">Administrador</option>
                      </select>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            handleRoleChange(user.id!, selectedRole);
                            setSelectedUser(null);
                          }}
                          className="text-green-400 hover:text-green-300 transition p-1 
                          bg-green-500/10 rounded-full"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setSelectedUser(null)}
                          className="text-red-400 hover:text-red-300 transition p-1 
                          bg-red-500/10 rounded-full"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedUser(user.id!);
                        setSelectedRole(user.role);
                      }}
                      className="px-3 py-1 text-sm text-gray-300 hover:text-white transition 
                      bg-purple-500/10 rounded-full"
                    >
                      {user.role === 'admin' ? 'Administrador' :
                       user.role === 'teacher' ? 'Profesor' :
                       'Estudiante'}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteUser(user.id!)}
                  className="text-red-400 hover:text-red-300 transition p-1 
                  bg-red-500/10 rounded-full"
                  title="Eliminar usuario"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}