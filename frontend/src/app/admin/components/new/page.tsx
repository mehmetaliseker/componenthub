import { NewComponentForm } from "@/components/admin/NewComponentForm";

export default function NewComponentAdminPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Yeni Component Ekle</h1>
        <p className="mt-2 text-zinc-400">
          Responsive-first kurallara uygun yeni bir component ekleyin. Kod metin
          olarak saklanır; kullanıcı kodu doğrudan çalıştırılmaz.
        </p>
      </div>
      <NewComponentForm />
    </section>
  );
}
