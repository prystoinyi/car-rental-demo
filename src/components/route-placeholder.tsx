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
    return (
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-md border bg-default-background p-8 shadow-sm">
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
    );
}
