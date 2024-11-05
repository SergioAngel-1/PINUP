import { dbPromise } from './config';
import type { User, Class } from './types';

// User operations
export const usersDb = {
  async getUser(id: number): Promise<User | undefined> {
    const db = await dbPromise;
    return db.get('users', id);
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const db = await dbPromise;
    const tx = db.transaction('users', 'readonly');
    const index = tx.store.index('email');
    const user = await index.get(email);
    await tx.done;
    return user;
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const db = await dbPromise;
    const tx = db.transaction('users', 'readwrite');
    
    // Check if email exists
    const existingUser = await tx.store.index('email').get(userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const id = await tx.store.add(userData);
    await tx.done;
    return { ...userData, id: id as number };
  },

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const db = await dbPromise;
    const tx = db.transaction('users', 'readwrite');
    
    const user = await tx.store.get(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const updatedUser = {
      ...user,
      ...data,
      updated_at: new Date().toISOString()
    };

    await tx.store.put(updatedUser);
    await tx.done;
    return updatedUser;
  },

  async getTeachers(): Promise<Omit<User, 'password'>[]> {
    const db = await dbPromise;
    const tx = db.transaction('users', 'readonly');
    const teachers = await tx.store.index('role').getAll('teacher');
    await tx.done;
    return teachers.map(({ password, ...teacher }) => teacher);
  },

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const db = await dbPromise;
    const tx = db.transaction('users', 'readonly');
    const users = await tx.store.getAll();
    await tx.done;
    return users.map(({ password, ...user }) => user);
  }
};

// Class operations
export const classesDb = {
  async createClass(classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>): Promise<Class> {
    const db = await dbPromise;
    const now = new Date().toISOString();
    const newClass = {
      ...classData,
      created_at: now,
      updated_at: now
    };
    const id = await db.add('classes', newClass);
    return { ...newClass, id: id as number };
  },

  async getClassesByStudent(studentId: number): Promise<Class[]> {
    const db = await dbPromise;
    const tx = db.transaction(['classes', 'users'], 'readonly');
    const classes = await tx.objectStore('classes').index('student_id').getAll(studentId);
    
    const enrichedClasses = await Promise.all(classes.map(async (classItem) => {
      const teacher = await tx.objectStore('users').get(classItem.teacher_id);
      return {
        ...classItem,
        teacher_name: teacher?.name
      };
    }));
    
    await tx.done;
    return enrichedClasses;
  },

  async getClassesByTeacher(teacherId: number): Promise<Class[]> {
    const db = await dbPromise;
    const tx = db.transaction(['classes', 'users'], 'readonly');
    const classes = await tx.objectStore('classes').index('teacher_id').getAll(teacherId);
    
    const enrichedClasses = await Promise.all(classes.map(async (classItem) => {
      const student = await tx.objectStore('users').get(classItem.student_id);
      return {
        ...classItem,
        student_name: student?.name
      };
    }));
    
    await tx.done;
    return enrichedClasses;
  },

  async getAllClasses(): Promise<Class[]> {
    const db = await dbPromise;
    const tx = db.transaction(['classes', 'users'], 'readonly');
    const classes = await tx.objectStore('classes').getAll();
    
    const enrichedClasses = await Promise.all(classes.map(async (classItem) => {
      const [student, teacher] = await Promise.all([
        tx.objectStore('users').get(classItem.student_id),
        tx.objectStore('users').get(classItem.teacher_id)
      ]);
      return {
        ...classItem,
        student_name: student?.name,
        teacher_name: teacher?.name
      };
    }));
    
    await tx.done;
    return enrichedClasses;
  },

  async togglePaymentStatus(classId: number): Promise<boolean> {
    const db = await dbPromise;
    const tx = db.transaction('classes', 'readwrite');
    const classItem = await tx.store.get(classId);
    
    if (!classItem) {
      throw new Error('Clase no encontrada');
    }

    const newStatus = classItem.payment_status === 'pending' ? 'paid' : 'pending';
    await tx.store.put({
      ...classItem,
      payment_status: newStatus,
      updated_at: new Date().toISOString()
    });
    
    await tx.done;
    return newStatus === 'paid';
  }
};