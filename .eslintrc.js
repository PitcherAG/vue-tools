module.exports = {
    root: true,
    env: {
        node: true
    },
    globals: {
        $: true,
        Ti: true,
        PLATFORM: true,
        $gettext: true,
        $ngettext: true,
        $t: true
    },
    extends: ['plugin:vue/vue3-strongly-recommended', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'max-len': [
            'error',
            {
                code: 120,
                ignoreComments: true,
                ignoreUrls: true
            }
        ],
        'no-prototype-builtins': 1,
        'no-empty': 1,
        'no-var': 1,
        'no-unused-vars': 0,
        'prefer-arrow-callback': 1,
        'arrow-parens': ['error', 'as-needed'],
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false
            }
        ],
        // VUE
        'vue/require-default-prop': 0,
        'vue/require-prop-types': 0,
        // Creating parse error on templates for now
        // 'vue/max-attributes-per-line': [
        //     'error',
        //     {
        //         singleline: 4,
        //         multiline: {
        //             max: 1,
        //             allowFirstLine: false
        //         }
        //     }
        // ],
        'vue/max-len': [
            'warn',
            {
                code: 120,
                template: 120,
                tabWidth: 4,
                comments: 150,
                ignorePattern: '',
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: false,
                ignoreTemplateLiterals: false,
                ignoreRegExpLiterals: false,
                ignoreHTMLAttributeValues: false,
                ignoreHTMLTextContents: false
            }
        ],
        'vue/html-indent': [
            'warn',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/html-self-closing': [
            'warn',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/no-setup-props-destructure': 'warn',
        'vue/no-template-shadow': 'error',
        'vue/no-deprecated-filter': 'warn'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
}
