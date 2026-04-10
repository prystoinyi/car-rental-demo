import { RoutePlaceholder } from "@/components/route-placeholder";

type RentCarPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RentCarPage({ params }: RentCarPageProps) {
  const { slug } = await params;

  return (
    <RoutePlaceholder
      title={`Car Detail: ${slug}`}
      path={`/rent-cars/${slug}`}
      description="Individual car page placeholder."
    />
  );
}
