import { addRootCSS } from '../utils'
import { getSettingsVariable } from '../settings'
import type { Site } from '.'

export default ['github.com', () => {
  addRootCSS('--fontStack-monospace', getSettingsVariable('MONO'))
  addRootCSS('--fontStack-sansSerif', getSettingsVariable('SANS'))
  addRootCSS('--fontStack-system', getSettingsVariable('SANS'))
}] satisfies Site
