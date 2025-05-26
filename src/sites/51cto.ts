import type { Site } from '../load'

import { addCodeFont } from '../utils'

export default ['www.51cto.com', () => {
  addCodeFont(
    '#result [class*=language-]',
    '.prettyprint *',
    'code[class*=language-] *',
    'div[class*=language-] *',
    'pre[class*=language-] *',
  )
}] satisfies Site
