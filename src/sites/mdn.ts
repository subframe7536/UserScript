import type { Site } from '../load'
import { getSettingsVariable } from '../settings'
import { addCSS } from '../utils'

export default ['developer.mozilla.org', () => {
  addCSS(':root', [
    `--font-body:${getSettingsVariable('SANS')}!important;`,
    `--font-code:${getSettingsVariable('MONO')}!important;`,
  ])
}] satisfies Site
