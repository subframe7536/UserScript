import type { Site } from '../load'

import { addCodeFont, addSansFont } from '../utils'

export default ['www.yuque.com', () => {
  addCodeFont('.ne-code')
  addSansFont('[class^=catalogTreeItem-module_title]')
}] satisfies Site
