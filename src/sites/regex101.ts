import type { Site } from '../load'

import { getMono, getSans } from '../settings'
import { addRootCSS } from '../utils'

export default ['regex101.com', () => {
  addRootCSS('--code-font', `${getMono()},${getSans()}!important`)
  addRootCSS('--app-font', `${getSans()}!important`)
}] satisfies Site
