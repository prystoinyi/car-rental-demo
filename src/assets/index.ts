import { brands } from './images/brands';

export { default as logo } from './images/logo.webp';

export const brand = {
    get: (slug: string) => brands.get(slug),
};
