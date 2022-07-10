## 自用油猴脚本

- 强制使用浏览器的 monospace 和 sans-serif 字体，并可添加自定义样式
- 美化滚动条和字体显示
- 添加 `` Ctrl+`  ``回到顶部的快捷键

### 用法

```js
const specialList = [
  //change code to monospace
  {
    github: 'table *,pre,pre *',
    runoob: '.example_code',
    csdn: '*[class*=hljs]',
    cnblog: '.cnblogs-markdown code, .cnblogs_code, .cnblogs_code *'
  },
  //change ui to sans-serif
  {
    'mp.weixin': 'p,span',
    'csdn': '#csdn-toolbar *, #csdn_tool_otherPlace *',
    'tsdm': 'a',
    'stackoverflow': ':not(em,i,b)'
  },
  //change other to other font like fontawesome for compatibility
  {
    rust: ['pre button', 'FontAwesome']
  },
  //add custom style
  {
    baidu: '@charset "UTF-8";body[baidu]{position:relative;background-……'
  }
]
```
