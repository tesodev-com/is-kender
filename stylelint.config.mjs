export default {
  extends: ['stylelint-prettier/recommended', 'stylelint-config-standard', 'stylelint-config-recommended-vue', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  ignores: ['node_modules/**', 'dist/**/*', 'build/**', '**/*.min.js', '**/__mocks__/**'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'no-invalid-position-at-import-rule': null,
      },
    },
  ],
  rules: {
    'declaration-property-value-no-unknown': null,
    'scss/declaration-property-value-no-unknown': true,
    'color-hex-length': 'short',
    'scss/dollar-variable-pattern': '^([a-z][a-zA-Z0-9-]+)$',
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/double-slash-comment-whitespace-inside': null,
    'scss/load-no-partial-leading-underscore': null,
    'scss/load-partial-extension': null,
    'selector-class-pattern': '^[a-z0-9-]+(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
    'block-no-empty': true,
    'no-duplicate-selectors': true,
    'rule-empty-line-before': ['always', { except: ['first-nested'] }],
  },
};
