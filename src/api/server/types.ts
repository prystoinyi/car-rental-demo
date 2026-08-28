import type { Brand } from '#api/types';

export type ServerApi = {
    brands: {
        getAll(): Promise<Brand.Dto[]>;
        getBySlug(slug: string): Promise<Brand.Dto | null>;
    };
};
