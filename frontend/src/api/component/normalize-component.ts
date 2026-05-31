import type { ComponentDetail, ComponentSummary } from "@/domains/component/componentDomains";

interface RawComponentRecord {
  id?: number;
  name?: string;
  slug?: string;
  description?: string | null;
  category?: string;
  previewType?: string;
  preview_type?: string;
  componentCode?: string;
  component_code?: string;
  styleCode?: string | null;
  style_code?: string | null;
  isBuiltin?: boolean;
  builtin?: boolean;
  is_builtin?: boolean;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
}

function isRecord(value: unknown): value is RawComponentRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (value === null || value === undefined) {
    return "";
  }
  return String(value);
}

function readOptionalString(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  const text = readString(value);
  if (text.trim().length === 0) {
    return null;
  }
  return text;
}

function readBoolean(record: RawComponentRecord): boolean {
  return Boolean(record.isBuiltin ?? record.builtin ?? record.is_builtin ?? false);
}

export function normalizeComponentSummary(raw: unknown): ComponentSummary {
  const record: RawComponentRecord = isRecord(raw) ? raw : {};

  return {
    id: record.id ?? 0,
    name: readString(record.name),
    slug: readString(record.slug),
    description: readOptionalString(record.description),
    category: readString(record.category),
    previewType: readString(record.previewType ?? record.preview_type),
    isBuiltin: readBoolean(record),
    createdAt: readString(record.createdAt ?? record.created_at),
    updatedAt: readString(record.updatedAt ?? record.updated_at),
  };
}

export function normalizeComponentDetail(raw: unknown): ComponentDetail {
  if (Array.isArray(raw)) {
    console.error(
      "[ComponentHub] Expected component detail object but received list:",
      raw,
    );
    throw new Error(
      "Component detail endpoint returned a list. Check getBySlug path.",
    );
  }

  if (!isRecord(raw)) {
    throw new Error("Invalid component detail response from API");
  }

  const componentCode = readString(raw.componentCode ?? raw.component_code);
  const styleCodeRaw = readString(raw.styleCode ?? raw.style_code);

  if (process.env.NODE_ENV === "development" && componentCode.trim().length === 0) {
    console.error("[ComponentHub] Empty componentCode from API:", raw);
  }

  return {
    ...normalizeComponentSummary(raw),
    componentCode,
    styleCode: styleCodeRaw.trim().length > 0 ? styleCodeRaw : null,
  };
}

export function normalizeComponentList(raw: unknown): ComponentSummary[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map((item) => normalizeComponentSummary(item));
}
