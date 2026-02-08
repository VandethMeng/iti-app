# School Management System (SMS)

## 1. Overview
The **School Management System (SMS)** is a full-stack, enterprise-level web application designed to manage academic, administrative, and operational processes of an educational institution.

The system provides:
- A modern and professional **public-facing school website**
- Secure, role-based portals for **Students, Teachers, Enrollment Office, and Administration**
- Centralized management of academic records, enrollment, attendance, payments, and official documents

The system follows industry best practices to ensure **security, scalability, maintainability, and usability**.

---

## 2. Objectives
- Digitize school academic and administrative workflows
- Improve transparency for students and staff
- Reduce manual paperwork
- Provide secure role-based access
- Support future expansion and integrations

---

## 3. User Roles
- Visitor (Public)
- Student
- Teacher
- Enrollment Office Staff
- Administrator

---

## 4. Features

## 4.1 Public School Website
Accessible without authentication.

### Pages
- Home
- About
- Academic Programs
- Admissions
- Announcements & News
- Contact Information

### Capabilities
- Responsive and mobile-friendly design
- Professional UI and branding
- SEO-friendly structure
- Academic calendar display

---

## 4.2 Student Center
Secure portal for enrolled students.

### Academic Management
- View enrolled courses
- Register and drop courses
- View semester GPA and cumulative GPA
- View academic history

### Personal Information
- View and update personal profile
- Manage contact information
- View enrollment status

### Admission & Documents
- Track submitted admission documents
- View approval status
- Download approved documents

### Payments & Finance
- View tuition and fees
- Payment history
- Invoice and receipt access
- Payment status
- Make only payment

---

## 4.3 Enrollment Office Portal
- View and manage all students
- Approve or reject admissions
- Assign programs
- Register courses for students
- Verify documents

---

## 4.4 Teacher Portal
- View assigned courses
- View student rosters
- Take attendance via ID card or facial recognition (optional)
- Send emails to students or classes
- Post class announcements

---

## 4.5 Administration Portal
- View academic and attendance reports
- Issue transcripts and certificates
- View all payments
- Manage users and roles
- Configure academic semesters
- View system logs

---

## 5. Technology Stack

### Frontend
- Next.js
- Tailwind CSS

### Backend
- Java
- Spring Boot
- Spring Security

### Database
- MongoDB

### Authentication
- JWT (Access & Refresh Tokens)
- Role-Based Access Control (RBAC)

---

## 6. System Architecture

```
[ Next.js (Frontend) ]
        |
        | REST APIs (JWT)
        v
[ Spring Boot (Backend) ]
        |
        v
[ MongoDB ]
```

---

## 7. Backend Architecture
- Controller → Service → Repository
- DTO validation
- Centralized exception handling
- Stateless JWT authentication

### Core Modules
- Auth
- Student
- Teacher
- Course
- Enrollment
- Attendance
- Payment
- Document
- Notification

---

## 8. Database Collections
- users
- roles
- students
- teachers
- courses
- enrollments
- attendance
- payments
- documents
- notifications

---

## 9. Security
- JWT authentication
- BCrypt password hashing
- Role-based authorization
- Input validation
- Audit logging

---

## 10. Scalability
- Stateless services
- Modular architecture
- Cloud-ready deployment

---

## 11. Project Structure
```
frontend/
backend/
```

---

## 12. How to Run
1. Start MongoDB
2. Run Spring Boot backend
3. Run Next.js frontend
4. Open browser and access application

---

## 13. Status
Design and architecture completed. Ready for implementation.

---

## 14. Future Enhancements
- Mobile application
- Learning management features
- Advanced analytics
- AI-based attendance
