## 全局滚动条美化 & 字体修改

- 强制使用浏览器的 monospace 和 sans-serif 字体，并可添加自定义样式
  - Chrome/Edge:设置 - 外观 - 自定义字体
- 美化滚动条和字体显示

## 自定义配置

```
/**
 * 需要修改字体的域名的黑名单
 *
 * @example ['font']
 */
const BLOCKLIST = [];
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
 *   ['yuque.com', () => {
 *     //...
 *   }],
 * ]
 * ```
 */
const SITEMAP = [];
/**
 * 普通字体
 *
 * @default 'sans-serif'
 */
const SANS = ''
/**
 * 等宽字体
 *
 * @default 'monospace'
 */
const MONO = ''
/**
 * 等宽字体 font-feature-settings 设置
 *
 * @default "calt"
 */
const MONO_SETTING = ''
```

### 工具

```
const logger = consola

function loadStyles(style?: string)

function loadStyleAtHTML(property: string, value: string)

function addCSS(selectors: string | string[], styles: string | string[])

function addCodeFont(...selectors: string[])

function addSansFont(...selectors: string[])
```