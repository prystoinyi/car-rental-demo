import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

import { cn } from '@/lib/utils';

import css from './accordion.module.css';

function AccordionRoot({ className, ...props }: AccordionPrimitive.Root.Props) {
    return (
        <AccordionPrimitive.Root
            data-slot="accordion"
            className={cn(css.root, className)}
            {...props}
        />
    );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
    return (
        <AccordionPrimitive.Item
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
}: AccordionPrimitive.Trigger.Props) {
    return (
        <AccordionPrimitive.Header className={css.header}>
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(css.trigger, className)}
                {...props}
            >
                {children}
                <span aria-hidden="true" className={css.triggerIcon}>
                    <span className={css.triggerPlus}>+</span>
                    <span className={css.triggerMinus}>−</span>
                </span>
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({
    className,
    children,
    ...props
}: AccordionPrimitive.Panel.Props) {
    return (
        <AccordionPrimitive.Panel
            data-slot="accordion-content"
            className={cn(css.panel, className)}
            {...props}
        >
            <div className={css.content}>{children}</div>
        </AccordionPrimitive.Panel>
    );
}

export { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger };
