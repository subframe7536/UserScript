import { addCSS } from '../utils'
import { getSans } from '../settings'
import type { Site } from '.'

export default ['developer.mozilla.org', () => {
  addCSS(':root', `--font-body:${getSans()}!important;`)
}] satisfies Site
