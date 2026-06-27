import type { Site } from '../load'
import { addCodeFont } from '../utils'

export default [
  'chatgpt.com',
  () => {
    addCodeFont('.diff-line *')
  },
] satisfies Site
