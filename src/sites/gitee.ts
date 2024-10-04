import type { Site } from '../load'
import { addCodeFont, addCSS, addSansFont } from '../utils'

export default ['gitee.com', () => {
  addCodeFont('.commit-id', 'textarea')
  addSansFont('button', '.ui:not(.iconfont)')
  addCSS('#git-header-nav #navbar-search-form', 'border-radius:4px')
  addCSS('.markdown-body .markdown-code-block-copy-btn', 'font-family:iconfont!important')
}] satisfies Site
