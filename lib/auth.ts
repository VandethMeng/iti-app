// Authentication utilities

import { api } from "./api";
import type { User } from "./types";

export const AUTH_TOKEN_KEY = "accessToken";
export const USER_KEY = "user";

export const authUtils = {
  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get stored access token
   */
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get stored user data
   */
  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Store user and token
   */
  setAuth(token: string, user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Clear authentication data
   */
  clearAuth(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<User> {
    // Get access token and store it
    const response = await api.login(email, password);

    // Fetch complete user data with normalized role
    const user = await api.getMe();

    // Store both token and user
    this.setAuth(response.accessToken, user);

    return user;
  },

  /**
   * Logout user
   */
  logout(): void {
    api.logout();
    this.clearAuth();
  },

  /**
   * Check if user has specific role
   */
  hasRole(role: string | string[]): boolean {
    const user = this.getUser();
    if (!user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  },

  /**
   * Get current user role
   */
  getRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  },
};

export default authUtils;
