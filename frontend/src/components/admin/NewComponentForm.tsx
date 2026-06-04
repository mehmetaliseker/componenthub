"use client";

import Link from "next/link";
import { useState } from "react";
import { componentApi } from "@/api/component/componentApi";
import { ApiError } from "@/lib/api/api-error";
import type { CreateComponentBody } from "@/domains/component/componentDomains";

const initialForm: CreateComponentBody = {
  name: "",
  slug: "",
  description: "",
  category: "Genel",
  previewType: "custom",
  jsxCode: "",
  tsxCode: "",
  cssCode: "",
  tailwindJsxCode: "",
  tailwindTsxCode: "",
  dependencies: "",
  responsiveNotes: "",
};

function hasText(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

function hasResponsiveBreakpoint(cssCode: string): boolean {
  const normalizedCss = cssCode.toLowerCase();
  return normalizedCss.includes("@media") || normalizedCss.includes("@container");
}

function cleanOptional(value: string | undefined): string | undefined {
  const text = value?.trim();
  return text ? text : undefined;
}

function validateForm(form: CreateComponentBody): string | null {
  if (!hasText(form.name)) {
    return "Component adı zorunludur.";
  }
  if (!hasText(form.slug)) {
    return "Slug alanı zorunludur.";
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug.trim())) {
    return "Slug yalnızca küçük harf, rakam ve tire içermelidir.";
  }
  if (!hasText(form.description)) {
    return "Açıklama alanı zorunludur.";
  }
  if (!hasText(form.category)) {
    return "Kategori alanı zorunludur.";
  }
  if (!hasText(form.previewType)) {
    return "Önizleme tipi zorunludur.";
  }
  if (!hasText(form.jsxCode) && !hasText(form.tsxCode)) {
    return "JSX veya TSX kodlarından en az biri girilmelidir.";
  }
  if (!hasText(form.cssCode)) {
    return "CSS kodu zorunludur. ComponentHub CSS kodunu ana stil kaynağı olarak saklar.";
  }
  if (!hasResponsiveBreakpoint(form.cssCode)) {
    return "CSS kodu en az bir @media veya @container breakpoint içermelidir.";
  }
  return null;
}

