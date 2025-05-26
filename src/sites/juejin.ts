import type { Site } from '../load'

import { addCSS } from '../utils'

export default ['juejin.cn', () => {
  addCSS('.markdown-body pre>code.copyable.hljs[lang]:before', 'right:90px')
  addCSS('copy-code-btn', 'top:8px')
}] satisfies Site
