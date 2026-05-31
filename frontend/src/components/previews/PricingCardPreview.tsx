"use client";

export function PricingCardPreview() {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 shadow-xl transition hover:border-violet-500/30">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">Pro Plan</p>
      <p className="mt-2 text-4xl font-bold text-white">
        $29
        <span className="text-base font-normal text-zinc-400">/mo</span>
      </p>
      <ul className="mt-6 space-y-2 text-sm text-zinc-300">
        <li className="flex items-center gap-2">
          <span className="text-emerald-400">✓</span> Unlimited projects
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-400">✓</span> Priority support
        </li>
      </ul>
      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-violet-100 active:scale-[0.98]"
      >
        Subscribe
      </button>
    </div>
  );
}
