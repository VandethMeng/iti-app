// Admin User Management

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import type { User, UserRole } from "@/lib/types";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, selectedRole, selectedStatus, searchQuery]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAllUsers();
      console.log("Fetched users from database:", data.length);
      console.log("Pending users:", data.filter((u) => !u.enabled).length);
      console.log("Active users:", data.filter((u) => u.enabled).length);
      console.log("Role breakdown:", {
        STUDENT: data.filter((u) => u.role === "STUDENT").length,
        TEACHER: data.filter((u) => u.role === "TEACHER").length,
        ADMIN: data.filter((u) => u.role === "ADMIN").length,
        ENROLLMENT_OFFICE: data.filter((u) => u.role === "ENROLLMENT_OFFICE")
          .length,
      });
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("Failed to load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filter by role
    if (selectedRole !== "ALL") {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    // Filter by status
    if (selectedStatus === "PENDING") {
      filtered = filtered.filter((user) => !user.enabled);
    } else if (selectedStatus === "ACTIVE") {
      filtered = filtered.filter((user) => user.enabled);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      );
    }

    setFilteredUsers(filtered);
  };

  const handleApprove = async (userId: string) => {
    if (!confirm("Are you sure you want to approve this user?")) return;

    try {
      await api.approveUser(userId);
      alert("User approved successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Failed to approve user:", error);
      alert("Failed to approve user. Please try again.");
    }
  };

  const handleReject = async (userId: string) => {
    if (!confirm("Are you sure you want to reject and delete this user?"))
      return;

    try {
      await api.rejectUser(userId);
      alert("User rejected and deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Failed to reject user:", error);
      alert("Failed to reject user. Please try again.");
    }
  };

  const handleToggleStatus = async (user: User) => {
    const action = user.enabled ? "disable" : "enable";
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      if (user.enabled) {
        await api.disableUser(user.id);
      } else {
        await api.enableUser(user.id);
      }
      alert(`User ${action}d successfully!`);
      fetchUsers();
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
      alert(`Failed to ${action} user. Please try again.`);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "STUDENT":
        return "bg-blue-100 text-blue-800";
      case "TEACHER":
        return "bg-green-100 text-green-800";
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "ENROLLMENT_OFFICE":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const pendingCount = users.filter((u) => !u.enabled).length;
  const activeCount = users.filter((u) => u.enabled).length;
  const studentCount = users.filter((u) => u.role === "STUDENT").length;
  const teacherCount = users.filter((u) => u.role === "TEACHER").length;
  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const enrollmentCount = users.filter(
    (u) => u.role === "ENROLLMENT_OFFICE",
  ).length;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts and approvals
          </p>
        </div>
        <button
          onClick={fetchUsers}
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">{users.length}</div>
          <div className="text-gray-600">Total Users</div>
          <div className="text-xs text-gray-500 mt-1">
            All users in database
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-yellow-800">
            {pendingCount}
          </div>
          <div className="text-yellow-700">Pending Approval</div>
          <div className="text-xs text-yellow-600 mt-1">
            Awaiting activation
          </div>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-800">{activeCount}</div>
          <div className="text-green-700">Active Users</div>
          <div className="text-xs text-green-600 mt-1">Enabled accounts</div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-800">{studentCount}</div>
          <div className="text-blue-700">Students</div>
          <div className="text-xs text-blue-600 mt-1">All student accounts</div>
        </div>
      </div>

      {/* Role Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Users by Role
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-800">
              {studentCount}
            </div>
            <div className="text-sm text-blue-600">Students</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-800">
              {teacherCount}
            </div>
            <div className="text-sm text-green-600">Teachers</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-800">
              {adminCount}
            </div>
            <div className="text-sm text-purple-600">Admins</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-800">
              {enrollmentCount}
            </div>
            <div className="text-sm text-orange-600">Enrollment Office</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          Total: {studentCount + teacherCount + adminCount + enrollmentCount}{" "}
          users (Pending: {pendingCount}, Active: {activeCount})
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Roles</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
              <option value="ENROLLMENT_OFFICE">Enrollment Office</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending Approval</option>
              <option value="ACTIVE">Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
        <svg
          className="w-5 h-5 text-blue-600 mr-3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="text-sm text-blue-800">
          <strong>Note:</strong> Students are auto-approved upon registration.
          Other roles (Teacher, Admin, Enrollment Office) require manual
          approval.
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.enabled ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {!user.enabled ? (
                          <>
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="text-green-600 hover:text-green-900 flex items-center gap-1 px-3 py-1 border border-green-600 rounded hover:bg-green-50 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
                              className="text-red-600 hover:text-red-900 flex items-center gap-1 px-3 py-1 border border-red-600 rounded hover:bg-red-50 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className={`flex items-center gap-1 px-3 py-1 border rounded transition-colors ${
                              user.enabled
                                ? "text-orange-600 border-orange-600 hover:bg-orange-50"
                                : "text-green-600 border-green-600 hover:bg-green-50"
                            }`}
                          >
                            {user.enabled ? "Disable" : "Enable"}
                          </button>
                        )}
                      </div>
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
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
}