export function NewComponentForm() {
  const [form, setForm] = useState<CreateComponentBody>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [successSlug, setSuccessSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof CreateComponentBody>(
    key: K,
    value: CreateComponentBody[K],
  ): void {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccessSlug(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setSuccessSlug(null);

    const validationMessage = validateForm(form);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);

    try {
      const created = await componentApi.create({
        name: form.name.trim(),
        slug: form.slug.trim().toLowerCase(),
        description: form.description.trim(),
        category: form.category.trim(),
        previewType: form.previewType.trim(),
        jsxCode: cleanOptional(form.jsxCode),
        tsxCode: cleanOptional(form.tsxCode),
        cssCode: form.cssCode.trim(),
        tailwindJsxCode: cleanOptional(form.tailwindJsxCode),
        tailwindTsxCode: cleanOptional(form.tailwindTsxCode),
        dependencies: cleanOptional(form.dependencies),
        responsiveNotes: cleanOptional(form.responsiveNotes),
        builtin: false,
      });
      setForm(initialForm);
      setSuccessSlug(created.slug);
    } catch (err) {
      if (err instanceof ApiError) {
        const slugMessage =
          err.status === 409
            ? `Bu slug zaten kullanılıyor: "${form.slug.trim().toLowerCase()}"`
            : err.message;
        setError(slugMessage);
      } else {
        setError("Component kaydedilirken bir hata oluştu. API bağlantısını kontrol edin.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {successSlug && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Component başarıyla oluşturuldu.{" "}
          <Link
            href={`/components/${successSlug}`}
            className="font-medium underline underline-offset-2 hover:text-white"
          >
            Detay sayfasına git
          </Link>
        </div>
      )}

      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm leading-relaxed text-cyan-100">
        Responsive-first kuralı: CSS kodu zorunludur ve açık bir @media veya
        @container breakpoint içermelidir. TailwindCSS kodları opsiyoneldir ve
        yalnızca doldurulduklarında kod ekranındaki TailwindCSS seçeneğini aktif eder.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Component adı *</span>
          <input
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-violet-500"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Slug *</span>
          <input
            required
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            placeholder="responsive-kart"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-violet-500"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-zinc-400">Açıklama *</span>
        <textarea
          required
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Componentin ne yaptığını ve hangi senaryoda kullanılacağını açıklayın."
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-violet-500"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Kategori *</span>
          <input
            required
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-violet-500"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Önizleme tipi *</span>
          <input
            required
            value={form.previewType}
            onChange={(e) => updateField("previewType", e.target.value)}
            placeholder="custom, animated-button, pricing-card"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-violet-500"
          />
        </label>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Tailwindsiz JSX kodu</span>
          <textarea
            value={form.jsxCode ?? ""}
            onChange={(e) => updateField("jsxCode", e.target.value)}
            rows={12}
            placeholder={"export default function Ornek() {\n  return <section className=\"ornek\" />;\n}"}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-white outline-none focus:border-violet-500"
            spellCheck={false}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Tailwindsiz TSX kodu</span>
          <textarea
            value={form.tsxCode ?? ""}
            onChange={(e) => updateField("tsxCode", e.target.value)}
            rows={12}
            placeholder={"type Props = { label: string };\n\nexport default function Ornek({ label }: Props) {\n  return <button className=\"ornek\">{label}</button>;\n}"}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-white outline-none focus:border-violet-500"
            spellCheck={false}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-zinc-400">CSS kodu *</span>
        <textarea
          required
          value={form.cssCode}
          onChange={(e) => updateField("cssCode", e.target.value)}
          rows={12}
          placeholder={".ornek {\n  display: grid;\n  gap: 1rem;\n  max-width: 100%;\n}\n\n@media (max-width: 640px) {\n  .ornek {\n    grid-template-columns: 1fr;\n  }\n}"}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-white outline-none focus:border-violet-500"
          spellCheck={false}
        />
      </label>

      <div className="grid gap-4 xl:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">TailwindCSS JSX kodu (opsiyonel)</span>
          <textarea
            value={form.tailwindJsxCode ?? ""}
            onChange={(e) => updateField("tailwindJsxCode", e.target.value)}
            rows={8}
            placeholder="Yalnızca elle kontrol edilmiş TailwindCSS JSX sürümünüz varsa doldurun."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-white outline-none focus:border-violet-500"
            spellCheck={false}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">TailwindCSS TSX kodu (opsiyonel)</span>
          <textarea
            value={form.tailwindTsxCode ?? ""}
            onChange={(e) => updateField("tailwindTsxCode", e.target.value)}
            rows={8}
            placeholder="Yalnızca elle kontrol edilmiş TailwindCSS TSX sürümünüz varsa doldurun."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-white outline-none focus:border-violet-500"
            spellCheck={false}
          />
        </label>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Responsive notu / kullanım açıklaması</span>
          <textarea
            value={form.responsiveNotes ?? ""}
            onChange={(e) => updateField("responsiveNotes", e.target.value)}
            rows={4}
            placeholder="Mobil, tablet ve masaüstü davranışını; breakpoint ve overflow kararlarını açıklayın."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Bağımlılıklar</span>
          <textarea
            value={form.dependencies ?? ""}
            onChange={(e) => updateField("dependencies", e.target.value)}
            rows={4}
            placeholder="react-icons, framer-motion, @radix-ui/react-dialog..."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-white outline-none focus:border-violet-500"
            spellCheck={false}
          />
        </label>
      </div>

      <p className="text-xs leading-relaxed text-zinc-500">
        Güvenlik: Gönderilen kod metin olarak saklanır ve gösterilir. ComponentHub,
        kullanıcı JSX/TSX kodunu eval, new Function veya runtime transpilation ile çalıştırmaz.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Kaydediliyor..." : "Component Oluştur"}
      </button>
    </form>
  );
}
