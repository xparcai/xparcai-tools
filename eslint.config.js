import eslintConfig from '@antfu/eslint-config'

export default eslintConfig(
  {
    svelte: true,
    unocss: true,
    stylistic: true,
    formatters: true,
    ignores: [
      '~',
      '**/plugin-*.d.ts',
    ],
    overrides: {
      svelte: {
        'svelte/html-quotes': ['error', { prefer: 'double' }],
      },
    },
  },
  {
    rules: {
      'no-new-func': 'off',
      'no-console': 'off',
    },
  },
)
