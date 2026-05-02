import {
    CollapsibleContent,
    CollapsibleRoot,
    CollapsibleTrigger,
} from './collapsible';

const Collapsible = Object.assign(CollapsibleRoot, {
    Trigger: CollapsibleTrigger,
    Content: CollapsibleContent,
});

export { Collapsible };
