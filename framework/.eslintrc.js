module.exports = {
  root: true,
  parserOptions: {
    parser: require.resolve("@babel/eslint-parser"),
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime"],
  globals: {},
  rules: {
    "no-console": process.env.NODE_ENV !== "production" ? 0 : 2,
    "no-useless-escape": 0,
    "no-empty": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
    "no-unused-vars": 1
  },
};
