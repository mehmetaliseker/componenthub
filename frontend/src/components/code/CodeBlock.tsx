import { CopyButton } from "@/components/code/CopyButton";

export type CodeLanguage = "tsx" | "css" | "bash" | "text";

interface CodeBlockProps {
  title: string;
  code: string;
  language?: CodeLanguage;
  emptyMessage?: string;
}

const languageLabel: Record<CodeLanguage, string> = {
  tsx: "TSX",
  css: "CSS",
  bash: "Bash",
  text: "Text",
};

export function CodeBlock({
  title,
  code,
  language = "text",
  emptyMessage = "Gösterilecek kod bulunmuyor.",
}: CodeBlockProps) {
  const displayCode = code ?? "";
  const hasCode = displayCode.trim().length > 0;

  return (
    <div className="flex w-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-xs font-medium uppercase tracking-wider text-zinc-400">
            {title}
          </span>
          <span className="shrink-0 rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
            {languageLabel[language]}
          </span>
        </div>
        {hasCode && <CopyButton text={displayCode} />}
      </div>
      <div className="min-h-[200px] flex-1 overflow-hidden">
        {hasCode ? (
          <pre className="max-h-[min(70vh,520px)] min-h-[200px] overflow-auto p-4 font-mono text-[13px] leading-6 text-zinc-300 whitespace-pre">
            <code className="block">{displayCode}</code>
          </pre>
        ) : (
          <p className="min-h-[200px] p-4 text-sm leading-relaxed text-zinc-500">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}
