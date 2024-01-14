import { addCSS, addCodeFont } from '../utils'
import type { Site } from '.'

export default ['github.com', () => {
  addCodeFont(
    'table:not(.d-block):not([aria-labelledby="folders-and-files"]) *',
    'textarea',
    '#read-only-cursor-text-area',
    '.react-code-lines *',
    '.react-line-number',
    '.blob-code-inner span',
    '.commit .sha-block',
    '.commit .sha',
    '.branch-name',
    '.blame-container *',
  )

  // fix cursor position
  addCSS('.code-navigation-cursor', 'display:none')
  addCSS('#read-only-cursor-text-area', [
    'caret-color:var(--color-fg-default)',
    'overflow:hidden!important',
  ])
}] satisfies Site
