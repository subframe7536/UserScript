import type { Site } from '../load'

import { getSettingsVariable } from '../settings'
import { addCSS, addRootCSS, codeStyles, sansStylesImportant } from '../utils'

export default [current => current.endsWith('github.com'), () => {
  // manully setup font
  addRootCSS('--fontStack-monospace', getSettingsVariable('MONO'))
  addRootCSS('--fontStack-sansSerif', getSettingsVariable('SANS'))
  addRootCSS('--fontStack-system', getSettingsVariable('SANS'))

  addCSS('#read-only-cursor-text-area', codeStyles)
  addCSS('.CodeMirror-lines', codeStyles)
  addCSS('.react-code-text', codeStyles)
  addCSS('.markdown-body', sansStylesImportant)
  addCSS('body', sansStylesImportant)
  addCSS('.code-navigation-cursor', 'display:none')
  addCSS('#read-only-cursor-text-area', 'caret-color:var(--fgColor-default, var(--color-fg-default));')
}] satisfies Site
