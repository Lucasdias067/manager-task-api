import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

import rocketseatEslintConfig from '@rocketseat/eslint-config/node.mjs'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...rocketseatEslintConfig,
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
