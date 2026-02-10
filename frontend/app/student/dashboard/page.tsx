// Student Dashboard

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { authUtils } from "@/lib/auth";
import StatsCard from "@/components/ui/StatsCard";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import { formatDate, formatGPA, getStatusColor } from "@/lib/utils";
import type { Student, Enrollment } from "@/lib/types";

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authUtils.getUser();
        if (!user) return;

        // Fetch student profile
        const students = await api.getActiveStudents();
        const currentStudent = students.find((s) => s.userId === user.id);

        if (currentStudent) {
          setStudent(currentStudent);

          // Fetch active enrollments
          const studentEnrollments = await api.getStudentActiveEnrollments(
            currentStudent.id,
          );
          setEnrollments(studentEnrollments);
        }
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

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Student Profile Not Found
        </h2>
        <p className="text-gray-600">
          Please contact administration to set up your student profile.
        </p>
      </div>
    );
  }

  const activeCoursesCount = enrollments.filter(
    (e) => e.status === "ENROLLED",
  ).length;
  const completedCoursesCount = enrollments.filter(
    (e) => e.status === "COMPLETED",
  ).length;
  const totalCredits = enrollments.reduce(
    (sum, e) => sum + (e.course?.credits || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here&apos;s your academic overview.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Current GPA"
          value={formatGPA(student.gpa)}
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
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Active Courses"
          value={activeCoursesCount}
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        <StatsCard
          title="Completed"
          value={completedCoursesCount}
          icon={
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
        <StatsCard
          title="Total Credits"
          value={totalCredits}
          icon={
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Current Enrollments */}
      <Card>
        <CardHeader>
          <CardTitle>Current Enrollments</CardTitle>
          <CardDescription>Your active courses this semester</CardDescription>
        </CardHeader>
        <CardBody className="p-0">
          {enrollments.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Course Code</TableHeader>
                  <TableHeader>Course Name</TableHeader>
                  <TableHeader>Credits</TableHeader>
                  <TableHeader>Teacher</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Grade</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {enrollment.course?.courseCode}
                    </TableCell>
                    <TableCell>{enrollment.course?.courseName}</TableCell>
                    <TableCell>{enrollment.course?.credits}</TableCell>
                    <TableCell>
                      {enrollment.course?.teacher?.user?.firstName}{" "}
                      {enrollment.course?.teacher?.user?.lastName}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(enrollment.status)}>
                        {enrollment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{enrollment.grade || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No active enrollments found
            </div>
          )}
        </CardBody>
      </Card>

      {/* Student Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardBody>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Student ID
                </dt>
                <dd className="text-sm text-gray-900">{student.studentId}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Level</dt>
                <dd className="text-sm text-gray-900">{student.level}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Department
                </dt>
                <dd className="text-sm text-gray-900">{student.department}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Enrollment Date
                </dt>
                <dd className="text-sm text-gray-900">
                  {formatDate(student.enrollmentDate)}
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <a
                href="/student/enrollment"
                className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                <div className="font-medium text-blue-900">
                  Enroll in Courses
                </div>
                <div className="text-sm text-blue-700">
                  Browse and register for courses
                </div>
              </a>
              <a
                href="/student/gpa"
                className="block p-3 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
              >
                <div className="font-medium text-green-900">View Grades</div>
                <div className="text-sm text-green-700">
                  Check your academic performance
                </div>
              </a>
              <a
                href="/student/payments"
                className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
              >
                <div className="font-medium text-purple-900">
                  Payment History
                </div>
                <div className="text-sm text-purple-700">
                  View and manage payments
                </div>
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
