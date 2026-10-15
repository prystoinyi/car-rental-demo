'use client';

import type { IconKey } from '@/components/ui/icon/icons';
import type { Brand } from '@/types';

import { useEffect } from 'react';

import { logo } from '@/assets';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { route } from '@/lib/navigation/route';

import { MOBILE_LINKS } from '../mobile.links';

import { Brands } from './brands/brands';

import css from './panel.module.css';

type PanelProps = {
    brands: Brand[];
};

export function Panel({ brands }: PanelProps) {
    const handle = Drawer.createHandle();

    useEffect(() => {
        const breakpoint = getComputedStyle(document.documentElement)
            .getPropertyValue('--desktop-breakpoint')
            .trim();

        const mql = window.matchMedia(`(min-width: ${breakpoint})`);

        const handleChange = () => {
            if (mql.matches) handle.close();
        };

        mql.addEventListener('change', handleChange);

        return () => mql.removeEventListener('change', handleChange);
    }, [handle]);

    return (
        <Drawer swipeDirection="right" handle={handle}>
            <Drawer.Trigger
                render={
                    <Button variant="unstyled" className={css.trigger}>
                        <Icon symbol='menu' className={css.triggerIcon} />
                    </Button>
                }
            />
            <Drawer.Portal>
                <Drawer.Backdrop className={css.backdrop} />
                <Drawer.Viewport className={css.viewport}>
                    <Drawer.Popup className={css.popup}>
                        <Drawer.Content className={css.content}>
                            <div className={css.header}>
                                <Button
                                    variant="unstyled"
                                    aria-label="Luxury Car Rental Home"
                                    href={route.index()}
                                    onClick={() => handle.close()}
                                >
                                    <Image
                                        className={css.logo}
                                        src={logo}
                                        alt="Luxury Car Rental Logo"
                                        preload
                                    />
                                </Button>
                                <Button
                                    variant="unstyled"
                                    className={css.close}
                                    type="button"
                                    aria-label="Close mobile navigation"
                                    onClick={() => handle.close()}
                                >
                                    <Icon symbol='x' className={css.closeIcon} />
                                </Button>
                            </div>

                            <div className={css.links}>
                                {MOBILE_LINKS.map(({ icon, href, label }) => {
                                    if (route.brands.is(href)) {
                                        return <Brands
                                            key={href}
                                            brands={brands}
                                            onNavigate={() => handle.close()}
                                            Trigger={<Link icon={icon} label={label} isList />}
                                        />;
                                    }

                                    return <Link key={href} href={href} icon={icon} label={label} onClick={() => handle.close()} />;
                                })}
                            </div>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Portal>
        </Drawer>
    );
}

const Link = ({ icon, label, isList, ...props }: {
    icon: IconKey;
    label: string;
    isList?: boolean;
    href?: string;
    onClick?: () => void;
}) => {
    return (
        <Button
            variant='unstyled'
            className={css.link}
            {...props}
        >
            <span className={css.linkLabel}>
                <Icon symbol={icon} className={css.linkIcon} />
                {label}
            </span>

            {isList && (
                <Icon symbol="chevron-right" className={css.linkListIcon} />
            )}
        </Button>
    );
};
