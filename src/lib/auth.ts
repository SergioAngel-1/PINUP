import { useState, useEffect } from 'react';
import { usersDb } from './db';
import { createToken, verifyToken } from './jwt';
import type { User } from './db/types';
import alertify from 'alertifyjs';

// Session management
let sessionTimeout: ReturnType<typeof setTimeout>;

const resetSessionTimeout = (callback: () => void) => {
  if (sessionTimeout) clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(callback, 30 * 60 * 1000); // 30 minutes
};

export function useAuth() {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { userId } = verifyToken(token);
          const userData = await usersDb.getUser(userId);
          if (userData) {
            const { password, ...userWithoutPassword } = userData;
            setUser(userWithoutPassword);
            resetSessionTimeout(() => {
              localStorage.removeItem('token');
              setUser(null);
              alertify.warning('Sesión expirada');
            });
          }
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      if (user) {
        resetSessionTimeout(() => {
          localStorage.removeItem('token');
          setUser(null);
          alertify.warning('Sesión expirada');
        });
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      if (sessionTimeout) clearTimeout(sessionTimeout);
    };
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const userData = await usersDb.getUserByEmail(email);
      
      if (!userData || userData.password !== password) {
        throw new Error('Credenciales inválidas');
      }

      const { password: _, ...userWithoutPassword } = userData;
      const token = createToken({ 
        userId: userData.id!,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      });

      localStorage.setItem('token', token);
      setUser(userWithoutPassword);
      return userWithoutPassword;
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      throw new Error('Credenciales inválidas');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const newUser = await usersDb.createUser({
        email,
        password,
        name,
        role: 'student',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      const { password: _, ...userWithoutPassword } = newUser;
      const token = createToken({ 
        userId: newUser.id!,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      });

      localStorage.setItem('token', token);
      setUser(userWithoutPassword);
      return userWithoutPassword;
    } catch (error) {
      console.error('Error de registro:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al crear la cuenta');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (sessionTimeout) clearTimeout(sessionTimeout);
  };

  return {
    user,
    loading,
    login,
    register,
    logout
  };
}