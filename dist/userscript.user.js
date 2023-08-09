// ==UserScript==
// @name         全局滚动条美化 & 字体修改
// @namespace    http://tampermonkey.net/
// @version      1.0.10
// @author       subframe7536
// @description  全局字体美化，滚动条美化，支持自定义字体、自定义规则
// @license      MIT
// @icon         https://foruda.gitee.com/avatar/1677064980766394537/5705841_subframe7536_1652618638.png!avatar200
// @supportURL   https://github.com/subframe7536/userscript
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// ==/UserScript==

(function () {
  'use strict';

  /**
   * @preserve
   * 普通字体
   *
   * @default 'sans-serif'
   */
  /**
   * @preserve
   * 需要修改字体的域名的黑名单
   *
   * @example ['font']
   */
  const BLOCKLIST = [];
  /**
   * @preserve
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
  const sansExcludeSelector = [
    ".monaco-editor *",
    "v-text",
    "[data-virgo-text=true]",
    // math
    "mjx-container *",
    // icons
    "[class*=material-symbols]",
    "[class*=codicon]",
    "[class*=icon]",
    "[class*=icon] *",
    "[class*=Icon]",
    "[class*=Icon] *",
    '[class*="terminal"] *',
    '[class^="fui-"]',
    '[class*="fui-"]',
    '[class*="fa"]',
    "[class*=heroButton]",
    ".pi, .pi *",
    // elements
    "em, i, svg *, kbd, kdb *, samp, samp *, var, var *, tt"
  ];
  const monospaceSelectors = [
    ".monaco-editor *",
    "html body pre",
    "pre *",
    "pre.CodeMirror-line *",
    "code",
    "code *",
    ".code",
    ".code *",
    ".mono",
    ".text-mono",
    ".text-mono *",
    "pre .token",
    "pre code *",
    "pre section *",
    "body pre code.hljs",
    ".prettyprint *",
    ".hljs",
    ".hljs *",
    "[class*=hljs]:not(.hljs-engine) *",
    'code[class*="language-"] *',
    'pre[class*="language-"] *',
    "body .prism .token",
    ".cm-editor *",
    ".font-mono",
    "[font-mono]",
    ".font-mono>*",
    "[font-mono]>*",
    ".monaco-mouse-cursor-text",
    "#vscode-editor *",
    ".enlighter *",
    ".syntaxhighlighter :is(code, .line)",
    "table.highlight *",
    "pre[data-lang] code",
    ".Typist",
    ".Typist *",
    ".ace_editor *",
    '[data-rnw-int-class*="codeblock"] *',
    ".codecolorer-container *",
    ".codeblock *",
    ".swagger-ui :is(.code, code)",
    ".dp-highlighter *",
    ".prism-code *",
    ".CodeMirror-code *",
    ".code-editor :is(.token-line, .token)",
    '[class*="monospace"]',
    '[class*="monospace"] *',
    '[class*="terminal"] *',
    ".whitespace-pre",
    "[class^=console]>*",
    "samp",
    "code-container *",
    "span:has(>.r-crgep1[data-highlighting]) *",
    "kbd",
    "tt",
    "[class^=code-block]"
  ];
  const blocklist = [
    "font",
    "ziti",
    "izihun",
    "foundertype",
    "hanyi",
    "adobe",
    "localhost",
    "mono",
    "latex",
    "typeof",
    "jetbrains",
    "unicode",
    "math",
    "twitter",
    "openvim"
  ];
  let styleArray = [];
  const sans = "sans-serif";
  const mono = "monospace";
  const monoSetting = "calt";
  function loadStyles(style) {
    document.documentElement.insertAdjacentHTML(
      "beforeend",
      `<style>${style || styleArray.join("")}</style>`
    );
    styleArray = [];
  }
  function loadStyleAtHTML(property, value) {
    document.documentElement.style.setProperty(property, value);
  }
  function addCSS(selectors, styles) {
    selectors = Array.isArray(selectors) ? selectors : [selectors];
    styles = Array.isArray(styles) ? styles : [styles];
    styleArray.push(`${selectors.join(",")}{${styles.join(";")}}`);
  }
  function addCodeFont(...selectors) {
    addCSS(
      selectors,
      [
        `font-family: ${mono}, ${sans} !important`,
        `font-feature-settings: ${monoSetting} !important`,
        "letter-spacing: 0px !important"
      ]
    );
  }
  function addSansFontDefault() {
    addCSS(
      `body :not(${sansExcludeSelector.join(",")})`,
      [
        `font-family: ${sans}`,
        "letter-spacing: 0px !important"
      ]
    );
  }
  function addSansFont(...selectors) {
    addCSS(
      selectors,
      [
        `font-family: ${sans} !important`,
        "letter-spacing: 0px !important"
      ]
    );
  }
  function isInBlockList(current2, blocklist2) {
    return current2 && blocklist2.some((pattern) => current2.includes(pattern));
  }
  const __vite_glob_0_0 = ["www.51cto.com", () => {
    addCodeFont(
      "#result [class*=language-]",
      ".prettyprint *",
      "code[class*=language-] *",
      "div[class*=language-] *",
      "pre[class*=language-] *"
    );
  }];
  const __vite_glob_0_1 = ["app.affine.pro", () => {
    addCSS("body", "--affine-font-code-family:monospace,sans-serif!important");
    addCSS("body", "--affine-font-family:sans-serif!important");
  }];
  const __vite_glob_0_2 = ["www.baidu.com", () => {
    addSansFont("input");
  }];
  const __vite_glob_0_3 = ["www.bilibili.com", () => {
    addSansFont(
      ".bili-comment.browser-pc *",
      ".video-page-card-small .card-box .info .title"
    );
  }];
  const __vite_glob_0_4 = ["www.cnblogs.com", () => {
    addCodeFont(".cnblogs-markdown code", " .cnblogs_code", " .cnblogs_code *");
  }];
  const __vite_glob_0_5 = ["blog.csdn.net", () => {
    addSansFont(
      "#csdn-toolbar *",
      " #csdn_tool_otherPlace *",
      "body #content_views > pre > code > div.hljs-button"
    );
    addCodeFont("body .markdown_views pre code.prism .token.comment");
  }];
  const __vite_glob_0_6 = ["", () => {
    addCodeFont("[class^=codeBlockSyntax]", "[class^=codeLine] *", "[class*=inlineCode]>span");
  }];
  const __vite_glob_0_7 = ["gitee.com", () => {
    addCodeFont(".commit-id", "input", "textarea");
    addSansFont("button", ".ui:not(.iconfont)");
    addCSS("#git-header-nav #navbar-search-form", "border-radius:4px");
  }];
  const __vite_glob_0_8 = ["github.com", () => {
    addCodeFont(
      'table:not(.d-block):not([aria-labelledby="folders-and-files"]) *',
      "textarea",
      "#read-only-cursor-text-area",
      ".react-code-lines *",
      ".react-line-number",
      ".blob-code-inner span",
      ".commit .sha-block",
      ".commit .sha",
      ".branch-name",
      ".blame-container *"
    );
    addCSS(".code-navigation-cursor", "display:none");
    addCSS("#read-only-cursor-text-area", "caret-color:var(--color-fg-default)");
  }];
  const __vite_glob_0_9 = ["www.jb51.net", () => {
    addCodeFont("body div .syntaxhighlighter *");
  }];
  const __vite_glob_0_10 = ["www.jianshu.com", () => {
    addSansFont("a.title");
  }];
  const __vite_glob_0_11 = ["juejin.cn", () => {
    addCSS(".markdown-body pre>code.copyable.hljs[lang]:before", "right:90px");
    addCSS("copy-code-btn", "top:8px");
  }];
  const __vite_glob_0_12 = ["developer.mozilla.org", () => {
    addCSS(":root", "--font-body:sans-serif!important");
  }];
  const __vite_glob_0_13 = ["regex101.com", () => {
    loadStyleAtHTML("--code-font", "monospace,sans-serif!important");
    loadStyleAtHTML("--app-font", "sans-serif!important");
  }];
  const __vite_glob_0_14 = ["stackoverflow.com", () => {
    addCSS("body", ["--ff-sans:", "--ff-mono:monospace,"].map((s) => `${s}sans-serif!important`));
  }];
  const __vite_glob_0_15 = ["", () => {
    addCodeFont(".w3-code *");
  }];
  const __vite_glob_0_16 = ["www.yuque.com", () => {
    addCodeFont(".ne-code");
    addSansFont("[class^=catalogTreeItem-module_title]");
  }];
  function loadSites(current2, customs) {
    var _a;
    const map = /* @__PURE__ */ new Map();
    const configs = /* @__PURE__ */ Object.assign({ "./51cto.ts": __vite_glob_0_0, "./affine.ts": __vite_glob_0_1, "./baidu.ts": __vite_glob_0_2, "./bilibili.ts": __vite_glob_0_3, "./cnblog.ts": __vite_glob_0_4, "./csdn.ts": __vite_glob_0_5, "./discord.ts": __vite_glob_0_6, "./gitee.ts": __vite_glob_0_7, "./github.ts": __vite_glob_0_8, "./jb51.ts": __vite_glob_0_9, "./jianshu.ts": __vite_glob_0_10, "./juejin.ts": __vite_glob_0_11, "./mdn.ts": __vite_glob_0_12, "./regex101.ts": __vite_glob_0_13, "./stackoverflow.ts": __vite_glob_0_14, "./w3cschools.ts": __vite_glob_0_15, "./yuque.ts": __vite_glob_0_16 });
    Object.values(configs).forEach(([pattern, callback]) => {
      map.set(pattern, callback);
    });
    customs.forEach(([pattern, callback]) => {
      map.set(pattern, callback);
    });
    if (map.has(current2)) {
      (_a = map.get(current2)) == null ? void 0 : _a();
    }
    loadStyles();
  }
  const base = "*{-webkit-font-smoothing:antialiased!important;font-optical-sizing:auto;font-kerning:auto;text-rendering:optimizeLegibility;-webkit-text-stroke:.05px!important}::selection{background-color:#aad0ffd9;color:#111}::highlight{background-color:#f6be49}\n";
  const scrollbar = "::-webkit-scrollbar{width:8px!important;height:8px!important}::-webkit-scrollbar-track{background-color:transparent!important;border-radius:8px!important;box-shadow:none!important}::-webkit-scrollbar-thumb{box-shadow:inset 0 0 0 10px!important;border-radius:8px!important;border:2px solid transparent!important;background-clip:content-box;background-color:transparent!important;color:#0003}::-webkit-scrollbar-thumb:hover{color:#0006!important}::-webkit-scrollbar-thumb:active{color:#0009!important}\n";
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const current = window.location.hostname;
  function onWindowsAndNotOnEdge() {
    const ua = navigator.userAgent;
    return /Windows/.test(ua) && !/Edg/.test(ua);
  }
  function loadCSS() {
    if (onWindowsAndNotOnEdge()) {
      loadStyles(scrollbar);
    }
    loadSites(current, SITEMAP);
    if (isInBlockList(current, [...blocklist, ...BLOCKLIST])) {
      return;
    }
    if (isInBlockList(current, _GM_getValue("blocklist", []))) {
      _GM_registerMenuCommand("恢复当前域名并刷新", () => {
        const stored = _GM_getValue("blocklist", []);
        const index = stored.indexOf(current);
        if (index !== -1) {
          stored.splice(index, 1);
        }
        _GM_setValue("blocklist", stored);
        location.reload();
      });
      return;
    }
    addSansFontDefault();
    addCodeFont(...monospaceSelectors);
    loadStyles();
    loadStyleAtHTML("--d-border-radius", "0.25rem");
    loadStyleAtHTML("--font-mono", "monospace");
    loadStyleAtHTML("--font-monospace", "monospace");
    _GM_registerMenuCommand("排除当前域名并刷新", () => {
      const stored = _GM_getValue("blocklist", []);
      stored.push(current);
      _GM_setValue("blocklist", stored);
      location.reload();
    });
  }
  loadStyles(base);
  loadCSS();

})();
