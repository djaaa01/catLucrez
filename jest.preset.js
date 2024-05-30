const path = require("path");

module.exports = {
  setupFilesAfterEnv: [
    path.resolve(__dirname, 'jest.setup.ts'),
  ],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
}
