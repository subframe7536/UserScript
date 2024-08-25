import { addCodeFont } from '../utils'
import type { Site } from '../load'

export default ['sourcegraph.com', () => {
  addCodeFont('.FileDiffHunks-module__body *')
}] satisfies Site
