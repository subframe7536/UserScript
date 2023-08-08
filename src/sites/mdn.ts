import { addCSS } from '../utils'
import type { Site } from '.'

export default ['developer.mozilla.org', () => {
  addCSS(':root', '--font-body:sans-serif!important')
}] satisfies Site