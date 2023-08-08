import { addCodeFont } from '../utils'
import type { Site } from '.'

export default ['', () => {
  addCodeFont('[class^=codeBlockSyntax]', '[class^=codeLine] *', '[class*=inlineCode]>span')
}] satisfies Site
