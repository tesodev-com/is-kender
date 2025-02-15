export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-standard-scss'
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'color-hex-length': 'short',
    'scss/dollar-variable-pattern': '^([a-z][a-zA-Z0-9-]+)$',
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/double-slash-comment-whitespace-inside': null,
    'scss/load-no-partial-leading-underscore': null,
    'scss/load-partial-extension': null,
  }
};