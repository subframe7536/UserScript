// ==UserScript==
// @name         全局滚动条美化 & 字体修改
// @namespace    http://tampermonkey.net/
// @version      1.1.15
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
  const moduleName = "script-mono";
  const monacoCharWidthCheckElement = 'body>div[style="position: absolute; top: -50000px; width: 50000px;"] *';
  const sansExcludeSelector = [
    monacoCharWidthCheckElement,
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
    "em, i, svg *, kbd, kdb *, samp, samp *, var, var *, tt",
    [".font-mono", "[font-mono]", ".text-mono", "[text-mono]"].map((s) => `${s} *`),
    "#formattedJson *",
    ":is(.katex, .katex *)",
    ":is(mjx-container, .MathJax) *"
  ];
  const monospaceSelectors = [
    monacoCharWidthCheckElement,
    ".monaco-editor :not(.codicon)",
    "html body pre",
    "code",
    "code *",
    ".code",
    ".code *",
    ".mono",
    ".font-mono",
    "[font-mono]",
    ".text-mono",
    "[text-mono]",
    "pre *",
    "pre.CodeMirror-line *",
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
    ".highlighted-code *",
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
    "[class^=code-block]",
    ".job-console :is(span, a)",
    // gitbook
    ".gitbook-root div[data-rnwi-handle=codeblock-toolbar] *",
    // tsdoc
    ".tsd-signature>*",
    "[class*=tsd-signature]",
    ".tsd-kind-parameter"
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
    "monaspace.githubnext.com"
  ];
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var _LEVEL = ["debug", "info", "warn", "error"];
  function createLogger(mode, onLog, onTimer) {
    let filter = (level, s) => (
      // #hack: e is unknown when level = 'error', else e is scope
      (msg, e, scope) => (mode === _LEVEL[3] && level > 2 || mode === _LEVEL[1] && level > 0 || mode === _LEVEL[0]) && onLog(msg, _LEVEL[level], ...level > 2 ? [s || scope, e] : [s || e])
    );
    let withScope = (scope) => ({
      debug: filter(0, scope),
      info: filter(1, scope),
      warn: filter(2, scope),
      error: filter(3, scope),
      timer: onTimer,
      setLogMode: (m) => mode = m
    });
    return {
      ...withScope(),
      withScope
    };
  }
  var scopeColors = ["#3f6894", "#feecd8"];
  var levelColors = {
    debug: "#66a2cc",
    info: "#7cbd75",
    warn: "#dbaf57",
    error: "#e08585"
  };
  var r = ".3rem";
  function renderBadge(bg, fg, radius = r) {
    return `font-size:.8rem;padding:.1rem .3rem;border-radius:${radius};background-color:${bg};color:${fg}`;
  }
  function onBrowserLog(msg, level, scope, e) {
    let _msg = `%c${level.toUpperCase()}`;
    const args = [];
    if (scope) {
      _msg += `%c${scope}`;
      args.push(
        renderBadge(levelColors[level], "#fff", `${r} 0 0 ${r}`),
        renderBadge(scopeColors[0], scopeColors[1], `0 ${r} ${r} 0`)
      );
    } else {
      args.push(renderBadge(levelColors[level], "#fff"));
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
  function onBrowserTimer(label) {
    const start = Date.now();
    return () => console.log(
      `%c${label}%c ${(Date.now() - start).toFixed(2)}ms`,
      renderBadge(scopeColors[0], scopeColors[1]),
      ""
    );
  }
  function createBrowserLogger(logMode = "info") {
    return createLogger(logMode, onBrowserLog, onBrowserTimer);
  }
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  function getSettings(key, defaultValue) {
    return _GM_getValue(key) ?? defaultValue;
  }
  const sansVariableName = "userscript-sans";
  const monoVariableName = "userscript-mono";
  const monoFeatureVariableName = "userscript-mono-feature";
  const scrollbarWidthVariableName = "scrollbar-width";
  function getSettingsVariable(key) {
    switch (key) {
      case "MONO":
        return `var(--${monoVariableName},monospace)`;
      case "MONO_SETTING":
        return `var(--${monoFeatureVariableName},"calt")`;
      case "SANS":
        return `var(--${sansVariableName},sans-serif)`;
      case "SCROLLBAR_WIDTH":
        return `var(--${scrollbarWidthVariableName},max(0.85vw,10px))`;
      default:
        return "";
    }
  }
  function setSettings(key, value) {
    _GM_setValue(key, value);
  }
  function delSettings() {
    _GM_deleteValue("SANS");
    _GM_deleteValue("MONO");
    _GM_deleteValue("MONO_SETTING");
    _GM_deleteValue("SCROLLBAR");
    _GM_deleteValue("SCROLLBAR_WIDTH");
    window.location.reload();
  }
  function getSans() {
    return getSettings("SANS", "sans-serif");
  }
  function getMono() {
    return getSettings("MONO", "monospace");
  }
  function getMonoFeature() {
    return getSettings("MONO_SETTING", '"calt"');
  }
  function getScrollbar() {
    return getSettings("SCROLLBAR", true);
  }
  function getScrollbarWidth() {
    return getSettings("SCROLLBAR_WIDTH", "max(0.85vw,10px)");
  }
  function loadSettingMenus() {
    logger.info(`
Sans-Serif 字体: ${getSans()}
Monospace 字体: ${getMono()}
Monospace 字体特性: ${getMonoFeature()}
滚动条宽度: ${getScrollbarWidth()}
  `);
    _GM_registerMenuCommand(`${getScrollbar() ? "关闭" : "开启"}滚动条美化并刷新`, () => {
      setSettings("SCROLLBAR", !getScrollbar());
      logger.info(getScrollbar());
      location.reload();
    });
    _GM_registerMenuCommand(`设置 Sans-Serif 字体`, () => {
      const sans = prompt("Sans-Serif 字体", getSans());
      if (sans) {
        setSettings("SANS", sans);
        setCssVariable("userscript-sans", sans);
        logger.info(`Sans-Serif 字体修改为：${sans}`);
      } else {
        logger.info(`取消设置 Sans-Serif 字体`);
      }
    });
    _GM_registerMenuCommand(`设置 Monospace 字体`, () => {
      const mono = prompt("Monospace 字体", getMono());
      if (mono) {
        setSettings("MONO", mono);
        setCssVariable("userscript-mono", mono);
        logger.info(`Monospace 字体修改为：${mono}`);
      } else {
        logger.info(`取消设置 Monospace 字体`);
      }
    });
    _GM_registerMenuCommand(`设置 Monospace 字体特性`, () => {
      const monoSettings = prompt("Monospace 字体特性 (https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-feature-settings)", getMonoFeature());
      if (monoSettings) {
        const features = monoSettings;
        setSettings("MONO_SETTING", features);
        setCssVariable("userscript-mono-feature", features);
        logger.info(`Monospace 字体特性修改为：${monoSettings}`);
      } else {
        logger.info(`取消设置 Monospace 字体特性`);
      }
    });
    getScrollbar() && _GM_registerMenuCommand(`设置滚动条宽度`, () => {
      const width = prompt("滚动条宽度，可以是任何 CSS 长度", getScrollbarWidth());
      if (width) {
        setSettings("SCROLLBAR_WIDTH", width);
        setCssVariable("scrollbar-width", width);
        logger.info(`滚动条宽度修改为：${width}`);
      } else {
        logger.info(`取消设置滚动条宽度`);
      }
    });
    _GM_registerMenuCommand("重置设置并刷新", delSettings);
  }
  let styleArray = [];
  const logger = createBrowserLogger(getDebug() ? "debug" : "disable").withScope("scripts-mono");
  function loadStyles(style) {
    if (styleArray.length || style) {
      document.documentElement.insertAdjacentHTML(
        "beforeend",
        `<style class="${moduleName}">${style || [...new Set(styleArray)].join("")}</style>`
      );
      if (!style) {
        styleArray = [];
      }
    }
  }
  function setCssVariable(name, value) {
    var _a;
    const variableName = name.startsWith("--") ? name : `--${name}`;
    (_a = document.body) == null ? void 0 : _a.style.setProperty(variableName, value);
  }
  function addRootCSS(property, value) {
    styleArray.push(`:root{${property}:${value}}`);
  }
  function addBodyVariable(property, value) {
    styleArray.push(`body{--${property}:${value}}`);
  }
  function addCSS(selectors, styles) {
    selectors = Array.isArray(selectors) ? selectors : [selectors];
    styles = Array.isArray(styles) ? styles : [styles];
    styleArray.push(`${selectors.join(",")}{${styles.join(";")}}`);
  }
  let codeFontSelectors = [];
  function __fontVariable() {
    addBodyVariable(monoVariableName, `${getMono()},${getSans()}`);
    addBodyVariable(monoFeatureVariableName, getMonoFeature());
    addBodyVariable(sansVariableName, getSans());
  }
  function __codeFont() {
    addCSS(
      monospaceSelectors.concat(codeFontSelectors),
      [
        `font-family:${getSettingsVariable("MONO")}!important`,
        `font-feature-settings:${getSettingsVariable("MONO_SETTING")}!important`,
        "letter-spacing:0px!important"
      ]
    );
    codeFontSelectors = [];
  }
  function addCodeFont(...selectors) {
    codeFontSelectors.push(...selectors);
  }
  let sansFontSelectors = [];
  function __sansFont() {
    addCSS(
      `body :not(${sansExcludeSelector.join(",")})`,
      [
        `font-family:${getSettingsVariable("SANS")}`,
        "letter-spacing:0px!important"
      ]
    );
    addCSS(
      sansFontSelectors,
      [
        `font-family:${getSettingsVariable("SANS")}!important`,
        "letter-spacing:0px!important"
      ]
    );
    sansFontSelectors = [];
  }
  function addSansFont(...selectors) {
    sansFontSelectors.push(...selectors);
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
  const __vite_glob_0_3 = [["www.bilibili.com", "t.bilibili.com", "space.bilibili.com"], () => {
    addSansFont(
      ".bili-comment.browser-pc *",
      ".video-page-card-small .card-box .info .title",
      ".h .h-sign",
      ".video-info-container .video-title",
      ".bili-video-card *"
    );
    addCSS(".video-share", "display:none!important");
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
    addRootCSS("--font-code", `${getSettingsVariable("MONO")}!important`);
    addRootCSS("--font-display", `${getSettingsVariable("SANS")}!important`);
    addRootCSS("--font-primary", `${getSettingsVariable("SANS")}!important`);
    addRootCSS("--font-headline", `${getSettingsVariable("SANS")}!important`);
  }];
  const __vite_glob_0_7 = ["gitee.com", () => {
    addCodeFont(".commit-id", "textarea");
    addSansFont("button", ".ui:not(.iconfont)");
    addCSS("#git-header-nav #navbar-search-form", "border-radius:4px");
    addCSS(".markdown-body .markdown-code-block-copy-btn", "font-family:iconfont!important");
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
    addCSS("#read-only-cursor-text-area", [
      "caret-color:var(--color-fg-default)"
    ]);
  }];
  const __vite_glob_0_9 = ["greasyfork.org", () => {
    addCSS("body", "color:#000");
  }];
  const __vite_glob_0_10 = ["www.jb51.net", () => {
    addCodeFont("body div .syntaxhighlighter *");
  }];
  const __vite_glob_0_11 = ["www.jianshu.com", () => {
    addSansFont("a.title");
  }];
  const __vite_glob_0_12 = ["juejin.cn", () => {
    addCSS(".markdown-body pre>code.copyable.hljs[lang]:before", "right:90px");
    addCSS("copy-code-btn", "top:8px");
  }];
  const __vite_glob_0_13 = ["developer.mozilla.org", () => {
    addCSS(":root", `--font-body:${getSettingsVariable("SANS")}!important;`);
  }];
  const __vite_glob_0_14 = ["ray.so", () => {
    addCodeFont('textarea[class^="Editor_textarea"]');
  }];
  const __vite_glob_0_15 = ["regex101.com", () => {
    addRootCSS("--code-font", "monospace,sans-serif!important");
    addRootCSS("--app-font", "sans-serif!important");
  }];
  const __vite_glob_0_16 = ["sourcegraph.com", () => {
    addCodeFont(".FileDiffHunks-module__body *");
  }];
  const __vite_glob_0_17 = ["stackoverflow.com", () => {
    addCSS("body", ["--ff-sans:", "--ff-mono:monospace,"].map((s) => `${s}sans-serif!important`));
  }];
  const __vite_glob_0_18 = ["tieba.baidu.com", () => {
    addSansFont(".core_title_theme_bright .core_title_txt");
  }];
  const __vite_glob_0_19 = [["twitter.com", "x.com"], () => {
    addCSS("div:is([lang=ja],[lang=en],[lang=ko])", `font-family:${getSettingsVariable("SANS")}!important;`);
  }];
  const __vite_glob_0_20 = ["v2ex.com", () => {
    addSansFont("#search-container #search");
  }];
  const __vite_glob_0_21 = ["www.w3cschool.com.cn", () => {
    addSansFont("strong,h1,h2,h3,h4,h5,h6");
  }];
  const __vite_glob_0_22 = ["mp.weixin.qq.com", () => {
    const list = ["p"];
    for (let i = 1; i <= 6; i++) {
      list.push(`h${i}`);
    }
    addSansFont(`:is(${list.join(", ")})[style]`);
  }];
  const __vite_glob_0_23 = ["www.yuque.com", () => {
    addCodeFont(".ne-code");
    addSansFont("[class^=catalogTreeItem-module_title]");
  }];
  function loadSites(current2, customs) {
    var _a;
    const map = /* @__PURE__ */ new Map();
    const configs = /* @__PURE__ */ Object.assign({ "./51cto.ts": __vite_glob_0_0, "./affine.ts": __vite_glob_0_1, "./baidu.ts": __vite_glob_0_2, "./bilibili.ts": __vite_glob_0_3, "./cnblog.ts": __vite_glob_0_4, "./csdn.ts": __vite_glob_0_5, "./discord.ts": __vite_glob_0_6, "./gitee.ts": __vite_glob_0_7, "./github.ts": __vite_glob_0_8, "./greasyfork.ts": __vite_glob_0_9, "./jb51.ts": __vite_glob_0_10, "./jianshu.ts": __vite_glob_0_11, "./juejin.ts": __vite_glob_0_12, "./mdn.ts": __vite_glob_0_13, "./raycast-website.ts": __vite_glob_0_14, "./regex101.ts": __vite_glob_0_15, "./sourcegraph.ts": __vite_glob_0_16, "./stackoverflow.ts": __vite_glob_0_17, "./tieba.ts": __vite_glob_0_18, "./twitter.ts": __vite_glob_0_19, "./v2ex.ts": __vite_glob_0_20, "./w3cschools.ts": __vite_glob_0_21, "./wechat.ts": __vite_glob_0_22, "./yuque.ts": __vite_glob_0_23 });
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
  const base = "*{-webkit-font-smoothing:antialiased!important;font-optical-sizing:auto;font-kerning:auto;text-rendering:optimizeLegibility;-webkit-text-stroke:.05px!important}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}b,strong{font-weight:bolder}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-weight:inherit;line-height:inherit;color:inherit}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}::selection{background-color:#aad0ffd9;color:#111}::highlight{background-color:#f6be49}";
  const scrollbar = ":root{--scrollbar-width: max(.85vw, 10px)}@media (prefers-color-scheme: light){:root{--scrollbar-color-rgb: 0, 0, 0}}@media (prefers-color-scheme: dark){:root{--scrollbar-color-rgb: 255, 255, 255}}*::-webkit-scrollbar{width:var(--scrollbar-width)!important;height:var(--scrollbar-width)!important}*::-webkit-scrollbar-track{background-color:transparent!important;border-radius:var(--scrollbar-width)!important;box-shadow:none!important}*::-webkit-scrollbar-thumb{box-shadow:inset 0 0 0 var(--scrollbar-width)!important;border-radius:var(--scrollbar-width)!important;border:calc(var(--scrollbar-width) * 2 / 9) solid transparent!important;background-clip:content-box;background-color:transparent!important;color:rgba(var(--scrollbar-color-rgb),30%)!important}*::-webkit-scrollbar-thumb:hover{color:rgba(var(--scrollbar-color-rgb),45%)!important}*::-webkit-scrollbar-thumb:active{color:rgba(var(--scrollbar-color-rgb),60%)!important}@supports not selector(::-webkit-scrollbar){html{scrollbar-color:rgb(var(--scrollbar-color-rgb));scrollbar-width:thin}}";
  const current = window.location.hostname;
  logger.info(current);
  function init() {
    if (getScrollbar()) {
      loadStyles(scrollbar);
      setCssVariable(scrollbarWidthVariableName, getScrollbarWidth());
    }
    __fontVariable();
    loadSites(current, SITEMAP);
    if (isInBlockList(current, blocklist)) {
      logger.warn("在黑名单中，排除优化字体");
      return;
    }
    if (isInBlockList(current, _GM_getValue("blocklist", []))) {
      logger.warn("排除当前域名的字体美化");
      _GM_registerMenuCommand("恢复当前域名的字体美化并刷新", () => {
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
    __sansFont();
    __codeFont();
    const monospaceVariableValue = "var(--script-mono)";
    addRootCSS("--font-mono", monospaceVariableValue);
    addRootCSS("--font-monospace", monospaceVariableValue);
    addRootCSS("--code-font", monospaceVariableValue);
    loadStyles();
    _GM_registerMenuCommand("排除当前域名的字体美化", () => {
      const stored = _GM_getValue("blocklist", []);
      stored.push(current);
      _GM_setValue("blocklist", stored);
      location.reload();
    });
    loadStyles(base);
  }
  init();
  loadSettingMenus();
  _GM_registerMenuCommand(`${getDebug() ? "关闭" : "开启"} Debug 模式并刷新页面`, () => {
    toggleDebug();
    location.reload();
  });
  isDark && addRootCSS("color-scheme", "dark");
  window.onload = () => {
    setTimeout(() => {
      const list = document.documentElement.classList;
      if (list.contains("theme-dark") || list.contains("dark")) {
        addRootCSS("color-scheme", "dark");
      }
      loadStyles();
      if (!document.querySelector(`.${moduleName}`)) {
        logger.warn("未找到 userscript-mono 标签，重新加载");
        init();
      }
    }, 500);
  };

})();