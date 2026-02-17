// API Client for School Management System

import type {
  User,
  AuthResponse,
  Student,
  Teacher,
  Course,
  Enrollment,
  Attendance,
  Payment,
  Document,
  Notification,
  AttendancePercentage,
  TotalPaid,
  ApiError,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(),
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `Request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          throw {
            message: errorMessage,
            status: response.status,
            ...errorData,
          } as ApiError;
        } catch (jsonError) {
          // If response is not JSON, use status text
          throw {
            message: response.statusText || errorMessage,
            status: response.status,
          } as ApiError;
        }
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error: any) {
      // Handle network errors or other exceptions

      if (!error.status) {
        // Network error or CORS issue
        throw {
          message:
            error.message ||
            "Network error. Please check your connection or if the backend is running.",
          status: 0,
        } as ApiError;
      }

      throw error;
    }
  }

  // ==================== Authentication ====================

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    role: string;
  }): Promise<User> {
    return this.request<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // Store token temporarily so getMe() can use it
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
    }

    return response;
  }

  async getMe(): Promise<User> {
    const userData = await this.request<any>("/auth/me");
    // Normalize role field - backend might use different field names
    return this.normalizeUserRole(userData);
  }

  // Helper to normalize user role from different backend formats
  private normalizeUserRole(userData: any): User {
    console.log("🔄 Normalizing user:", userData.email);
    console.log("   Raw roles field:", userData.roles);
    console.log("   Raw role field:", userData.role);

    let role = userData.role;

    // Check if role is in a different field
    if (!role && userData.roles) {
      // Backend returns roles as array
      if (Array.isArray(userData.roles) && userData.roles.length > 0) {
        const firstRole = userData.roles[0];
        console.log("   First role item:", firstRole);

        if (typeof firstRole === "string") {
          role = firstRole;
        } else if (typeof firstRole === "object") {
          // Try different possible field names
          role =
            firstRole.name ||
            firstRole.role ||
            firstRole.authority ||
            firstRole.roleName;
        }
      }
    }

    // Check authorities field
    if (!role && userData.authorities) {
      if (
        Array.isArray(userData.authorities) &&
        userData.authorities.length > 0
      ) {
        const auth = userData.authorities[0];
        role =
          typeof auth === "string"
            ? auth.replace("ROLE_", "")
            : auth.authority?.replace("ROLE_", "");
      }
    }

    // Clean up role string - remove "ROLE_" prefix if present
    if (role && typeof role === "string") {
      role = role.replace("ROLE_", "").toUpperCase();
    }

    // Default to STUDENT if no role found
    if (!role) {
      console.warn("   ⚠️ No role found for user, defaulting to STUDENT");
      role = "STUDENT";
    }

    console.log("   ✅ Final role:", role);

    // Handle MongoDB _id field
    let userId = userData.id || userData._id || userData.email;

    // If _id is an object (MongoDB ObjectId), convert to string
    if (userId && typeof userId === "object") {
      userId = userId.toString();
    }

    return {
      id: userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: role as any,
      enabled: userData.enabled ?? true,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/auth/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    return this.request<void>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }

  logout(): void {
    localStorage.removeItem("accessToken");
  }

  // ==================== Students ====================

  async createStudent(data: Partial<Student>): Promise<Student> {
    return this.request<Student>("/students", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getStudent(id: string): Promise<Student> {
    return this.request<Student>(`/students/${id}`);
  }

  async getActiveStudents(): Promise<Student[]> {
    return this.request<Student[]>("/students/active");
  }

  async getStudentsByLevel(level: string): Promise<Student[]> {
    return this.request<Student[]>(`/students/level/${level}`);
  }

  async updateStudent(id: string, data: Partial<Student>): Promise<Student> {
    return this.request<Student>(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async updateStudentGpa(id: string, gpa: number): Promise<Student> {
    return this.request<Student>(`/students/${id}/gpa?gpa=${gpa}`, {
      method: "PATCH",
    });
  }

  async deactivateStudent(id: string): Promise<Student> {
    return this.request<Student>(`/students/${id}/deactivate`, {
      method: "PATCH",
    });
  }

  async deleteStudent(id: string): Promise<void> {
    return this.request<void>(`/students/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Teachers ====================

  async createTeacher(data: Partial<Teacher>): Promise<Teacher> {
    return this.request<Teacher>("/teachers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getTeacher(id: string): Promise<Teacher> {
    return this.request<Teacher>(`/teachers/${id}`);
  }

  async getActiveTeachers(): Promise<Teacher[]> {
    return this.request<Teacher[]>("/teachers/active");
  }

  async getTeachersByDepartment(dept: string): Promise<Teacher[]> {
    return this.request<Teacher[]>(`/teachers/department/${dept}`);
  }

  async updateTeacher(id: string, data: Partial<Teacher>): Promise<Teacher> {
    return this.request<Teacher>(`/teachers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deactivateTeacher(id: string): Promise<Teacher> {
    return this.request<Teacher>(`/teachers/${id}/deactivate`, {
      method: "PATCH",
    });
  }

  async deleteTeacher(id: string): Promise<void> {
    return this.request<void>(`/teachers/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Courses ====================

  async createCourse(data: Partial<Course>): Promise<Course> {
    return this.request<Course>("/courses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getCourse(id: string): Promise<Course> {
    return this.request<Course>(`/courses/${id}`);
  }

  async getAllCourses(): Promise<Course[]> {
    // TODO: Backend needs to implement GET /api/courses endpoint
    // For now, returning empty array to allow build to complete
    return Promise.resolve([]);
  }

  async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
    return this.request<Course[]>(`/courses/teacher/${teacherId}`);
  }

  async getCoursesByDepartment(dept: string): Promise<Course[]> {
    return this.request<Course[]>(`/courses/department/${dept}`);
  }

  async getCoursesByLevel(level: string): Promise<Course[]> {
    return this.request<Course[]>(`/courses/level/${level}`);
  }

  async getCoursesBySemester(semester: string): Promise<Course[]> {
    return this.request<Course[]>(`/courses/semester/${semester}`);
  }

  async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
    return this.request<Course>(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deactivateCourse(id: string): Promise<Course> {
    return this.request<Course>(`/courses/${id}/deactivate`, {
      method: "PATCH",
    });
  }

  async deleteCourse(id: string): Promise<void> {
    return this.request<void>(`/courses/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Enrollments ====================

  async enrollStudent(
    studentId: string,
    courseId: string,
  ): Promise<Enrollment> {
    return this.request<Enrollment>(
      `/enrollments?studentId=${studentId}&courseId=${courseId}`,
      { method: "POST" },
    );
  }

  async getEnrollment(id: string): Promise<Enrollment> {
    return this.request<Enrollment>(`/enrollments/${id}`);
  }

  async getStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    return this.request<Enrollment[]>(`/enrollments/student/${studentId}`);
  }

  async getStudentActiveEnrollments(studentId: string): Promise<Enrollment[]> {
    return this.request<Enrollment[]>(
      `/enrollments/student/${studentId}/active`,
    );
  }

  async getCourseEnrollments(courseId: string): Promise<Enrollment[]> {
    return this.request<Enrollment[]>(`/enrollments/course/${courseId}`);
  }

  async updateEnrollmentGrade(
    id: string,
    grade: string,
    gradePoint: number,
    finalScore: number,
  ): Promise<Enrollment> {
    return this.request<Enrollment>(
      `/enrollments/${id}/grade?grade=${grade}&gradePoint=${gradePoint}&finalScore=${finalScore}`,
      { method: "PATCH" },
    );
  }

  async dropEnrollment(id: string): Promise<Enrollment> {
    return this.request<Enrollment>(`/enrollments/${id}/drop`, {
      method: "PATCH",
    });
  }

  async completeEnrollment(id: string): Promise<Enrollment> {
    return this.request<Enrollment>(`/enrollments/${id}/complete`, {
      method: "PATCH",
    });
  }

  async deleteEnrollment(id: string): Promise<void> {
    return this.request<void>(`/enrollments/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Attendance ====================

  async recordAttendance(data: Partial<Attendance>): Promise<Attendance> {
    return this.request<Attendance>("/attendance", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getAttendance(id: string): Promise<Attendance> {
    return this.request<Attendance>(`/attendance/${id}`);
  }

  async getStudentAttendance(studentId: string): Promise<Attendance[]> {
    return this.request<Attendance[]>(`/attendance/student/${studentId}`);
  }

  async getEnrollmentAttendance(enrollmentId: string): Promise<Attendance[]> {
    return this.request<Attendance[]>(`/attendance/enrollment/${enrollmentId}`);
  }

  async getEnrollmentAttendancePercentage(
    enrollmentId: string,
  ): Promise<AttendancePercentage> {
    return this.request<AttendancePercentage>(
      `/attendance/enrollment/${enrollmentId}/percentage`,
    );
  }

  async updateAttendance(
    id: string,
    status: string,
    remarks?: string,
  ): Promise<Attendance> {
    const query = remarks
      ? `status=${status}&remarks=${encodeURIComponent(remarks)}`
      : `status=${status}`;
    return this.request<Attendance>(`/attendance/${id}?${query}`, {
      method: "PUT",
    });
  }

  async deleteAttendance(id: string): Promise<void> {
    return this.request<void>(`/attendance/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Payments ====================

  async createPayment(data: Partial<Payment>): Promise<Payment> {
    return this.request<Payment>("/payments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getPayment(id: string): Promise<Payment> {
    return this.request<Payment>(`/payments/${id}`);
  }

  async getStudentPayments(studentId: string): Promise<Payment[]> {
    return this.request<Payment[]>(`/payments/student/${studentId}`);
  }

  async getCompletedPayments(studentId: string): Promise<Payment[]> {
    return this.request<Payment[]>(`/payments/student/${studentId}/completed`);
  }

  async getPaymentsByStatus(status: string): Promise<Payment[]> {
    return this.request<Payment[]>(`/payments/status/${status}`);
  }

  async getPaymentsByType(paymentType: string): Promise<Payment[]> {
    return this.request<Payment[]>(`/payments/type/${paymentType}`);
  }

  async getTotalPaid(studentId: string): Promise<TotalPaid> {
    return this.request<TotalPaid>(`/payments/student/${studentId}/total-paid`);
  }

  async updatePaymentStatus(id: string, status: string): Promise<Payment> {
    return this.request<Payment>(`/payments/${id}/status?status=${status}`, {
      method: "PATCH",
    });
  }

  async completePayment(id: string, transactionId: string): Promise<Payment> {
    return this.request<Payment>(
      `/payments/${id}/complete?transactionId=${transactionId}`,
      { method: "PATCH" },
    );
  }

  async deletePayment(id: string): Promise<void> {
    return this.request<void>(`/payments/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Documents ====================

  async uploadDocument(data: Partial<Document>): Promise<Document> {
    return this.request<Document>("/documents", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getDocument(id: string): Promise<Document> {
    return this.request<Document>(`/documents/${id}`);
  }

  async getStudentDocuments(studentId: string): Promise<Document[]> {
    return this.request<Document[]>(`/documents/student/${studentId}`);
  }

  async getDocumentsByType(documentType: string): Promise<Document[]> {
    return this.request<Document[]>(`/documents/type/${documentType}`);
  }

  async getStudentDocumentsByType(
    studentId: string,
    type: string,
  ): Promise<Document[]> {
    return this.request<Document[]>(
      `/documents/student/${studentId}/type/${type}`,
    );
  }

  async verifyDocument(id: string): Promise<Document> {
    return this.request<Document>(`/documents/${id}/verify`, {
      method: "PATCH",
    });
  }

  async updateDocument(id: string, data: Partial<Document>): Promise<Document> {
    return this.request<Document>(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteDocument(id: string): Promise<void> {
    return this.request<void>(`/documents/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== Notifications ====================

  async sendNotification(data: Partial<Notification>): Promise<Notification> {
    return this.request<Notification>("/notifications", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getNotification(id: string): Promise<Notification> {
    return this.request<Notification>(`/notifications/${id}`);
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.request<Notification[]>(`/notifications/user/${userId}`);
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    return this.request<Notification[]>(`/notifications/user/${userId}/unread`);
  }

  async markAsRead(id: string): Promise<Notification> {
    return this.request<Notification>(`/notifications/${id}/read`, {
      method: "PATCH",
    });
  }

  async markAllAsRead(userId: string): Promise<void> {
    return this.request<void>(`/notifications/user/${userId}/read-all`, {
      method: "PATCH",
    });
  }

  async deleteNotification(id: string): Promise<void> {
    return this.request<void>(`/notifications/${id}`, {
      method: "DELETE",
    });
  }

  async deleteAllUserNotifications(userId: string): Promise<void> {
    return this.request<void>(`/notifications/user/${userId}`, {
      method: "DELETE",
    });
  }

  // ==================== User Management (Admin) ====================

  async getAllUsers(): Promise<User[]> {
    console.log("📡 API: Fetching all users from /users");
    try {
      const users = await this.request<any[]>("/users");
      console.log("📦 API: Received", users.length, "raw users from backend");
      console.log("📋 API: Raw data sample:", users[0]);

      // Normalize each user's role field (backend may return 'roles' array instead of 'role')
      const normalizedUsers = users.map((u) => this.normalizeUserRole(u));
      console.log("✅ API: Normalized all users successfully");

      return normalizedUsers;
    } catch (error: any) {
      console.error("❌ API: Failed to fetch users from /users");
      console.error("   Error:", error);
      throw error;
    }
  }

  async getPendingUsers(): Promise<User[]> {
    // Filter users where enabled is false
    const allUsers = await this.getAllUsers();
    return allUsers.filter((u) => !u.enabled);
  }

  async approveUser(userId: string): Promise<User> {
    return this.request<User>(`/users/${userId}/approve`, {
      method: "PATCH",
    });
  }

  async rejectUser(userId: string): Promise<void> {
    return this.request<void>(`/users/${userId}/reject`, {
      method: "DELETE",
    });
  }

  async enableUser(userId: string): Promise<User> {
    return this.request<User>(`/users/${userId}/enable`, {
      method: "PATCH",
    });
  }

  async disableUser(userId: string): Promise<User> {
    return this.request<User>(`/users/${userId}/disable`, {
      method: "PATCH",
    });
  }

  async getUsersByRole(role: string): Promise<User[]> {
    // Filter all users by role
    const allUsers = await this.request<User[]>("/users");
    return allUsers.filter((u) => u.role === role);
  }
}

export const api = new ApiClient();
export default api;
