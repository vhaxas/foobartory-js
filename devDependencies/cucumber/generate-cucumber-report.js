#!/usr/bin/env node

const reporter = require('cucumber-html-reporter');
const options = {
  theme: 'bootstrap',
  jsonFile: '.cucumber/cucumber_report.json',
  output: '.cucumber/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  storeScreenshots: true,
  screenshotsDirectory: '.cucumber/screenshots/',
  metadata: {
    Parallel: 'Scenarios',
    Executed: 'Remote'
  }
};
reporter.generate(options);