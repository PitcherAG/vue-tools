module.exports = {
    root: true,

    env: {
        node: true,
    },

    globals: {
        $: true,
        Ti: true,
        PLATFORM: true,
        $gettext: true,
        $ngettext: true,
    },

    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],

    parserOptions: {
        parser: 'babel-eslint',
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'max-len': ['error', { code: 120 }],
        'no-prototype-builtins': 1,
        'no-empty': 1,
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
