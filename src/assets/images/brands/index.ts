import type { StaticImageData } from 'next/image';

import { isStaticImageData } from '@/assets/utils';

export const brands = new Map(
    Object.entries(
        import.meta.glob('./*.webp', {
            eager: true,
            import: 'default',
        })
    )
        .filter((pair): pair is [string, StaticImageData] => isStaticImageData(pair[1]))
        .map(([path, data]) => [
            path.replace('./', '').replace(/\.\w+$/, ''),
            data.src,
        ]),
);
