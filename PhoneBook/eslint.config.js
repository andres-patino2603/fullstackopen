import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ignores: ['dist', 'node_modules', 'index-D7GHVVE-.js'], // Ignorar las carpetas dist y node_modules
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.browser,
    },
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off', // Permitir el uso de console.log
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ignorar variables no usadas que empiezan con _
    },
    settings: {
      react: {
        version: 'detect', // Detectar automáticamente la versión de React
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];