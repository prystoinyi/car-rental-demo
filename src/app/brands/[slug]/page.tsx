import { RoutePlaceholder } from '@/components/route-placeholder';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { slug } = await params;

    return (
        <RoutePlaceholder
            title={`Brand: ${slug}`}
            path={`/brands/${slug}`}
            description="Brand landing page placeholder."
        />
    );
}
