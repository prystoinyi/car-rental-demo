import type { Route } from 'next';
import type { IconKey } from '@/components/ui/icon/icons';

import { LINKS } from '../header.links';

type MobileLinks = Array<{ href: Route; label: string; icon: IconKey }>;

export const MOBILE_LINKS: MobileLinks = [
    { ...LINKS.home, icon: 'home' },
    { ...LINKS.cars, icon: 'car-front' },
    { ...LINKS.brands, icon: 'badge' },
    { ...LINKS.services, icon: 'wrench' },
    { ...LINKS.locations, icon: 'map-pin' },
    { ...LINKS.blog, icon: 'newspaper' },
    { ...LINKS.faqs, icon: 'circle-help' },
    { ...LINKS.contact, icon: 'mail' },
    { ...LINKS.about, icon: 'info' },
];
