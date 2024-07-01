import { addSansFont } from '../utils'
import type { Site } from '.'

export default ['wx.mail.qq.com', () => {
  addSansFont('body')
}] satisfies Site
