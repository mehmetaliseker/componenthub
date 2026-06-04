"use client";

export function GlassLoginCardPreview() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      <h2 className="text-xl font-semibold text-white">Tekrar hoş geldiniz</h2>
      <p className="mt-1 text-sm text-zinc-400">Hesabınıza giriş yapın</p>
      <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
        <input
          type="email"
          placeholder="E-posta"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
        />
        <input
          type="password"
          placeholder="Şifre"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
