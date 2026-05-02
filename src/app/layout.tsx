import './globals.css';

import { Montserrat, Poppins } from 'next/font/google';
import type { Metadata } from 'next';

const montserrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
});

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Super Car Rental',
    description: 'Next.js rebuild in progress.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-scroll-behavior="smooth" className={`${montserrat.variable} ${poppins.variable}`}>
            <body>{children}</body>
        </html>
    );
}
