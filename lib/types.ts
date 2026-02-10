// Core Types for School Management System

export type UserRole = "STUDENT" | "TEACHER" | "ENROLLMENT_OFFICE" | "ADMIN";

export type EnrollmentStatus = "ENROLLED" | "DROPPED" | "COMPLETED";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export type PaymentType =
  | "TUITION_FEE"
  | "REGISTRATION_FEE"
  | "EXAM_FEE"
  | "LIBRARY_FEE"
  | "LAB_FEE"
  | "OTHER";

export type DocumentType =
  | "TRANSCRIPT"
  | "CERTIFICATE"
  | "ID_CARD"
  | "RECOMMENDATION_LETTER"
  | "OTHER";

export type StudentLevel = "FRESHMAN" | "SOPHOMORE" | "JUNIOR" | "SENIOR";

export type Department =
  | "COMPUTER_SCIENCE"
  | "ENGINEERING"
  | "BUSINESS"
  | "ARTS"
  | "SCIENCE"
  | "MATHEMATICS";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  enabled: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType?: string;
  user?: User; // Backend only returns accessToken, need to call /auth/me for user data
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  level: StudentLevel;
  department: Department;
  gpa?: number;
  enrollmentDate: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
  user?: User;
}

export interface Teacher {
  id: string;
  userId: string;
  employeeId: string;
  department: Department;
  specialization: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
  user?: User;
}

export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  description: string;
  credits: number;
  department: Department;
  level: StudentLevel;
  semester: string;
  teacherId: string;
  capacity: number;
  schedule?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
  teacher?: Teacher;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: EnrollmentStatus;
  grade?: string;
  gradePoint?: number;
  finalScore?: number;
  createdAt: string;
  updatedAt?: string;
  student?: Student;
  course?: Course;
}

export interface Attendance {
  id: string;
  enrollmentId: string;
  attendanceDate: string;
  status: AttendanceStatus;
  remarks?: string;
  createdAt: string;
  updatedAt?: string;
  enrollment?: Enrollment;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  paymentType: PaymentType;
  paymentDate: string;
  status: PaymentStatus;
  transactionId?: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  student?: Student;
}

export interface Document {
  id: string;
  studentId: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  verified: boolean;
  remarks?: string;
  createdAt: string;
  updatedAt?: string;
  student?: Student;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  user?: User;
}

export interface ApiError {
  status: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

export interface AttendancePercentage {
  totalSessions: number;
  presentSessions: number;
  absentSessions: number;
  lateSessionscount: number;
  excusedSessions: number;
  attendancePercentage: number;
}

export interface TotalPaid {
  totalPaid: number;
}
