import { ComponentMethods } from "@/api/MethodNames";
import { getApiBaseUrl } from "@/lib/api/base-url";
import { HttpRequestError } from "@/lib/api/api-error";
import { parseApiError } from "@/lib/api/parse-api-error";

export type HttpVerb = "GET" | "POST" | "PUT" | "DELETE";

export interface ExecuteJsonRequestOptions<TBody> {
  method: ComponentMethods;
  path?: string;
  body?: TBody;
  accessToken?: string;
  extraHeaders?: Record<string, string>;
  params?: ComponentPathParams;
}

export interface ComponentPathParams {
  readonly slug?: string;
  readonly id?: number;
}

const API_COMPONENTS_BASE = "/api/components";

export function componentHttpVerb(method: ComponentMethods): HttpVerb {
  switch (method) {
    case ComponentMethods.List:
    case ComponentMethods.GetBySlug:
      return "GET";
    case ComponentMethods.Create:
      return "POST";
    case ComponentMethods.Update:
      return "PUT";
    case ComponentMethods.Delete:
      return "DELETE";
    default: {
      const exhaustiveCheck: never = method;
      return exhaustiveCheck;
    }
  }
}

export function buildComponentPath(
  method: ComponentMethods,
  params?: ComponentPathParams,
): string {
  switch (method) {
    case ComponentMethods.List:
    case ComponentMethods.Create:
      return API_COMPONENTS_BASE;

    case ComponentMethods.GetBySlug: {
      const slug = params?.slug;
      if (slug === undefined || slug.length === 0) {
        throw new HttpRequestError("Component slug alanı zorunludur.", 400);
      }
      return `${API_COMPONENTS_BASE}/${encodeURIComponent(slug)}`;
    }

    case ComponentMethods.Update:
    case ComponentMethods.Delete: {
      const id = params?.id;
      if (id === undefined || id === null) {
        throw new HttpRequestError("Component ID alanı zorunludur.", 400);
      }
      return `${API_COMPONENTS_BASE}/${encodeURIComponent(String(id))}`;
    }

    default: {
      const exhaustiveCheck: never = method;
      return exhaustiveCheck;
    }
  }
}

async function parseJsonBody<TResponse>(response: Response): Promise<TResponse> {
  const text = await response.text();
  if (text.trim().length === 0) {
    throw new HttpRequestError("API boş yanıt döndürdü.");
  }

  try {
    return JSON.parse(text) as TResponse;
  } catch {
    throw new HttpRequestError("API geçersiz JSON döndürdü.");
  }
}

export async function executeJsonRequest<TResponse, TBody = unknown>(
  options: ExecuteJsonRequestOptions<TBody>,
): Promise<TResponse> {
  const { method, body, accessToken, extraHeaders, params } = options;
  const path = options.path ?? buildComponentPath(method, params);
  const httpMethod = componentHttpVerb(method);
  const url = `${getApiBaseUrl()}${path}`;

  if (process.env.NODE_ENV === "development") {
    console.log("[ComponentHub] request", method, httpMethod, url);
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...extraHeaders,
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: httpMethod,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new HttpRequestError("Sunucuya bağlanırken bir hata oluştu.");
  }

  if (!response.ok) {
    throw await parseApiError(response);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return parseJsonBody<TResponse>(response);
}
