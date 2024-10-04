import type { Site } from '../load'
import { addCodeFont } from '../utils'

export default ['ray.so', () => {
  addCodeFont('textarea[class^="Editor_textarea"]')
}] satisfies Site
