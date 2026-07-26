import { useLayoutEffect } from 'react';

export function useLockBodyScroll(isLocked: boolean) {
    useLayoutEffect(() => {
        if (!isLocked) return;

        return lockBodyScroll();
    }, [isLocked]);
}

let lockCount = 0;
let initialScrollY = 0;

function lockBodyScroll() {
    const { documentElement } = document;

    if (lockCount === 0) {
        const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

        initialScrollY = window.scrollY;

        documentElement.style.setProperty('--scroll-lock-scrollbar-width', `${Math.max(scrollbarWidth, 0)}px`);
        documentElement.style.setProperty('--scroll-lock-top', `-${initialScrollY}px`);
        documentElement.setAttribute('data-scroll-locked', 'true');
    }

    lockCount += 1;

    return () => {
        lockCount = Math.max(lockCount - 1, 0);

        if (lockCount > 0) return;

        documentElement.style.setProperty('scroll-behavior', 'auto');
        documentElement.removeAttribute('data-scroll-locked');

        window.scrollTo(0, initialScrollY);

        documentElement.style.removeProperty('scroll-behavior');
        documentElement.style.removeProperty('--scroll-lock-scrollbar-width');
        documentElement.style.removeProperty('--scroll-lock-top');
    };
}
