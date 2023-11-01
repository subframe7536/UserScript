import { addCSS } from '../utils'
import type { Site } from '.'

export default ['greasyfork.org', () => {
  addCSS('body', 'color:#fff')
}] satisfies Site
