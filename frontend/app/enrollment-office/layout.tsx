// Enrollment Office Portal Layout

"use client";

import PortalSidebar from "@/components/layout/PortalSidebar";
import PortalHeader from "@/components/layout/PortalHeader";
import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/components/ui/LoadingSpinner";
import WrongPortalError from "@/components/ui/WrongPortalError";

export default function EnrollmentOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, isAuthorized, wrongRole } = useAuth({
    requiredRole: "ENROLLMENT_OFFICE",
    redirectTo: "/",
  });

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingPage />;
  }

  // Show error if user is in wrong portal
  if (wrongRole) {
    return (
      <WrongPortalError
        userRole={wrongRole}
        attemptedPortal="ENROLLMENT_OFFICE"
      />
    );
  }

  // Redirect if not authenticated or authorized
  if (!isAuthenticated || !isAuthorized) {
    return <LoadingPage />;
  }
  const links = [
    {
      href: "/enrollment-office/dashboard",
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
      href: "/enrollment-office/students",
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
    {
      href: "/enrollment-office/enrollments",
      label: "Enrollments",
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
      href: "/enrollment-office/documents",
      label: "Documents",
      icon: (
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <PortalSidebar links={links} title="Enrollment Office" />
      <div className="flex-1">
        <PortalHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
