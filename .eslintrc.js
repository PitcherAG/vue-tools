module.exports = {
    root: true,
    env: {
        node: true
    },
    globals: {
        $: true,
        Ti: true,
        PLATFORM: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'max-len': ['error', { code: 120 }],
        'space-before-function-paren': 0
    }
}
