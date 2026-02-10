// Teacher Dashboard

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { authUtils } from "@/lib/auth";
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
import Button from "@/components/ui/Button";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import type { Teacher, Course } from "@/lib/types";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authUtils.getUser();
        if (!user) return;

        const teachers = await api.getActiveTeachers();
        const currentTeacher = teachers.find((t) => t.userId === user.id);

        if (currentTeacher) {
          setTeacher(currentTeacher);
          const teacherCourses = await api.getCoursesByTeacher(
            currentTeacher.id,
          );
          setCourses(teacherCourses);
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

  if (!teacher) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Teacher Profile Not Found
        </h2>
        <p className="text-gray-600">
          Please contact administration to set up your teacher profile.
        </p>
      </div>
    );
  }

  const activeCourses = courses.filter((c) => c.active).length;
  const totalStudents = 0; // Would need to aggregate enrollments

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your courses and students</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Active Courses"
          value={activeCourses}
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
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        <StatsCard
          title="Total Students"
          value={totalStudents}
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
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Department"
          value={teacher.department.replace("_", " ")}
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
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
      </div>

      {/* Courses List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Courses</CardTitle>
            <Button variant="primary" size="sm">
              Create New Course
            </Button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {courses.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Course Code</TableHeader>
                  <TableHeader>Course Name</TableHeader>
                  <TableHeader>Credits</TableHeader>
                  <TableHeader>Level</TableHeader>
                  <TableHeader>Capacity</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      {course.courseCode}
                    </TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.capacity}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No courses assigned
            </div>
          )}
        </CardBody>
      </Card>

      {/* Teacher Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardBody>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
              <dd className="text-sm text-gray-900">{teacher.employeeId}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Department</dt>
              <dd className="text-sm text-gray-900">{teacher.department}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Specialization
              </dt>
              <dd className="text-sm text-gray-900">
                {teacher.specialization}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="text-sm text-gray-900">
                {teacher.active ? "Active" : "Inactive"}
              </dd>
            </div>
          </dl>
        </CardBody>
      </Card>
    </div>
  );
}
