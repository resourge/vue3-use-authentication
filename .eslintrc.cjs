module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    extraFileExtensions: ['.vue'],
    project: './tsconfig.json',
    ecmaVersion: 'latest'
  },
  plugins: ["typescript-sort-keys", "@typescript-eslint", "import"],
  overrides: [
    {
      files: ['*.ts', '*.vue', '*.js', '*.spec.js'],
      env: {
        jest: true
      }

    }
  ],
  rules: {
    'vue/html-closing-bracket-newline': ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    'vue/require-explicit-emits': 0,
    'vue/html-indent': 0,
    'vue/first-attribute-linebreak': 0,
    'vue/multi-word-component-names': 0,
    'vue/attribute-hyphenation': 0,
    'vue/max-attributes-per-line': 0,
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': false,
        'ts-nocheck': false,
        'ts-check': false,
        minimumDescriptionLength: 3
      }
    ],
    'typescript-sort-keys/interface': [
      'error',
      'asc',
      {
        caseSensitive: false,
        natural: true,
        requiredFirst: true
      }
    ],
    'comma-dangle': ['error', 'never'],
    'require-await': 'off',
    'no-tabs': 'off',
    'no-await-in-loop': ['error'],
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 0,
    '@typescript-eslint/triple-slash-reference': ['error', {
      path: 'never',
      types: 'always',
      lib: 'never'
    }],
    '@typescript-eslint/explicit-function-return-type': 0,
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 0,
    'consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'space-in-parens': 'off',
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    'no-trailing-spaces': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    'no-case-declarations': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'no-console': 'error',
    'no-empty-pattern': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    'multiline-ternary': 'off'
    /*'import/order': ['error', {
      groups: [
        ['builtin', 'external'],
        'internal',
        'parent',
        'sibling',
        'index',
        'object'
      ],
      pathGroups: [
        {
          pattern: 'react+(|-native)',
          group: 'external',
          position: 'before'
        }
      ],
      pathGroupsExcludedImportTypes: ['react'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: false
      }
    }]*/
  }
}
