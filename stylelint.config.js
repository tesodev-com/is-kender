export default {
  extends: [
    'stylelint-config-standard', // Standard CSS rules
    'stylelint-config-standard-scss', // SCSS support
    'stylelint-config-recommended-vue', // Vue-specific styling rules
    'stylelint-config-prettier', // Prettier compatibility
    'stylelint-config-recommended-scss'
  ],
  plugins: [
    'stylelint-order', // Plugin for ordering properties
    'stylelint-scss' // SCSS rules
  ],
};