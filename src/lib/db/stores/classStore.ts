import { getDB } from '../config';
import type { Class } from '../types';

export const classesDb = {
  async createClass(classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>): Promise<Class> {
    const db = getDB();
    const tx = db.transaction('classes', 'readwrite');
    try {
      const store = tx.objectStore('classes');
      const now = new Date().toISOString();
      const newClass = {
        ...classData,
        created_at: now,
        updated_at: now
      };
      const id = await store.add(newClass);
      return { ...newClass, id: id as number };
    } finally {
      await tx.done;
    }
  },

  async getClassesByStudent(studentId: number): Promise<Class[]> {
    const db = getDB();
    const tx = db.transaction(['classes', 'users'], 'readonly');
    try {
      const classesStore = tx.objectStore('classes');
      const usersStore = tx.objectStore('users');
      const index = classesStore.index('student_id');
      
      const classes = await index.getAll(studentId);
      return await Promise.all(classes.map(async (classItem) => {
        const teacher = await usersStore.get(classItem.teacher_id);
        return {
          ...classItem,
          teacher_name: teacher?.name
        };
      }));
    } finally {
      await tx.done;
    }
  },

  async getClassesByTeacher(teacherId: number): Promise<Class[]> {
    const db = getDB();
    const tx = db.transaction(['classes', 'users'], 'readonly');
    try {
      const classesStore = tx.objectStore('classes');
      const usersStore = tx.objectStore('users');
      const index = classesStore.index('teacher_id');
      
      const classes = await index.getAll(teacherId);
      return await Promise.all(classes.map(async (classItem) => {
        const student = await usersStore.get(classItem.student_id);
        return {
          ...classItem,
          student_name: student?.name
        };
      }));
    } finally {
      await tx.done;
    }
  },

  async getAllClasses(): Promise<Class[]> {
    const db = getDB();
    const tx = db.transaction(['classes', 'users'], 'readonly');
    try {
      const classesStore = tx.objectStore('classes');
      const usersStore = tx.objectStore('users');
      
      const classes = await classesStore.getAll();
      return await Promise.all(classes.map(async (classItem) => {
        const [student, teacher] = await Promise.all([
          usersStore.get(classItem.student_id),
          usersStore.get(classItem.teacher_id)
        ]);
        return {
          ...classItem,
          student_name: student?.name,
          teacher_name: teacher?.name
        };
      }));
    } finally {
      await tx.done;
    }
  },

  async togglePaymentStatus(classId: number): Promise<boolean> {
    const db = getDB();
    const tx = db.transaction('classes', 'readwrite');
    try {
      const store = tx.objectStore('classes');
      const classItem = await store.get(classId);
      
      if (!classItem) {
        throw new Error('Clase no encontrada');
      }

      const updatedClass = {
        ...classItem,
        is_paid: !classItem.is_paid,
        updated_at: new Date().toISOString()
      };

      await store.put(updatedClass);
      return updatedClass.is_paid;
    } finally {
      await tx.done;
    }
  }
};