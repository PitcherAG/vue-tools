module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@pitcher'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/custom-event-name-casing': 0,
    'vue/no-static-inline-styles': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
