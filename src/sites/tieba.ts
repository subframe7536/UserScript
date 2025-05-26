import type { Site } from '../load'

import { addSansFont } from '../utils'

export default ['tieba.baidu.com', () => {
  addSansFont('.core_title_theme_bright .core_title_txt')
}] satisfies Site
