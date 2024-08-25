import { addCodeFont, addSansFont } from '../utils'
import type { Site } from '../load'

export default ['www.yuque.com', () => {
  addCodeFont('.ne-code')
  addSansFont('[class^=catalogTreeItem-module_title]')
}] satisfies Site
