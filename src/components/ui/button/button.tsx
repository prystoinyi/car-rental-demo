import { Button as ButtonPrimitive } from '@base-ui/react/button';

import { cn } from '@/lib/utils';

import css from './button.module.css';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'dark';

type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant;
  bounce?: boolean;
};

function Button({
  className,
  variant = 'default',
  bounce = false,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(css.root, css[variant], bounce && css.bounce, className)}
      {...props}
    />
  );
}

export { Button };
export type { ButtonProps, ButtonVariant };
