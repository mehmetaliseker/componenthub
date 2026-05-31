import { ComponentDetailView } from "@/components/component-detail/ComponentDetailView";

export const dynamic = "force-dynamic";

interface ComponentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ComponentDetailPage({ params }: ComponentDetailPageProps) {
  const { slug } = await params;
  return <ComponentDetailView slug={slug} />;
}
