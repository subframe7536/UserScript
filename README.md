## 自用油猴脚本

- 强制使用浏览器的 monospace 和 sans-serif 字体，并可添加自定义样式
  - Chrome/Edge:设置 - 外观 - 自定义字体
- 美化滚动条和字体显示
- 添加 `` Ctrl+`  ``回到顶部的快捷键
- 推荐运行时机：document-body

### 用法

```js
const specialList = [
  //设置代码字体为monospace，sans-serif作为callback字体
  {
    github: 'table *,pre,pre *',
    runoob: '.example_code',
    csdn: '*[class*=hljs]',
    cnblog: '.cnblogs-markdown code, .cnblogs_code, .cnblogs_code *'
  },
  //设置普通的字体为sans-serif
  {
    'mp.weixin': 'p,span',
    'csdn': '#csdn-toolbar *, #csdn_tool_otherPlace *',
    'tsdm': 'a',
    'stackoverflow': ':not(em,i,b)'
  },
  //为其他的元素设置字体(主要用于兼容性)
  {
    rust: ['pre button', 'FontAwesome']
  },
  //为网站添加自定义样式
  {
    baidu: '@charset "UTF-8";body[baidu]{position:relative;background-……'
  }
]
```
