"use client";

import Link from "next/link";
import { CodeTabs } from "@/components/code/CodeTabs";
import { PreviewRenderer } from "@/components/previews/PreviewRenderer";
import { useComponentDetail } from "@/hooks/useComponentDetail";

interface ComponentDetailViewProps {
  slug: string;
}

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
      <p className="font-semibold text-amber-300">[Dev] Component debug</p>
      <ul className="mt-2 space-y-1">
        <li>slug: {props.slug}</li>
        <li>previewType: {props.previewType || "(empty)"}</li>
        <li>typeof componentCode: {typeof props.componentCode}</li>
        <li>componentCode.length: {props.componentCode.length}</li>
        <li>apiBaseUrl: {props.apiBaseUrl}</li>
        <li>fetch path: {props.apiBaseUrl}/api/components/{props.slug}</li>
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
          ← Galeriye dön
        </Link>
      </section>
    );
  }

  const description = resolveDescription(component.description);
  const previewType = component.previewType.trim().toLowerCase();
  const isDraggablePreview = previewType === "draggable-note-card";
  const hasComponentCode = component.componentCode.trim().length > 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/components"
        className="text-sm text-zinc-400 transition hover:text-white"
      >
        ← Galeriye dön
      </Link>

      <header className="mt-4 mb-8 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300">
            {component.category}
          </span>
          {component.isBuiltin && (
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              Built-in
            </span>
          )}
          <span className="font-mono text-xs text-zinc-500">{component.previewType}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{component.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">{description}</p>
      </header>

      <div className="grid gap-8 xl:grid-cols-2 xl:items-start xl:gap-10">
        <div className="flex min-h-[400px] flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Canlı Önizleme
          </p>
          <div
            className={`relative min-h-[320px] flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#08080c] ${
              isDraggablePreview ? "p-4" : "flex items-center justify-center p-6"
            }`}
          >
            <PreviewRenderer previewType={component.previewType} />
          </div>
        </div>

        <div className="w-full min-h-[400px]">
          {!hasComponentCode && (
            <>
              <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                TSX kodu normalize sonrası boş. Tarayıcı konsolunda [ComponentHub] loglarını kontrol
                edin. Doğrudan backend:{" "}
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
          <CodeTabs
            componentCode={component.componentCode}
            styleCode={component.styleCode}
            previewType={component.previewType}
            componentName={component.name}
          />
        </div>
      </div>
    </section>
  );
}
