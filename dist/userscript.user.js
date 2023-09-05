// ==UserScript==
// @name         全局滚动条美化 & 字体修改
// @namespace    http://tampermonkey.net/
// @version      1.0.14
// @author       subframe7536
// @description  全局字体美化，滚动条美化，支持自定义字体、自定义规则
// @license      MIT
// @icon         https://foruda.gitee.com/avatar/1677064980766394537/5705841_subframe7536_1652618638.png!avatar200
// @supportURL   https://github.com/subframe7536/userscript
// @match        *://*/*
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  /**
   * @preserve
   * 基础配置
   * - SANS: 普通字体，默认 'sans-serif'
   * - MONO: 等宽字体，默认 'monospace'
   * - MONO_SETTING: 等宽字体 font-feature-settings 设置，默认 ['calt']
   * - SCROLLBAR_WIDTH: 滚动条宽度，可以是任何 css 的宽度，默认 'max(0.85vw, 10px)'
   */
  const BASE_CONFIG = {
    SANS: "",
    MONO: "",
    MONO_SETTING: [""],
    SCROLLBAR_WIDTH: ""
  };
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
   *   [['yuque.com'], () => {
   *     //...
   *   }],
   * ]
   * ```
  */
  const SITEMAP = [];
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const moduleName = "script-mono";
  function getConfig(key, defaultValue) {
    let ret = _GM_getValue(key, void 0) ?? defaultValue;
    if (BASE_CONFIG[key]) {
      ret = BASE_CONFIG[key];
      _GM_setValue(key, ret);
    }
    return ret;
  }
  BASE_CONFIG.SANS = getConfig("SANS", "sans-serif");
  BASE_CONFIG.MONO = getConfig("MONO", "monospace");
  BASE_CONFIG.MONO_SETTING = getConfig("MONO_SETTING", ["calt"]);
  BASE_CONFIG.SCROLLBAR_WIDTH = getConfig("SCROLLBAR_WIDTH", "max(0.85vw,10px)");
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
    "openvim",
    "regexp101"
  ];
  function createLogger(option) {
    let { logMode = "normal", onLog, onTimer } = option;
    const filter = (level) => (msg, e, scope) => (logMode === "normal" && level !== "debug" || logMode === "debug") && onLog(msg, level, scope, e);
    return {
      info: filter("info"),
      debug: filter("debug"),
      warn: filter("warn"),
      error: filter("error"),
      timer: onTimer,
      setLogMode: (mode) => logMode = mode,
      withScope(scope) {
        return new Proxy(this, {
          get: (target, prop, receiver) => ["info", "debug", "warn", "error"].includes(prop) ? (msg, e) => filter(prop)(msg, e, scope) : Reflect.get(target, prop, receiver)
        });
      }
    };
  }
  var scopeColors = ["#3f6894", "#feecd8"];
  var levelColors = {
    debug: "hsl(205, 50%, 60%)",
    info: "hsl(114, 35%, 60%)",
    warn: "hsl(40, 65%, 60%)",
    error: "hsl(0, 60%, 70%)"
  };
  var r = ".3rem";
  function renderBadge(bg, fg, radius = r) {
    return `font-size:.8rem;padding:.1rem .3rem;border-radius:${radius};background-color:${bg};color:${fg}`;
  }
  function onWebLog(msg, level, scope, e) {
    let _msg = `%c${level.toLocaleUpperCase()}`;
    const args = [];
    if (scope) {
      _msg += `%c${scope}`;
      args.push(
        renderBadge(levelColors[level], "white", `${r} 0 0 ${r}`),
        renderBadge(scopeColors[0], scopeColors[1], `0 ${r} ${r} 0`)
      );
    } else {
      args.push(renderBadge(levelColors[level], "white"));
    }
    _msg += "%c ";
    args.push("");
    if (typeof msg !== "object") {
      _msg += msg;
    } else {
      _msg += "%o";
      args.push(msg);
    }
    console.log(_msg, ...args);
    e && console.error(e);
  }
  function onWebTimer(label) {
    const start = performance.now();
    return () => console.log(
      `%c${label}%c${(performance.now() - start).toFixed(2)}ms`,
      renderBadge(scopeColors[0], scopeColors[1]),
      ""
    );
  }
  function createWebLogger(logMode) {
    return createLogger({ logMode, onLog: onWebLog, onTimer: onWebTimer });
  }
  let styleArray = [];
  const logger = createWebLogger(getDebug() ? "debug" : "disable").withScope("scripts-mono");
  function loadStyles(style) {
    if (styleArray.length || style) {
      document.documentElement.insertAdjacentHTML(
        "beforeend",
        `<style class="${moduleName}">${style || styleArray.join("")}</style>`
      );
      if (!style) {
        styleArray = [];
      }
    }
  }
  function addRootCSS(property, value) {
    styleArray.push(`:root{${property}:${value}}`);
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
        `font-family: ${BASE_CONFIG.MONO}, ${BASE_CONFIG.SANS} !important`,
        `font-feature-settings: ${BASE_CONFIG.MONO_SETTING.map((s) => `"${s}"`).join(",")} !important`,
        "letter-spacing: 0px !important"
      ]
    );
  }
  function addSansFontDefault() {
    addCSS(
      `body :not(${sansExcludeSelector.join(",")})`,
      [
        `font-family: ${BASE_CONFIG.SANS}`,
        "letter-spacing: 0px!important"
      ]
    );
  }
  function addSansFont(...selectors) {
    addCSS(
      selectors,
      [
        `font-family:${BASE_CONFIG.SANS}!important`,
        "letter-spacing:0px!important"
      ]
    );
  }
  function isInBlockList(current2, blocklist2) {
    return current2 && blocklist2.some((pattern) => current2.includes(pattern));
  }
  function getDebug() {
    return _GM_getValue("debug", false);
  }
  function toggleDebug() {
    const debug = !getDebug();
    logger.setLogMode(debug ? "debug" : "disable");
    _GM_setValue("debug", debug);
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
  const __vite_glob_0_3 = [["www.bilibili.com", "t.bilibili.com"], () => {
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
  const __vite_glob_0_6 = ["discord.com", () => {
    addCodeFont("[class^=codeBlockSyntax]", "[class^=codeLine] *", "[class*=inlineCode]>span");
    addRootCSS("--font-code", `${BASE_CONFIG.MONO},${BASE_CONFIG.SANS}!important`);
    addRootCSS("--font-display", `${BASE_CONFIG.SANS}!important`);
    addRootCSS("--font-primary", `${BASE_CONFIG.SANS}!important`);
    addRootCSS("--font-headline", `${BASE_CONFIG.SANS}!important`);
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
    addRootCSS("--code-font", "monospace,sans-serif!important");
    addRootCSS("--app-font", "sans-serif!important");
  }];
  const __vite_glob_0_14 = ["stackoverflow.com", () => {
    addCSS("body", ["--ff-sans:", "--ff-mono:monospace,"].map((s) => `${s}sans-serif!important`));
  }];
  const __vite_glob_0_15 = ["www.w3cschool.com.cn", () => {
    addSansFont("strong,h1,h2,h3,h4,h5,h6");
  }];
  const __vite_glob_0_16 = ["www.yuque.com", () => {
    addCodeFont(".ne-code");
    addSansFont("[class^=catalogTreeItem-module_title]");
  }];
  function loadSites(current2, customs) {
    var _a;
    const map = /* @__PURE__ */ new Map();
    const configs = /* @__PURE__ */ Object.assign({ "./51cto.ts": __vite_glob_0_0, "./affine.ts": __vite_glob_0_1, "./baidu.ts": __vite_glob_0_2, "./bilibili.ts": __vite_glob_0_3, "./cnblog.ts": __vite_glob_0_4, "./csdn.ts": __vite_glob_0_5, "./discord.ts": __vite_glob_0_6, "./gitee.ts": __vite_glob_0_7, "./github.ts": __vite_glob_0_8, "./jb51.ts": __vite_glob_0_9, "./jianshu.ts": __vite_glob_0_10, "./juejin.ts": __vite_glob_0_11, "./mdn.ts": __vite_glob_0_12, "./regex101.ts": __vite_glob_0_13, "./stackoverflow.ts": __vite_glob_0_14, "./w3cschools.ts": __vite_glob_0_15, "./yuque.ts": __vite_glob_0_16 });
    Object.values(configs).forEach(([site, callback]) => {
      let patterns = site;
      if (!Array.isArray(site)) {
        patterns = [site];
      }
      patterns.forEach((pattern) => map.set(pattern, callback));
    });
    customs.forEach(([pattern, callback]) => {
      map.set(pattern, callback);
    });
    if (map.has(current2)) {
      logger.info(`[${current2}] match current!`);
      (_a = map.get(current2)) == null ? void 0 : _a();
    }
    loadStyles();
  }
  const base = "*{-webkit-font-smoothing:antialiased!important;font-optical-sizing:auto;font-kerning:auto;text-rendering:optimizeLegibility;-webkit-text-stroke:.05px!important}::selection{background-color:#aad0ffd9;color:#111}::highlight{background-color:#f6be49}\n";
  const scrollbar = ":root{--scrollbar-width: max(.85vw, 10px)}@media (prefers-color-scheme: light){:root{--scrollbar-color-rgb: 0, 0, 0}}@media (prefers-color-scheme: dark){:root{--scrollbar-color-rgb: 255, 255, 255}}*::-webkit-scrollbar{width:var(--scrollbar-width)!important;height:var(--scrollbar-width)!important}*::-webkit-scrollbar-track{background-color:transparent!important;border-radius:var(--scrollbar-width)!important;box-shadow:none!important}*::-webkit-scrollbar-thumb{box-shadow:inset 0 0 0 var(--scrollbar-width)!important;border-radius:var(--scrollbar-width)!important;border:calc(var(--scrollbar-width) * 2 / 9) solid transparent!important;background-clip:content-box;background-color:transparent!important;color:rgba(var(--scrollbar-color-rgb),30%)!important}*::-webkit-scrollbar-thumb:hover{color:rgba(var(--scrollbar-color-rgb),45%)!important}*::-webkit-scrollbar-thumb:active{color:rgba(var(--scrollbar-color-rgb),60%)!important}\n";
  const current = window.location.hostname;
  logger.info(current);
  function onWindowsAndNotOnEdge() {
    const ua = navigator.userAgent;
    return /Windows/.test(ua) && !/Edg/.test(ua);
  }
  function init() {
    if (onWindowsAndNotOnEdge()) {
      logger.info("on Windows and not on edge");
      loadStyles(scrollbar);
      document.documentElement.style.setProperty("--scrollbar-width", BASE_CONFIG.SCROLLBAR_WIDTH);
    }
    loadSites(current, SITEMAP);
    if (isInBlockList(current, [...blocklist, ...BLOCKLIST])) {
      return;
    }
    if (isInBlockList(current, _GM_getValue("blocklist", []))) {
      logger.warn("排除当前域名");
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
    addCodeFont(...monospaceSelectors);
    addRootCSS("--d-border-radius", "0.25rem");
    addRootCSS("--font-mono", "monospace");
    addRootCSS("--font-monospace", "monospace");
    loadStyles();
    _GM_registerMenuCommand("排除当前域名并刷新", () => {
      const stored = _GM_getValue("blocklist", []);
      stored.push(current);
      _GM_setValue("blocklist", stored);
      location.reload();
    });
    loadStyles(base);
  }
  _GM_registerMenuCommand("重置设置", () => {
    _GM_deleteValue("SANS");
    _GM_deleteValue("MONO");
    _GM_deleteValue("MONO_SETTING");
    _GM_deleteValue("SCROLLBAR_WIDTH");
  });
  _GM_registerMenuCommand(`${getDebug() ? "关闭" : "开启"} Debug 模式并刷新`, () => {
    toggleDebug();
    location.reload();
  });
  init();
  window.onload = () => {
    setTimeout(() => {
      addSansFontDefault();
      loadStyles();
      if (!document.querySelector(`.${moduleName}`)) {
        logger.warn("未找到 userscript-mono 标签，重新加载");
        init();
      }
    }, 100);
  };

})();
