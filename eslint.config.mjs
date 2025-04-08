import jsdoc from 'eslint-plugin-jsdoc'
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },
  jsdoc.configs['flat/recommended'],
  { files: ["**/*.js"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], plugins: { jsdoc}, extends: [jsdoc.configs['flat/recommended']]},
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc,
      import: importPlugin,
    },
    rules: {
      'jsdoc/require-description': 'warn',
      "indent": ["error", 4],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "never"],
      "space-infix-ops": ["error", { "int32Hint": false }],
      'no-trailing-spaces': ['error'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-blocks': ['error', 'always'],
      'space-in-parens': ['error', 'always'],
      'import/newline-after-import': ['warn'],
      'import/no-duplicates': ['warn'],
      'import/order': ['warn', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'pathGroups': [
            {
                'pattern': '#root/**',
                'group': 'internal'
            }
        ],
        'newlines-between': 'always',
        'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
        }
      }],
      'no-console': ['warn', { 'allow': ['warn', 'error'] }],


    }
  }
]);


