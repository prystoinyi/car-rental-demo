export default function NotFound() {
    return (
        <section className="mx-auto flex min-h-[50vh] max-w-content flex-col items-center justify-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                alt="404"
                aria-hidden="true"
                className="h-auto w-full max-w-[518px] max-h-[345px] object-contain select-none"
                draggable={false}
                loading="lazy"
                src="/not-found-error.webp"
            />
            <h1
                className="
                    relative flex items-center justify-center gap-6
                    w-full max-w-[80%] -mt-[min(9%,45px)]
                    font-display text-[max(35px,min(3rem,12vw,75px))] text-accent-background leading-none font-semibold tracking-[-0.06em]
                    before:flex-1 before:content-[''] before:h-[2px] before:max-w-[5rem] before:bg-accent-background
                    after:flex-1 after:content-[''] after:h-[2px] after:max-w-[5rem] after:bg-accent-background"
            >
                404
            </h1>
            <p className="mt-0.5 text-xl text-balance font-normal text-default-muted-foreground">
                This page could not be found
            </p>
        </section>
    );
}
