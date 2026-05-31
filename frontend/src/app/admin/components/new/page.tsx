import { NewComponentForm } from "@/components/admin/NewComponentForm";

export default function NewComponentAdminPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Yeni Component</h1>
        <p className="mt-2 text-zinc-400">
          Admin panelinden yeni bir bileşen ekleyin. Kod yalnızca gösterilir; çalıştırılmaz.
        </p>
      </div>
      <NewComponentForm />
    </section>
  );
}
