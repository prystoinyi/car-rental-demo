import type { ReactElement } from 'react';
import type { Brand } from '@/types';

import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { Collapsible } from '@/components/ui/collapsible';
import { Image } from '@/components/ui/image';
import { cssVars } from '@/components/ui/utils';
import { useScrollEdges } from '@/hooks';
import { route } from '@/lib/navigation/route';

import css from './brands.module.css';

type BrandsProps = {
    brands: Brand[];
    Trigger: ReactElement;
    onNavigate: () => void;
};

export function Brands({ brands, Trigger, onNavigate }: BrandsProps) {
    const useScrollEdgesRef = useScrollEdges();

    return (
        <Collapsible>
            <Collapsible.Trigger render={Trigger} />

            <Collapsible.Content className={css.brandGridShell} ref={useScrollEdgesRef}>
                {brands.map((brand, index) => (
                    <BrandRow
                        key={brand.slug}
                        index={index}
                        imageSrc={brand.imageSrc}
                        name={brand.name}
                        slug={brand.slug}
                        onNavigate={onNavigate}
                    />
                ))}
            </Collapsible.Content>
        </Collapsible>
    );
}

type BrandRowProps = Brand & {
    index: number;
    onNavigate: () => void;
};

const IMAGE_ASPECT_RATIONS: Record<string, Required<React.CSSProperties>['aspectRatio']> = {
    'aston-martin': '3/2',
    'audi': '3/2',
    'mclaren': '2/1',
    'bentley': '3/2',
    'gmc': '3/2',
    'mercedes': '4/3',
    'maserati': '5/4',
    'range-rover': '3/2',
};

const BrandRow = memo(function BrandRow({ name, slug, imageSrc, index, onNavigate }: BrandRowProps) {
    return (
        <Button
            variant="unstyled"
            className={css.brandLink}
            style={cssVars({ '--i': index })}
            href={route.brand(slug)}
            onClick={onNavigate}
        >
            <span className={css.brandName}>{name}</span>
            {imageSrc && (
                <span className={css.brandImgRoot}>
                    <span
                        className={css.brandImgFrame}
                        style={{ aspectRatio: IMAGE_ASPECT_RATIONS[slug] }}
                    >
                        <Image
                            className={css.brandImg}
                            src={imageSrc}
                            alt={name}
                            width={32}
                            height={32}
                        />
                    </span>
                </span>
            )}
        </Button>
    );
});
