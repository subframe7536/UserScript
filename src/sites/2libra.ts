import type { Site } from '../load'

import { getMono, getSans } from '../settings'
import { addCSS } from '../utils'

export default ['2libra.com', () => {
  addCSS('body', `--md-editor-font-family:${getMono()},${getSans()}!important`)
}] satisfies Site
