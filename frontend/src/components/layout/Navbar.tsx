import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-lg shadow-violet-500/30">
            CH
          </span>
          <span className="text-lg font-semibold tracking-tight text-white group-hover:text-violet-200 transition-colors">
            ComponentHub
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/components"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            Galeri
          </Link>
          <Link
            href="/admin/components/new"
            className="rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
          >
            Yeni Component
          </Link>
        </div>
      </nav>
    </header>
  );
}
