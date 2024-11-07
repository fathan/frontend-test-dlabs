/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    indent: [
      'error', 2
    ],
    camelcase: [
      'error', { properties: 'never' }
    ],
    quotes: [
      'error', 'single', { avoidEscape: true }
    ],
    semi: [
      'error', 'always'
    ],
    eqeqeq: ['error'],
    'block-spacing': 'error',
    'sort-vars': 'off',
    'sort-keys': 'off',
    'sort-imports': 'off',
    'no-sync': 'off',
    'id-length': [
      'error', { min: 1 }
    ],
    'arrow-spacing': 'error',
    'arrow-parens': [
      'error', 'always'
    ],
    'semi-spacing': ['error'],
    'padded-blocks': 'off',
    'space-before-function-paren': ['error'],
    'quote-props': 'off',
    'object-property-newline': 'off',
    'no-await-in-loop': 'error',
    'no-const-assign': 'error',
    'no-empty': 'error',
    'no-tabs': 'error',
    'consistent-return': 'off',
    'template-curly-spacing': [
      'error', 'always'
    ],
    'template-tag-spacing': [
      'error', 'always'
    ],
    'comma-spacing': [
      'error', { 'before': false, 'after': true }
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 2
      }
    ],
    'array-bracket-spacing': [
      'error', 'never'
    ],
    'keyword-spacing': 'error',
    'no-var': 'error',
    'require-await': 'error',
    'no-console': 'off',
    'curly': 'error',
    'object-curly-spacing': [
      'error', 
      'always', 
      { 
        objectsInObjects: true 
      }
    ],
    'object-curly-newline': [
      'error', { 
        consistent: true 
      }
    ],
    'no-magic-numbers': 'off',
    'key-spacing': ['error'],
    'no-whitespace-before-property': ['error'],
    'one-var-declaration-per-line': ['error'],
    'no-multiple-empty-lines': [
      'error', { 'max': 1 }
    ],
    'no-undef-init': ['error'],
    'brace-style': [
      'error', 'stroustrup', { allowSingleLine: true }
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true
      }
    ],
    'for-direction': 'error',
    'func-call-spacing': [
      'error', 'never'
    ],
    'vue/attribute-hyphenation': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/html-indent': [
      'error', 2
    ],
    'vue/no-parsing-error': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/component-name-in-template-casing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
