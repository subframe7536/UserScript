import { addCSS, addCodeFont, addSansFont } from '../utils'
import type { Site } from '.'

export default ['gitee.com', () => {
  addCodeFont('.commit-id', 'input', 'textarea')
  addSansFont('button', '.ui:not(.iconfont)')
  addCSS('#git-header-nav #navbar-search-form', 'border-radius:4px')
}] satisfies Site