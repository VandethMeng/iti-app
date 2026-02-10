// Admin Dashboard

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import StatsCard from "@/components/ui/StatsCard";
import { Card, CardHeader, CardBody, CardTitle } from "@/components/ui/Card";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import type { Student, Teacher, User } from "@/lib/types";
import Link from "next/link";

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  const fetchData = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
        setError(null);
      } else {
        setIsLoading(true);
      }

      console.log("=== FETCHING ADMIN DASHBOARD DATA ===");
      console.log("API Base URL:", "http://localhost:8080/api");

      // Check if user is authenticated
      const token = localStorage.getItem("accessToken");
      console.log("Access Token exists:", !!token);
      if (token) {
        console.log("Token preview:", token.substring(0, 20) + "...");
      } else {
        console.error("⚠️ NO ACCESS TOKEN FOUND! User may not be logged in.");
      }

      console.log("Attempting to fetch dashboard data...");

      // Fetch all users first with detailed error handling
      console.log("📡 Making request to: http://localhost:8080/api/users");
      let allUsersData: User[];
      try {
        allUsersData = await api.getAllUsers();
        console.log(
          "✅ SUCCESS! Fetched",
          allUsersData.length,
          "users from /api/users",
        );
        console.log("📋 First user sample:", allUsersData[0]);
      } catch (userError: any) {
        console.error("❌ FAILED to fetch users from /api/users");
        console.error("Error:", userError);
        throw new Error(
          `Failed to fetch users: ${userError.message || userError}`,
        );
      }

      // Try to fetch students and teachers from dedicated endpoints, fallback to filtering users
      let studentsData: Student[] = [];
      let teachersData: Teacher[] = [];

      try {
        studentsData = await api.getActiveStudents();
        console.log(
          "✅ Fetched",
          studentsData.length,
          "students from /api/students/active",
        );
      } catch (error: any) {
        console.warn(
          "⚠️ /api/students/active endpoint not available or returned error:",
          error.message,
        );
        console.log("💡 Will use users with STUDENT role as fallback");
        // Fallback: treat users with STUDENT role as students
        const studentUsers = allUsersData.filter(
          (u) => u.role === "STUDENT" && u.enabled,
        );
        studentsData = studentUsers.map(
          (u) =>
            ({
              ...u,
              studentId: u.id || u.email,
              userId: u.id || u.email,
            }) as any,
        );
      }

      try {
        teachersData = await api.getActiveTeachers();
        console.log(
          "✅ Fetched",
          teachersData.length,
          "teachers from /api/teachers/active",
        );
      } catch (error: any) {
        console.warn(
          "⚠️ /api/teachers/active endpoint not available or returned error:",
          error.message,
        );
        console.log("💡 Will use users with TEACHER role as fallback");
        // Fallback: treat users with TEACHER role as teachers
        const teacherUsers = allUsersData.filter(
          (u) => u.role === "TEACHER" && u.enabled,
        );
        teachersData = teacherUsers.map(
          (u) =>
            ({
              ...u,
              teacherId: u.id || u.email,
              userId: u.id || u.email,
            }) as any,
        );
      }

      console.log("=== ADMIN DASHBOARD DATA LOADED ===");
      console.log("✅ API Response - All Users:", allUsersData.length, "users");
      console.log(
        "✅ API Response - Active Students:",
        studentsData.length,
        "students",
      );
      console.log(
        "✅ API Response - Active Teachers:",
        teachersData.length,
        "teachers",
      );

      console.log("\n📊 DETAILED DATA:");
      console.log("All users from /admin/users:", allUsersData);
      console.log("Students from /students/active:", studentsData);
      console.log("Teachers from /teachers/active:", teachersData);

      console.log("\n👥 User Breakdown:");
      console.log(
        "- Pending Users:",
        allUsersData.filter((u) => !u.enabled).length,
      );
      console.log(
        "- Active Users:",
        allUsersData.filter((u) => u.enabled).length,
      );

      console.log("\n🎭 Role Distribution in Users Collection:");
      console.log(
        "- STUDENT role:",
        allUsersData.filter((u) => u.role === "STUDENT").length,
      );
      console.log(
        "- TEACHER role:",
        allUsersData.filter((u) => u.role === "TEACHER").length,
      );
      console.log(
        "- ADMIN role:",
        allUsersData.filter((u) => u.role === "ADMIN").length,
      );
      console.log(
        "- ENROLLMENT_OFFICE role:",
        allUsersData.filter((u) => u.role === "ENROLLMENT_OFFICE").length,
      );

      console.log("\n⚠️ DATA INTEGRITY CHECK:");
      console.log("NOTE: Users collection has", allUsersData.length, "users");
      console.log(
        "NOTE: Students collection has",
        studentsData.length,
        "students",
      );
      console.log(
        "NOTE: Teachers collection has",
        teachersData.length,
        "teachers",
      );
      console.log("\nIf students/teachers count is 0, check:");
      console.log("1. Student/Teacher documents exist in MongoDB");
      console.log(
        "2. Student.userId / Teacher.userId reference actual User IDs",
      );
      console.log("3. Backend endpoints return proper data");
      console.log("===================================\n");

      setStudents(studentsData);
      setTeachers(teachersData);
      setAllUsers(allUsersData);
      setLastUpdate(new Date());
      setError(null);
      setBackendStatus("online");

      if (isManualRefresh) {
        alert(
          `Dashboard refreshed successfully! ${allUsersData.length} users loaded.`,
        );
      }
    } catch (error: any) {
      console.error("=== ERROR FETCHING DASHBOARD DATA ===");
      console.error("📍 Error occurred at:", new Date().toISOString());
      console.error("🔍 Error object:", error);
      console.error("📝 Error message:", error.message);
      console.error("🔢 Error status:", error.status);
      console.error("📚 Error stack:", error.stack);

      // Log full error details for debugging
      console.error("🔎 Full error details:", JSON.stringify(error, null, 2));

      // Check if token expired or invalid
      if (error.status === 401 || error.status === 403) {
        console.error(
          "⚠️ AUTHENTICATION ERROR - Token may be expired or invalid",
        );
        console.error("   Please try logging in again");
      }

      // Check for network/CORS errors
      if (error.status === 0 || !error.status) {
        console.error("⚠️ NETWORK ERROR - Cannot reach backend");
        console.error("   Ensure backend is running: http://localhost:8080");
        console.error("   Check CORS configuration in backend");
      }

      console.error("=====================================\n");

      let errorMsg = "An unexpected error occurred";

      if (error.status === 401 || error.status === 403) {
        errorMsg = "Authentication failed. Please log in again.";
        setBackendStatus("online"); // Backend is responding
        // Redirect to login after 2 seconds
        setTimeout(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }, 2000);
      } else if (
        error.status === 0 ||
        !error.status ||
        error.message?.includes("fetch")
      ) {
        errorMsg = "Cannot connect to backend server";
        setBackendStatus("offline");
      } else if (error.status >= 500) {
        errorMsg = `Backend server error (${error.status}): ${error.message || "Internal server error"}`;
        setBackendStatus("online"); // Backend is responding but has an error
      } else {
        errorMsg = error.message || "Failed to fetch data";
        setBackendStatus("online");
      }

      setError(errorMsg);

      if (isManualRefresh) {
        alert(
          `Error: ${errorMsg}\n\nCheck browser console (F12) for detailed error information.`,
        );
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(false);
  }, []);

  const handleRefresh = () => {
    fetchData(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  // Calculate statistics
  const pendingUsers = allUsers.filter((u) => !u.enabled);
  const activeUsers = allUsers.filter((u) => u.enabled);
  const totalStudents = allUsers.filter((u) => u.role === "STUDENT").length;
  const totalTeachers = allUsers.filter((u) => u.role === "TEACHER").length;
  const totalAdmins = allUsers.filter((u) => u.role === "ADMIN").length;
  const totalEnrollment = allUsers.filter(
    (u) => u.role === "ENROLLMENT_OFFICE",
  ).length;

  // Calculate department distribution (only active students)
  const departmentStats = students.reduce(
    (acc, student) => {
      if (student.department) {
        acc[student.department] = (acc[student.department] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and management</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              isRefreshing
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <svg
              className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </button>
          <div
            className={`border-2 rounded-lg px-4 py-2 ${
              error
                ? "bg-red-100 border-red-300"
                : backendStatus === "offline"
                  ? "bg-yellow-100 border-yellow-300"
                  : "bg-blue-100 border-blue-300"
            }`}
          >
            <div
              className={`text-xs font-medium ${error ? "text-red-700" : backendStatus === "offline" ? "text-yellow-700" : "text-blue-700"}`}
            >
              {error
                ? "Error"
                : backendStatus === "checking"
                  ? "Checking..."
                  : backendStatus === "offline"
                    ? "Backend Offline"
                    : "Database Status"}
            </div>
            <div
              className={`text-lg font-bold ${error ? "text-red-900" : backendStatus === "offline" ? "text-yellow-900" : "text-blue-900"}`}
            >
              {backendStatus === "offline"
                ? "Server Down"
                : error
                  ? "Failed to Load"
                  : `${allUsers.length} Total Users`}
            </div>
            <div
              className={`text-xs ${error ? "text-red-600" : backendStatus === "offline" ? "text-yellow-600" : "text-blue-600"}`}
            >
              {backendStatus === "offline"
                ? "Backend not responding"
                : `Last updated: ${lastUpdate.toLocaleTimeString()}`}
            </div>
          </div>
        </div>
      </div>

      {/* Backend Offline Warning */}
      {backendStatus === "offline" && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg shadow">
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-yellow-500 mt-0.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Backend Server Not Responding
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>The backend server is not running or not accessible.</p>
                <p className="mt-3 font-medium">To start the backend server:</p>
                <ol className="list-decimal ml-5 mt-2 space-y-1">
                  <li>Open a terminal in your backend project directory</li>
                  <li>
                    Run one of these commands:
                    <div className="bg-yellow-100 p-2 rounded mt-1 font-mono text-xs">
                      ./mvnw spring-boot:run
                      <br />
                      OR
                      <br />
                      mvn spring-boot:run
                    </div>
                  </li>
                  <li>Wait for "Started Application" message</li>
                  <li>Click "Refresh Data" button above</li>
                </ol>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleRefresh}
                  className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
                >
                  Check Connection Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow">
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-red-500 mt-0.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Failed to Load Dashboard Data
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <p className="mt-2">
                  Please check:
                  <br />• Backend server is running on http://localhost:8080
                  <br />• You are logged in with admin credentials
                  <br />• Network connection is stable
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleRefresh}
                  className="text-sm font-medium text-red-800 hover:text-red-900 underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending User Approvals Alert */}
      {pendingUsers.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-yellow-800">
                Pending User Approvals
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You have <strong>{pendingUsers.length}</strong> user
                  {pendingUsers.length !== 1 ? "s" : ""} waiting for approval (
                  {pendingUsers.map((u) => u.role).join(", ")}).
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href="/admin/users"
                  className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
                >
                  Review Pending Users →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Users</p>
              <p className="text-3xl font-bold mt-1">{allUsers.length}</p>
              <p className="text-blue-100 text-xs mt-2">
                All registered in system
              </p>
            </div>
            <svg
              className="w-12 h-12 text-blue-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Users</p>
              <p className="text-3xl font-bold mt-1">{activeUsers.length}</p>
              <p className="text-green-100 text-xs mt-2">Enabled accounts</p>
            </div>
            <svg
              className="w-12 h-12 text-green-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pending Approval</p>
              <p className="text-3xl font-bold mt-1">{pendingUsers.length}</p>
              <p className="text-yellow-100 text-xs mt-2">Awaiting action</p>
            </div>
            <svg
              className="w-12 h-12 text-yellow-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Students</p>
              <p className="text-3xl font-bold mt-1">{totalStudents}</p>
              <p className="text-indigo-100 text-xs mt-2">
                {students.length} active
              </p>
            </div>
            <svg
              className="w-12 h-12 text-indigo-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Teachers</p>
              <p className="text-3xl font-bold mt-1">{totalTeachers}</p>
              <p className="text-purple-100 text-xs mt-2">
                {teachers.length} active
              </p>
            </div>
            <svg
              className="w-12 h-12 text-purple-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
        </div>
      </div>

      {/* User Role Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          User Distribution by Role
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="text-3xl font-bold text-blue-700">
              {totalStudents}
            </div>
            <div className="text-sm text-blue-600 mt-1">Students</div>
            <div className="text-xs text-gray-500 mt-1">
              {students.length} active, {totalStudents - students.length}{" "}
              pending
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700">
              {totalTeachers}
            </div>
            <div className="text-sm text-green-600 mt-1">Teachers</div>
            <div className="text-xs text-gray-500 mt-1">
              {teachers.length} active, {totalTeachers - teachers.length}{" "}
              pending
            </div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <div className="text-3xl font-bold text-purple-700">
              {totalAdmins}
            </div>
            <div className="text-sm text-purple-600 mt-1">Admins</div>
            <div className="text-xs text-gray-500 mt-1">
              {allUsers.filter((u) => u.role === "ADMIN" && u.enabled).length}{" "}
              active
            </div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
            <div className="text-3xl font-bold text-orange-700">
              {totalEnrollment}
            </div>
            <div className="text-sm text-orange-600 mt-1">
              Enrollment Office
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {
                allUsers.filter(
                  (u) => u.role === "ENROLLMENT_OFFICE" && u.enabled,
                ).length
              }{" "}
              active
            </div>
          </div>
        </div>
      </div>

      {/* Department Distribution and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Student Distribution by Department</CardTitle>
          </CardHeader>
          <CardBody>
            {Object.keys(departmentStats).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No active students assigned to departments yet
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(departmentStats)
                  .sort(([, a], [, b]) => b - a)
                  .map(([dept, count]) => {
                    const percentage = (count / students.length) * 100;
                    return (
                      <div
                        key={dept}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {dept.replace("_", " ")}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/students"
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-blue-900">Manage Students</div>
                <div className="text-sm text-blue-700 mt-1">
                  View and edit student records
                </div>
              </a>
              <a
                href="/admin/teachers"
                className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-green-900">
                  Manage Teachers
                </div>
                <div className="text-sm text-green-700 mt-1">
                  View and edit teacher profiles
                </div>
              </a>
              <a
                href="/admin/courses"
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-purple-900">
                  Manage Courses
                </div>
                <div className="text-sm text-purple-700 mt-1">
                  Create and manage courses
                </div>
              </a>
              <a
                href="/admin/reports"
                className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-orange-900">View Reports</div>
                <div className="text-sm text-orange-700 mt-1">
                  Access system reports
                </div>
              </a>
              <a
                href="/admin/users"
                className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors border-2 border-yellow-200"
              >
                <div className="font-medium text-yellow-900 flex items-center gap-2">
                  User Management
                  {pendingUsers.length > 0 && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      {pendingUsers.length}
                    </span>
                  )}
                </div>
                <div className="text-sm text-yellow-700 mt-1">
                  Approve pending users
                </div>
              </a>
              <a
                href="/admin/payments"
                className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-indigo-900">
                  Payment Management
                </div>
                <div className="text-sm text-indigo-700 mt-1">
                  Track student payments
                </div>
              </a>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Pending Users */}
      {pendingUsers.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Pending User Approvals</CardTitle>
              <Link
                href="/admin/users"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View All →
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingUsers.slice(0, 5).map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <Link
                          href="/admin/users"
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pendingUsers.length > 5 && (
              <div className="mt-4 text-center text-sm text-gray-600">
                + {pendingUsers.length - 5} more users waiting for approval
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* System Information and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardBody>
            <dl className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-700">
                  Database Status
                </dt>
                <dd className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-green-600">
                    Connected
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-700">
                  API Status
                </dt>
                <dd className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-green-600">
                    Operational
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-700">
                  Total Departments
                </dt>
                <dd className="text-sm font-semibold text-gray-900">
                  {Object.keys(departmentStats).length} Active
                </dd>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-700">
                  System Health
                </dt>
                <dd className="text-sm font-semibold text-green-600">
                  Excellent
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Summary</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Total Registered Users
                </span>
                <span className="text-lg font-bold text-blue-700">
                  {allUsers.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Active (Enabled)
                </span>
                <span className="text-lg font-bold text-green-700">
                  {activeUsers.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  Pending Approval
                </span>
                <span className="text-lg font-bold text-yellow-700">
                  {pendingUsers.length}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600 text-center">
                  Last updated: {lastUpdate.toLocaleString()}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Debug Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Debug Information</CardTitle>
            <button
              onClick={() => {
                console.log("=== MANUAL DEBUG DUMP ===");
                console.log("All Users Array:", allUsers);
                console.log("Students Array:", students);
                console.log("Teachers Array:", teachers);
                console.log("=======================");
                alert("Debug info logged to console. Press F12 to view.");
              }}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
            >
              Log to Console
            </button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-gray-600 text-xs">Total Users (API)</div>
              <div className="text-xl font-bold text-gray-900">
                {allUsers.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                From getAllUsers()
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-gray-600 text-xs">Active Students</div>
              <div className="text-xl font-bold text-gray-900">
                {students.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                From getActiveStudents()
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-gray-600 text-xs">Active Teachers</div>
              <div className="text-xl font-bold text-gray-900">
                {teachers.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                From getActiveTeachers()
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-gray-600 text-xs">Backend Status</div>
              <div
                className={`text-xl font-bold ${
                  backendStatus === "online"
                    ? "text-green-600"
                    : backendStatus === "offline"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                {backendStatus === "online"
                  ? "🟢 Online"
                  : backendStatus === "offline"
                    ? "🔴 Offline"
                    : "🟡 Checking"}
              </div>
              <div className="text-xs text-gray-500 mt-1">localhost:8080</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-gray-600 text-xs">API Endpoint</div>
              <div className="text-sm font-mono text-gray-900 break-all">
                /admin/users
              </div>
              <div className="text-xs text-gray-500 mt-1">
                localhost:8080/api
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <div className="text-xs text-blue-800 font-medium mb-2">
              Data Status:
            </div>
            <div className="text-xs text-blue-700 space-y-1">
              <div>
                ✓ allUsers array has <strong>{allUsers.length}</strong> items
              </div>
              <div>
                ✓ students array has <strong>{students.length}</strong> items
              </div>
              <div>
                ✓ teachers array has <strong>{teachers.length}</strong> items
              </div>
              <div>
                ✓ Last fetch: <strong>{lastUpdate.toLocaleString()}</strong>
              </div>
              {error && (
                <div className="text-red-700 font-medium">✗ Error: {error}</div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
