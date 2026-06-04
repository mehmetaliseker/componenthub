import type { ComponentDetail, ComponentSummary } from "@/domains/component/componentDomains";

interface RawComponentRecord {
  id?: number;
  name?: string;
  title?: string;
  slug?: string;
  description?: string | null;
  category?: string;
  previewType?: string;
  preview_type?: string;
  componentCode?: string;
  component_code?: string;
  styleCode?: string | null;
  style_code?: string | null;
  jsxCode?: string | null;
  jsx_code?: string | null;
  tsxCode?: string | null;
  tsx_code?: string | null;
  cssCode?: string | null;
  css_code?: string | null;
  tailwindJsxCode?: string | null;
  tailwind_jsx_code?: string | null;
  tailwindTsxCode?: string | null;
  tailwind_tsx_code?: string | null;
  dependencies?: string | null;
  responsiveNotes?: string | null;
  responsive_notes?: string | null;
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
    name: readString(record.name ?? record.title),
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
      "[ComponentHub] Component detayı nesne olmalıydı ancak liste geldi:",
      raw,
    );
    throw new Error(
      "Component detay endpointi liste döndürdü. getBySlug yolunu kontrol edin.",
    );
  }

  if (!isRecord(raw)) {
    throw new Error("API geçersiz component detay verisi döndürdü.");
  }

  const legacyComponentCode = readString(raw.componentCode ?? raw.component_code);
  const legacyStyleCode = readOptionalString(raw.styleCode ?? raw.style_code);
  const jsxCode = readOptionalString(raw.jsxCode ?? raw.jsx_code);
  const tsxCode =
    readOptionalString(raw.tsxCode ?? raw.tsx_code) ??
    (legacyComponentCode.trim().length > 0 ? legacyComponentCode : null);
  const cssCode = readOptionalString(raw.cssCode ?? raw.css_code) ?? legacyStyleCode;
  const tailwindJsxCode = readOptionalString(
    raw.tailwindJsxCode ?? raw.tailwind_jsx_code,
  );
  const tailwindTsxCode = readOptionalString(
    raw.tailwindTsxCode ?? raw.tailwind_tsx_code,
  );
  const componentCode = tsxCode ?? jsxCode ?? "";

  if (process.env.NODE_ENV === "development" && componentCode.trim().length === 0) {
    console.error("[ComponentHub] API üzerinden boş jsxCode/tsxCode geldi:", raw);
  }

  return {
    ...normalizeComponentSummary(raw),
    jsxCode,
    tsxCode,
    cssCode,
    tailwindJsxCode,
    tailwindTsxCode,
    dependencies: readOptionalString(raw.dependencies),
    responsiveNotes: readOptionalString(raw.responsiveNotes ?? raw.responsive_notes),
    componentCode,
    styleCode: cssCode,
  };
}

export function normalizeComponentList(raw: unknown): ComponentSummary[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map((item) => normalizeComponentSummary(item));
}
