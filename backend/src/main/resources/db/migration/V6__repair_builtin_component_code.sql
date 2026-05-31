-- V6: Repair built-in component_code (idempotent upsert)
INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Animated Button',
    'animated-button',
    'Hover ve active animasyonlarına sahip modern CTA butonu.',
    'Button',
    'animated-button',
    $v6_animated$
"use client";

export default function AnimatedButton() {
  return (
    <button
      type="button"
      className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/40 active:scale-95"
    >
      Get Started
    </button>
  );
}
$v6_animated$,
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
    is_builtin = TRUE,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Pricing Card',
    'pricing-card',
    'Ürün veya abonelik paketleri için fiyat kartı.',
    'Card',
    'pricing-card',
    $v6_pricing$
"use client";

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
}
$v6_pricing$,
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
    is_builtin = TRUE,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Glass Login Card',
    'glass-login-card',
    'Glassmorphism stilinde modern giriş formu kartı.',
    'Form',
    'glass-login-card',
    $v6_glass$
"use client";

export default function GlassLoginCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Welcome back</h2>
      <p className="mt-1 text-sm text-zinc-400">Sign in to your account</p>
      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
$v6_glass$,
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
    is_builtin = TRUE,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Gradient Navbar',
    'gradient-navbar',
    'Logo, linkler ve CTA butonu içeren modern navbar.',
    'Navigation',
    'gradient-navbar',
    $v6_navbar$
"use client";

export default function GradientNavbar() {
  return (
    <nav className="flex w-full max-w-2xl items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-violet-950/80 via-zinc-900/90 to-fuchsia-950/80 px-5 py-3 shadow-lg backdrop-blur-md">
      <span className="text-sm font-bold text-white">ComponentHub</span>
      <div className="hidden items-center gap-6 text-sm text-zinc-300 sm:flex">
        <a href="#" className="transition hover:text-white">Home</a>
        <a href="#" className="transition hover:text-white">Components</a>
        <a href="#" className="transition hover:text-white">Docs</a>
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
$v6_navbar$,
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
    is_builtin = TRUE,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO ui_components (name, slug, description, category, preview_type, component_code, style_code, is_builtin)
VALUES (
    'Draggable Note Card',
    'draggable-note-card',
    'Kullanıcının tutup sürükleyebileceği interaktif not kartı.',
    'Interactive',
    'draggable-note-card',
    $v6_draggable$
"use client";

import { useRef, useState, type PointerEvent } from "react";

interface Position {
  x: number;
  y: number;
}

export default function DraggableNoteCard() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ pointerX: 0, pointerY: 0, posX: 0, posY: 0 });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>): void {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      posX: position.x,
      posY: position.y,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    if (!dragging) {
      return;
    }
    setPosition({
      x: dragStart.current.posX + (event.clientX - dragStart.current.pointerX),
      y: dragStart.current.posY + (event.clientY - dragStart.current.pointerY),
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>): void {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);
  }

  const transformStyle = "translate(" + position.x + "px, " + position.y + "px)";
  const cardClassName =
    "w-56 cursor-grab rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 shadow-xl backdrop-blur-sm active:cursor-grabbing " +
    (dragging ? "ring-2 ring-amber-400/50" : "");

  return (
    <div className="relative min-h-[240px] w-full">
      <div
        role="presentation"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ transform: transformStyle }}
        className={cardClassName}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Note</p>
        <p className="mt-2 text-sm text-zinc-200">Drag me anywhere in the preview area.</p>
      </div>
    </div>
  );
}
$v6_draggable$,
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
    is_builtin = TRUE,
    updated_at = CURRENT_TIMESTAMP;
