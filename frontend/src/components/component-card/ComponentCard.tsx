import Link from "next/link";
import type { ComponentSummary } from "@/domains/component/componentDomains";

interface ComponentCardProps {
  component: ComponentSummary;
}

function cardDescription(description: string | null): string {
  if (description && description.trim().length > 0) {
    return description.trim();
  }
  return "Açıklama eklenmemiş.";
}

export function ComponentCard({ component }: ComponentCardProps) {
  const description = cardDescription(component.description);

  return (
    <Link
      href={`/components/${component.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-violet-500/40 hover:bg-white/[0.05]"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300">
          {component.category}
        </span>
        {component.isBuiltin && (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
            Yerleşik
          </span>
        )}
        <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-300">
          Responsive
        </span>
      </div>

      <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-violet-100">
        {component.name}
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/5 pt-4">
        <span className="truncate font-mono text-xs text-zinc-500">{component.previewType}</span>
        <span className="shrink-0 rounded-lg bg-violet-500/15 px-2.5 py-1 text-xs font-medium text-violet-300 transition group-hover:bg-violet-500/25">
          Önizle ve Kodu Gör
        </span>
      </div>
    </Link>
  );
}
