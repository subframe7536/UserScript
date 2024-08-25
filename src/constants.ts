export const moduleName = 'script-mono'

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
  ['.font-mono', '[font-mono]', '.text-mono', '[text-mono]'].map(s => `${s} *`),
  '#formattedJson *',
  ':is(.katex, .katex *)',
  ':is(mjx-container, .MathJax) *',
  '.video-js *',
]
export const monospaceSelectors = [
  monacoCharWidthCheckElement,
  '.monaco-editor :not(.codicon)',
  'html body pre',
  'code',
  'code *',
  '.code',
  '.code *',
  '.mono',
  '.font-mono',
  '[font-mono]',
  '.text-mono',
  '[text-mono]',
  '.\\!font-mono',
  '.important\\:font-mono',
  '[important\\:font-mono=""]',
  'pre *',
  'pre.CodeMirror-line *',
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
  '.CodeMirror-lines',
  '.swagger-ui :is(.code, code)',
  '.dp-highlighter *',
  '.highlighted-code *',
  '.prism-code *',
  '.CodeMirror-code *',
  '.code-editor :is(.token-line, .token)',
  '.crayon-table *',
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
  '.job-console :is(span, a)',
  // gitbook
  '.gitbook-root div[data-rnwi-handle=codeblock-toolbar] *',
  // tsdoc
  '.tsd-signature>*',
  '[class*=tsd-signature]',
  '.tsd-kind-parameter',
  '.urvanov-syntax-highlighter-font-monaco *',
]

// ban default css, no affect to site rules
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
  'monaspace.githubnext.com',
  'github.com',
]
export const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
