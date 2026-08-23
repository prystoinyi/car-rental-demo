import indentation from './stylelint/indentation.mjs';
import tailwindOrder from './stylelint/tailwind-order.mjs';

const config = {
    extends: ['stylelint-config-clean-order'],
    ignoreFiles: ['.next/**', 'coverage/**', 'dist/**', 'node_modules/**', 'site/**'],
    plugins: [indentation, tailwindOrder],
    rules: {
        [indentation.ruleName]: 4,
        [tailwindOrder.ruleName]: true,
    },
};

export default config;
