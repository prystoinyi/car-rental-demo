import { RoutePlaceholder } from "@/components/route-placeholder";

type LocationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;

  return (
    <RoutePlaceholder
      title={`Location: ${slug}`}
      path={`/location/${slug}`}
      description="Location landing page placeholder."
    />
  );
}
