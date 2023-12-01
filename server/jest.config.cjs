module.exports = {
    clearMocks: true,
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    setupFilesAfterEnv: ["./libs/__mocks__/prisma.js"],
};
