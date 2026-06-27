// ==UserScript==
// @name         全局滚动条美化 & 字体修改
// @namespace    http://tampermonkey.net/
// @version      1.3.0
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

(function() {
	"use strict";
	var _GM_deleteValue = (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var SITEMAP = [];
	var moduleName = "script-mono";
	var isMac = /Macintosh/.test(navigator.userAgent);
	var monacoCharWidthCheckElement = "body>div[style=\"position: absolute; top: -50000px; width: 50000px;\"] *";
	var sansExcludeSelector = [
		monacoCharWidthCheckElement,
		"v-text",
		"[data-virgo-text=true]",
		"mjx-container *",
		"[class*=material-symbols]",
		"[class*=codicon]",
		"[class*=icon]",
		"[class*=icon] *",
		"[class*=Icon]",
		"[class*=Icon] *",
		"[class*=\"terminal\"] *",
		"[class^=\"fui-\"]",
		"[class*=\"fui-\"]",
		"[class*=\"fa\"]",
		"[class*=heroButton]",
		".pi, .pi *",
		"em, i, svg *, kbd, kdb *, samp, samp *, var, var *, tt",
		[
			".font-mono",
			"[font-mono]",
			".tw-font-mono",
			"pre",
			".text-mono",
			"[text-mono]"
		].map((s) => `${s} *`),
		"#formattedJson *",
		":is(.katex, .katex *)",
		":is(mjx-container, .MathJax) *",
		".video-js *"
	];
	var monospaceSelectors = [
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
		".\\!font-mono",
		".important\\:font-mono",
		"[important\\:font-mono=\"\"]",
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
		"code[class*=\"language-\"] *",
		"pre[class*=\"language-\"] *",
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
		"[data-rnw-int-class*=\"codeblock\"] *",
		".codecolorer-container *",
		".codeblock *",
		".CodeMirror-lines",
		".swagger-ui :is(.code, code)",
		".dp-highlighter *",
		".highlighted-code *",
		".prism-code *",
		".CodeMirror-code *",
		".code-editor :is(.token-line, .token)",
		".crayon-table *",
		"[class*=\"monospace\"]:not([class*=\":font-monospace\"])",
		"[class*=\"monospace\"]:not([class*=\":font-monospace\"]) *",
		"[class*=\"terminal\"] *",
		".whitespace-pre",
		"[class^=console]>*",
		"samp",
		"code-container *",
		"span:has(>.r-crgep1[data-highlighting]) *",
		"kbd",
		"tt",
		"[class^=code-block]",
		".job-console :is(span, a)",
		".codeflask *",
		".gitbook-root div[data-rnwi-handle=codeblock-toolbar] *",
		".tsd-signature>*",
		"[class*=tsd-signature]",
		".tsd-kind-parameter",
		".urvanov-syntax-highlighter-font-monaco *",
		".rd_inl_code",
		".rd_code *",
		"textarea.npm__react-simple-code-editor__textarea",
		".diff-line"
	];
	var blocklist = [
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
		"monaspace.githubnext.com",
		"github.com",
		"192.168"
	];
	var sansVariableName = "userscript-sans";
	var monoVariableName = "userscript-mono";
	var monoFeatureVariableName = "userscript-mono-feature";
	var scrollbarWidthVariableName = "scrollbar-width";
	var _LEVEL = [
		"debug",
		"info",
		"warn",
		"error"
	];
	function createLogger(mode, report) {
		let rep = (...args) => report.forEach((r$1) => r$1(...args)), filter = (level, s) => (msg, e, scope) => (mode === _LEVEL[3] && level > 2 || mode === _LEVEL[1] && level > 0 || mode === _LEVEL[0]) && rep(new Date(), msg, _LEVEL[level], ...level > 2 ? [s || scope, e] : [s || e]), withScope = (scope) => ({
			debug: filter(0, scope),
			info: filter(1, scope),
			warn: filter(2, scope),
			error: filter(3, scope),
			timer: (label) => {
				let start = Date.now(), d;
				return () => (d = new Date(), rep(d, (d.getTime() - start).toFixed(2) + "ms", "timer", label));
			},
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
	function onBrowserLog(date, msg, level, scope, e) {
		let _msg = `%c${date} %c${level.toUpperCase()}`;
		const args = ["color:#918abc"];
		if (scope) {
			_msg += `%c${scope}`;
			args.push(renderBadge(levelColors[level], "#fff", `${r} 0 0 ${r}`), renderBadge(scopeColors[0], scopeColors[1], `0 ${r} ${r} 0`));
		} else args.push(renderBadge(levelColors[level], "#fff"));
		_msg += "%c ";
		args.push("");
		if (typeof msg !== "object") _msg += msg;
		else {
			_msg += "%o";
			args.push(msg);
		}
		console.log(_msg, ...args);
		e && console.error(e);
	}
	function onBrowserTimer(date, msg, label) {
		console.log(`%c${date} %c${label}%c ${msg}`, "color:#918abc", renderBadge(scopeColors[0], scopeColors[1]), "");
	}
	function createBrowserReporter(timeFormat) {
		return (date, msg, level, scope, e) => {
			const d = timeFormat(date);
			level === "timer" ? onBrowserTimer(d, msg, scope) : onBrowserLog(d, msg, level, scope, e);
		};
	}
	function createBrowserLogger(options = {}) {
		const { logMode = "info", timeFormat = (date) => date.toLocaleString() } = options;
		return createLogger(logMode, [createBrowserReporter(timeFormat)]);
	}
	var styleArray = [];
	var logger = createBrowserLogger({ logMode: getDebug() ? "debug" : "disable" }).withScope("scripts-mono");
	function loadStyles(style) {
		if (styleArray.length || style) {
			const targetStyle = style || [...new Set(styleArray)].join("");
			document.documentElement.insertAdjacentHTML("beforeend", `<style class="${moduleName}">${targetStyle}</style>`);
			logger.debug(targetStyle);
			if (!style) styleArray = [];
		}
	}
	function setCssVariable(name, value) {
		const variableName = name.startsWith("--") ? name : `--${name}`;
		document.body?.style.setProperty(variableName, value);
	}
	function addRootCSS(property, value) {
		styleArray.push(`:root{${property}:${value}}`);
	}
	function addBodyAndRootVariable(property, value) {
		styleArray.push(`:is(:root,body){--${property}:${value}}`);
	}
	function addCSS(selectors, styles) {
		selectors = Array.isArray(selectors) ? selectors : [selectors];
		styles = Array.isArray(styles) ? styles : [styles];
		styleArray.push(`${selectors.join(",")}{${styles.join(";")}}`);
	}
	var codeFontSelectors = [];
	function __fontVariable() {
		addBodyAndRootVariable(monoVariableName, `${getMono()},${getSans()}`);
		addBodyAndRootVariable(monoFeatureVariableName, getMonoFeature());
		addBodyAndRootVariable(sansVariableName, getSans());
	}
	var codeStyles = [
		`font-family:${getSettingsVariable("MONO")}!important`,
		`font-feature-settings:${getSettingsVariable("MONO_SETTING")}!important`,
		"letter-spacing:0px!important"
	];
	function __codeFont() {
		addCSS(monospaceSelectors.concat(codeFontSelectors), codeStyles);
		codeFontSelectors = [];
	}
	function addCodeFont(...selectors) {
		codeFontSelectors.push(...selectors);
	}
	var sansFontSelectors = [];
	var sansStyles = [`font-family:${getSettingsVariable("SANS")}`, "letter-spacing:0px!important"];
	var sansStylesImportant = [`font-family:${getSettingsVariable("SANS")}!important`, "letter-spacing:0px!important"];
	function __sansFont() {
		addCSS(`body :not(${sansExcludeSelector.join(",")})`, sansStyles);
		addCSS(sansFontSelectors, sansStylesImportant);
		sansFontSelectors = [];
	}
	function addSansFont(...selectors) {
		sansFontSelectors.push(...selectors);
	}
	function isInBlockList(current, blocklist) {
		return current && blocklist.some((pattern) => current.includes(pattern));
	}
	function getDebug() {
		return _GM_getValue("debug", false);
	}
	function toggleDebug() {
		const debug = !getDebug();
		logger.setLogMode(debug ? "debug" : "disable");
		_GM_setValue("debug", debug);
	}
	function getSettings(key, defaultValue) {
		return _GM_getValue(key) ?? defaultValue;
	}
	function getSettingsVariable(key) {
		switch (key) {
			case "MONO": return `var(--${monoVariableName},monospace)`;
			case "MONO_SETTING": return `var(--${monoFeatureVariableName},"calt")`;
			case "SANS": return `var(--${sansVariableName},sans-serif)`;
			case "SCROLLBAR_WIDTH": return `var(--${scrollbarWidthVariableName},max(0.85vw,10px))`;
			default: return "";
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
		return getSettings("SANS", isMac ? "system-ui" : "sans-serif");
	}
	function getMono() {
		return getSettings("MONO", "monospace");
	}
	function getMonoFeature() {
		return getSettings("MONO_SETTING", "\"calt\"");
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
			logger.info(`scrollbar: ${getScrollbar()}`);
			location.reload();
		});
		_GM_registerMenuCommand(`设置 Sans-Serif 字体`, () => {
			const sans = prompt("Sans-Serif 字体", getSans());
			if (sans) {
				setSettings("SANS", sans);
				setCssVariable("userscript-sans", sans);
				logger.info(`Sans-Serif 字体修改为：${sans}`);
			} else logger.info(`取消设置 Sans-Serif 字体`);
		});
		_GM_registerMenuCommand(`设置 Monospace 字体`, () => {
			const mono = prompt("Monospace 字体", getMono());
			if (mono) {
				setSettings("MONO", mono);
				setCssVariable("userscript-mono", mono);
				logger.info(`Monospace 字体修改为：${mono}`);
			} else logger.info(`取消设置 Monospace 字体`);
		});
		_GM_registerMenuCommand(`设置 Monospace 字体特性`, () => {
			const monoSettings = prompt("Monospace 字体特性 (https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-feature-settings)", getMonoFeature());
			if (monoSettings) {
				const features = monoSettings;
				setSettings("MONO_SETTING", features);
				setCssVariable("userscript-mono-feature", features);
				logger.info(`Monospace 字体特性修改为：${monoSettings}`);
			} else logger.info(`取消设置 Monospace 字体特性`);
		});
		const enableDark = getSettings("DARK", false);
		_GM_registerMenuCommand(enableDark ? "适配黑暗模式（已启用）" : "适配黑暗模式（已关闭）", () => {
			setSettings("DARK", !enableDark);
			logger.info(`黑暗模式: ${enableDark ? "已启用" : "已关闭"}`);
			location.reload();
		});
		if (getScrollbar()) _GM_registerMenuCommand(`设置滚动条宽度`, () => {
			const width = prompt("滚动条宽度，可以是任何 CSS 长度", getScrollbarWidth());
			if (width) {
				setSettings("SCROLLBAR_WIDTH", width);
				setCssVariable("scrollbar-width", width);
				logger.info(`滚动条宽度修改为：${width}`);
			} else logger.info(`取消设置滚动条宽度`);
		});
		_GM_registerMenuCommand("重置设置并刷新", delSettings);
	}
	var _2libra_default = ["2libra.com", () => {
		addCSS(".w-md-editor", `--md-editor-font-family:${getMono()},${getSans()}!important`);
	}];
	var _51cto_default = ["www.51cto.com", () => {
		addCodeFont("#result [class*=language-]", ".prettyprint *", "code[class*=language-] *", "div[class*=language-] *", "pre[class*=language-] *");
	}];
	var affine_default = ["app.affine.pro", () => {
		addCSS("body", `--affine-font-code-family:${getMono()},${getSans()}!important`);
		addCSS("body", `--affine-font-family:${getSans()}!important`);
	}];
	var baidu_default = ["www.baidu.com", () => {
		addSansFont("input");
	}];
	var bilibili_default = [(current) => current.endsWith("bilibili.com"), () => {
		addSansFont(".bili-comment.browser-pc *", ".video-page-card-small .card-box .info .title", ".h .h-sign", ".video-info-container .video-title", ".bili-video-card *", ".room-info-ctnr *", ".player-and-aside-area *");
		addCSS(".video-share", "display:none!important");
	}];
	var cnblog_default = ["www.cnblogs.com", () => {
		addCodeFont(".cnblogs-markdown code", " .cnblogs_code", " .cnblogs_code *");
	}];
	var csdn_default = ["blog.csdn.net", () => {
		addSansFont("#csdn-toolbar *", " #csdn_tool_otherPlace *", "body #content_views > pre > code > div.hljs-button");
		addCodeFont("body .markdown_views pre code.prism .token.comment");
	}];
	var discord_default = ["discord.com", () => {
		addCodeFont("[class^=codeBlockSyntax]", "[class^=codeLine] *", "[class*=inlineCode]>span");
		addRootCSS("--font-code", `${getSettingsVariable("MONO")}!important`);
		addRootCSS("--font-display", `${getSettingsVariable("SANS")}!important`);
		addRootCSS("--font-primary", `${getSettingsVariable("SANS")}!important`);
		addRootCSS("--font-headline", `${getSettingsVariable("SANS")}!important`);
	}];
	var gitee_default = ["gitee.com", () => {
		addCodeFont(".commit-id", "textarea");
		addSansFont("button", ".ui:not(.iconfont)");
		addCSS("#git-header-nav #navbar-search-form", "border-radius:4px");
		addCSS(".markdown-body .markdown-code-block-copy-btn", "font-family:iconfont!important");
	}];
	var github_default = [(current) => current.endsWith("github.com") || current.endsWith("bgithub.xyz"), () => {
		const imp = " !important";
		addRootCSS("--fontStack-monospace", getSettingsVariable("MONO") + imp);
		addRootCSS("--fontStack-sansSerif", getSettingsVariable("SANS") + imp);
		addRootCSS("--fontStack-system", getSettingsVariable("SANS") + imp);
		addCSS([
			"#read-only-cursor-text-area",
			".CodeMirror-lines",
			".react-code-text",
			"pre",
			"code",
			".text-mono",
			".text-mono *",
			"#read-only-cursor-text-area",
			"table.highlight *",
			"[id^=find-in-file-item]",
			".react-code-size-details-in-header *",
			".blob-code-inner *",
			".commit-ref *",
			".branch-name",
			".branch-name *",
			".diff-view :is(.file-info, table tr:not(.inline-comments), .blob-code-inner)",
			"[class*=BranchName]",
			"samp",
			"kbd",
			"tt",
			"#gist-share-url-sized-down",
			".file-info *",
			"[class*=monospace]",
			".cm-editor *"
		], codeStyles);
		addCSS([
			".markdown-body",
			".markdown-title",
			"body"
		], sansStylesImportant);
		addCSS(".code-navigation-cursor", "display:none");
		addCSS("#read-only-cursor-text-area", "caret-color:var(--fgColor-default, var(--color-fg-default));");
	}];
	var jb51_default = ["www.jb51.net", () => {
		addCodeFont("body div .syntaxhighlighter *");
	}];
	var jianshu_default = ["www.jianshu.com", () => {
		addSansFont("a.title");
	}];
	var juejin_default = ["juejin.cn", () => {
		addCSS(".markdown-body pre>code.copyable.hljs[lang]:before", "right:90px");
		addCSS("copy-code-btn", "top:8px");
	}];
	var mdn_default = ["developer.mozilla.org", () => {
		addCSS(":root", [`--font-family-text:${getSettingsVariable("SANS")}!important;`, `--font-family-code:${getSettingsVariable("MONO")}!important;`]);
	}];
	var qqmail_default = ["wx.mail.qq.com", () => {
		addSansFont("body");
	}];
	var qwen_default = ["chat.qwen.ai", () => {
		addCodeFont(".qwen-markdown-codespan", ".qwen-markdown-code .qwen-markdown-code-body .monaco-editor *");
	}];
	var raycast_website_default = ["ray.so", () => {
		addCodeFont("textarea[class^=\"Editor_textarea\"]");
	}];
	var regex101_default = ["regex101.com", () => {
		addRootCSS("--code-font", `${getMono()},${getSans()}!important`);
		addRootCSS("--app-font", `${getSans()}!important`);
	}];
	var sourcegraph_default = ["sourcegraph.com", () => {
		addCodeFont(".FileDiffHunks-module__body *");
		addCodeFont("[data-testid=\"FileDiffHunks.hunkline\"] *");
	}];
	var stackoverflow_default = ["stackoverflow.com", () => {
		addCSS("body", ["--ff-sans:", "--ff-mono:monospace,"].map((s) => `${s}${getSans()}!important`));
	}];
	var tieba_default = ["tieba.baidu.com", () => {
		addSansFont(".core_title_theme_bright .core_title_txt");
	}];
	var twitter_default = [["twitter.com", "x.com"], () => {
		addCSS("div:is([lang=ja],[lang=en],[lang=ko])", `font-family:${getSettingsVariable("SANS")}!important;`);
	}];
	var v2ex_default = ["v2ex.com", () => {
		addSansFont("#search-container #search");
	}];
	var w3cschools_default = ["www.w3cschool.com.cn", () => {
		addSansFont("strong,h1,h2,h3,h4,h5,h6");
	}];
	var wechat_default = ["mp.weixin.qq.com", () => {
		const list = ["p"];
		for (let i = 1; i <= 6; i++) list.push(`h${i}`);
		addSansFont(`:is(${list.join(", ")})[style]`);
	}];
	var yuque_default = ["www.yuque.com", () => {
		addCodeFont(".ne-code");
		addSansFont("[class^=catalogTreeItem-module_title]");
	}];
	function loadSites(current, customs) {
		const globs = Object.assign({
			"./sites/2libra.ts": _2libra_default,
			"./sites/51cto.ts": _51cto_default,
			"./sites/affine.ts": affine_default,
			"./sites/baidu.ts": baidu_default,
			"./sites/bilibili.ts": bilibili_default,
			"./sites/cnblog.ts": cnblog_default,
			"./sites/csdn.ts": csdn_default,
			"./sites/discord.ts": discord_default,
			"./sites/gitee.ts": gitee_default,
			"./sites/github.ts": github_default,
			"./sites/jb51.ts": jb51_default,
			"./sites/jianshu.ts": jianshu_default,
			"./sites/juejin.ts": juejin_default,
			"./sites/mdn.ts": mdn_default,
			"./sites/qqmail.ts": qqmail_default,
			"./sites/qwen.ts": qwen_default,
			"./sites/raycast-website.ts": raycast_website_default,
			"./sites/regex101.ts": regex101_default,
			"./sites/sourcegraph.ts": sourcegraph_default,
			"./sites/stackoverflow.ts": stackoverflow_default,
			"./sites/tieba.ts": tieba_default,
			"./sites/twitter.ts": twitter_default,
			"./sites/v2ex.ts": v2ex_default,
			"./sites/w3cschools.ts": w3cschools_default,
			"./sites/wechat.ts": wechat_default,
			"./sites/yuque.ts": yuque_default
		});
		for (let [pattern, callback] of Object.values(globs).concat(customs)) {
			if (typeof pattern === "string") pattern = [pattern];
			const checkString = Array.isArray(pattern) && pattern.includes(current);
			const checkFn = typeof pattern === "function" && pattern(current);
			if (checkString || checkFn) {
				logger.info(`match current (${current})!`);
				callback(current);
			}
		}
		loadStyles();
	}
	var base_default = "*{font-optical-sizing:auto;font-kerning:auto;text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased!important}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}b,strong{font-weight:bolder}button,input,optgroup,select,textarea{font-feature-settings:inherit;font-variation-settings:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}::selection{color:#111;background-color:#aad0ffd9}:root::search-text{color:#000;background:#f2ce82}:root::search-text:current{color:#000;background:#f3ac42}";
	var font_default = "@font-face{font-family:Microsoft YaHei Light;src:local(\"sans-serif\")}@font-face{font-family:Consolas;src:local(\"monospace\")}@font-face{font-family:microsoft yahei;src:local(\"sans-serif\")}@font-face{font-family:consolas;src:local(\"monospace\")}";
	var scrollbar_default = ":root{--scrollbar-width:max(.85vw, 10px)}@media (prefers-color-scheme:light){:root{--scrollbar-color-rgb:0, 0, 0}}@media (prefers-color-scheme:dark){:root{--scrollbar-color-rgb:255, 255, 255}}::-webkit-scrollbar{width:var(--scrollbar-width)!important;height:var(--scrollbar-width)!important}::-webkit-scrollbar-track{border-radius:var(--scrollbar-width)!important;box-shadow:none!important;background-color:#0000!important}::-webkit-scrollbar-thumb{background-clip:content-box;box-shadow:inset 0 0 0 var(--scrollbar-width)!important;border-radius:var(--scrollbar-width)!important;border:calc(var(--scrollbar-width) * 2 / 9) solid transparent!important;color:rgba(var(--scrollbar-color-rgb), 30%)!important;background-color:#0000!important}::-webkit-scrollbar-thumb:hover{color:rgba(var(--scrollbar-color-rgb), 45%)!important}::-webkit-scrollbar-thumb:active{color:rgba(var(--scrollbar-color-rgb), 60%)!important}@supports not selector(::-webkit-scrollbar){html{scrollbar-color:rgb(var(--scrollbar-color-rgb));scrollbar-width:thin}}";
	var current = window.location.hostname;
	logger.info(current);
	function init() {
		if (getScrollbar()) {
			loadStyles(scrollbar_default);
			setCssVariable(scrollbarWidthVariableName, getScrollbarWidth());
		}
		__fontVariable();
		loadSites(current, SITEMAP);
		loadStyles();
		if (isInBlockList(current, blocklist)) {
			logger.warn("在黑名单中，排除全局优化字体");
			return;
		}
		if (isInBlockList(current, _GM_getValue("blocklist", []))) {
			logger.warn("排除当前域名的字体美化");
			_GM_registerMenuCommand("恢复当前域名的字体美化并刷新", () => {
				const stored = _GM_getValue("blocklist", []);
				const index = stored.indexOf(current);
				if (index !== -1) stored.splice(index, 1);
				_GM_setValue("blocklist", stored);
				location.reload();
			});
			return;
		}
		__sansFont();
		__codeFont();
		if (getSettings("FONT_FAMILY_REPLACE", true)) {
			loadStyles(font_default);
			_GM_registerMenuCommand("[Beta] 不替换系统字体", () => {
				setSettings("FONT_FAMILY_REPLACE", false);
				location.reload();
			});
		} else _GM_registerMenuCommand("[Beta] 替换系统字体", () => {
			setSettings("FONT_FAMILY_REPLACE", true);
			location.reload();
		});
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
		loadStyles(base_default);
	}
	init();
	loadSettingMenus();
	_GM_registerMenuCommand(`${getDebug() ? "关闭" : "开启"} Debug 模式并刷新页面`, () => {
		toggleDebug();
		location.reload();
	});
	var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches && getSettings("DARK", false);
	if (isDark) addRootCSS("color-scheme", "dark");
	window.onload = () => {
		setTimeout(() => {
			const list = document.documentElement.classList;
			if (isDark && (list.contains("theme-dark") || list.contains("dark"))) addRootCSS("color-scheme", "dark");
			loadStyles();
			if (!document.querySelector(`.script-mono`)) {
				logger.warn("未找到 userscript-mono 标签，重新加载");
				init();
			}
		}, 500);
	};
})();
