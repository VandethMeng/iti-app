// Teacher Portal Layout

"use client";

import PortalSidebar from "@/components/layout/PortalSidebar";
import PortalHeader from "@/components/layout/PortalHeader";
import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import WrongPortalError from "@/components/ui/WrongPortalError";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, isAuthorized, wrongRole } = useAuth({
    requiredRole: "TEACHER",
    redirectTo: "/",
  });

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingPage />;
  }

  // Show error if user is in wrong portal
  if (wrongRole) {
    return <WrongPortalError userRole={wrongRole} attemptedPortal="TEACHER" />;
  }

  // Redirect if not authenticated or authorized
  if (!isAuthenticated || !isAuthorized) {
    return <LoadingPage />;
  }
  const links = [
    {
      href: "/teacher/dashboard",
      label: "Dashboard",
      icon: (
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/teacher/courses",
      label: "My Courses",
      icon: (
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      href: "/teacher/attendance",
      label: "Attendance",
      icon: (
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      href: "/teacher/students",
      label: "Students",
      icon: (
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <PortalSidebar links={links} title="Teacher Portal" />
      <div className="flex-1">
        <PortalHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
