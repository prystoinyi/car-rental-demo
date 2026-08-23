import { Accordion } from '@base-ui/react/accordion';

import { cn } from '@/lib/utils';

import css from './accordion.module.css';

function AccordionRoot({ className, ...props }: Accordion.Root.Props) {
    return (
        <Accordion.Root
            data-slot="accordion"
            className={cn(css.root, className)}
            {...props}
        />
    );
}

function AccordionItem({ className, ...props }: Accordion.Item.Props) {
    return (
        <Accordion.Item
            data-slot="accordion-item"
            className={cn(css.item, className)}
            {...props}
        />
    );
}

function AccordionTrigger({
    className,
    children,
    ...props
}: Accordion.Trigger.Props) {
    return (
        <Accordion.Header className={css.header}>
            <Accordion.Trigger
                data-slot="accordion-trigger"
                className={cn(css.trigger, className)}
                {...props}
            >
                {children}
                <span aria-hidden="true" className={css.triggerIcon}>
                    <span className={css.triggerPlus}>+</span>
                    <span className={css.triggerMinus}>−</span>
                </span>
            </Accordion.Trigger>
        </Accordion.Header>
    );
}

function AccordionContent({
    className,
    children,
    ...props
}: Accordion.Panel.Props) {
    return (
        <Accordion.Panel
            data-slot="accordion-content"
            className={cn(css.panel, className)}
            {...props}
        >
            <div className={css.content}>{children}</div>
        </Accordion.Panel>
    );
}

export { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger };
