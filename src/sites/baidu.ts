import { addSansFont } from '../utils'
import type { Site } from '../load'

export default ['www.baidu.com', () => {
  addSansFont('input')
}] satisfies Site
