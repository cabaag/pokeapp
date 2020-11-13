module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:react/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', 'tsx'] }],
    'react/jsx-sort-props': [1, { ignoreCase: true }],
    'global-require': 'off',
    'no-use-before-define': ['error', {
      functions: true, classes: true, variables: false
    }],
    'react/jsx-props-no-spreading': 0,
    'jsx-closing-bracket-location': [1, 'tag-aligned'],
    'import/no-unresolved': [2, { commonjs: true, amd: true, caseSensitive: true }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never",
        "mjs": 'never',
      }
    ]
  },
  settings: {
    'import/extensions': ['.js', '.mjs', '.jsx', '.js', '.jsx', '.ts', '.tsx'],
    'ímport/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
    },
    "react": {
      "version": "detect" // para detectar la versión de reactjs
    }
  }
};
