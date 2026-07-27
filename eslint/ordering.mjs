import perfectionist from 'eslint-plugin-perfectionist';

const valueImportKinds = ['default', 'wildcard', 'named'];

const valueImportKindGroups = (group) => valueImportKinds.flatMap((kind, index) => [
    ...(index === 0 ? [] : [{ newlinesBetween: 0 }]),
    `${kind}-${group}`,
]);

const internalImportGroups = [
    ['internal-hash', '^#'],
    ['internal-alias', '^@/'],
].flatMap(([groupName, elementNamePattern]) => ['type', ...valueImportKinds].map((kind) => ({
    groupName: `${kind}-${groupName}`,
    selector: 'internal',
    modifiers: [kind],
    elementNamePattern,
})));

const orderingConfig = {
    plugins: {
        perfectionist,
    },
    rules: {
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
                fixStyle: 'separate-type-imports',
            },
        ],

        '@typescript-eslint/no-import-type-side-effects': 'error',

        'no-restricted-syntax': [
            'error',
            {
                selector: "ImportDeclaration[importKind='value'] > ImportSpecifier[importKind='type']",
                message: 'Use separate `import type` instead of inline `type` imports.',
            },
        ],

        'perfectionist/sort-imports': [
            'error',
            {
                type: 'alphabetical',
                order: 'asc',
                sortBy: 'path',

                internalPattern: ['^#.+', '^@/.+'],

                newlinesBetween: 1,
                newlinesInside: 0,

                customGroups: internalImportGroups,

                groups: [
                    'side-effect',

                    { newlinesBetween: 1 },
                    'type-builtin',
                    { newlinesBetween: 0 },
                    'type-external',
                    { newlinesBetween: 0 },
                    'type-internal-hash',
                    { newlinesBetween: 0 },
                    'type-internal-alias',
                    { newlinesBetween: 0 },
                    'type-parent',
                    { newlinesBetween: 0 },
                    'type-sibling',
                    { newlinesBetween: 0 },
                    'type-index',

                    { newlinesBetween: 1 },
                    ...valueImportKindGroups('builtin'),

                    { newlinesBetween: 1 },
                    ...valueImportKindGroups('external'),

                    { newlinesBetween: 1 },
                    ...valueImportKindGroups('internal-hash'),

                    { newlinesBetween: 0 },
                    ...valueImportKindGroups('internal-alias'),

                    { newlinesBetween: 1 },
                    ...valueImportKindGroups('parent'),

                    { newlinesBetween: 1 },
                    ...valueImportKindGroups('sibling'),

                    { newlinesBetween: 1 },
                    ...valueImportKindGroups('index'),

                    { newlinesBetween: 1 },
                    'style',

                    { newlinesBetween: 1 },
                    'unknown',
                ],
            },
        ],

        'perfectionist/sort-named-imports': [
            'error',
            {
                type: 'alphabetical',
                order: 'asc',
            },
        ],

        'perfectionist/sort-exports': [
            'error',
            {
                type: 'alphabetical',
                order: 'asc',

                partitionByNewLine: false,
                newlinesBetween: 1,
                newlinesInside: 0,

                groups: [
                    'type-export',

                    { newlinesBetween: 1 },
                    'value-export',

                    { newlinesBetween: 1 },
                    'unknown',
                ],
            },
        ],

        'perfectionist/sort-named-exports': [
            'error',
            {
                type: 'alphabetical',
                order: 'asc',
            },
        ],

        'sort-imports': 'off',
        'import/order': 'off',
    },
};

export { orderingConfig };
