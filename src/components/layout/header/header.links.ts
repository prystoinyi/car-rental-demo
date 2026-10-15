import { route } from '@/lib/navigation/route';

export const LINKS = {
    home: { href: route.index(), label: 'Home' },
    cars: { href: '/cars', label: 'Our Fleet' },
    brands: { href: route.brands(), label: 'Brands' },
    services: { href: route.services(), label: 'Services' },
    locations: { href: route.locations(), label: 'Locations' },
    blog: { href: route.blog(), label: 'Blog' },
    faqs: { href: route.faqs(), label: 'FAQS' },
    contact: { href: route.contact(), label: 'Contact Us' },
    about: { href: route.about(), label: 'About Us' },
} as const;
