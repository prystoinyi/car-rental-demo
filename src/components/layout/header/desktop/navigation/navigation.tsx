import type { Brand } from '#api/types';

import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { cssVars } from '@/components/ui/utils';
import { route } from '@/lib/navigation/route';

import { DESKTOP_LINKS } from '../desktop.links';

import css from './navigation.module.css';

type NavigationProps = {
    brands: Brand.Dto[];
};
export function Navigation({ brands }: NavigationProps) {
    return (
        <NavigationMenu className={css.navigation}>
            <NavigationMenu.List className={css.primary}>
                {DESKTOP_LINKS.primary.map((link) => (
                    <NavigationMenu.Item key={link.href} className={css.item}>
                        {route.brands.is(link.href) ? (
                            <>
                                <NavigationMenu.Trigger render={<Button variant="unstyled" className={css.navLink} />}>
                                    <span className={css.navLinkLabel}>{link.label}</span>
                                    <NavigationMenu.Icon className={css.navLinkIcon}>
                                        <Icon symbol="chevron-down" />
                                    </NavigationMenu.Icon>
                                </NavigationMenu.Trigger>
                                <NavigationMenu.Content className={css.content}>
                                    {brands.map((brand) => (
                                        <NavigationMenu.Link
                                            key={brand.slug}
                                            closeOnClick
                                            render={
                                                <BrandLink
                                                    name={brand.name}
                                                    slug={brand.slug}
                                                    imageSrc={brand.imageSrc}
                                                    imageSrcAlt={brand.imageSrcAlt}
                                                />
                                            }
                                        />
                                    ))}
                                </NavigationMenu.Content>
                            </>
                        ) : (
                            <NavigationMenu.Link render={<Button variant="unstyled" href={link.href} className={css.navLink} />}>
                                <span className={css.navLinkLabel}>{link.label}</span>
                            </NavigationMenu.Link>
                        )}
                    </NavigationMenu.Item>
                ))}
            </NavigationMenu.List>
            <NavigationMenu.List className={css.secondary}>
                {DESKTOP_LINKS.secondary.map((link) => (
                    <NavigationMenu.Item key={link.href} className={css.item}>
                        <NavigationMenu.Link render={<Button variant="unstyled" href={link.href} className={css.navLink} />}>
                            <span className={css.navLinkLabel}>{link.label}</span>
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>
                ))}
            </NavigationMenu.List>
            <NavigationMenu.Portal>
                <NavigationMenu.Positioner className={css.positioner}>
                    <NavigationMenu.Popup className={css.popup}>
                        <NavigationMenu.Viewport className={css.menuViewport} />
                    </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
        </NavigationMenu>
    );
}

const BRAND_ICON_OVERRIDES: Record<string, { iconScale?: number; textOffset?: number }> = {
    'rolls-royce': { iconScale: 0.85, textOffset: -8 },
    'lamborghini': { iconScale: 0.85, textOffset: -2 },
    'ferrari': { iconScale: 0.85, textOffset: -4 },
    'mclaren': { iconScale: 1.5, textOffset: -4 },
    'bmw': { iconScale: 0.85, textOffset: -4 },
    'range-rover': { iconScale: 1.1, textOffset: -4 },
    'maserati': { iconScale: 1.4, textOffset: -6 },
    'porsche': { iconScale: 1, textOffset: -6 },
    'audi': { iconScale: 1, textOffset: -4 },
    'brabus': { iconScale: 0.85, textOffset: -4 },
    'gmc': { iconScale: 1.2, textOffset: -2 },
    'tesla': { iconScale: 0.85, textOffset: -4 },
    'mercedes': { iconScale: 1.1, textOffset: -8 },
    'cadillac': { iconScale: 1, textOffset: -4 },
    'aston-martin': { iconScale: 1, textOffset: 0 },
    'bentley': { iconScale: 1, textOffset: 0 },
};

type BrandLinkProps = Brand.Dto;

const BrandLink = memo(function BrandRow({ name, slug, ...images }: BrandLinkProps) {
    const config = BRAND_ICON_OVERRIDES[slug];
    const hasImage = ((imgs: typeof images): imgs is typeof images & { imageSrc: string } =>
        Boolean(imgs.imageSrcAlt || imgs.imageSrc))(images);

    return (
        <Button
            variant="unstyled"
            href={route.brand(slug)}
            className={css.brandLink}
            style={cssVars({
                '--icon-scale': hasImage ? config?.iconScale ?? 1 : 1,
                '--text-offset': hasImage ? `${config?.textOffset ?? 0}px` : '0px',
            })}
        >
            {hasImage && (
                <span className={css.brandLogo}>
                    <Image
                        src={images.imageSrcAlt ?? images.imageSrc}
                        alt={name}
                        width={512}
                        height={512}
                    />
                </span>
            )}
            <span className={css.brandName}>{name}</span>
        </Button>
    );
});
