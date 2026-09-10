'use client';

import { useState } from 'react';

import { Icon } from '@/components/ui/icon';

type Props = React.PropsWithChildren<{
    title: string;
    path: string;
    description?: string;
}>;

export function RoutePlaceholder({
    title,
    path,
    description = 'Content migration placeholder',
    children,
}: Props) {
    const [animationDelay] = useState(getAnimationDelay);

    return (
        <>
            <style>{`
                @keyframes brand-shift {
                    from {
                        filter: hue-rotate(-10deg);
                    }

                    to {
                        filter: hue-rotate(10deg);
                    }
                }
            `}</style>

            <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-md border bg-default-background p-8 shadow-sm">
                <Icon
                    symbol="cog"
                    suppressHydrationWarning
                    style={{ animationDelay }}
                    className="absolute top-8 right-8 size-10 text-accent-background animate-[brand-shift_2s_ease-in-out_infinite_alternate,spin_24s_linear_infinite] motion-reduce:animate-none"
                />
                <span className="text-sm uppercase tracking-[0.2em]">
                    Route Skeleton
                </span>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                <p className="max-w-2xl text-base leading-7">
                    {description}
                </p>
                <code className="w-fit rounded-full px-4 py-2 text-sm">
                    {path}
                </code>
                {children}
            </section>
        </>
    );
}

function getAnimationDelay() {
    const now = Date.now();
    const brandShiftPhase = now % 4000;
    const spinPhase = now % 24000;

    return `-${brandShiftPhase}ms, -${spinPhase}ms`;
}
