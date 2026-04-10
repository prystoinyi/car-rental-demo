import { RoutePlaceholder } from "@/components/route-placeholder";

type TagPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  return (
    <RoutePlaceholder
      title={`Tag: ${slug}`}
      path={`/tag/${slug}`}
      description="Tag archive placeholder."
    />
  );
}
