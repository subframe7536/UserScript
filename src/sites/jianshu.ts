import type { Site } from '../load'
import { addSansFont } from '../utils'

export default ['www.jianshu.com', () => {
  addSansFont('a.title')
}] satisfies Site
