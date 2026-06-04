"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setFailed(true);
      window.setTimeout(() => setFailed(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/20"
    >
      {failed ? "Kopyalanamadı" : copied ? "Kopyalandı" : "Kodu Kopyala"}
    </button>
  );
}
