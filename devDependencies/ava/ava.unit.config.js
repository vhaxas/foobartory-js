module.exports = {
  timeout: "20s",
  files: [
    "test/unit/**/*.test.ts",
  ],
  extensions: {
    ts: "module"
  },
  nodeArguments: [
    "--loader=ts-node/esm"
  ],
  require: [
    "tsconfig-paths/register"
  ]
};