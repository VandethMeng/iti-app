// Admin Teachers Management

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import type { Teacher } from "@/lib/types";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    filterTeachers();
  }, [teachers, searchQuery]);

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const data = await api.getActiveTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
      alert("Failed to load teachers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterTeachers = () => {
    let filtered = [...teachers];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (teacher) =>
          teacher.user?.firstName?.toLowerCase().includes(query) ||
          teacher.user?.lastName?.toLowerCase().includes(query) ||
          teacher.user?.email?.toLowerCase().includes(query) ||
          teacher.employeeId.toLowerCase().includes(query),
      );
    }

    setFilteredTeachers(filtered);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Teacher Management
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage all teaching staff
          </p>
        </div>
        <button
          onClick={fetchTeachers}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {teachers.length}
          </div>
          <div className="text-gray-600">Total Teachers</div>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-800">
            {teachers.length}
          </div>
          <div className="text-green-700">Active Teachers</div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-800">
            {new Set(teachers.map((t) => t.department)).size}
          </div>
          <div className="text-blue-700">Departments</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Teachers
          </label>
          <input
            type="text"
            placeholder="Search by name, email, or teacher ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No teachers found matching your search.
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold">
                            {teacher.user?.firstName?.[0] || ""}
                            {teacher.user?.lastName?.[0] || ""}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {teacher.user?.firstName} {teacher.user?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {teacher.specialization || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {teacher.employeeId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {teacher.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {teacher.user?.phoneNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Showing results */}
      <div className="text-sm text-gray-600 text-center">
        Showing {filteredTeachers.length} of {teachers.length} teachers
      </div>
    </div>
  );
}
