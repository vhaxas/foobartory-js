module.exports = {
    printWidth: 80,
    tabWidth: 2,
    trailingComma: "all",
    singleQuote: true,
    semi: true,
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ["typescript", "decorators-legacy"],
    importOrder: ["^@foobartory-dependency/(.*)$", "^@foobartory-app/(.*)$", "^[./]"],
};
