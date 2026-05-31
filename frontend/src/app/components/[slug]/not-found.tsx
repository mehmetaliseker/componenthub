import Link from "next/link";

export default function ComponentNotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-white">Component bulunamadı</h1>
      <p className="mt-2 text-zinc-400">Aradığınız slug mevcut değil.</p>
      <Link
        href="/components"
        className="mt-6 inline-block text-violet-400 hover:text-violet-300"
      >
        Galeriye dön
      </Link>
    </section>
  );
}
