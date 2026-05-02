import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

import { orderingConfig } from './eslint/ordering.mjs';
import { stylisticConfig } from './eslint/stylistic.mjs';
import { typescriptConfig } from './eslint/typescript.mjs';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,

    stylisticConfig,
    typescriptConfig,
    orderingConfig,

    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),
]);

export default eslintConfig;
