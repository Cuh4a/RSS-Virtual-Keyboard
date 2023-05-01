module.exports = {
    "env": {
        "browser": true,
        "es2022": true,
        "commonjs": true,
    },
    "plugins": ["prettier"],
    "extends": ["airbnb-base", "prettier"],
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "ignorePatterns": ["**/dist/*.js"],
    "rules": {
    }
}