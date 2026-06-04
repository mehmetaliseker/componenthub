"use client";

export function PricingCardPreview() {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 shadow-xl transition hover:border-violet-500/30 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">Pro Paket</p>
      <p className="mt-2 text-4xl font-bold text-white">
        ₺899
        <span className="text-base font-normal text-zinc-400">/ay</span>
      </p>
      <ul className="mt-6 space-y-2 text-sm text-zinc-300">
        <li className="flex items-center gap-2">
          <span className="text-emerald-400">✓</span> Sınırsız proje
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-400">✓</span> Öncelikli destek
        </li>
      </ul>
      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-violet-100 active:scale-[0.98]"
      >
        Paketi Seç
      </button>
    </div>
  );
}
