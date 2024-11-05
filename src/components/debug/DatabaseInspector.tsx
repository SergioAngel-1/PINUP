import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Users,
  Calendar,
  RefreshCcw,
  Search,
  Filter,
} from "lucide-react";
import { usersDb, classesDb } from "../../lib/db";
import type { User, Class } from "../../lib/db/types";
import DataTable from "./DataTable";
import FilterPanel from "./FilterPanel";
import SearchBar from "./SearchBar";

export default function DatabaseInspector() {
  const [users, setUsers] = useState<Omit<User, "password">[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "classes">("users");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    dateRange: "all",
  });

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

  const filteredData = React.useMemo(() => {
    const data = activeTab === "users" ? users : classes;
    return data.filter((item) => {
      const searchMatch =
        searchTerm === "" ||
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (!searchMatch) return false;

      if (activeTab === "users" && filters.role !== "all") {
        if ((item as any).role !== filters.role) return false;
      }

      if (activeTab === "classes" && filters.status !== "all") {
        if ((item as any).status !== filters.status) return false;
      }

      return true;
    });
  }, [activeTab, users, classes, searchTerm, filters]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-purple-900/20 to-black/40 rounded-xl p-4 md:p-6 
        border border-purple-500/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <Database className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">
              Database Inspector
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 
              rounded-lg text-purple-400 hover:bg-purple-500/30 transition"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
            <button
              onClick={loadData}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 
              rounded-lg text-purple-400 hover:bg-purple-500/30 transition"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition 
                ${
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition 
                ${
                  activeTab === "classes"
                    ? "bg-purple-500/30 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Classes ({classes.length})</span>
              </button>
            </div>

            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={`Buscar ${
                activeTab === "users" ? "usuarios" : "clases"
              }...`}
            />
          </div>

          {showFilters && (
            <FilterPanel
              activeTab={activeTab}
              filters={filters}
              onChange={setFilters}
            />
          )}

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <DataTable data={filteredData} type={activeTab} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
