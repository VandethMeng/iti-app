// Admin Payments Management

"use client";

import { useEffect, useState } from "react";
import { LoadingPage } from "@/components/ui/LoadingSpinner";

interface Payment {
  id: number;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: string;
  semester: string;
  type: string;
}

export default function AdminPaymentsPage() {
  const [payments] = useState<Payment[]>([
    {
      id: 1,
      studentId: "STU001",
      studentName: "John Doe",
      amount: 5000,
      paymentDate: "2024-01-15",
      paymentMethod: "Credit Card",
      status: "Completed",
      semester: "Spring 2024",
      type: "Tuition",
    },
    {
      id: 2,
      studentId: "STU002",
      studentName: "Jane Smith",
      amount: 5000,
      paymentDate: "2024-01-16",
      paymentMethod: "Bank Transfer",
      status: "Completed",
      semester: "Spring 2024",
      type: "Tuition",
    },
    {
      id: 3,
      studentId: "STU003",
      studentName: "Mike Johnson",
      amount: 500,
      paymentDate: "2024-01-17",
      paymentMethod: "Cash",
      status: "Pending",
      semester: "Spring 2024",
      type: "Lab Fee",
    },
  ]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");

  useEffect(() => {
    setFilteredPayments(payments);
  }, [payments]);

  useEffect(() => {
    filterPayments();
  }, [payments, searchQuery, selectedStatus, selectedType]);

  const filterPayments = () => {
    let filtered = [...payments];

    // Filter by status
    if (selectedStatus !== "ALL") {
      filtered = filtered.filter(
        (payment) => payment.status === selectedStatus,
      );
    }

    // Filter by type
    if (selectedType !== "ALL") {
      filtered = filtered.filter((payment) => payment.type === selectedType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (payment) =>
          payment.studentName.toLowerCase().includes(query) ||
          payment.studentId.toLowerCase().includes(query),
      );
    }

    setFilteredPayments(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTotalRevenue = () => {
    return filteredPayments
      .filter((p) => p.status === "Completed")
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const getPendingAmount = () => {
    return filteredPayments
      .filter((p) => p.status === "Pending")
      .reduce((sum, p) => sum + p.amount, 0);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Payment Management
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage student payments
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
          Add Payment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            ${getTotalRevenue().toLocaleString()}
          </div>
          <div className="text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-800">
            {filteredPayments.filter((p) => p.status === "Completed").length}
          </div>
          <div className="text-green-700">Completed Payments</div>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-yellow-800">
            ${getPendingAmount().toLocaleString()}
          </div>
          <div className="text-yellow-700">Pending Amount</div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-800">
            {filteredPayments.length}
          </div>
          <div className="text-blue-700">Total Transactions</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Payments
            </label>
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              <option value="ALL">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Types</option>
              <option value="Tuition">Tuition</option>
              <option value="Lab Fee">Lab Fee</option>
              <option value="Library Fee">Library Fee</option>
              <option value="Sports Fee">Sports Fee</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
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
              {filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No payments found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.studentName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.studentId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {payment.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${payment.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        Receipt
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
        Showing {filteredPayments.length} of {payments.length} payments
      </div>
    </div>
  );
}
