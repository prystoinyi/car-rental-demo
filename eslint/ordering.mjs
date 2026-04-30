import perfectionist from 'eslint-plugin-perfectionist';

const importKinds = ['default', 'wildcard', 'named', 'type'];

const importKindGroups = (group) => importKinds.flatMap((kind, index) => [
  ...(index === 0 ? [] : [{ newlinesBetween: 0 }]),
  `${kind}-${group}`,
]);

const internalImportGroups = [
  ['internal-hash', '^#'],
  ['internal-alias', '^@/'],
].flatMap(([groupName, elementNamePattern]) => importKinds.map((kind) => ({
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
          ...importKindGroups('builtin'),

          { newlinesBetween: 1 },
          ...importKindGroups('external'),

          { newlinesBetween: 1 },
          ...importKindGroups('internal-hash'),

          { newlinesBetween: 0 },
          ...importKindGroups('internal-alias'),

          { newlinesBetween: 1 },
          ...importKindGroups('parent'),

          { newlinesBetween: 1 },
          ...importKindGroups('sibling'),

          { newlinesBetween: 1 },
          ...importKindGroups('index'),

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
