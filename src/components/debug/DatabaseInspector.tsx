import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Users, Calendar, RefreshCcw } from "lucide-react";
import { usersDb, classesDb } from "../../lib/db";
import type { User, Class } from "../../lib/db/types";

export default function DatabaseInspector() {
  const [users, setUsers] = useState<Omit<User, "password">[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "classes">("users");

  const loadData = async () => {
    setLoading(true);
    try {
      const [loadedUsers, loadedClasses] = await Promise.all([
        usersDb.getAllUsers(),
        classesDb.getAllClasses(),
      ]);
      setUsers(loadedUsers);
      setClasses(loadedClasses);
    } catch (error) {
      console.error("Error loading database data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-6 
        border border-purple-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Database className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">
              Database Inspector
            </h2>
          </div>
          <button
            onClick={loadData}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 
            rounded-lg text-purple-400 hover:bg-purple-500/30 transition"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              activeTab === "users"
                ? "bg-purple-500/30 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users ({users.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("classes")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              activeTab === "classes"
                ? "bg-purple-500/30 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Classes ({classes.length})</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === "users" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="py-3 px-4 text-purple-400">ID</th>
                    <th className="py-3 px-4 text-purple-400">Name</th>
                    <th className="py-3 px-4 text-purple-400">Email</th>
                    <th className="py-3 px-4 text-purple-400">Role</th>
                    <th className="py-3 px-4 text-purple-400">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-purple-500/10">
                      <td className="py-3 px-4 text-gray-300">{user.id}</td>
                      <td className="py-3 px-4 text-gray-300">{user.name}</td>
                      <td className="py-3 px-4 text-gray-300">{user.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.role === "admin"
                              ? "bg-purple-500/20 text-purple-400"
                              : user.role === "teacher"
                              ? "bg-pink-500/20 text-pink-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {new Date(user.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="py-3 px-4 text-purple-400">ID</th>
                    <th className="py-3 px-4 text-purple-400">Student</th>
                    <th className="py-3 px-4 text-purple-400">Teacher</th>
                    <th className="py-3 px-4 text-purple-400">Date</th>
                    <th className="py-3 px-4 text-purple-400">Time</th>
                    <th className="py-3 px-4 text-purple-400">Status</th>
                    <th className="py-3 px-4 text-purple-400">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((classItem) => (
                    <tr
                      key={classItem.id}
                      className="border-b border-purple-500/10"
                    >
                      <td className="py-3 px-4 text-gray-300">
                        {classItem.id}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {classItem.student_name}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {classItem.teacher_name}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {classItem.date}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {classItem.time}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            classItem.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : classItem.status === "cancelled"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {classItem.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            classItem.is_paid
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {classItem.is_paid ? "Paid" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
