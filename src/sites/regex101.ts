import { addRootCSS } from '../utils'
import type { Site } from '../load'

export default ['regex101.com', () => {
  addRootCSS('--code-font', 'monospace,sans-serif!important')
  addRootCSS('--app-font', 'sans-serif!important')
}] satisfies Site
