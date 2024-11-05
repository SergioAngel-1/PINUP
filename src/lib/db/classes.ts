import { dbPromise } from './config';
import type { Class } from './types';

export const createClass = async (classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) => {
  const db = await dbPromise;
  const now = new Date().toISOString();
  const newClass = {
    ...classData,
    created_at: now,
    updated_at: now
  };
  return db.add('classes', newClass);
};

export const getClassesByStudent = async (studentId: number) => {
  const db = await dbPromise;
  const tx = db.transaction(['classes', 'users'], 'readonly');
  const classesStore = tx.objectStore('classes');
  const usersStore = tx.objectStore('users');
  const index = classesStore.index('student_id');
  
  const classes = await index.getAll(studentId);
  const enrichedClasses = await Promise.all(classes.map(async (classItem) => {
    const teacher = await usersStore.get(classItem.teacher_id);
    return {
      ...classItem,
      teacher_name: teacher?.name
    };
  }));
  
  return enrichedClasses;
};

export const getClassesByTeacher = async (teacherId: number) => {
  const db = await dbPromise;
  const tx = db.transaction(['classes', 'users'], 'readonly');
  const classesStore = tx.objectStore('classes');
  const usersStore = tx.objectStore('users');
  const index = classesStore.index('teacher_id');
  
  const classes = await index.getAll(teacherId);
  const enrichedClasses = await Promise.all(classes.map(async (classItem) => {
    const student = await usersStore.get(classItem.student_id);
    return {
      ...classItem,
      student_name: student?.name
    };
  }));
  
  return enrichedClasses;
};

export const getAllClasses = async () => {
  const db = await dbPromise;
  const tx = db.transaction(['classes', 'users'], 'readonly');
  const classesStore = tx.objectStore('classes');
  const usersStore = tx.objectStore('users');
  
  const classes = await classesStore.getAll();
  const enrichedClasses = await Promise.all(classes.map(async (classItem) => {
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
  
  return enrichedClasses;
};