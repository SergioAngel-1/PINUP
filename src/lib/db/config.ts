import { openDB, type IDBPDatabase } from 'idb';
import type { DBSchema } from 'idb';
import type { User, Class } from './types';

interface PinupDB extends DBSchema {
  users: {
    key: number;
    value: User;
    indexes: {
      'email': string;
      'role': string;
    };
  };
  classes: {
    key: number;
    value: Class;
    indexes: {
      'student_id': number;
      'teacher_id': number;
      'date': string;
      'status': string;
      'payment_status': string;
    };
  };
}

const initialAdmin: User = {
  id: 1,
  email: 'admin@pinup.co',
  password: 'admin123',
  name: 'Administrador',
  role: 'admin',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const initialTeacher: User = {
  id: 2,
  email: 'teacher@pinup.co',
  password: 'teacher123',
  name: 'María González',
  role: 'teacher',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

let db: IDBPDatabase<PinupDB> | null = null;
let dbPromise: Promise<IDBPDatabase<PinupDB>> | null = null;

export async function initDB(): Promise<IDBPDatabase<PinupDB>> {
  if (dbPromise) return dbPromise;

  dbPromise = openDB<PinupDB>('pinup-db', 10, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('role', 'role');
      }

      if (!db.objectStoreNames.contains('classes')) {
        const classStore = db.createObjectStore('classes', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        classStore.createIndex('student_id', 'student_id');
        classStore.createIndex('teacher_id', 'teacher_id');
        classStore.createIndex('date', 'date');
        classStore.createIndex('status', 'status');
        classStore.createIndex('payment_status', 'payment_status');
      }

      const userStore = transaction.objectStore('users');
      userStore.count().then(count => {
        if (count === 0) {
          userStore.add(initialAdmin);
          userStore.add(initialTeacher);
        }
      });
    },
    blocked(currentVersion, blockedVersion, event) {
      console.warn('Database blocked. Please close other tabs of this app.');
    },
    blocking(currentVersion, blockedVersion, event) {
      db?.close();
      dbPromise = null;
      db = null;
      window.location.reload();
    },
    terminated() {
      console.error('Database connection terminated.');
      dbPromise = null;
      db = null;
    }
  });

  db = await dbPromise;
  return db;
}

export function getDB(): IDBPDatabase<PinupDB> {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.');
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    db.close();
    db = null;
    dbPromise = null;
  }
}

window.addEventListener('unload', () => {
  closeDB();
});