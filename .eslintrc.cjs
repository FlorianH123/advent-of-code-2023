module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
    },
    overrides: [
        {
            files: '**/*.+(ts|tsx)',
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: 'tsconfig.json',
                sourceType: 'module',
            },
            plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports', 'import'],
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            rules: {
                '@typescript-eslint/interface-name-prefix': 'off',
                '@typescript-eslint/explicit-module-boundary-types': [
                    'warn',
                    {
                        allowArgumentsExplicitlyTypedAsAny: true,
                    },
                ],
                '@typescript-eslint/no-explicit-any': 'warn',
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    {
                        vars: 'all',
                        args: 'all',
                        ignoreRestSiblings: true,
                        argsIgnorePattern: '^_',
                        varsIgnorePattern: '^_',
                    },
                ],
                '@typescript-eslint/no-floating-promises': 'error',
                '@typescript-eslint/no-misused-promises': 'error',
                'import/no-cycle': 'warn',
                'sort-imports': [
                    'error',
                    {
                        ignoreCase: true,
                        ignoreDeclarationSort: true,
                        ignoreMemberSort: false,
                        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                        allowSeparatedGroups: true,
                    },
                ],
                'import/first': 'error',
                'import/newline-after-import': 'error',
                'import/no-absolute-path': 'error',
                'import/no-duplicates': 'error',
                'import/no-empty-named-blocks': 'error',
                'import/no-useless-path-segments': 'error',
                'import/order': [
                    'error',
                    {
                        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
                        'newlines-between': 'always',
                        pathGroups: [
                            {
                                pattern: '@nestjs/**',
                                group: 'external',
                                position: 'after',
                            },
                            {
                                pattern: '@voith-webshop/**',
                                group: 'external',
                                position: 'after',
                            },
                        ],
                        pathGroupsExcludedImportTypes: ['builtin', 'object'],
                        alphabetize: { order: 'asc', caseInsensitive: true },
                    },
                ],
                'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
                'unused-imports/no-unused-imports-ts': 'warn',
                'no-console': 'off',
                eqeqeq: ['error', 'always', { null: 'ignore' }],
            },
        },
    ],
};
