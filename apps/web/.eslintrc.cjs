module.exports = {
  root: true,
  extends: ['../../packages/config/eslint/base.cjs', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', 'node_modules'],
};
