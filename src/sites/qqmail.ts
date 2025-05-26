import type { Site } from '../load'

import { addSansFont } from '../utils'

export default ['wx.mail.qq.com', () => {
  addSansFont('body')
}] satisfies Site
