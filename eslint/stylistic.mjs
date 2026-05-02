import stylistic from '@stylistic/eslint-plugin';

const stylisticConfig = {
    plugins: {
        '@stylistic': stylistic,
    },
    rules: {
        '@stylistic/indent': [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],

        '@stylistic/semi': ['warn', 'always'],

        '@stylistic/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],

        '@stylistic/comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'only-multiline',
            },
        ],

        'comma-spacing': 'off',
        '@stylistic/comma-spacing': [
            'error',
            {
                before: false,
                after: true,
            },
        ],

        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/eol-last': ['error', 'always'],
        '@stylistic/operator-linebreak': ['error', 'before'],
        '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

        '@stylistic/no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxBOF: 0,
                maxEOF: 0,
            },
        ],

        '@stylistic/space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
    },
};

export { stylisticConfig };
