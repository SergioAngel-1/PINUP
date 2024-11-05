import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "../components/AuthContext";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import TeacherDashboard from "../components/dashboard/TeacherDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import ProfileSettings from "../components/dashboard/ProfileSettings";
import UserManagement from "../components/dashboard/admin/UserManagement";
import Classes from "../components/Classes";
import DatabaseInspector from "../components/debug/DatabaseInspector";

export default function Dashboard() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={
            user.role === "admin" ? (
              <AdminDashboard />
            ) : user.role === "teacher" ? (
              <TeacherDashboard />
            ) : (
              <StudentDashboard />
            )
          }
        />
        <Route path="/classes" element={<Classes />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/settings" element={<ProfileSettings />} />
        <Route path="/debug/database" element={<DatabaseInspector />} />
      </Routes>
    </DashboardLayout>
  );
}
