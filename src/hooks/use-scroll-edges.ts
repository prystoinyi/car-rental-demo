import { useCallback } from 'react';

const SCROLL_EDGE_TOLERANCE = 1;

export function useScrollEdges() {
    return useCallback((element: HTMLDivElement | null) => {
        if (!element) return;

        let animationFrame: number | null = null;

        const updateIndicators = () => {
            const maxScrollTop = Math.max(0, element.scrollHeight - element.clientHeight);

            element.toggleAttribute('data-scroll-down', maxScrollTop - element.scrollTop > SCROLL_EDGE_TOLERANCE);
            element.toggleAttribute('data-scroll-up', element.scrollTop > SCROLL_EDGE_TOLERANCE);

            animationFrame = null;
        };

        const scheduleUpdate = () => {
            if (animationFrame !== null) return;

            animationFrame = window.requestAnimationFrame(updateIndicators);
        };

        const resizeObserver = 'ResizeObserver' in window
            ? new ResizeObserver(scheduleUpdate)
            : null;

        updateIndicators();

        element.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        resizeObserver?.observe(element);

        return () => {
            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }

            element.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            resizeObserver?.disconnect();

            element.toggleAttribute('data-scroll-down', false);
            element.toggleAttribute('data-scroll-up', false);
        };
    }, []);
};
