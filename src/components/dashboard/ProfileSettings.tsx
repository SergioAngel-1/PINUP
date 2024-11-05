import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader, Mail, Lock } from 'lucide-react';
import { useAuthContext } from '../AuthContext';
import { usersDb } from '../../lib/db';
import alertify from 'alertifyjs';

interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfileSettings() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    birthDate: '',
    phone: '',
    bio: ''
  });
  const [passwordForm, setPasswordForm] = useState<PasswordChangeForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;
      
      try {
        const userData = await usersDb.getUser(user.id);
        setProfile({
          name: userData.name || '',
          email: userData.email || '',
          birthDate: userData.birthDate || '',
          phone: userData.phone || '',
          bio: userData.bio || ''
        });
      } catch (error) {
        console.error('Error loading profile:', error);
        alertify.error('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user?.id]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setSaving(true);
    try {
      await usersDb.updateProfile(user.id, {
        name: profile.name,
        birthDate: profile.birthDate,
        phone: profile.phone,
        bio: profile.bio
      });
      alertify.success('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error updating profile:', error);
      alertify.error('Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alertify.error('Las contraseñas no coinciden');
      return;
    }

    setSaving(true);
    try {
      await usersDb.changePassword(
        user.id,
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      alertify.success('Contraseña actualizada exitosamente');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordChange(false);
    } catch (error) {
      console.error('Error changing password:', error);
      alertify.error('Error al cambiar la contraseña');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-purple-400">
          <Loader className="w-6 h-6 animate-spin" />
          <span>Cargando perfil...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
          border border-purple-500/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Editar Perfil</h2>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-200 mb-2">Nombre</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                text-white focus:outline-none focus:border-purple-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="email"
                  value={profile.email}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 pl-10 pr-4
                  text-white focus:outline-none focus:border-purple-500 transition opacity-50 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Fecha de Nacimiento</label>
              <input
                type="date"
                value={profile.birthDate}
                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Teléfono</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                text-white focus:outline-none focus:border-purple-500 transition"
                placeholder="+57 300 123 4567"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Biografía</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                text-white focus:outline-none focus:border-purple-500 transition resize-none"
                placeholder="Cuéntanos sobre ti..."
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg
              font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 
              hover:to-pink-700 transition transform hover:scale-105 disabled:opacity-50 
              disabled:cursor-not-allowed disabled:transform-none"
            >
              {saving ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
          border border-purple-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Cambiar Contraseña</h2>
            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              <Lock className="w-5 h-5" />
            </button>
          </div>

          {showPasswordChange && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-200 mb-2">Contraseña Actual</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value
                  })}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                  text-white focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-200 mb-2">Nueva Contraseña</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value
                  })}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                  text-white focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-200 mb-2">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value
                  })}
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4
                  text-white focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg
                font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 
                hover:to-pink-700 transition transform hover:scale-105 disabled:opacity-50 
                disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Actualizando...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Cambiar Contraseña</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}