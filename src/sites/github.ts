import type { Site } from '../load'

import { getSettingsVariable } from '../settings'
import { addCSS, addRootCSS, codeStyles, sansStylesImportant } from '../utils'

export default [current => current.endsWith('github.com'), () => {
  // manully setup font
  addRootCSS('--fontStack-monospace', getSettingsVariable('MONO'))
  addRootCSS('--fontStack-sansSerif', getSettingsVariable('SANS'))
  addRootCSS('--fontStack-system', getSettingsVariable('SANS'))

  addCSS([
    '#read-only-cursor-text-area',
    '.CodeMirror-lines',
    '.react-code-text',
    'pre',
    'code',
    '.text-mono',
    '.text-mono *',
    'textarea',
    'table.highlight *',
    '[id^=find-in-file-item]',
    '.react-code-size-details-in-header *',
    '.blob-code-inner *',
    '.commit-ref *',
    '.branch-name *',
    '.diff-view :is(.file-info, table tr:not(.inline-comments), .blob-code-inner)',
    '[class*=BranchName]',
    'samp',
    'kbd',
    'tt',
    '#gist-share-url-sized-down',
    '.file-info *',
    '[class*=monospace]',
    '.cm-editor *',
  ], codeStyles)
  addCSS([
    '.markdown-body',
    '.markdown-title',
    'body',
  ], sansStylesImportant)
  addCSS('.code-navigation-cursor', 'display:none')
  addCSS('#read-only-cursor-text-area', 'caret-color:var(--fgColor-default, var(--color-fg-default));')
}] satisfies Site
