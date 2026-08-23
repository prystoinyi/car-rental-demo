import {
    CollapsiblePanel,
    CollapsibleRoot,
    CollapsibleTrigger,
} from './collapsible';

const Collapsible = Object.assign(CollapsibleRoot, {
    Trigger: CollapsibleTrigger,
    Content: CollapsiblePanel,
});

export { Collapsible };
