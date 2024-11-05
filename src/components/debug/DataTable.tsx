import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { User, Class } from "../../lib/db/types";

interface DataTableProps {
  data: (Omit<User, "password"> | Class)[];
  type: "users" | "classes";
}

export default function DataTable({ data, type }: DataTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No se encontraron resultados
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-lg border border-purple-500/20">
          <table className="min-w-full divide-y divide-purple-500/20">
            <thead className="bg-purple-500/10">
              <tr>
                {type === "users" ? (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Rol
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Registro
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Estudiante
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Profesor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-400">
                      Pago
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-purple-500/5">
                  {type === "users" ? (
                    <>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {(item as User).name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {(item as User).email}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            (item as User).role === "admin"
                              ? "bg-purple-500/20 text-purple-400"
                              : (item as User).role === "teacher"
                              ? "bg-pink-500/20 text-pink-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {(item as User).role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {format(new Date((item as User).created_at), "PPp", {
                          locale: es,
                        })}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {(item as Class).student_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {(item as Class).teacher_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {format(new Date((item as Class).date), "PPp", {
                          locale: es,
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            (item as Class).status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : (item as Class).status === "cancelled"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {(item as Class).status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            (item as Class).is_paid
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {(item as Class).is_paid ? "Pagado" : "Pendiente"}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
