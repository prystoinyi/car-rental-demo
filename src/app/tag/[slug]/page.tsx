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
            title={`Tag: ${slug}`}
            path={`/tag/${slug}`}
            description="Tag archive placeholder."
        />
    );
}
