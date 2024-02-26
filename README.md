## 全局滚动条美化 & 字体修改

- 强制使用指定的 `monospace` 和 `sans-serif` 字体（可添加自定义）
  - Chrome/Edge: 设置 - 外观 - 自定义字体
- 美化滚动条和字体显示

## 提供自定义字体选项的原因

在 `<html lang="ja">` 的环境中，浏览器可能会错误的显示 `sans-serif` 和 `monospace` 字体，可以通过 指定字体名称 解决

## ~~滚动条美化疑似 Chrome 121+ 失效~~

在 Chrome 121+ 中，`-webkit-scrollbar-*` 疑似不再支持，无法生效

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
