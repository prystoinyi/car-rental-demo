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
                <section className="rounded-xs bg-default-divider p-4">
                    <h2 className="mb-1">Buttons</h2>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <Button color="default" text='Default' />
                        <Button color="primary" text='Primary' />
                        <Button color="secondary" text='Secondary' />
                        <Button color="dark" text='Dark' />
                    </div>
                </section>

                <section className="rounded-xs bg-default-divider p-4 mt-4">
                    <h2 className="mb-3">Accordion</h2>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Trigger>What documents do I need to rent a car?</Accordion.Trigger>
                            <Accordion.Content>
                                You need a valid driver&apos;s license, a passport or ID, and a payment card.
                            </Accordion.Content>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Trigger>Can I cancel or change my booking?</Accordion.Trigger>
                            <Accordion.Content>
                                Yes. You can change or cancel your booking by contacting our support team in advance.
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </section>
            </RoutePlaceholder>
        </>
    );
}
