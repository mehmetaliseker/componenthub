import { ApiError } from "./api-error";

interface ErrorPayload {
  status?: number;
  error?: string;
  message?: string;
}

export async function parseApiError(response: Response): Promise<ApiError> {
  const fallbackMessage = `İstek ${response.status} durum koduyla başarısız oldu.`;

  try {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const payload = (await response.json()) as ErrorPayload;
      return new ApiError(
        payload.status ?? response.status,
        payload.error ?? "Hata",
        payload.message ?? fallbackMessage,
      );
    }
  } catch {
    // fall through to text/plain handling
  }

  try {
    const text = await response.text();
    if (text.trim().length > 0) {
      return new ApiError(response.status, "Hata", text);
    }
  } catch {
    // ignore
  }

  return new ApiError(response.status, "Hata", fallbackMessage);
}
