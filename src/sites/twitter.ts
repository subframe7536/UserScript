import type { Site } from '../load'

import { getSettingsVariable } from '../settings'
import { addCSS } from '../utils'

export default [['twitter.com', 'x.com'], () => {
  addCSS('div:is([lang=ja],[lang=en],[lang=ko])', `font-family:${getSettingsVariable('SANS')}!important;`)
}] satisfies Site
