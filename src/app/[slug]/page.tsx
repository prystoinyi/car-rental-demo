import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { topics } from '@/topics';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    return topics.map((topic) => ({
        slug: topic.pathname,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const topic = topics.find((t) => t.pathname === slug);

    if (!topic) {
        return {};
    }

    return topic.metadata;
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const topic = topics.find((t) => t.pathname === slug);

    if (!topic) {
        notFound();
    }

    const Component = topic.component;

    return <Component />;
}
