module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ["plugin:react/recommended", "google"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        quotes: ["error", "double"],
        indent: ["error", 4, { SwitchCase: 1 }],
        "object-curly-spacing": ["error", "always"],
    },
};
