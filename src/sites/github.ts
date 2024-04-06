import { addCSS, addRootCSS } from '../utils'
import { getSettingsVariable } from '../settings'
import type { Site } from '.'

export default ['github.com', () => {
  // manully setup font
  addCSS('#read-only-cursor-text-area', `font-family:${getSettingsVariable('MONO')}!important`)
  addCSS('.code-navigation-cursor', 'display:none')
  addCSS('#read-only-cursor-text-area', 'caret-color:var(--fgColor-default, var(--color-fg-default));')

  addRootCSS('--fontStack-monospace', getSettingsVariable('MONO'))
  addRootCSS('--fontStack-sansSerif', getSettingsVariable('SANS'))
  addRootCSS('--fontStack-system', getSettingsVariable('SANS'))
}] satisfies Site
