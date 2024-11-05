import { initDB, getDB } from './db/config';
import { usersDb } from './db/stores/userStore';
import { classesDb } from './db/stores/classStore';
import { analyticsDb } from './db/stores/analyticsStore';
import type { User, Class } from './db/types';

export {
  initDB,
  getDB,
  usersDb,
  classesDb,
  analyticsDb,
  type User,
  type Class
};