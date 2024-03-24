import { addSansFont } from '../utils'
import type { Site } from '.'

export default ['v2ex.com', () => {
  addSansFont('#search-container #search')
}] satisfies Site
