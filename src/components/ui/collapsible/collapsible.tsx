import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';

import { cn } from '@/lib/utils';

import css from './collapsible.module.css';

function CollapsibleRoot({
  className,
  ...props
}: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn(css.root, className)}
      {...props}
    />
  );
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(css.trigger, className)}
      {...props}
    >
      <span className={css.triggerLabel}>{children}</span>
      <span aria-hidden="true" className={css.triggerIcon}>
        <span className={css.triggerPlus}>+</span>
        <span className={css.triggerMinus}>−</span>
      </span>
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(css.content, className)}
      {...props}
    />
  );
}

export { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger };
