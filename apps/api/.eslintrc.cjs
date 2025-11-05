module.exports = {
  extends: ['../../packages/config/eslint/base.cjs'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['dist', 'node_modules'],
};
