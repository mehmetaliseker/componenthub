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
  category: "General",
  previewType: "custom",
  componentCode: "",
  styleCode: "",
};

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
    setLoading(true);
    setError(null);
    setSuccessSlug(null);

    try {
      const created = await componentApi.create({
        ...form,
        slug: form.slug.trim().toLowerCase(),
        description: form.description?.trim() || undefined,
        styleCode: form.styleCode?.trim() || undefined,
        builtin: false,
      });
      setForm(initialForm);
      setSuccessSlug(created.slug);
    } catch (err) {
      if (err instanceof ApiError) {
        const slugMessage =
          err.status === 409
            ? `Slug zaten kullanılıyor: "${form.slug.trim().toLowerCase()}"`
            : err.message;
        setError(slugMessage);
      } else {
        setError("Component kaydedilemedi. API erişimini kontrol edin.");
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
          Component başarıyla kaydedildi.{" "}
          <Link
            href={`/components/${successSlug}`}
            className="font-medium underline underline-offset-2 hover:text-white"
          >
            Detay sayfasına git →
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Component Adı</span>
          <input
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-violet-500"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Slug</span>
          <input
            required
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            placeholder="ornek-component"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-violet-500"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-zinc-400">Açıklama</span>
        <textarea
          value={form.description ?? ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Component ne işe yarar?"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-violet-500"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Kategori</span>
          <input
            required
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-violet-500"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-zinc-400">Preview Type</span>
          <input
            required
            value={form.previewType}
            onChange={(e) => updateField("previewType", e.target.value)}
            placeholder="custom, animated-button, pricing-card"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-violet-500"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-zinc-400">TSX Component Code</span>
        <textarea
          required
          value={form.componentCode}
          onChange={(e) => updateField("componentCode", e.target.value)}
          rows={14}
          placeholder={'"use client";\n\nexport default function MyComponent() {\n  return <div />;\n}'}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-white outline-none focus:border-violet-500"
          spellCheck={false}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-zinc-400">CSS Code (opsiyonel)</span>
        <textarea
          value={form.styleCode ?? ""}
          onChange={(e) => updateField("styleCode", e.target.value)}
          rows={8}
          placeholder="Tailwind kullanıyorsanız boş bırakabilirsiniz."
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-white outline-none focus:border-violet-500"
          spellCheck={false}
        />
      </label>

      <p className="text-xs leading-relaxed text-zinc-500">
        Güvenlik: Kullanıcıdan gelen kod eval, new Function veya runtime transpile ile
        çalıştırılmaz; yalnızca detay sayfasında metin olarak gösterilir.
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
