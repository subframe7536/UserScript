import { addSansFont } from '../utils'
import type { Site } from '.'

export default ['www.baidu.com', () => {
  addSansFont('input')
}] satisfies Site