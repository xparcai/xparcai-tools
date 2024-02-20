import eslintConfig, { GLOB_EXCLUDE, perfectionist, sortPackageJson, sortTsconfig } from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default eslintConfig(
  {
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    ignores: [
      '~',
      '**/plugin-*.d.ts',
      ...GLOB_EXCLUDE,
    ],
  },
  sortTsconfig(),
  sortPackageJson(),
  perfectionist(),
  ...compat.config({
    overrides: [
      {
        files: ['*.svelte'],
        extends: [
          'plugin:svelte/recommended',
          'prettier',
        ],
        parser: 'svelte-eslint-parser',
        parserOptions: {
          parser: '@typescript-eslint/parser',
        },
        rules: {
          '@typescript-eslint/nk-explicit-any': 'off',
          '@typescript-eslint/ban-ts-comment': 'off',
          'svelte/nk-at-html-tags': 'off',
          'svelte/valid-compile': 'off',
          '@typescript-eslint/nk-non-null-assertion': 'off',
          '@typescript-eslint/no-explicit-any': 'off',
          'svelte/no-at-html-tags': 'off',
          'style/brace-style': 'off',
          'prefer-const': 'off',
          'style/arrow-parens': 'off',
        },
      },
    ],
  }),
  {
    rules: {
      'no-console': 'off',
    },
  },
)
