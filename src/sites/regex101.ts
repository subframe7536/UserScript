import type { Site } from '../load'

import { addRootCSS } from '../utils'

export default ['regex101.com', () => {
  addRootCSS('--code-font', 'monospace,sans-serif!important')
  addRootCSS('--app-font', 'sans-serif!important')
}] satisfies Site
