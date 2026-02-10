// Student Courses Page

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { authUtils } from "@/lib/auth";
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
import Button from "@/components/ui/Button";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import { getGradeColor, formatDate } from "@/lib/utils";
import type { Enrollment } from "@/lib/types";

export default function StudentCoursesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const user = authUtils.getUser();
        if (!user) return;

        const students = await api.getActiveStudents();
        const student = students.find((s) => s.userId === user.id);

        if (student) {
          const data = await api.getStudentEnrollments(student.id);
          setEnrollments(data);
        }
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const activeEnrollments = enrollments.filter((e) => e.status === "ENROLLED");
  const completedEnrollments = enrollments.filter(
    (e) => e.status === "COMPLETED",
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">View all your enrolled courses</p>
        </div>
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/student/enrollment")}
        >
          Enroll in New Courses
        </Button>
      </div>

      {/* Active Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Active Courses ({activeEnrollments.length})</CardTitle>
          <CardDescription>Currently enrolled courses</CardDescription>
        </CardHeader>
        <CardBody className="p-0">
          {activeEnrollments.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Course Info</TableHeader>
                  <TableHeader>Teacher</TableHeader>
                  <TableHeader>Credits</TableHeader>
                  <TableHeader>Schedule</TableHeader>
                  <TableHeader>Enrolled Date</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {enrollment.course?.courseName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {enrollment.course?.courseCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {enrollment.course?.teacher?.user?.firstName}{" "}
                      {enrollment.course?.teacher?.user?.lastName}
                    </TableCell>
                    <TableCell>{enrollment.course?.credits}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {enrollment.course?.schedule || "TBA"}
                    </TableCell>
                    <TableCell>
                      {formatDate(enrollment.enrollmentDate)}
                    </TableCell>
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
              No active courses. Enroll in courses to get started.
            </div>
          )}
        </CardBody>
      </Card>

      {/* Completed Courses */}
      {completedEnrollments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Completed Courses ({completedEnrollments.length})
            </CardTitle>
            <CardDescription>
              Courses you&apos;ve successfully completed
            </CardDescription>
          </CardHeader>
          <CardBody className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Course</TableHeader>
                  <TableHeader>Credits</TableHeader>
                  <TableHeader>Final Grade</TableHeader>
                  <TableHeader>Grade Point</TableHeader>
                  <TableHeader>Final Score</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {enrollment.course?.courseName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {enrollment.course?.courseCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{enrollment.course?.credits}</TableCell>
                    <TableCell>
                      <span className={getGradeColor(enrollment.grade || "")}>
                        {enrollment.grade || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {enrollment.gradePoint?.toFixed(2) || "N/A"}
                    </TableCell>
                    <TableCell>{enrollment.finalScore || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
