import type { Site } from '../load'
import { addCSS } from '../utils'

export default ['greasyfork.org', () => {
  addCSS('body', 'color:#000')
}] satisfies Site
