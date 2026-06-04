import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative isolate mx-auto max-w-6xl overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-600/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 text-center">
        <p className="mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
          ComponentHub
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          ComponentHub ile{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            canlı önizle
          </span>
          , kodu kopyala
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Kayıtlı React ve Next.js componentlerini güvenli önizlemelerle keşfet,
          kullanım açıklamalarını oku ve üretime hazır kodu tek tıkla al.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/components"
            className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:opacity-90"
          >
            Galeriyi Keşfet
          </Link>
          <Link
            href="/admin/components/new"
            className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/5"
          >
            Component Ekle
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-20 grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Canlı Önizleme",
            text: "Hazır componentler güvenli önizleme tipleriyle responsive olarak gösterilir.",
          },
          {
            title: "Kod Kopyalama",
            text: "JSX, TSX, CSS ve TailwindCSS sürümlerini kontrollü sekmelerde inceleyip kopyala.",
          },
          {
            title: "Güvenli Admin",
            text: "Kullanıcı kodu doğrudan çalıştırılmaz; veri modeli kontrollü şekilde saklanır.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-500/30"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
