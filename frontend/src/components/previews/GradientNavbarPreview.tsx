"use client";

export function GradientNavbarPreview() {
  return (
    <nav className="flex w-full max-w-2xl items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-violet-950/80 via-zinc-900/90 to-fuchsia-950/80 px-5 py-3 shadow-lg backdrop-blur-md">
      <span className="text-sm font-bold text-white">ComponentHub</span>
      <div className="hidden items-center gap-6 text-sm text-zinc-300 sm:flex">
        <span className="cursor-default transition hover:text-white">Home</span>
        <span className="cursor-default transition hover:text-white">Components</span>
        <span className="cursor-default transition hover:text-white">Docs</span>
      </div>
      <button
        type="button"
        className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
      >
        Get Started
      </button>
    </nav>
  );
}
