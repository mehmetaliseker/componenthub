"use client";

import { useMemo, useState } from "react";
import { CodeBlock } from "@/components/code/CodeBlock";

type CodeTabId = "jsx" | "tsx" | "css" | "usage";
type ReactLanguage = "jsx" | "tsx";

interface CodeTabsProps {
  jsxCode: string | null;
  tsxCode: string | null;
  cssCode: string | null;
  tailwindJsxCode: string | null;
  tailwindTsxCode: string | null;
  previewType: string;
  componentName: string;
}

const MISSING_CSS_MESSAGE =
  "Bu eski componentte CSS kodu eksik. Yeni componentler CSS kodu olmadan kaydedilemez.";

const USAGE_NOTE =
  "Gösterilen JSX veya TSX kodunu React projenize ekleyin ve CSS kodunu ana stil kaynağı olarak kullanın. TailwindCSS modu yalnızca elle hazırlanmış TailwindCSS sürümü varsa açılır.";

function hasText(value: string | null | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

function buildUsageNote(componentName: string, previewType: string): string {
  const safeName = componentName.replace(/[^a-zA-Z0-9]/g, "") || "Component";
  return `// ${componentName}
// önizleme tipi: ${previewType}

import ${safeName} from "./components/${previewType}";
import "./${previewType}.css";

export default function ExamplePage() {
  return <${safeName} />;
}

${USAGE_NOTE}`;
}

export function CodeTabs({
  jsxCode,
  tsxCode,
  cssCode,
  tailwindJsxCode,
  tailwindTsxCode,
  previewType,
  componentName,
}: CodeTabsProps) {
  const availableLanguages = useMemo<ReactLanguage[]>(() => {
    const languages: ReactLanguage[] = [];
    if (hasText(jsxCode)) {
      languages.push("jsx");
    }
    if (hasText(tsxCode)) {
      languages.push("tsx");
    }
    return languages;
  }, [jsxCode, tsxCode]);

  const initialTab = availableLanguages[0] ?? "css";
  const [activeTab, setActiveTab] = useState<CodeTabId>(initialTab);
  const [tailwindEnabled, setTailwindEnabled] = useState(false);
  const effectiveTab =
    (activeTab === "jsx" && !hasText(jsxCode)) ||
    (activeTab === "tsx" && !hasText(tsxCode))
      ? availableLanguages[0] ?? "css"
      : activeTab;

  const selectedTailwindCode =
    effectiveTab === "jsx"
      ? tailwindJsxCode
      : effectiveTab === "tsx"
        ? tailwindTsxCode
        : null;
  const selectedBaseCode =
    effectiveTab === "jsx" ? jsxCode : effectiveTab === "tsx" ? tsxCode : null;
  const canUseTailwind = effectiveTab === "jsx" || effectiveTab === "tsx"
    ? hasText(selectedTailwindCode)
    : false;
  const showTailwindCode = tailwindEnabled && canUseTailwind;

  const tabs: { id: CodeTabId; label: string }[] = [
    ...availableLanguages.map((language) => ({
      id: language,
      label: language.toUpperCase(),
    })),
    { id: "css", label: "CSS" },
    { id: "usage", label: "Kullanım" },
  ];

  function renderPanel(): React.ReactNode {
    if (effectiveTab === "jsx" || effectiveTab === "tsx") {
      const code = showTailwindCode
        ? selectedTailwindCode ?? ""
        : selectedBaseCode ?? "";
      const label = `${showTailwindCode ? "TailwindCSS " : ""}${effectiveTab.toUpperCase()} kodu`;
      return (
        <CodeBlock
          title={label}
          code={code}
          language={effectiveTab}
          emptyMessage={`Bu component için ${effectiveTab.toUpperCase()} kodu bulunmuyor.`}
        />
      );
    }

    if (effectiveTab === "css") {
      return (
        <CodeBlock
          title="CSS kodu"
          code={cssCode ?? ""}
          language="css"
          emptyMessage={MISSING_CSS_MESSAGE}
        />
      );
    }

    return (
      <CodeBlock
        title="Kullanım"
        code={buildUsageNote(componentName, previewType)}
        language="text"
        emptyMessage={USAGE_NOTE}
      />
    );
  }

  return (
    <div className="flex w-full min-h-[400px] flex-col gap-3">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div
          className="flex flex-wrap gap-1"
          role="tablist"
          aria-label="Kod sekmeleri"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={effectiveTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                effectiveTab === tab.id
                  ? "bg-violet-500/20 text-violet-200"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
          <label
            className={`flex items-center gap-2 text-sm ${
              canUseTailwind ? "text-zinc-200" : "text-zinc-500"
            }`}
          >
            <input
              type="checkbox"
              checked={showTailwindCode}
              disabled={!canUseTailwind}
              onChange={(event) => setTailwindEnabled(event.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black"
            />
            TailwindCSS kullan
          </label>
          <p className="text-xs text-zinc-500">
            {canUseTailwind
              ? "TailwindCSS modu seçili dil için elle eklenen TailwindCSS kodunu gösterir."
              : "Bu component için seçili dilde TailwindCSS sürümü eklenmemiş."}
          </p>
        </div>
      </div>

      <div role="tabpanel" className="w-full min-h-[360px] shrink-0">
        {renderPanel()}
      </div>
    </div>
  );
}
