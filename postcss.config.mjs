import postcssSimpleVars from 'postcss-simple-vars';

import { variables } from './src/styles/core/variables.mjs';

const config = {
    plugins: [
        postcssSimpleVars({ variables }),
        '@tailwindcss/postcss',
    ],
};

export default config;
