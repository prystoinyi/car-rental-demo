import type { Brand } from '@/types';

import { logo } from '@/assets';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { PHONE } from '@/lib/contacts';
import { route } from '@/lib/navigation/routes';

import { Panel } from './panel/panel';

import css from './mobile.module.css';

type MobileHeaderProps = {
    brands: Brand[];
};

export function MobileHeader({ brands }: MobileHeaderProps) {
    return (
        <>
            <div className={css.mobile} data-mobile="">
                <div className={css.brand}>
                    <Button
                        variant="unstyled"
                        aria-label="Luxury Car Rental Home"
                        href={route.index()}
                    >
                        <Image
                            src={logo}
                            className={css.logo}
                            alt="Luxury Car Rental Logo"
                            preload
                        />
                    </Button>
                </div>

                <div className={css.controls}>
                    <Button href={PHONE.telHref} color="primary" className={css.callNowBtn}>
                        <span className={css.callNowBtnText}>Call Now</span>
                        <Icon symbol='phone' className={css.callNowBtnIcon} />
                    </Button>

                    <Panel brands={brands} />
                </div>
            </div>
        </>
    );
}
