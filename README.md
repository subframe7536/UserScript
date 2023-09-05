## 全局滚动条美化 & 字体修改

- 强制使用浏览器的 monospace 和 sans-serif 字体，并可添加自定义样式
  - Chrome/Edge:设置 - 外观 - 自定义字体
- 美化滚动条和字体显示

## 自定义配置

```ts
/**
 * 基础配置
 * - SANS: 普通字体，默认 'sans-serif'
 * - MONO: 等宽字体，默认 'monospace'
 * - MONO_SETTING: 等宽字体 font-feature-settings 设置，默认 'calt'
 * - SCROLLBAR_WIDTH: 滚动条宽度，可以是任何 css 的宽度，默认 'max(0.85vw, 10px)'
 */
export const BASE_CONFIG = {
  SANS: '',
  MONO: '',
  MONO_SETTING: '',
  SCROLLBAR_WIDTH: '',
}
/**
 * 需要修改字体的域名的黑名单
 *
 * @example ['font']
 */
const BLOCKLIST = []
/**
 * 字体修改的规则
 * type: [pattern, callback]
 *
 * @example
 * ```
 * [
 *   ['w3cschools.com', () => {
 *     addCodeFont('.w3-code *')
 *   }],
 *   [['yuque.com'], () => {
 *     //...
 *   }],
 * ]
 * ```
 */
const SITEMAP = []
```

### 工具

```ts
function loadStyles(style?: string)

function loadStyleAtHTML(property: string, value: string)

function addCSS(selectors: string | string[], styles: string | string[])

function addCodeFont(...selectors: string[])

function addSansFont(...selectors: string[])
```