import { addCSS } from '../utils'
import { getSans } from '../settings'
import type { Site } from '.'

export default [['twitter.com', 'x.com'], () => {
  addCSS('div:is([lang=ja],[lang=en],[lang=ko])', `font-family:${getSans()}!important;`)
}] satisfies Site
