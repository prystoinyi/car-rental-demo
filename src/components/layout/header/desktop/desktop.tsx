import type { Brand } from '#api/types';

import { logo } from '@/assets';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { PHONE, SOCIAL_LINK } from '@/lib/contacts';
import { route } from '@/lib/navigation/route';

import { Navigation } from './navigation/navigation';

import css from './desktop.module.css';

type DesktopHeaderProps = {
    brands: Brand.Dto[];
};

const SOCIAL_LINKS = [
    { blank: true,  href: SOCIAL_LINK.instagram, label: 'Instagram',              content: <Icon symbol="camera" /> },
    { blank: true,  href: SOCIAL_LINK.whatsapp,  label: 'Chat on WhatsApp',       content: <Icon symbol="message-circle" /> },
    { blank: true,  href: SOCIAL_LINK.facebook,  label: 'Facebook',               content: 'f' },
    { blank: false, href: PHONE.telHref,         label: 'Call Luxury Car Rental', content: <Icon symbol='phone' /> },
] as const;

export function DesktopHeader({ brands }: DesktopHeaderProps) {
    return (
        <div className={css.desktop} data-desktop="">
            <div className={css.topBar}>
                <div className={css.socials}>
                    {SOCIAL_LINKS.map((social, index) => (
                        <Button
                            key={index}
                            className={css.socialLink}
                            href={social.href}
                            target={social.blank ? '_blank' : undefined}
                            rel={social.blank ? 'noreferrer' : undefined}
                            aria-label={social.label}
                            color='primary'
                        >
                            {social.content}
                        </Button>
                    ))}
                </div>
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
                <div className={css.contact}>
                    <Button href={PHONE.telHref} color="primary" className={css.callNowBtn} text='Call Now' />
                </div>
            </div>
            <Navigation brands={brands} />
        </div>
    );
}
