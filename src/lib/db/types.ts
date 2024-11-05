export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  phone?: string;
  birthDate?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id?: number;
  student_id: number;
  teacher_id: number;
  student_name?: string;
  teacher_name?: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid';
  price: number;
  is_paid: boolean;
  created_at: string;
  updated_at: string;
}