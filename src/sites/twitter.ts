import { addCSS } from '../utils'
import { BASE_CONFIG } from '../_head'
import type { Site } from '.'

export default [['twitter.com', 'x.com'], () => {
  addCSS('div:is([lang=ja],[lang=en],[lang=ko])', `font-family:${BASE_CONFIG.SANS}!important;`)
}] satisfies Site
