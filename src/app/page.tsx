import { RoutePlaceholder } from '@/components/route-placeholder';
import { Button } from '@/components/ui/button';
import { Collapsible } from '@/components/ui/collapsible';

export default function Page() {
    return (
        <>
            <RoutePlaceholder
                title="Home"
                path="/"
                description="Home page"
            >
                <div className="flex flex-wrap gap-3 pt-2">
                    <Button bounce>Contact Us</Button>
                    <Button variant="primary" bounce>Book Now</Button>
                    <Button variant="dark">View Cars</Button>
                </div>
            </RoutePlaceholder>

            <section className="mt-12">
                <Collapsible open>
                    <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
                    <Collapsible.Content>
                        Yes. Free to use for personal and commercial projects. No attribution
                        required.
                    </Collapsible.Content>
                </Collapsible>
                <br/>
                <Collapsible open>
                    <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
                    <Collapsible.Content>
                        Yes. Free to use for personal and commercial projects. No attribution
                        required.
                    </Collapsible.Content>
                </Collapsible>
            </section>
        </>
    );
}
