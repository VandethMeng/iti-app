// Wrong Portal Error Component

"use client";

import { useRouter } from "next/navigation";
import type { UserRole } from "@/lib/types";

interface WrongPortalErrorProps {
  userRole: UserRole;
  attemptedPortal: UserRole;
}

// Map roles to portal paths and display names
const PORTAL_CONFIG: Record<UserRole, { path: string; name: string }> = {
  STUDENT: { path: "/student/dashboard", name: "Student Portal" },
  TEACHER: { path: "/teacher/dashboard", name: "Teacher Portal" },
  ADMIN: { path: "/admin/dashboard", name: "Admin Portal" },
  ENROLLMENT_OFFICE: {
    path: "/enrollment-office/dashboard",
    name: "Enrollment Office Portal",
  },
};

export default function WrongPortalError({
  userRole,
  attemptedPortal,
}: WrongPortalErrorProps) {
  const router = useRouter();

  const correctPortal = PORTAL_CONFIG[userRole];
  const attemptedPortalName = PORTAL_CONFIG[attemptedPortal]?.name || "Portal";

  const handleRedirect = () => {
    router.push(correctPortal.path);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-3">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Wrong Portal
          </h2>
          <p className="text-gray-600 mb-4">
            You are trying to access the <strong>{attemptedPortalName}</strong>,
            but your account is registered as a{" "}
            <strong>
              {userRole.charAt(0) +
                userRole.slice(1).toLowerCase().replace("_", " ")}
            </strong>
            .
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Each user role has access to a specific
              portal. Please navigate to your correct portal to continue.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRedirect}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Go to {correctPortal.name}
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back to Login
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your role: <span className="font-semibold">{userRole}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
