import type { ImageProps } from 'next/image';

import NextImage from 'next/image';

import { cn } from '@/lib/utils';

import css from './image.module.css';

export function Image({ className, ...props }: ImageProps) {
    return <NextImage className={cn(css.image, className)} {...props} />;
}
