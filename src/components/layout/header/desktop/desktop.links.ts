import type { Route } from 'next';

import { LINKS } from '../header.links';

type DesktopLinks = {
    primary: Array<{ href: Route; label: string }>;
    secondary: Array<{ href: Route; label: string }>;
};

export const DESKTOP_LINKS: DesktopLinks = {
    primary: [
        { ...LINKS.home },
        { ...LINKS.cars },
        { ...LINKS.brands },
    ],
    secondary: [
        { ...LINKS.services },
        { ...LINKS.blog },
        { ...LINKS.faqs },
        { ...LINKS.contact },
    ],
};
