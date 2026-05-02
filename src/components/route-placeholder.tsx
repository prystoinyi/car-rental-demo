type RoutePlaceholderProps = {
    title: string;
    path: string;
    description?: string;
};

export function RoutePlaceholder({
    title,
    path,
    description = 'Content migration placeholder.',
}: RoutePlaceholderProps) {
    return (
        <main className="min-h-screen px-6 py-16">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-md border bg-white p-8 shadow-sm">
                <span className="text-sm uppercase tracking-[0.2em]">
                    Route Skeleton
                </span>
                <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
                <p className="max-w-2xl text-base leading-7">
                    {description}
                </p>
                <code className="w-fit rounded-full px-4 py-2 text-sm">
                    {path}
                </code>
            </div>
        </main>
    );
}
