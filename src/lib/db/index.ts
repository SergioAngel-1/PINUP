// Export database initialization
export { initDB, getDB } from './config';

// Export store operations
export { usersDb } from './stores/userStore';
export { classesDb } from './stores/classStore';
export { analyticsDb } from './stores/analyticsStore';

// Export types
export type { User, Class } from './types';