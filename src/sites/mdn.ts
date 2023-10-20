import { addCSS } from '../utils'
import { BASE_CONFIG } from '../_head'
import type { Site } from '.'

export default ['developer.mozilla.org', () => {
  addCSS(':root', `--font-body:${BASE_CONFIG.SANS}!important;`)
}] satisfies Site
