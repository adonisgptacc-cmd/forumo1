import type { Config } from 'jest';

const config: Config = {
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    ],
  },
  testRegex: '.*\\.(spec|test)\\.ts$',
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '../coverage/api',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },
};

export default config;
