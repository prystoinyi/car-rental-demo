import {
    AccordionContent,
    AccordionItem,
    AccordionRoot,
    AccordionTrigger,
} from './accordion';

const Accordion = Object.assign(AccordionRoot, {
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
});

export { Accordion };
