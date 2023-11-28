module.exports = {
    clearMocks: true,
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    setupFilesAfterEnv: ["./tests/utils/PrismaMock.js"],
};
