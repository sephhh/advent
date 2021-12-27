module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["*.js"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "prettier/prettier": "error",
    "indent": ["error", 4, {"SwitchCase": 1}],    
    "no-tabs": ["error", {"allowIndentationTabs": true}],
    "max-len": [
        "error",
        {
            "code": 90,
            "tabWidth": 4,
            "ignoreUrls": true
        }
    ],
  },
};
