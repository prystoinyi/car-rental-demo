'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
    error: Error;
};

export default function GlobalError({ error }: GlobalErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-[#f9f8f8]">
                <main className="flex min-h-screen translate-y-[-8vh] flex-col items-center justify-center p-6 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="505"
                        aria-hidden="true"
                        className="h-auto w-full max-w-[540px] max-h-[360px] object-contain select-none"
                        draggable={false}
                        src="/critical-error.webp"
                    />
                    <h1
                        className="
                            relative flex items-center justify-center gap-6
                            w-full max-w-[80%] -mt-[min(3%,14px)]
                            font-display text-[min(2.5rem,60px)] text-[#d8ad53] leading-none font-semibold tracking-[-0.06em]
                            before:flex-1 before:content-[''] before:h-[2px] before:max-w-[5rem] before:bg-[#d8ad53]
                            after:flex-1 after:content-[''] after:h-[2px] after:max-w-[5rem] after:bg-[#d8ad53]"
                    >
                        505
                    </h1>
                    <p className="mt-2 text-xl text-balance font-normal text-[#4f4f4f]">
                        Oops! Something went wrong
                    </p>
                </main>
            </body>
        </html>
    );
}
