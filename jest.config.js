module.exports = {
  collectCoverage: true,
  coverageReporters: [
    'json',
    'html',
    'text-summary',
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^.*[.](style|scss)$': '<rootDir>/test/utils/fileMock.js'
  },
  setupFiles: [
    './test/setup/util/jsdom.js',
    './test/setup/util/enzyme.js'
  ],
  testURL: 'http://localhost',
  globals: {
    window: {},
  },
  testPathIgnorePatterns: [
    '/test/functional',
    '/app/config/test.js',
    '/test/utils/',
    '/scripts/'
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    }
  }
};
