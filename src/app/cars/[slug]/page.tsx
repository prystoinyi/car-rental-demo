import { RoutePlaceholder } from "@/components/route-placeholder";

type CarCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CarCategoryPage({
  params,
}: CarCategoryPageProps) {
  const { slug } = await params;

  return (
    <RoutePlaceholder
      title={`Car Category: ${slug}`}
      path={`/cars/${slug}`}
      description="Category listing placeholder."
    />
  );
}
