import { addCSS, addCodeFont, addRootCSS, addSansFont } from '../utils'
import { getSettingsVariable } from '../settings'
import type { Site } from '.'

export default ['github.com', () => {
  // manully setup font
  addRootCSS('--fontStack-monospace', getSettingsVariable('MONO'))
  addRootCSS('--fontStack-sansSerif', getSettingsVariable('SANS'))
  addRootCSS('--fontStack-system', getSettingsVariable('SANS'))

  addCodeFont('#read-only-cursor-text-area')
  addCodeFont('.CodeMirror-lines')
  addSansFont('.markdown-body')
  addSansFont('body')
  addCSS('.code-navigation-cursor', 'display:none')
  addCSS('#read-only-cursor-text-area', 'caret-color:var(--fgColor-default, var(--color-fg-default));')
}] satisfies Site
