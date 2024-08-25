import { addCodeFont } from '../utils'
import type { Site } from '../load'

export default ['ray.so', () => {
  addCodeFont('textarea[class^="Editor_textarea"]')
}] satisfies Site
