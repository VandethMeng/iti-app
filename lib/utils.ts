// Utility functions

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date with time
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format GPA to 2 decimal places
 */
export function formatGPA(gpa: number | undefined): string {
  if (gpa === undefined) return "N/A";
  return gpa.toFixed(2);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Convert department enum to readable string
 */
export function formatDepartment(dept: string): string {
  return dept
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Convert student level enum to readable string
 */
export function formatLevel(level: string): string {
  return level.charAt(0) + level.slice(1).toLowerCase();
}

/**
 * Get status badge color
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Enrollment
    ENROLLED: "bg-green-100 text-green-800",
    DROPPED: "bg-red-100 text-red-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    // Attendance
    PRESENT: "bg-green-100 text-green-800",
    ABSENT: "bg-red-100 text-red-800",
    LATE: "bg-yellow-100 text-yellow-800",
    EXCUSED: "bg-blue-100 text-blue-800",
    // Payment
    PENDING: "bg-yellow-100 text-yellow-800",
    FAILED: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-100 text-gray-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
}

/**
 * Get grade color
 */
export function getGradeColor(grade: string): string {
  const gradeColors: Record<string, string> = {
    A: "text-green-600 font-bold",
    "A-": "text-green-600",
    "B+": "text-blue-600",
    B: "text-blue-600",
    "B-": "text-blue-600",
    "C+": "text-yellow-600",
    C: "text-yellow-600",
    "C-": "text-yellow-600",
    "D+": "text-orange-600",
    D: "text-orange-600",
    F: "text-red-600 font-bold",
  };
  return gradeColors[grade] || "text-gray-600";
}

/**
 * Calculate total credits from enrollments
 */
export function calculateTotalCredits(
  enrollments: Array<{ course?: { credits?: number } }>,
): number {
  return enrollments.reduce((total, enrollment) => {
    return total + (enrollment.course?.credits || 0);
  }, 0);
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Class name helper (similar to clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
