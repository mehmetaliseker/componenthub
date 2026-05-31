INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Animated Button',
    'animated-button',
    'Gradient kenarlıklı, hover ve active state''li modern bir buton bileşeni. Tailwind ile yazılmıştır.',
    'Buttons',
    'animated-button',
    '"use client";

export default function AnimatedButton() {
  return (
    <button
      type="button"
      className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/40 active:scale-95"
    >
      Get Started
    </button>
  );
}',
    NULL,
    TRUE
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    preview_type = EXCLUDED.preview_type,
    component_code = EXCLUDED.component_code,
    style_code = EXCLUDED.style_code,
    is_builtin = EXCLUDED.is_builtin,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Pricing Card',
    'pricing-card',
    'Plan özelliklerini ve fiyatı gösteren şık bir kart bileşeni. Tailwind utility class''ları kullanır.',
    'Cards',
    'pricing-card',
    '"use client";

export default function PricingCard() {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">Pro Plan</p>
      <p className="mt-2 text-4xl font-bold text-white">
        $29<span className="text-base font-normal text-zinc-400">/mo</span>
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
}',
    NULL,
    TRUE
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    preview_type = EXCLUDED.preview_type,
    component_code = EXCLUDED.component_code,
    style_code = EXCLUDED.style_code,
    is_builtin = EXCLUDED.is_builtin,
    updated_at = CURRENT_TIMESTAMP;
