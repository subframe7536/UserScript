## 全局滚动条美化 & 字体修改

- 强制使用指定的 monospace 和 sans-serif 字体（可添加自定义）
  - Chrome/Edge: 设置 - 外观 - 自定义字体
- 美化滚动条和字体显示

## 自定义配置

```ts
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
