import { addSansFont } from '../utils'
import type { Site } from '../load'

export default ['www.jianshu.com', () => {
  addSansFont('a.title')
}] satisfies Site
