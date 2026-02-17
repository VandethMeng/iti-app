// useAuth Hook - Client-side authentication protection

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authUtils } from "@/lib/auth";
import type { UserRole } from "@/lib/types";

interface UseAuthOptions {
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wrongRole, setWrongRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in
      const authenticated = authUtils.isAuthenticated();
      const userRole = authUtils.getRole() as UserRole | null;

      setIsAuthenticated(authenticated);

      if (!authenticated) {
        setIsLoading(false);
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // Check role if required
      if (options.requiredRole) {
        const authorized = userRole === options.requiredRole;
        setIsAuthorized(authorized);

        if (!authorized && userRole) {
          // User is authenticated but accessing wrong portal
          setWrongRole(userRole);
          setIsLoading(false);
          return;
        }
      } else {
        setIsAuthorized(true);
      }

      setIsLoading(false);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return {
    isAuthenticated,
    isAuthorized,
    isLoading,
    wrongRole,
    user: authUtils.getUser(),
    role: authUtils.getRole() as UserRole | null,
  };
}
