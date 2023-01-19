// ==UserScript==
// @name         全局滚动条美化 & 字体修改
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  美化滚动条 beautify the scroller bar, 代码使用monospace
// @author       subframe7536
// @match      *://*/*
// @include    *
// @icon         data:image/webp;base64,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
// @grant        GM_registerMenuCommand
// ==/UserScript==
(function () {
  'use strict'
  // 黑名单
  const blacklist = [
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
    'openvim'
  ]
  const current = document.domain
  const specialList = [
    //设置代码字体为monospace，sans-serif作为callback字体
    {
      'github': 'table:not(.d-block) *,textarea,.commit .sha-block, .commit .sha, .branch-name,.blame-container *',
      'runoob': '.example_code,.example_code *',
      'csdn': '*[class*=hljs],pre code[class*=language-] span.token,body .markdown_views pre code.prism .token.comment',
      'cnblog': '.cnblogs-markdown code, .cnblogs_code, .cnblogs_code *',
      'gitee': '.commit-id,input,textarea',
      'jb51': 'body div .syntaxhighlighter *',
      '51cto': '#result [class*=language-], .prettyprint *, code[class*=language-] *, div[class*=language-] *, pre[class*=language-] *',
      'docker': 'input[data-testid="copyPullCommandPullCommand"]',
      'yuque': '.ne-code',
      'cnblogs': '.syntaxhighlighter :is(a,div,code,table,table td,table tr,table tbody,table thead,table caption,textarea), pre[class*="brush:"][class*="language-"], pre[class*="brush:"]',
      'w3schools': '.w3-code *'
    },
    //设置普通的字体为sans-serif
    {
      'weixin': 'p,span,section',
      'csdn': '#csdn-toolbar *, #csdn_tool_otherPlace *,body #content_views > pre > code > div.hljs-button',
      'tsdm39': 'a',
      'runoob': '.article-body p',
      'bilibili': '.bili-comment.browser-pc *,h1,.h :not(em,i,b),bilibili-player-area *:not(em,i,b),.video-page-card-small .card-box .info .title,#i_cecream :not(em,i,b),.bpx-player-subtitle-wrap *',
      'sspai': '.wangEditor-txt',
      'baidu': '.wrapper_new .s_ipt',
      'gitee': 'button,.ui:not(.iconfont)',
      'v2ex': 'textarea',
      'baijiahao': '.index-module_articleTitle_28fPT',
      'jianshu': 'a.title',
      'mail': '.btn_blue, .btn_red, .btn_gray, .tcolor',
      'yuque': 'div[class^="catalogTreeItem-module_CatalogItem"] a[class^="catalogTreeItem-module_content"] span[class^="catalogTreeItem-module_title"]'
    },
    //为其他的元素设置字体(主要用于兼容性)
    {
      rust: ['pre button', 'FontAwesome']
    },
    //为网站添加自定义样式
    {
      'baidu':
        '@charset "UTF-8";body[baidu]{position:relative;background-color:rgba(222,241,239,.4)}body[baidu] #s_lg_img_new{display:none!important}body[baidu] #content_left>.c-container{border-radius:10px;padding:20px;background-color:#fdfdfd!important;box-shadow:1px 1px 2px rgba(0,0,0,.2705882353),-1px -1px 2px rgba(221,221,221,.2666666667);transition:.2s}body[baidu] #content_left>.c-container:hover{box-shadow:2px 2px 4px rgba(0,0,0,.2705882353),-2px -2px 4px rgba(221,221,221,.2666666667);transform:translateY(-2px);transition:.2s}body[baidu] #content_left>.c-container h3{margin-bottom:16px!important;background-color:#fdfdfd!important}body[baidu] #content_left>.c-container h3 a{position:relative;text-decoration:none!important}body[baidu] #content_left>.c-container h3 a:before{content:"";position:absolute;bottom:-2px;width:0;right:0;height:2px;background:rgba(78,110,242,.6666666667);transition:all .3s;border-radius:4px;transform-origin:right}body[baidu] #content_left>.c-container h3 a:hover:before{width:100%;left:0;transform-origin:left}body[baidu] .c-border{box-shadow:unset!important}body[baidu] .c-group-wrapper{background-color:#fdfdfd;border-radius:10px;margin-right:-40px;margin-left:0!important;box-shadow:1px 1px 2px rgba(0,0,0,.2705882353),-1px -1px 2px rgba(221,221,221,.2666666667);transition:.2s}body[baidu] .c-group-wrapper:hover{box-shadow:2px 2px 4px rgba(0,0,0,.2705882353),-2px -2px 4px rgba(221,221,221,.2666666667);transition:.2s}body[baidu] .wrapper_new #form .bdsug-new ul li{font-family:sans-serif!important}body[baidu] .wrapper_new #s_tab{background-color:#fff}body[google] #rso .g,body[google] .f6F9Be,body[google] .k8XOCe,body[google] .sfbg{background-color:#fdfdfd!important}body[google] .sfbg{margin-top:-10px}body[google] .yg51vc{background-color:transparent!important}',
      'gitee': '#git-header-nav #navbar-search-form{border-radius:8px!important}',
      'mozilla': ':root{--font-body:sans-serif!important}',
      'stackoverflow': '.comment-copy,a.question-hyperlink,code{font-size:14px!important}',
      'juejin': '.markdown-body pre>code.copyable.hljs[lang]:before{right:90px}copy-code-btn{top:8px}',
      'duckduckgo': 'body{--max-content-width: 56vw;}.is-link-style-exp.is-not-mobile-device .footer_cards, .c-info, .c-base, .c-icon, .c-list, .c-product, .c-detail, .zci__main.has-aux, .zci__main--answer, .results--main, .forecast-wrapper .module--forecast .module__detail--hours__labels, .zcm-wrap--header{min-width:580px}.js-header-aside-item-social{display:none}article{border:2px solid var(--theme-col-bg-page-alt-2) !important;--rounded:8px;transition:0.3s ease;padding:1rem !important;}article:hover{background-color:var(--theme-col-bg-page-alt-2) !important;border-color:var(--theme-col-bg-page-alt-1) !important}article :nth-child(3) span{-webkit-line-clamp: 3;text-overflow:ellipsis;display: -webkit-box;-webkit-box-orient: vertical;overflow:hidden}article>:nth-child(2){margin:0.5rem 0}',
      'bilibili': '.share-wrap{display:none!important}',
      'stackoverflow': 'body{--ff-sans:sans-serif!important;--ff-mono:monospace,sans-serif!important;}',
      'neeva': '.nir{font-family:"nicons-regular"!important}.nim{font-family:"nicons-medium"!important}.nis{font-family:"nicons-semibold"!important}body{--tkn-font-family-mono:monospace,sans-serif!important;}'
    },
    //全域名匹配
    {
      'docs.rs': 'a.test-arrow, .code-header,.content span.enum, .content a.enum, .content span.struct, .content a.struct, .content span.union, .content a.union, .content span.primitive, .content a.primitive, .content span.type, .content a.type, .content span.foreigntype, .content a.foreigntype,.content span.fn, .content a.fn, .content .fnname, .content span.method, .content a.method, .content span.tymethod, .content a.tymethod,.content span.trait, .content a.trait, .content span.traitalias, .content a.traitalias,.content span.associatedtype, .content a.associatedtype, .content span.constant, .content a.constant, .content span.static, .content a.static,.method .where, .fn .where, .where.fmt-newline{font-family:monospace}a.srclink{font-family:sans-serif}'
    }
  ]

  const subUtils = {
    checkBlackList: () => {
      if (current === '') {
        return false
      }
      for (let i = 0; i < blacklist.length; i++) {
        if (current.indexOf(blacklist[i]) != -1) {
          return false
        }
      }
      return true
    },
    addStyle: (style, clazz) => {
      document.documentElement.insertAdjacentHTML(
        'beforeend',
        `<style class="${clazz ?? 'plain'}">${style}</style>`
      )
    },
    addUIFont: selector => {
      subUtils.addStyle(`${selector}{font-family:sans-serif!important}`)
    },
    addCodeFont: selector => {
      subUtils.addStyle(`${selector}{font-family:monospace,sans-serif!important;font-feature-settings:"calt";letter-spacing:0px!important}`)
    },
    addCustomFont: (selector, family) => {
      subUtils.addStyle(`${selector}{font-family:${family}!important}`)
    },
    addCustomCSS: (css) => {
      subUtils.addStyle(css)
    },
    addDarkMode: () => {

    },
    normal: () => {
      subUtils.addStyle(`:not([class*=icon],[class*=icon] *,[class*=Icon],[class*=Icon] *,.fa,em,i,svg *){font-family:sans-serif;letter-spacing:0px!important}`, 'normal')
      subUtils.addCodeFont(
        `html body pre,pre *,pre.CodeMirror-line *,code,code *,.code,.code *,.mono,.text-mono,pre .token,pre code *,body pre code.hljs,.prettyprint *,.hljs,.hljs *,code[class*="language-"] *, pre[class*="language-"] *,body .prism .token,.cm-editor *,.font-mono,.mono,.monaco-mouse-cursor-text,#vscode-editor *,.enlighter *,.syntaxhighlighter :is(code,.line), table.highlight *, pre[data-lang] code, .Typist, .Typist *, .ace_editor *,[data-rnw-int-class*="codeblock"] *,.codecolorer-container *,.codeblock *,.swagger-ui .code, .swagger-ui code,.dp-highlighter *`
      )
    },
    scrollbarAndFontBase: () => {
      // 滚动条美化
      subUtils.addStyle(`
        *::-webkit-scrollbar {
          width: 8px !important;
          height: 8px !important;
        }
        *::-webkit-scrollbar-track {
          background-color: transparent !important;
          border-radius:4px !important;
          box-shadow: none !important;
        }
        *::-webkit-scrollbar-thumb {
          box-shadow: inset 0 0 0 10px !important;
          border-radius: 4px !important;
          border:2px solid transparent!important;
          background-clip: content-box;
          background-color: transparent !important;
          color: #0003;
        }
        *::-webkit-scrollbar-thumb:hover {
          color: #0006 !important;
        }
        *::-webkit-scrollbar-thumb:active {
          color: #0009 !important;
        }
      `)
      subUtils.addStyle('*{-webkit-font-smoothing:antialiased!important;font-optical-sizing:auto;font-kerning:auto;text-rendering:optimizeLegibility;-webkit-text-stroke:0.05px!important;}')
    },
    scrollToTop: () => {
      function compatible(selector) {
        if (document.querySelector(selector)) {
          document.querySelector(selector).scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
      if (document.documentElement.scrollIntoView) {
        document.body.scrollIntoView({ behavior: "smooth", block: "start" })
        //vue
        //compatible('#app')
        //react
        //compatible('#root')
        //csdn
        //compatible('.main_father')
      } else {
        window.scrollTo(0, 0)
      }
    },
    hasClass(ele, cls) {
      return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    },
    addClass(ele, cls) {
      if (!subUtils.hasClass(ele, cls)) {
        ele.className += ' ' + cls
      }
    },
    removeClass(ele, cls) {
      if (subUtils.hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, '')
      }
    },
    waitForElm(selector) {
      return new Promise(resolve => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            observer.disconnect();
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      });
    },
    special: () => {
      // 读取配置
      current.split('.').forEach(e => {
        if (specialList[0].hasOwnProperty(e)) {
          subUtils.addCodeFont(specialList[0][e])
        }
        if (specialList[1].hasOwnProperty(e)) {
          subUtils.addUIFont(specialList[1][e])
        }
        if (specialList[2].hasOwnProperty(e)) {
          subUtils.addCustomFont(specialList[2][e][0], specialList[2][e][1])
        }
        if (specialList[3].hasOwnProperty(e)) {
          subUtils.addCustomCSS(specialList[3][e])
        }
      })
      if (specialList[4].hasOwnProperty(current)) {
        subUtils.addCustomCSS(specialList[4][current])
      }
    }
  }
  GM_registerMenuCommand('返回网页顶部(快捷键 ctrl+`)', () => {
    subUtils.scrollToTop()
  })
  // GM_registerMenuCommand('禁用当前站点字体替换', () => {
  //
  // })

  document.addEventListener('keydown', () => {
    const e = event || window.event || arguments.callee.caller.arguments[0]
    const ctrlKey = event.ctrlKey || event.metaKey
    if (e.keyCode === 192 && ctrlKey) {
      subUtils.scrollToTop()
    }
  })
  subUtils.scrollbarAndFontBase()
  // 添加字体样式
  if (subUtils.checkBlackList()) {
    console.log(current)
    subUtils.normal()
    subUtils.special()
    window.onload = () => {
      subUtils.waitForElm('.monaco-editor').then(() => {
        console.log('detect monaco editor')
        // monaco editor use <span/> to test width
        // see https://github.com/microsoft/vscode/blob/main/src/vs/editor/browser/config/charWidthReader.ts#L101
        document.querySelector('style.normal').remove()
        subUtils.addCodeFont('.monaco-editor *')
        try {
          const editors = monaco.editor.getEditors()
          editors.forEach(e => e.updateOptions({ fontFamily: 'monospace,sans-serif' }))
        } catch (e) {
          console.error('low version of monaco editor, spaces\' width in selection will reduce')
        }
        subUtils.addStyle(`:not(.monaco-editor *,[class*=icon],[class*=icon] *,[class*=Icon],[class*=Icon] *,.fa,em,i,svg *){font-family:sans-serif;letter-spacing:0px!important}`, 'normal')
      })
      if (!document.querySelector('body+style')) {
        subUtils.scrollbarAndFontBase()
        subUtils.normal()
        subUtils.special()
      }
    }
  }
})()