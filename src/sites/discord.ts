import { addCodeFont, addRootCSS } from '../utils'
import { getSettingsVariable } from '../settings'
import type { Site } from '.'

export default ['discord.com', () => {
  addCodeFont('[class^=codeBlockSyntax]', '[class^=codeLine] *', '[class*=inlineCode]>span')
  addRootCSS('--font-code', `${getSettingsVariable('MONO')}!important`)
  addRootCSS('--font-display', `${getSettingsVariable('SANS')}!important`)
  addRootCSS('--font-primary', `${getSettingsVariable('SANS')}!important`)
  addRootCSS('--font-headline', `${getSettingsVariable('SANS')}!important`)
}] satisfies Site
