import { api } from '#api';

import { DesktopHeader } from './desktop/desktop';
import { MobileHeader } from './mobile/mobile';

import css from './header.module.css';

export async function Header() {
    const brands = await api.brands.getAll();

    return (
        <header className={css.root}>
            <DesktopHeader brands={brands} />
            <MobileHeader brands={brands} />
        </header>
    );
}
