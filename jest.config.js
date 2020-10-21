module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testPathIgnorePatterns: ['/node_modules/', '/prod_node_modules/', '/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js}',
    '!src/index.ts',
  ],
  coverageDirectory: 'test/coverage',
}