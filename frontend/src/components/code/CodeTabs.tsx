"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code/CodeBlock";

type CodeTabId = "tsx" | "css" | "usage";

interface CodeTabsProps {
  componentCode: string;
  styleCode: string | null;
  previewType: string;
  componentName: string;
}

const TAILWIND_CSS_MESSAGE =
  "Bu component Tailwind CSS class'ları ile yazılmıştır. Ayrı bir CSS dosyasına ihtiyaç yoktur.";

const USAGE_NOTE = `Bu componenti Next.js veya React projenizde bir TSX dosyasına yapıştırarak kullanabilirsiniz. Tailwind class'ları kullanıldığı için Tailwind CSS kurulu olmalıdır.`;

function buildUsageNote(componentName: string, previewType: string): string {
  const safeName = componentName.replace(/\s+/g, "");
  return `// ${componentName}
// previewType: ${previewType}

import ${safeName} from "./components/${previewType}";

export default function ExamplePage() {
  return <${safeName} />;
}

${USAGE_NOTE}`;
}

export function CodeTabs({
  componentCode,
  styleCode,
  previewType,
  componentName,
}: CodeTabsProps) {
  const hasTsx = componentCode.trim().length > 0;
  const hasCss = Boolean(styleCode?.trim());
  const [activeTab, setActiveTab] = useState<CodeTabId>("tsx");

  const tabs: { id: CodeTabId; label: string }[] = [
    { id: "tsx", label: "TSX" },
    { id: "css", label: "CSS" },
    { id: "usage", label: "Usage" },
  ];

  function renderPanel(): React.ReactNode {
    switch (activeTab) {
      case "tsx":
        return (
          <CodeBlock
            title="TSX Component Kodu"
            code={componentCode}
            language="tsx"
            emptyMessage="TSX kodu bulunamadı. Backend componentCode alanını ve V4 migration'ı kontrol edin."
          />
        );
      case "css":
        if (hasCss) {
          return (
            <CodeBlock
              title="CSS Kodu"
              code={styleCode ?? ""}
              language="css"
            />
          );
        }
        return (
          <CodeBlock
            title="CSS"
            code=""
            language="css"
            emptyMessage={TAILWIND_CSS_MESSAGE}
          />
        );
      case "usage":
        return (
          <CodeBlock
            title="Kullanım"
            code={hasTsx ? buildUsageNote(componentName, previewType) : USAGE_NOTE}
            language="text"
            emptyMessage={USAGE_NOTE}
          />
        );
      default: {
        const exhaustive: never = activeTab;
        return exhaustive;
      }
    }
  }

  return (
    <div className="flex w-full min-h-[400px] flex-col gap-3">
      <div
        className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1"
        role="tablist"
        aria-label="Kod sekmeleri"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-violet-500/20 text-violet-200"
                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="w-full min-h-[360px] shrink-0">
        {renderPanel()}
      </div>
    </div>
  );
}
