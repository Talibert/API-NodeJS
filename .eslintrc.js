module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ["airbnb-base", "prettier"],
    plugins: ["prettier"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
        "class-methods-use-this": "off",
        "no-param-reassign": "off",
        camelcase: "off",
        "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
        radix: "off",
        "no-console": [
            "error",
            { allow: ["log", "error", "debug", "time", "timeEnd"] },
        ],
    },
};
