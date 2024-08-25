import { addSansFont } from '../utils'
import type { Site } from '../load'

export default ['v2ex.com', () => {
  addSansFont('#search-container #search')
}] satisfies Site
