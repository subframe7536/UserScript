import { addSansFont } from '../utils'
import type { Site } from '.'

export default ['www.w3cschool.com.cn', () => {
  addSansFont('strong,h1,h2,h3,h4,h5,h6')
}] satisfies Site
