import { addCSS } from '../utils'
import { getSettingsVariable } from '../settings'
import type { Site } from '../load'

export default [['twitter.com', 'x.com'], () => {
  addCSS('div:is([lang=ja],[lang=en],[lang=ko])', `font-family:${getSettingsVariable('SANS')}!important;`)
}] satisfies Site
