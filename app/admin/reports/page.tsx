// Admin Reports & Analytics

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { LoadingPage } from "@/components/ui/LoadingSpinner";

export default function AdminReportsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    departmentStats: [] as { name: string; count: number }[],
    levelStats: [] as { level: string; count: number }[],
  });

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      setIsLoading(true);
      const [students, teachers, courses] = await Promise.all([
        api.getActiveStudents(),
        api.getActiveTeachers(),
        api.getAllCourses(),
      ]);

      // Department stats
      const deptCount: { [key: string]: number } = {};
      students.forEach((student) => {
        if (student.department) {
          deptCount[student.department] =
            (deptCount[student.department] || 0) + 1;
        }
      });
      const departmentStats = Object.entries(deptCount).map(
        ([name, count]) => ({ name, count }),
      );

      // Level stats
      const levelCount: { [key: string]: number } = {};
      students.forEach((student) => {
        if (student.level) {
          levelCount[student.level] = (levelCount[student.level] || 0) + 1;
        }
      });
      const levelStats = Object.entries(levelCount).map(([level, count]) => ({
        level,
        count,
      }));

      setStats({
        totalStudents: students.length,
        totalTeachers: teachers.length,
        totalCourses: courses.length,
        totalEnrollments: 0, // Would need enrollment API
        departmentStats,
        levelStats,
      });
    } catch (error) {
      console.error("Failed to fetch reports data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            View system statistics and reports
          </p>
        </div>
        <button
          onClick={fetchReportsData}
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
          Refresh Data
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold">{stats.totalStudents}</div>
          <div className="mt-1">Total Students</div>
          <div className="mt-2 text-blue-100 text-sm">Enrolled this year</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold">{stats.totalTeachers}</div>
          <div className="mt-1">Total Teachers</div>
          <div className="mt-2 text-green-100 text-sm">Active faculty</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold">{stats.totalCourses}</div>
          <div className="mt-1">Total Courses</div>
          <div className="mt-2 text-purple-100 text-sm">Available courses</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold">{stats.totalEnrollments}</div>
          <div className="mt-1">Enrollments</div>
          <div className="mt-2 text-orange-100 text-sm">
            Course registrations
          </div>
        </div>
      </div>

      {/* Department Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Students by Department
        </h2>
        <div className="space-y-4">
          {stats.departmentStats.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No department data available
            </p>
          ) : (
            stats.departmentStats.map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {dept.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {dept.count} students
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(dept.count / stats.totalStudents) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Level Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Students by Level
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.levelStats.length === 0 ? (
            <div className="col-span-4 text-gray-500 text-center py-8">
              No level data available
            </div>
          ) : (
            stats.levelStats.map((level) => (
              <div
                key={level.level}
                className="bg-gray-50 rounded-lg p-4 text-center"
              >
                <div className="text-2xl font-bold text-gray-900">
                  {level.count}
                </div>
                <div className="text-gray-600">{level.level}</div>
                <div className="mt-2 text-sm text-gray-500">
                  {((level.count / stats.totalStudents) * 100).toFixed(1)}%
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Export Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-50 border-2 border-blue-200 text-blue-700 px-6 py-4 rounded-lg hover:bg-blue-100 transition-colors font-medium">
            📊 Student Report
          </button>
          <button className="bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-lg hover:bg-green-100 transition-colors font-medium">
            👨‍🏫 Teacher Report
          </button>
          <button className="bg-purple-50 border-2 border-purple-200 text-purple-700 px-6 py-4 rounded-lg hover:bg-purple-100 transition-colors font-medium">
            📚 Course Report
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                New student registered
              </div>
              <div className="text-xs text-gray-500">2 hours ago</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                Course enrollment updated
              </div>
              <div className="text-xs text-gray-500">5 hours ago</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                New teacher approved
              </div>
              <div className="text-xs text-gray-500">1 day ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
