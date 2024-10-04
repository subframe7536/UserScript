import type { Site } from '../load'
import { addCodeFont } from '../utils'

export default ['sourcegraph.com', () => {
  addCodeFont('.FileDiffHunks-module__body *')
}] satisfies Site
