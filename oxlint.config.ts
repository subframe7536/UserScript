import { subfLint } from '@subf/config/oxlint'

export default subfLint({
  ignorePatterns: ['dist', 'node_modules'],
  settings: {
    jsdoc: {
      tagNamePreference: {
        customTagName: 'preserve',
      },
    },
  },
})
