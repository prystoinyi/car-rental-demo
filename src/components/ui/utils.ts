export function cssVars(vars: Record<`--${string}`, string | number>) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return vars as React.CSSProperties;
}
