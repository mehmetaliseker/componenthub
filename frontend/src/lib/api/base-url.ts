const SERVER_FALLBACK = "http://127.0.0.1:8080";

/**
 * Browser: same-origin + Next.js rewrite → /api/* proxied to Spring Boot (CORS/env safe).
 * Server (RSC): doğrudan backend URL.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  return SERVER_FALLBACK;
}
