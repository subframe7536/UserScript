import type { Site } from '../load'

import { getMono, getSans } from '../settings'
import { addCSS } from '../utils'

export default ['app.affine.pro', () => {
  addCSS('body', `--affine-font-code-family:${getMono()},${getSans()}!important`)
  addCSS('body', `--affine-font-family:${getSans()}!important`)
}] satisfies Site
