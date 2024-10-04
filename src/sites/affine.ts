import type { Site } from '../load'
import { addCSS } from '../utils'

export default ['app.affine.pro', () => {
  addCSS('body', '--affine-font-code-family:monospace,sans-serif!important')
  addCSS('body', '--affine-font-family:sans-serif!important')
}] satisfies Site
