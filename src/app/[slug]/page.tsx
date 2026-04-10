import { RoutePlaceholder } from "@/components/route-placeholder";

type RootSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RootSlugPage({ params }: RootSlugPageProps) {
  const { slug } = await params;

  return (
    <RoutePlaceholder
      title={`Standalone Page: ${slug}`}
      path={`/${slug}`}
      description="Root-level landing page or article placeholder."
    />
  );
}
