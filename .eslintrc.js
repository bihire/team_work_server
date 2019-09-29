module.exports = {
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        }

    },
    // extends: ['airbnb', 'prettier'
    // ],
    // plugins: ['prettier'
    // ],
    rules: {
        // 'prettier/prettier': 'warn',
        // 'no-unused-vars': 'warn',
        'no-console': 'off',
        'func-names': 'off',
        'no-process-exit': 'off',
        'object-shorthand': 'off',
        strict: 'off',
        'no-var': 'off'
    }
};