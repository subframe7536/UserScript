import { addCSS } from '../utils'
import type { Site } from '.'

export default ['app.affine.pro', () => {
  addCSS('body', '--affine-font-code-family:monospace,sans-serif!important')
  addCSS('body', '--affine-font-family:sans-serif!important')
}] satisfies Site
