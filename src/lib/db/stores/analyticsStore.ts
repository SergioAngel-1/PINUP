import { getDB } from '../config';

export const analyticsDb = {
  async getStudentStats(studentId: number) {
    const db = getDB();
    const tx = db.transaction('classes', 'readonly');
    try {
      const store = tx.objectStore('classes');
      const index = store.index('student_id');
      const classes = await index.getAll(studentId);
      
      return {
        totalClasses: classes.length,
        completedClasses: classes.filter(c => c.status === 'completed').length,
        upcomingClasses: classes.filter(c => c.status === 'pending').length,
        totalSpent: classes
          .filter(c => c.payment_status === 'paid')
          .reduce((sum, c) => sum + (c.price || 0), 0)
      };
    } finally {
      await tx.done;
    }
  },

  async getTeacherStats(teacherId: number) {
    const db = getDB();
    const tx = db.transaction(['classes', 'users'], 'readonly');
    try {
      const classesStore = tx.objectStore('classes');
      const usersStore = tx.objectStore('users');
      const index = classesStore.index('teacher_id');
      const classes = await index.getAll(teacherId);
      
      const uniqueStudents = new Set(classes.map(c => c.student_id));
      const today = new Date();
      const todayClasses = classes.filter(c => {
        const classDate = new Date(c.date);
        return classDate.toDateString() === today.toDateString();
      });

      const recentStudentIds = [...new Set(classes
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
        .map(c => c.student_id)
      )];

      const recentStudents = await Promise.all(
        recentStudentIds.map(async id => {
          const student = await usersStore.get(id);
          return { name: student?.name || 'Unknown' };
        })
      );

      return {
        monthlyClasses: classes.filter(c => {
          const classDate = new Date(c.date);
          return classDate.getMonth() === today.getMonth() && 
                 classDate.getFullYear() === today.getFullYear();
        }).length,
        totalHours: classes.length,
        activeStudents: uniqueStudents.size,
        rating: 4.8,
        todayClasses,
        recentStudents
      };
    } finally {
      await tx.done;
    }
  },

  async getAdminStats() {
    const db = getDB();
    const tx = db.transaction(['users', 'classes'], 'readonly');
    try {
      const usersStore = tx.objectStore('users');
      const classesStore = tx.objectStore('classes');
      
      const [users, classes] = await Promise.all([
        usersStore.getAll(),
        classesStore.getAll()
      ]);
      
      const now = new Date();
      const monthlyClasses = classes.filter(c => {
        const classDate = new Date(c.date);
        return classDate.getMonth() === now.getMonth() && 
               classDate.getFullYear() === now.getFullYear();
      });

      return {
        activeUsers: users.length,
        monthlyClasses: monthlyClasses.length,
        retentionRate: 95,
        monthlyRevenue: classes
          .filter(c => c.payment_status === 'paid')
          .reduce((sum, c) => sum + (c.price || 0), 0),
        recentUsers: users
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map(({ password, ...user }) => user),
        recentClasses: classes
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
      };
    } finally {
      await tx.done;
    }
  }
};