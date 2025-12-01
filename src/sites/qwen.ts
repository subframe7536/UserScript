import type { Site } from '../load'

import { addCodeFont } from '../utils'

export default ['chat.qwen.ai', () => {
  addCodeFont('.qwen-markdown-codespan', '.qwen-markdown-code .qwen-markdown-code-body .monaco-editor *')
}] satisfies Site
