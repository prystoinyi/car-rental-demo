import 'server-only';

import { get } from '../_core/methods';

import { API_URL } from './config';
import type { ServerApi } from './types';

export { APIRequestError } from '../_core/errors';

export const api: ServerApi = {
    brands: {
        getAll: () => get(`${API_URL}/brands`),
    },
};
