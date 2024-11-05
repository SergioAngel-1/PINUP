import { dbPromise } from './config';
import type { User } from './types';

export const getTeachers = async () => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const index = store.index('role');
  const teachers = await index.getAll('teacher');
  return teachers.map(({ password, ...teacher }) => teacher);
};