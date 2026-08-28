import { api } from '#api';
import { RoutePlaceholder } from '@/components/route-placeholder';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const brand = await api.brands.getBySlug(slug);

    return (
        <RoutePlaceholder
            title={`Brand: ${brand?.name}`}
            path={`/brands/${slug}`}
            description="Brand landing page placeholder."
        />
    );
}
