/**
 * Utility functions for error handling and Sanity API operations
 */

export interface SanityErrorResponse {
  status: number;
  message: string;
  details?: string;
}

/**
 * Wraps Sanity API calls with error handling
 */
export async function trySanityQuery<T>(
  queryFn: () => Promise<T>,
  errorTitle: string = "Content Error"
): Promise<T | null> {
  try {
    return await queryFn();
  } catch (error) {
    console.error(`${errorTitle}:`, error);
    // Log error but don't crash the page
    return null;
  }
}

/**
 * Validates image URLs from Sanity
 */
export function sanitizeImageUrl(url: string): string {
  if (!url) return "";
  // Ensure we're using HTTPS
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}

/**
 * Gets a placeholder color based on content type
 */
export function getPlaceholderColor(type: string): string {
  const colors: Record<string, string> = {
    artikel: "bg-blue-100 dark:bg-blue-900",
    galeri: "bg-purple-100 dark:bg-purple-900",
    berita: "bg-green-100 dark:bg-green-900",
    default: "bg-gray-100 dark:bg-gray-900",
  };
  return colors[type] || colors.default;
}

/**
 * Formats date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  };
  return d.toLocaleDateString("id-ID", options);
}
