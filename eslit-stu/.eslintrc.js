module.exports = {
    "root": true,
    "env": {
        // "browser": true,
        // "es2021": true
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        // "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
      '@typescript-eslint/no-inferrable-types': 'off'
    }
};
