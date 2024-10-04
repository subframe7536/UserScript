import type { Site } from '../load'
import { addCodeFont } from '../utils'

export default ['www.cnblogs.com', () => {
  addCodeFont('.cnblogs-markdown code', ' .cnblogs_code', ' .cnblogs_code *')
}] satisfies Site
