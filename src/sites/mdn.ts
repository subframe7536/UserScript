import type { Site } from '../load'

import { getSettingsVariable } from '../settings'
import { addCSS } from '../utils'

export default ['developer.mozilla.org', () => {
  addCSS(':root', [
    `--font-family-text:${getSettingsVariable('SANS')}!important;`,
    `--font-family-code:${getSettingsVariable('MONO')}!important;`,
  ])
}] satisfies Site
