import { getDB } from '../config';
import type { User } from '../types';

export const usersDb = {
  async getUser(id: number): Promise<User | undefined> {
    const db = getDB();
    return db.get('users', id);
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const db = getDB();
    const tx = db.transaction('users', 'readonly');
    try {
      const store = tx.objectStore('users');
      const index = store.index('email');
      return await index.get(email);
    } finally {
      await tx.done;
    }
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const db = getDB();
    const tx = db.transaction('users', 'readwrite');
    try {
      const store = tx.objectStore('users');
      const index = store.index('email');
      
      // Check if email exists
      const existingUser = await index.get(userData.email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      const id = await store.add(userData);
      return { ...userData, id: id as number };
    } finally {
      await tx.done;
    }
  },

  async updateProfile(id: number, data: Partial<User>): Promise<User> {
    const db = getDB();
    const tx = db.transaction('users', 'readwrite');
    try {
      const store = tx.objectStore('users');
      const user = await store.get(id);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const updatedUser = {
        ...user,
        ...data,
        updated_at: new Date().toISOString()
      };

      await store.put(updatedUser);
      return updatedUser;
    } finally {
      await tx.done;
    }
  },

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const db = getDB();
    const tx = db.transaction('users', 'readonly');
    try {
      const store = tx.objectStore('users');
      const users = await store.getAll();
      return users.map(({ password, ...user }) => user);
    } finally {
      await tx.done;
    }
  },

  async getTeachers(): Promise<Omit<User, 'password'>[]> {
    const db = getDB();
    const tx = db.transaction('users', 'readonly');
    try {
      const store = tx.objectStore('users');
      const index = store.index('role');
      const teachers = await index.getAll('teacher');
      return teachers.map(({ password, ...teacher }) => teacher);
    } finally {
      await tx.done;
    }
  },

  async updateUserRole(userId: number, newRole: User['role']): Promise<Omit<User, 'password'>> {
    const db = getDB();
    const tx = db.transaction('users', 'readwrite');
    try {
      const store = tx.objectStore('users');
      const user = await store.get(userId);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const updatedUser = {
        ...user,
        role: newRole,
        updated_at: new Date().toISOString()
      };

      await store.put(updatedUser);
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } finally {
      await tx.done;
    }
  },

  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const db = getDB();
    const tx = db.transaction('users', 'readwrite');
    try {
      const store = tx.objectStore('users');
      const user = await store.get(userId);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (user.password !== currentPassword) {
        throw new Error('Contraseña actual incorrecta');
      }

      const updatedUser = {
        ...user,
        password: newPassword,
        updated_at: new Date().toISOString()
      };

      await store.put(updatedUser);
    } finally {
      await tx.done;
    }
  },

  async deleteUser(userId: number): Promise<void> {
    const db = getDB();
    const tx = db.transaction('users', 'readwrite');
    try {
      const store = tx.objectStore('users');
      const user = await store.get(userId);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (user.role === 'admin') {
        // Check if this is the last admin
        const index = store.index('role');
        const adminCount = await index.count('admin');
        if (adminCount <= 1) {
          throw new Error('No se puede eliminar el último administrador');
        }
      }

      await store.delete(userId);
    } finally {
      await tx.done;
    }
  }
};