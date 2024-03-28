import { addCodeFont } from '../utils'
import type { Site } from '.'

export default ['sourcegraph.com', () => {
  addCodeFont('.FileDiffHunks-module__body *')
}] satisfies Site
