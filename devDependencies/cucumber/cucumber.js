let common = [
    'test/acceptance/features/**/*.feature',                             // Specify our feature files
    '--require-module ts-node/register',                                 // Load TypeScript module
    '--require-module tsconfig-paths/register',
    '--require test/acceptance/features/step_definitions/**/*.steps.ts', // Load step definitions
    '--format progress-bar',                                             // Load custom formatter
    '--format @cucumber/pretty-formatter',                               // Load custom formatter
    '--format json:.cucumber/cucumber_report.json',                      // Load custom formatter
    '--publish-quiet'
  ].join(' ');
  
  module.exports = {
    default: common
  };