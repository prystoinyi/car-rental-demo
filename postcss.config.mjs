import postcssFunctions from 'postcss-functions';
import postcssSimpleVars from 'postcss-simple-vars';

import { clampify } from './src/styles/core/functions.mjs';
import { variables } from './src/styles/core/variables.mjs';

const config = {
    plugins: [
        postcssSimpleVars({ variables }),
        postcssFunctions({
            functions: {
                clampify: clampify(variables),
            },
        }),
        '@tailwindcss/postcss',
    ],
};

export default config;
