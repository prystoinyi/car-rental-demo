import type { LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef, JSX } from 'react';

import Link from 'next/link';
import { Button } from '@base-ui/react/button';

import { cn } from '@/lib/utils';

import css from './button.module.css';

type ButtonVariant = 'default' | 'unstyled';
type ButtonColor = 'default' | 'primary' | 'secondary' | 'dark';

type ButtonStyleProps = {
    variant?: ButtonVariant;
    color?: ButtonColor;
    bounce?: boolean;
    className?: string;
};

type ButtonProps = Omit<Button.Props, 'className' | 'color'> & ButtonStyleProps;

type ButtonLinkProps<R extends string> = LinkProps<R>
    & Omit<ComponentPropsWithoutRef<'a'>, keyof LinkProps<R>>
    & ButtonStyleProps;

function ButtonImpl(props: ButtonProps): JSX.Element;
function ButtonImpl<R extends string>(props: ButtonLinkProps<R>): JSX.Element;
function ButtonImpl(props: ButtonProps | ButtonLinkProps<any>) {
    const {
        className,
        variant = 'default',
        color = 'default',
        bounce = false,
        ...restProps
    } = props;

    const classes = variant === 'unstyled'
        ? className
        : cn(css.root, css[color], bounce && css.bounce, className);

    if ('href' in restProps) {
        return (
            <Link
                data-slot="button"
                data-button-element="link"
                className={classes}
                {...restProps}
            />
        );
    }

    return (
        <Button
            data-slot="button"
            data-button-element="button"
            className={classes}
            {...restProps}
        />
    );
}

export { ButtonImpl as Button };
