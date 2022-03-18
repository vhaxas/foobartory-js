const baseConfig = require('@foobartory-dev-dependency/eslint-config/eslint.typescript.config');

module.exports = {
  ...baseConfig,
  settings: {
    ...baseConfig.settings,
    'import/resolver': {
      ...baseConfig.settings['import/resolver'],
      typescript: {},
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
};
