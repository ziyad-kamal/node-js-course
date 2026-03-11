import js from "@eslint/js";
import prettierPlugin from "eslint-config-prettier";
import nodePlugin from "eslint-plugin-n";
import globals from "globals";

export default [
    js.configs.recommended,

    {
        files: ["**/*.js"],
        plugins: {
            n: nodePlugin,
        },
        languageOptions: {
            sourceType: "module",
            ecmaVersion: "latest",
            globals: {
                ...globals.node,
                ...globals.express,
            },
        },
        rules: {
            "n/handle-callback-err": "error",
            "n/no-path-concat": "error",
            "n/no-process-exit": "warn",

            "no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^(req|res|next|unused)$" },
            ],
            "no-console": "warn",
        },
    },

    prettierPlugin,
];
