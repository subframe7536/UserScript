import type { Site } from '../load'
import { addSansFont } from '../utils'

export default ['v2ex.com', () => {
  addSansFont('#search-container #search')
}] satisfies Site
