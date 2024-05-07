import { addCSS, addRootCSS, codeStyles, sansStylesImportant } from '../utils'
import { getSettingsVariable } from '../settings'
import type { Site } from '.'

export default [['github.com', 'gist.github.com', 'docs.github.com'], () => {
  // manully setup font
  addRootCSS('--fontStack-monospace', getSettingsVariable('MONO'))
  addRootCSS('--fontStack-sansSerif', getSettingsVariable('SANS'))
  addRootCSS('--fontStack-system', getSettingsVariable('SANS'))

  addCSS('#read-only-cursor-text-area', codeStyles)
  addCSS('.CodeMirror-lines', codeStyles)
  addCSS('.markdown-body', sansStylesImportant)
  addCSS('body', sansStylesImportant)
  addCSS('.code-navigation-cursor', 'display:none')
  addCSS('#read-only-cursor-text-area', 'caret-color:var(--fgColor-default, var(--color-fg-default));')
}] satisfies Site
