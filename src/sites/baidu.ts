import type { Site } from '../load'

import { addSansFont } from '../utils'

export default ['www.baidu.com', () => {
  addSansFont('input')
}] satisfies Site
