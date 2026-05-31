import { componentApi } from "@/api/component/componentApi";
import { ComponentGallery } from "@/components/gallery/ComponentGallery";
import type { ComponentSummary } from "@/domains/component/componentDomains";
import { ApiError, HttpRequestError } from "@/lib/api/api-error";

export default async function ComponentsPage() {
  let errorMessage: string | null = null;
  let components: ComponentSummary[] = [];

  try {
    components = await componentApi.list();
  } catch (error) {
    if (error instanceof ApiError || error instanceof HttpRequestError) {
      errorMessage = error.message;
    } else {
      errorMessage = "Component listesi yüklenemedi.";
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Component Galerisi</h1>
        <p className="mt-2 text-zinc-400">
          Tüm kayıtlı bileşenleri inceleyin; detayda canlı önizleme ve TSX/CSS kodlarına
          erişin.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {errorMessage} — Backend&apos;in çalıştığından emin olun (
          <code className="text-xs">http://localhost:8080</code>).
        </div>
      )}

      {!errorMessage && components.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-600 px-6 py-16 text-center text-zinc-400">
          Henüz component bulunmuyor.
        </div>
      )}

      {!errorMessage && components.length > 0 && (
        <ComponentGallery components={components} />
      )}
    </section>
  );
}
