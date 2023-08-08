import { addCodeFont } from '../utils'
import type { Site } from '.'

export default ['', () => {
  addCodeFont('.w3-code *')
}] satisfies Site
