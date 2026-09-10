import { RoutePlaceholder } from '@/components/route-placeholder';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export default function Page() {
    return (
        <>
            <RoutePlaceholder
                title="Home"
                path="/"
                description="Home page"
            >
                <br />
                <h2>Buttons</h2>
                <div className="flex flex-wrap gap-3 pt-2">
                    <Button color="default" text='Default' />
                    <Button color="primary" text='Primary' />
                    <Button color="secondary" text='Secondary' />
                    <Button color="dark" text='Dark' />
                </div>
            </RoutePlaceholder>

            <div className="pt-12">
                <Accordion multiple>
                    <Accordion.Item>
                        <Accordion.Trigger>Can I use this in my project?</Accordion.Trigger>
                        <Accordion.Content>
                            Yes. Free to use for personal and commercial projects. No attribution
                            required.
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Trigger>Can I use this in my project?</Accordion.Trigger>
                        <Accordion.Content>
                            Yes. Free to use for personal and commercial projects. No attribution
                            required.
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
}
