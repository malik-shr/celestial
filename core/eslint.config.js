import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "eqeqeq": "warn",
      "camelcase": "warn",
      "new-cap": "warn",
      "prefer-const": "warn", 
      "no-else-return": "warn",
      "no-const-assign": "error",
      "one-var": ["error","never"],
      "no-multi-assign": "error",
      "no-var": "error",
      "no-duplicate-imports": "error",
    },
  }
];