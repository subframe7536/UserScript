import type { Site } from '../load'

import { getSans } from '../settings'
import { addCSS } from '../utils'

export default ['stackoverflow.com', () => {
  addCSS('body', ['--ff-sans:', '--ff-mono:monospace,'].map(s => `${s}${getSans()}!important`))
}] satisfies Site
