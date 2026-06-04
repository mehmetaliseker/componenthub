"use client";

export function GradientNavbarPreview() {
  return (
    <nav className="flex w-full max-w-2xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-950/80 via-zinc-900/90 to-fuchsia-950/80 px-4 py-3 shadow-lg backdrop-blur-md sm:flex-nowrap sm:px-5">
      <span className="text-sm font-bold text-white">ComponentHub</span>
      <div className="order-3 flex w-full items-center gap-4 overflow-x-auto text-sm text-zinc-300 sm:order-none sm:w-auto sm:gap-6">
        <span className="cursor-default whitespace-nowrap transition hover:text-white">Ana Sayfa</span>
        <span className="cursor-default whitespace-nowrap transition hover:text-white">Componentler</span>
        <span className="cursor-default whitespace-nowrap transition hover:text-white">Dokümanlar</span>
      </div>
      <button
        type="button"
        className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
      >
        Başla
      </button>
    </nav>
  );
}
