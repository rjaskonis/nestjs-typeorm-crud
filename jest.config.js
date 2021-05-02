module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'],
    bail: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        // "^@domain/(.*)$": "<rootDir>/src/domain/$1",
        // "^@data/(.*)$": "<rootDir>/src/data/$1",
        '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
        // "^@http/(.*)$": "<rootDir>/src/infrastructure/http/$1",
    },
};
