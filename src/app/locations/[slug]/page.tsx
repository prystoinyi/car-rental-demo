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
            title={`Location: ${slug}`}
            path={`/locations/${slug}`}
            description="Location landing page placeholder."
        />
    );
}
