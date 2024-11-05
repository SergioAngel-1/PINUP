import { dbPromise } from './config';

export const getStudentStats = async (studentId: number) => {
  const db = await dbPromise;
  const index = db.transaction('classes').store.index('student_id');
  const classes = await index.getAll(studentId);
  
  return {
    totalClasses: classes.length,
    completedClasses: classes.filter(c => c.status === 'completed').length,
    upcomingClasses: classes.filter(c => c.status === 'pending').length,
    totalSpent: classes
      .filter(c => c.payment_status === 'paid')
      .reduce((sum, c) => sum + (c.price || 0), 0)
  };
};

export const getTeacherStats = async (teacherId: number) => {
  const db = await dbPromise;
  const index = db.transaction('classes').store.index('teacher_id');
  const classes = await index.getAll(teacherId);
  const uniqueStudents = new Set(classes.map(c => c.student_id));
  
  return {
    monthlyClasses: classes.filter(c => {
      const classDate = new Date(c.date);
      const now = new Date();
      return classDate.getMonth() === now.getMonth() && 
             classDate.getFullYear() === now.getFullYear();
    }).length,
    totalHours: classes.length,
    activeStudents: uniqueStudents.size,
    rating: 4.8
  };
};

export const getAdminStats = async () => {
  const db = await dbPromise;
  const [users, classes] = await Promise.all([
    db.getAll('users'),
    db.getAll('classes')
  ]);
  
  return {
    activeUsers: users.length,
    monthlyClasses: classes.filter(c => {
      const classDate = new Date(c.date);
      const now = new Date();
      return classDate.getMonth() === now.getMonth() && 
             classDate.getFullYear() === now.getFullYear();
    }).length,
    retentionRate: 95,
    monthlyRevenue: classes
      .filter(c => c.payment_status === 'paid')
      .reduce((sum, c) => sum + (c.price || 0), 0)
  };
};