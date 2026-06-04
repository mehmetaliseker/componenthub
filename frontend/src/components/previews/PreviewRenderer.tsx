import type { ReactNode } from "react";
import { AnimatedButtonPreview } from "@/components/previews/AnimatedButtonPreview";
import { DraggableNoteCardPreview } from "@/components/previews/DraggableNoteCardPreview";
import { GlassLoginCardPreview } from "@/components/previews/GlassLoginCardPreview";
import { GradientNavbarPreview } from "@/components/previews/GradientNavbarPreview";
import { PricingCardPreview } from "@/components/previews/PricingCardPreview";

interface PreviewRendererProps {
  previewType: string;
  cssCode?: string | null;
}

const FALLBACK_MESSAGE =
  "Bu component için kayıtlı canlı önizleme bulunmuyor. Kodu inceleyip projenizde kullanabilirsiniz.";

function sanitizePreviewCss(cssCode: string | null | undefined): string {
  if (!cssCode) {
    return "";
  }
  return cssCode
    .replace(/@import[^;]+;/gi, "")
    .replace(/url\(\s*['"]?javascript:[^)]+\)/gi, "none");
}

export function PreviewRenderer({ previewType, cssCode }: PreviewRendererProps) {
  const normalizedType = previewType.trim().toLowerCase();
  const previewCss = sanitizePreviewCss(cssCode);

  function withPreviewCss(node: ReactNode): ReactNode {
    return (
      <>
        {previewCss && <style>{previewCss}</style>}
        {node}
      </>
    );
  }

  switch (normalizedType) {
    case "animated-button":
      return withPreviewCss(<AnimatedButtonPreview />);
    case "pricing-card":
      return withPreviewCss(<PricingCardPreview />);
    case "glass-login-card":
      return withPreviewCss(<GlassLoginCardPreview />);
    case "gradient-navbar":
      return withPreviewCss(<GradientNavbarPreview />);
    case "draggable-note-card":
      return withPreviewCss(<DraggableNoteCardPreview />);
    default:
      return withPreviewCss(
        <div className="max-w-sm rounded-xl border border-dashed border-zinc-600 bg-zinc-900/50 px-6 py-10 text-center text-sm leading-relaxed text-zinc-400">
          {FALLBACK_MESSAGE}
        </div>,
      );
  }
}
