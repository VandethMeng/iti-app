# School Management System - Frontend

A modern, professional frontend application for a comprehensive School Management System built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🎯 Overview

This is a complete frontend implementation featuring:

- **Public Website** - Home, About, Programs, Admissions, News, and Contact pages
- **Student Portal** - Dashboard, Courses, GPA tracking, Enrollment, Profile, and Payments
- **Teacher Portal** - Course management, Attendance tracking, Student roster
- **Enrollment Office Portal** - Student management, Enrollment processing, Document verification
- **Admin Portal** - System management, Reports, User management

## 🚀 Technology Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **State Management:** React Hooks
- **API Integration:** Fetch API with custom client

## 📁 Project Structure

```
iti-app/
├── app/
│   ├── (public)/           # Public website pages
│   ├── login/              # Authentication
│   ├── register/
│   ├── student/            # Student portal
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── enrollment/
│   │   ├── gpa/
│   │   ├── payments/
│   │   └── profile/
│   ├── teacher/            # Teacher portal
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── attendance/
│   │   └── students/
│   ├── enrollment-office/  # Enrollment office portal
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── enrollments/
│   │   └── documents/
│   ├── admin/              # Admin portal
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── teachers/
│   │   ├── courses/
│   │   ├── payments/
│   │   └── reports/
│   ├── about/              # Public pages
│   ├── contact/
│   ├── programs/
│   ├── admissions/
│   └── news/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Alert.tsx
│   │   └── StatsCard.tsx
│   └── layout/             # Layout components
│       ├── PublicHeader.tsx
│       ├── PublicFooter.tsx
│       ├── PortalSidebar.tsx
│       └── PortalHeader.tsx
├── lib/
│   ├── api.ts              # API client
│   ├── auth.ts             # Authentication utilities
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## 🔧 Features

### Core Functionalities

#### Authentication

- User login with role-based routing
- User registration with role selection
- JWT token management
- Protected routes

#### Student Portal

- Personal dashboard with GPA and course overview
- Course enrollment and management
- Grade viewing and GPA tracking
- Payment history and processing
- Profile management

#### Teacher Portal

- Course management
- Student roster viewing
- Attendance tracking
- Grade submission
- Department overview

#### Enrollment Office Portal

- Student registration and management
- Course enrollment processing
- Document verification
- Student level distribution statistics

#### Admin Portal

- Comprehensive system dashboard
- User management (Students, Teachers)
- Course management
- Payment oversight
- System reports and analytics

### UI Components

All components are fully reusable, accessible, and responsive:

- **Button** - Multiple variants (primary, secondary, outline, danger, ghost)
- **Card** - Modular card system with header, body, and footer
- **Input** - Form input with label, error handling, and helper text
- **Select** - Dropdown with label and error handling
- **Badge** - Status indicators with color variants
- **Table** - Responsive data tables
- **Modal** - Accessible modal dialogs
- **LoadingSpinner** - Loading states
- **Alert** - Notifications (info, success, warning, error)
- **StatsCard** - Dashboard statistics display

## 🎨 Design System

### Colors

- Primary: Blue (600, 700, 800)
- Success: Green (100, 600, 800)
- Warning: Yellow (100, 600, 800)
- Danger: Red (100, 600, 800)
- Neutral: Gray (50-900)

### Typography

- Headlines: Bold, 2xl-6xl
- Body: Regular, sm-lg
- Labels: Medium, sm-base

### Spacing

- Consistent 4px grid system
- Responsive padding and margins

## 📡 API Integration

### Backend Configuration

The app connects to a Java Spring Boot backend at:

```
Default: http://localhost:8080/api
Configurable via: NEXT_PUBLIC_API_URL
```

### API Modules

The API client (`lib/api.ts`) includes methods for:

1. **Authentication** - Login, register, profile management
2. **Students** - CRUD operations, GPA updates
3. **Teachers** - CRUD operations, department filtering
4. **Courses** - Course management, enrollment
5. **Enrollments** - Student-course relationships
6. **Attendance** - Attendance tracking and reporting
7. **Payments** - Payment processing and history
8. **Documents** - Document upload and verification
9. **Notifications** - User notifications

### Type Safety

Full TypeScript support with interfaces for:

- User, Student, Teacher
- Course, Enrollment, Attendance
- Payment, Document, Notification
- API responses and errors

## 🚦 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Backend API running on port 8080

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Authentication Flow

1. User logs in with email and password
2. Backend returns JWT token and user object
3. Token stored in localStorage
4. Token included in all API requests
5. User redirected based on role:
   - STUDENT → `/student/dashboard`
   - TEACHER → `/teacher/dashboard`
   - ENROLLMENT_OFFICE → `/enrollment-office/dashboard`
   - ADMIN → `/admin/dashboard`

## 🎯 User Roles

- **STUDENT** - Access to personal academic information
- **TEACHER** - Course and student management
- **ENROLLMENT_OFFICE** - Student enrollment and documents
- **ADMIN** - Full system access and management

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- Adaptive navigation
- Touch-friendly interfaces

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatible
- Focus indicators
- Semantic HTML

## 🧪 Best Practices

- **Component Organization**: Modular, reusable components
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Comprehensive error states
- **Loading States**: User feedback during async operations
- **Code Quality**: Clean, maintainable, documented code
- **Performance**: Optimized rendering and data fetching

## 🐛 Error Handling

- API errors displayed via Alert components
- Form validation with inline error messages
- Graceful degradation for missing data
- User-friendly error messages

## 🔄 Future Enhancements

- Real-time notifications (WebSocket)
- File upload functionality
- Advanced search and filtering
- Data export capabilities
- Multi-language support
- Dark mode theme
- Enhanced analytics dashboards
- Mobile app version

## 📄 License

This project is part of a School Management System implementation.

## 👥 Support

For questions or support:

- Email: support@schoolms.edu
- Documentation: See API_SUMMARY.md and frontend.md

## 🙏 Acknowledgments

Built with modern web technologies following industry best practices for enterprise applications.

---

**Note**: Make sure the backend API is running before starting the frontend application. The default API URL is `http://localhost:8080/api` but can be configured via environment variables.
