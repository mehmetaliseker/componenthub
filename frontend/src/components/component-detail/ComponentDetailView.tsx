"use client";

import Link from "next/link";
import { useState } from "react";
import { CodeTabs } from "@/components/code/CodeTabs";
import { PreviewRenderer } from "@/components/previews/PreviewRenderer";
import { useComponentDetail } from "@/hooks/useComponentDetail";

interface ComponentDetailViewProps {
  slug: string;
}

const previewModes = [
  { id: "desktop", label: "Masaüstü", width: "100%" },
  { id: "tablet", label: "Tablet", width: "768px" },
  { id: "mobile", label: "Mobil", width: "390px" },
] as const;

function resolveDescription(description: string | null): string {
  if (description && description.trim().length > 0) {
    return description.trim();
  }
  return "Bu component için açıklama eklenmemiş.";
}

function DevDebugPanel(props: {
  slug: string;
  componentCode: string;
  previewType: string;
  apiBaseUrl: string;
  debugRaw: Record<string, unknown> | null;
}): React.ReactNode {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg border border-amber-500/40 bg-amber-950/40 p-4 font-mono text-xs text-amber-100">
      <p className="font-semibold text-amber-300">[Geliştirici] Component debug</p>
      <ul className="mt-2 space-y-1">
        <li>slug: {props.slug}</li>
        <li>önizleme tipi: {props.previewType || "(boş)"}</li>
        <li>componentCode uzunluğu: {props.componentCode.length}</li>
        <li>API adresi: {props.apiBaseUrl}</li>
        <li>
          istek yolu: {props.apiBaseUrl}/api/components/{props.slug}
        </li>
      </ul>
      {props.debugRaw && (
        <pre className="mt-2 max-h-32 overflow-auto text-[10px] text-zinc-400">
          {JSON.stringify(props.debugRaw, null, 2)}
        </pre>
      )}
    </div>
  );
}

export function ComponentDetailView({ slug }: ComponentDetailViewProps) {
  const { component, loading, error, debugRaw, apiBaseUrl } = useComponentDetail(slug);
  const [previewMode, setPreviewMode] =
    useState<(typeof previewModes)[number]["id"]>("desktop");

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-center text-zinc-400">Component yükleniyor...</p>
      </section>
    );
  }

  if (error || !component) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error ?? "Component bulunamadı."}
        </div>
        <DevDebugPanel
          slug={slug}
          componentCode=""
          previewType=""
          apiBaseUrl={apiBaseUrl}
          debugRaw={debugRaw}
        />
        <Link href="/components" className="mt-4 inline-block text-sm text-violet-400 hover:text-violet-300">
          Galeriye dön
        </Link>
      </section>
    );
  }

  const description = resolveDescription(component.description);
  const previewType = component.previewType.trim().toLowerCase();
  const isDraggablePreview = previewType === "draggable-note-card";
  const hasReactCode = Boolean(component.jsxCode?.trim() || component.tsxCode?.trim());
  const activePreviewMode =
    previewModes.find((mode) => mode.id === previewMode) ?? previewModes[0];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/components"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        Galeriye dön
      </Link>

      <header className="mt-4 mb-8 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300">
            {component.category}
          </span>
          <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-300">
            Responsive-first
          </span>
          {component.isBuiltin && (
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              Yerleşik
            </span>
          )}
          <span className="font-mono text-xs text-zinc-500">{component.previewType}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{component.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">{description}</p>
        {component.responsiveNotes && (
          <p className="mt-4 max-w-3xl rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm leading-relaxed text-cyan-100">
            {component.responsiveNotes}
          </p>
        )}
        {component.dependencies && (
          <p className="mt-3 font-mono text-xs text-zinc-500">
            Bağımlılıklar: {component.dependencies}
          </p>
        )}
      </header>

      <div className="grid gap-8 xl:grid-cols-2 xl:items-start xl:gap-10">
        <div className="flex min-h-[400px] flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Canlı önizleme
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Responsive görünüm: {activePreviewMode.label}
              </p>
            </div>
            <div className="flex rounded-xl border border-white/10 bg-black/30 p-1">
              {previewModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setPreviewMode(mode.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    previewMode === mode.id
                      ? "bg-violet-500/20 text-violet-200"
                      : "text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`relative min-h-[320px] flex-1 overflow-auto rounded-xl border border-white/10 bg-[#08080c] ${
              isDraggablePreview ? "p-4" : "flex items-center justify-center p-6"
            }`}
          >
            <div
              className="mx-auto min-h-[280px] w-full transition-[max-width] duration-300"
              style={{ maxWidth: activePreviewMode.width }}
            >
              <PreviewRenderer
                previewType={component.previewType}
                cssCode={component.cssCode}
              />
            </div>
          </div>
        </div>

        <div className="w-full min-h-[400px]">
          {!hasReactCode && (
            <>
              <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                Normalize edilen veride JSX/TSX kodu bulunamadı. Eski component verisini kontrol edin:{" "}
                <code className="text-xs">http://127.0.0.1:8080/api/components/{slug}</code>
              </div>
              <DevDebugPanel
                slug={slug}
                componentCode={component.componentCode}
                previewType={component.previewType}
                apiBaseUrl={apiBaseUrl}
                debugRaw={debugRaw}
              />
            </>
          )}
          {!component.cssCode && (
            <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              Bu eski componentte CSS kodu eksik. Yeni componentler responsive breakpoint içeren CSS kodu olmadan kaydedilemez.
            </div>
          )}
          <CodeTabs
            jsxCode={component.jsxCode}
            tsxCode={component.tsxCode}
            cssCode={component.cssCode}
            tailwindJsxCode={component.tailwindJsxCode}
            tailwindTsxCode={component.tailwindTsxCode}
            previewType={component.previewType}
            componentName={component.name}
          />
        </div>
      </div>
    </section>
  );
}
