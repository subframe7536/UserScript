import type { Site } from '../load'

import { addCSS } from '../utils'

export default ['stackoverflow.com', () => {
  addCSS('body', ['--ff-sans:', '--ff-mono:monospace,'].map(s => `${s}sans-serif!important`))
}] satisfies Site
