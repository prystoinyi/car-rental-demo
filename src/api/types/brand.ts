import type { Brand } from '@/types';

export type Dto = Pick<Brand,
    | 'slug'
    | 'name'
    | 'imageSrc'
> & {
    imageSrcAlt?: string;
};
