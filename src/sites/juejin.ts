import { addCSS } from '../utils'
import type { Site } from '.'

export default ['juejin.cn', () => {
  addCSS('.markdown-body pre>code.copyable.hljs[lang]:before', 'right:90px')
  addCSS('copy-code-btn', 'top:8px')
}] satisfies Site
