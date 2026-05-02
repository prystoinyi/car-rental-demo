import { Button } from '@/components/ui/button';
import { Collapsible } from '@/components/ui/collapsible';

export default function Home() {
    return (
        <main className="min-h-screen px-6 py-16">
            <section className="mb-12">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-md border bg-white p-8 shadow-xs">
                    <span className="text-sm uppercase tracking-[0.2em]">
                        Route Skeleton
                    </span>
                    <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
                    <p className="max-w-2xl text-base leading-7">
                        Home page
                    </p>
                    <code className="w-fit rounded-full px-4 py-2 text-sm">
                        /
                    </code>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <Button bounce>Contact Us</Button>
                        <Button variant="primary" bounce>Book Now</Button>
                        <Button variant="dark">View Cars</Button>
                    </div>
                </div>
            </section>

            <section>
                <Collapsible>
                    <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
                    <Collapsible.Content>
                        Yes. Free to use for personal and commercial projects. No attribution
                        required.
                    </Collapsible.Content>
                </Collapsible>
            </section>
        </main>
    );
}
