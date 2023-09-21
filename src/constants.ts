import { BASE_CONFIG } from './_head'
import { GM_getValue, GM_setValue } from '$'

export const moduleName = 'script-mono'

function getConfig(key: keyof typeof BASE_CONFIG, defaultValue: any) {
  let ret = GM_getValue(key, undefined) ?? defaultValue
  if (BASE_CONFIG[key]) {
    ret = BASE_CONFIG[key]
    GM_setValue(key, ret)
  }
  return ret
}
BASE_CONFIG.SANS = getConfig('SANS', 'sans-serif')
BASE_CONFIG.MONO = getConfig('MONO', 'monospace')
BASE_CONFIG.MONO_SETTING = getConfig('MONO_SETTING', ['calt'])
BASE_CONFIG.SCROLLBAR = getConfig('SCROLLBAR', true)
BASE_CONFIG.SCROLLBAR_WIDTH = getConfig('SCROLLBAR_WIDTH', 'max(0.85vw,10px)')

// https://github.com/microsoft/vscode/blob/main/src/vs/editor/browser/config/charWidthReader.ts#L53
const monacoCharWidthCheckElement = 'body>div[style="position: absolute; top: -50000px; width: 50000px;"] *'

export const sansExcludeSelector = [
  monacoCharWidthCheckElement,
  'v-text',
  '[data-virgo-text=true]',
  // math
  'mjx-container *',
  // icons
  '[class*=material-symbols]',
  '[class*=codicon]',
  '[class*=icon]',
  '[class*=icon] *',
  '[class*=Icon]',
  '[class*=Icon] *',
  '[class*="terminal"] *',
  '[class^="fui-"]',
  '[class*="fui-"]',
  '[class*="fa"]',
  '[class*=heroButton]',
  '.pi, .pi *',
  // elements
  'em, i, svg *, kbd, kdb *, samp, samp *, var, var *, tt',
]
export const monospaceSelectors = [
  monacoCharWidthCheckElement,
  '.monaco-editor *',
  'html body pre',
  'pre *',
  'pre.CodeMirror-line *',
  'code',
  'code *',
  '.code',
  '.code *',
  '.mono',
  '.text-mono',
  '.text-mono *',
  'pre .token',
  'pre code *',
  'pre section *',
  'body pre code.hljs',
  '.prettyprint *',
  '.hljs',
  '.hljs *',
  '[class*=hljs]:not(.hljs-engine) *',
  'code[class*="language-"] *',
  'pre[class*="language-"] *',
  'body .prism .token',
  '.cm-editor *',
  '.font-mono',
  '[font-mono]',
  '.font-mono>*',
  '[font-mono]>*',
  '.monaco-mouse-cursor-text',
  '#vscode-editor *',
  '.enlighter *',
  '.syntaxhighlighter :is(code, .line)',
  'table.highlight *',
  'pre[data-lang] code',
  '.Typist',
  '.Typist *',
  '.ace_editor *',
  '[data-rnw-int-class*="codeblock"] *',
  '.codecolorer-container *',
  '.codeblock *',
  '.swagger-ui :is(.code, code)',
  '.dp-highlighter *',
  '.highlighted-code *',
  '.prism-code *',
  '.CodeMirror-code *',
  '.code-editor :is(.token-line, .token)',
  '[class*="monospace"]',
  '[class*="monospace"] *',
  '[class*="terminal"] *',
  '.whitespace-pre',
  '[class^=console]>*',
  'samp',
  'code-container *',
  'span:has(>.r-crgep1[data-highlighting]) *',
  'kbd',
  'tt',
  '[class^=code-block]',
]
export const blocklist = [
  'font',
  'ziti',
  'izihun',
  'foundertype',
  'hanyi',
  'adobe',
  'localhost',
  'mono',
  'latex',
  'typeof',
  'jetbrains',
  'unicode',
  'math',
  'twitter',
  'openvim',
]
