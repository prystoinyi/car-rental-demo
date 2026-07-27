import 'server-only';

import type { ServerApi } from './types';

import { get } from '../_core/methods';

import { API_URL } from './config';

export { APIRequestError } from '../_core/errors';

export const api: ServerApi = {
    brands: {
        getAll: () => get(`${API_URL}/brands`),
    },
};
