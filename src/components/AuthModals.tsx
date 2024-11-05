import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import alertify from 'alertifyjs';
import ForgotPassword from './ForgotPassword';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, type }: ModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, register } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (type === 'login') {
        await login(email, password);
        alertify.success('¡Bienvenido de nuevo!');
      } else {
        await register(email, password, name);
        alertify.success('¡Registro exitoso! Bienvenido a PINUP Dance');
      }
      onClose();
      navigate('/dashboard');
    } catch (err) {
      alertify.error(err instanceof Error ? err.message : 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setEmail('');
    setPassword('');
    setName('');
    onClose();
    setTimeout(() => {
      if (type === 'login') {
        document.getElementById('register-button')?.click();
      } else {
        document.getElementById('login-button')?.click();
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-gradient-to-b 
            from-purple-900/90 to-black/95 backdrop-blur-lg z-50 overflow-y-auto"
          >
            {showForgotPassword ? (
              <ForgotPassword onBack={() => setShowForgotPassword(false)} />
            ) : (
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">
                    {type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {type === 'register' && (
                    <div>
                      <label className="block text-gray-200 mb-2">Nombre</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                          text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500
                          transition"
                          placeholder="Tu nombre completo"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-200 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                        text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500
                        transition"
                        placeholder="tu@email.com"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-200 mb-2">Contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-10
                        text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500
                        transition"
                        placeholder="••••••••"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {type === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-purple-400 hover:text-purple-300 text-sm transition block w-full text-right"
                      disabled={loading}
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg
                    font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 
                    hover:to-pink-700 transition transform hover:scale-105 disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>{type === 'login' ? 'Iniciando sesión...' : 'Registrando...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{type === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>

                  <div className="text-center text-gray-400">
                    <span>
                      {type === 'login' ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                    </span>
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="ml-2 text-purple-400 hover:text-purple-300 transition"
                    >
                      {type === 'login' ? 'Regístrate' : 'Inicia sesión'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}