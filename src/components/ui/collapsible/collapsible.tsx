import { Collapsible } from '@base-ui/react/collapsible';

function CollapsibleRoot({ ...props }: Collapsible.Root.Props) {
    return (
        <Collapsible.Root
            data-slot="collapsible"
            {...props}
        />
    );
}

function CollapsibleTrigger({ ...props }: Collapsible.Trigger.Props) {
    return (
        <Collapsible.Trigger
            data-slot="collapsible-trigger"
            {...props}
        />
    );
}

function CollapsiblePanel({ ...props }: Collapsible.Panel.Props) {
    return (
        <Collapsible.Panel
            data-slot="collapsible-content"
            {...props}
        />
    );
}

export { CollapsiblePanel, CollapsibleRoot, CollapsibleTrigger };
