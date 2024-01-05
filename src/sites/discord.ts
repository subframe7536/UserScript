import { addCodeFont, addRootCSS } from '../utils'
import { getMono, getSans } from '../settings'
import type { Site } from '.'

export default ['discord.com', () => {
  addCodeFont('[class^=codeBlockSyntax]', '[class^=codeLine] *', '[class*=inlineCode]>span')
  addRootCSS('--font-code', `${getMono()},${getSans()}!important`)
  addRootCSS('--font-display', `${getSans()}!important`)
  addRootCSS('--font-primary', `${getSans()}!important`)
  addRootCSS('--font-headline', `${getSans()}!important`)
}] satisfies Site
