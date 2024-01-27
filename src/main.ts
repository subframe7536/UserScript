import { SITEMAP } from './_head'
import { blocklist, isDark, moduleName } from './constants'
import {
  __codeFont,
  __fontVariable,
  __sansFont,
  addRootCSS,
  getDebug,
  isInBlockList,
  loadStyles,
  logger,
  setCssVariable,
  toggleDebug,
} from './utils'
import { loadSites } from './sites'
import base from './styles/base.css?inline'
import scrollbar from './styles/scrollbar.css?inline'
import { getScrollbar, getScrollbarWidth, loadSettingMenus, monoVariableName, scrollbarWidthVariableName } from './settings'
import { GM_getValue, GM_registerMenuCommand, GM_setValue } from '$'

const current = window.location.hostname

logger.info(current)

function init() {
  if (getScrollbar()) {
    loadStyles(scrollbar)
    setCssVariable(scrollbarWidthVariableName, getScrollbarWidth())
  }
  loadSites(current, SITEMAP)
  if (isInBlockList(current, blocklist)) {
    return
  }
  if (isInBlockList(current, GM_getValue('blocklist', []))) {
    logger.warn('排除当前域名的字体美化')
    GM_registerMenuCommand('恢复当前域名的字体美化并刷新', () => {
      const stored: string[] = GM_getValue('blocklist', [])
      const index = stored.indexOf(current)
      if (index !== -1) {
        stored.splice(index, 1)
      }
      GM_setValue('blocklist', stored)
      location.reload()
    })
    return
  }
  __sansFont()
  __codeFont()
  const monospaceVariableValue = 'var(--script-mono)'
  addRootCSS('--font-mono', monospaceVariableValue)
  addRootCSS('--font-monospace', monospaceVariableValue)
  addRootCSS('--code-font', monospaceVariableValue)
  loadStyles()

  GM_registerMenuCommand('排除当前域名的字体美化', () => {
    const stored: string[] = GM_getValue('blocklist', [])
    stored.push(current)
    GM_setValue('blocklist', stored)
    location.reload()
  })
  loadStyles(base)
}

init()
__fontVariable()
loadSettingMenus()

GM_registerMenuCommand(`${getDebug() ? '关闭' : '开启'} Debug 模式并刷新页面`, () => {
  toggleDebug()
  location.reload()
})

isDark && addRootCSS('color-scheme', 'dark')

window.onload = () => {
  setTimeout(() => {
    const list = document.documentElement.classList
    if (list.contains('theme-dark') || list.contains('dark')) {
      addRootCSS('color-scheme', 'dark')
    }
    loadStyles()
    if (!document.querySelector(`.${moduleName}`)) {
      logger.warn('未找到 userscript-mono 标签，重新加载')
      init()
    }
    if (!document.body.style.getPropertyValue(`--${monoVariableName}`)) {
      logger.warn('未找到 CSS 变量属性，重新加载')
      __fontVariable()
    }
  }, 500)
}
