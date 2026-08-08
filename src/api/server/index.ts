import 'server-only';

import type { Brand } from '#api/types';
import type { ServerApi } from './types';

import { brand } from '@/assets';

import { get } from '../_core/methods';

import { API_URL } from './config';

export { APIRequestError } from '../_core/errors';

export const api: ServerApi = {
    brands: {
        getAll: async () => {
            const brands = await get<Brand.Dto[]>(`${API_URL}/brands`);

            return brands.map((v) => ({
                slug: v.slug,
                name: v.name,
                imageSrc: v.imageSrc || brand.get(v.slug),
            }));
        },
    },
};
