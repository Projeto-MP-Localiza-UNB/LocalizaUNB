module.exports = {
    clearMocks: true,
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    transformIgnorePatterns: ["/node_modules/(?!@prisma/client).+\\.js$"],
};
