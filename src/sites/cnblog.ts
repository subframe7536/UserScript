import { addCodeFont } from '../utils'
import type { Site } from '../load'

export default ['www.cnblogs.com', () => {
  addCodeFont('.cnblogs-markdown code', ' .cnblogs_code', ' .cnblogs_code *')
}] satisfies Site
