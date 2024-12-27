module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/resources/js/$1",
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    setupFilesAfterEnv: ["./jest.setup.ts"],
};
