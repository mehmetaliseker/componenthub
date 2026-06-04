"use client";

import { useEffect, useState } from "react";
import { componentApi } from "@/api/component/componentApi";
import { getApiBaseUrl } from "@/lib/api/base-url";
import { ApiError, HttpRequestError } from "@/lib/api/api-error";
import type { ComponentDetail } from "@/domains/component/componentDomains";

interface UseComponentDetailResult {
  component: ComponentDetail | null;
  loading: boolean;
  error: string | null;
  debugRaw: Record<string, unknown> | null;
  apiBaseUrl: string;
}

export function useComponentDetail(slug: string): UseComponentDetailResult {
  const [component, setComponent] = useState<ComponentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugRaw, setDebugRaw] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    let active = true;

    async function load(): Promise<void> {
      setLoading(true);
      setError(null);
      setDebugRaw(null);

      try {
        const detail = await componentApi.getBySlug(slug);
        if (!active) {
          return;
        }
        setComponent(detail);
        if (process.env.NODE_ENV === "development") {
          setDebugRaw({
            slug: detail.slug,
            previewType: detail.previewType,
            jsxCodeLength: detail.jsxCode?.length ?? 0,
            tsxCodeLength: detail.tsxCode?.length ?? 0,
            cssCodeLength: detail.cssCode?.length ?? 0,
            componentCodePreview: detail.componentCode.slice(0, 80),
          });
        }
      } catch (err) {
        if (!active) {
          return;
        }
        if (err instanceof ApiError) {
          setError(err.message);
        } else if (err instanceof HttpRequestError) {
          setError(err.message);
        } else {
          setError("Component detayı yüklenemedi.");
        }
        setComponent(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [slug]);

  return {
    component,
    loading,
    error,
    debugRaw,
    apiBaseUrl: getApiBaseUrl(),
  };
}
