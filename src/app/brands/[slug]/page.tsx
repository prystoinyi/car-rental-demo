import { RoutePlaceholder } from '@/components/route-placeholder';

type BrandPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BrandPage({ params }: BrandPageProps) {
    const { slug } = await params;

    return (
        <RoutePlaceholder
            title={`Brand: ${slug}`}
            path={`/brands/${slug}`}
            description="Brand landing page placeholder."
        />
    );
}
