import { addCodeFont, addRootCSS } from '../utils'
import { BASE_CONFIG } from '../_head'
import type { Site } from '.'

export default ['discord.com', () => {
  addCodeFont('[class^=codeBlockSyntax]', '[class^=codeLine] *', '[class*=inlineCode]>span')
  addRootCSS('--font-code', `${BASE_CONFIG.MONO},${BASE_CONFIG.SANS}!important`)
  addRootCSS('--font-display', `${BASE_CONFIG.SANS}!important`)
  addRootCSS('--font-primary', `${BASE_CONFIG.SANS}!important`)
  addRootCSS('--font-headline', `${BASE_CONFIG.SANS}!important`)
}] satisfies Site
