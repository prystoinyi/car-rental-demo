import type { LucideProps } from 'lucide-react';
import type { IconKey } from './icons';

import { icons } from './icons';

type IconProps = {
    symbol: IconKey | undefined;
} & Omit<LucideProps, 'symbol'>;

export function Icon({ symbol, ...props }: IconProps) {
    if (typeof symbol === 'string') {
        const IconComponent = icons[symbol];

        if (IconComponent) {
            return <IconComponent aria-hidden="true" {...props} />;
        }
    }

    return null;
}
