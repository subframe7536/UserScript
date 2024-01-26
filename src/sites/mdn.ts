import { addCSS } from '../utils'
import { getSettingsVariable } from '../settings'
import type { Site } from '.'

export default ['developer.mozilla.org', () => {
  addCSS(':root', `--font-body:${getSettingsVariable('SANS')}!important;`)
}] satisfies Site
