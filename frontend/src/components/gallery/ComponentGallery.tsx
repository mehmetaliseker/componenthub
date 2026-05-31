"use client";

import { useMemo, useState } from "react";
import { ComponentCard } from "@/components/component-card/ComponentCard";
import type { ComponentSummary } from "@/domains/component/componentDomains";

interface ComponentGalleryProps {
  components: ComponentSummary[];
}

export function ComponentGallery({ components }: ComponentGalleryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const unique = new Set(components.map((item) => item.category));
    return ["all", ...Array.from(unique).sort()];
  }, [components]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return components.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [
        item.name,
        item.slug,
        item.description ?? "",
        item.category,
        item.previewType,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [components, query, category]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Component ara..."
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500 sm:max-w-md"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500 sm:max-w-xs"
        >
          {categories.map((value) => (
            <option key={value} value={value} className="bg-zinc-900">
              {value === "all" ? "Tüm kategoriler" : value}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-600 px-6 py-16 text-center text-zinc-400">
          Aramanızla eşleşen component bulunamadı.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      )}
    </div>
  );
}
