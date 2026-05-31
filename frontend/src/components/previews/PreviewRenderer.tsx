import { AnimatedButtonPreview } from "@/components/previews/AnimatedButtonPreview";
import { DraggableNoteCardPreview } from "@/components/previews/DraggableNoteCardPreview";
import { GlassLoginCardPreview } from "@/components/previews/GlassLoginCardPreview";
import { GradientNavbarPreview } from "@/components/previews/GradientNavbarPreview";
import { PricingCardPreview } from "@/components/previews/PricingCardPreview";

interface PreviewRendererProps {
  previewType: string;
}

const FALLBACK_MESSAGE =
  "Bu component için canlı önizleme bulunmuyor. Kodunu inceleyip kendi projenizde kullanabilirsiniz.";

export function PreviewRenderer({ previewType }: PreviewRendererProps) {
  const normalizedType = previewType.trim().toLowerCase();

  switch (normalizedType) {
    case "animated-button":
      return <AnimatedButtonPreview />;
    case "pricing-card":
      return <PricingCardPreview />;
    case "glass-login-card":
      return <GlassLoginCardPreview />;
    case "gradient-navbar":
      return <GradientNavbarPreview />;
    case "draggable-note-card":
      return <DraggableNoteCardPreview />;
    default:
      return (
        <div className="max-w-sm rounded-xl border border-dashed border-zinc-600 bg-zinc-900/50 px-6 py-10 text-center text-sm leading-relaxed text-zinc-400">
          {FALLBACK_MESSAGE}
        </div>
      );
  }
}
