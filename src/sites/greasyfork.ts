import { addCSS } from '../utils'
import type { Site } from '../load'

export default ['greasyfork.org', () => {
  addCSS('body', 'color:#000')
}] satisfies Site
