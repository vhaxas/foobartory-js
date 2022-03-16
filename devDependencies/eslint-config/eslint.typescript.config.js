const baseConfig = require("./eslint.base.config");
module.exports = {
  ...baseConfig,
  extends: [
    ...baseConfig.extends,
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
  ],
  settings: {
    ...baseConfig.settings,
    "import/parsers": {
      ...baseConfig.settings["import/parsers"],
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      ...baseConfig.settings["import/resolver"],
      typescript: {
        project: ["apps/*/tsconfig.json", "dependencies/*/tsconfig.json"],
      },
    },
  },
  parser: "@typescript-eslint/parser",
  plugins: [...baseConfig.plugins, "@typescript-eslint"],
  rules: {
    ...baseConfig.rules,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
  },
  ignorePatterns: [...baseConfig.ignorePatterns, "**/test/**/*.ts"],
};
