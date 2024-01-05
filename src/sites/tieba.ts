import { addSansFont } from '../utils'
import type { Site } from '.'

export default ['tieba.baidu.com', () => {
  addSansFont('.core_title_theme_bright .core_title_txt')
}] satisfies Site
