module.exports = {
  extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
  settings: {
    "import/parsers": {},
    "import/resolver": {},
  },
  plugins: [],
  rules: {
    "import/no-cycle": "off",
    "import/prefer-default-export": "off",
  },
  ignorePatterns: ["**/test/**/*.js"],
  reportUnusedDisableDirectives: true,
};
