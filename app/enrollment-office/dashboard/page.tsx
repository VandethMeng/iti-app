// Enrollment Office Dashboard

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import StatsCard from "@/components/ui/StatsCard";
import { Card, CardHeader, CardBody, CardTitle } from "@/components/ui/Card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import { formatDate } from "@/lib/utils";
import type { Student } from "@/lib/types";

export default function EnrollmentOfficeDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsData = await api.getActiveStudents();
        setStudents(studentsData.slice(0, 10)); // Show recent 10
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const levelStats = students.reduce(
    (acc, student) => {
      acc[student.level] = (acc[student.level] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Enrollment Office Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage student enrollments and documentation
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(levelStats).map(([level, count]) => (
          <StatsCard
            key={level}
            title={level}
            value={count}
            icon={
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
        ))}
      </div>

      {/* Recent Students */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Students</CardTitle>
            <Button variant="primary" size="sm">
              Add New Student
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {students.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Student ID</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Level</TableHeader>
                  <TableHeader>Department</TableHeader>
                  <TableHeader>GPA</TableHeader>
                  <TableHeader>Enrollment Date</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.studentId}
                    </TableCell>
                    <TableCell>
                      {student.user?.firstName} {student.user?.lastName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="info">{student.level}</Badge>
                    </TableCell>
                    <TableCell>
                      {student.department.replace("_", " ")}
                    </TableCell>
                    <TableCell>{student.gpa?.toFixed(2) || "N/A"}</TableCell>
                    <TableCell>{formatDate(student.enrollmentDate)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No students found
            </div>
          )}
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Add New Student
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Register a new student in the system
            </p>
            <Button variant="primary" className="w-full">
              Add Student
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Verify Documents
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Review and verify student documents
            </p>
            <Button variant="primary" className="w-full">
              View Documents
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-purple-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Enrollments
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Process course enrollments
            </p>
            <Button variant="primary" className="w-full">
              View Enrollments
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
