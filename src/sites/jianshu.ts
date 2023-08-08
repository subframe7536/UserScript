import { addSansFont } from '../utils'
import type { Site } from '.'

export default ['www.jianshu.com', () => {
  addSansFont('a.title')
}] satisfies Site
