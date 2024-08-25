import { addCSS } from '../utils'
import type { Site } from '../load'

export default ['stackoverflow.com', () => {
  addCSS('body', ['--ff-sans:', '--ff-mono:monospace,'].map(s => `${s}sans-serif!important`))
}] satisfies Site
