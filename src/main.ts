import { GM_getValue, GM_registerMenuCommand, GM_setValue } from '$'

import { SITEMAP } from './_head'
import { blocklist, moduleName, scrollbarWidthVariableName } from './constants'
import { loadSites } from './load'
import { getScrollbar, getScrollbarWidth, getSettings, loadSettingMenus, setSettings } from './settings'
import base from './styles/base.css?inline'
import fontfamily from './styles/font.css?inline'
import scrollbar from './styles/scrollbar.css?inline'
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

const current = window.location.hostname

logger.info(current)

function init() {
  if (getScrollbar()) {
    loadStyles(scrollbar)
    setCssVariable(scrollbarWidthVariableName, getScrollbarWidth())
  }
  __fontVariable()
  loadSites(current, SITEMAP)
  loadStyles()
  if (isInBlockList(current, blocklist)) {
    logger.warn('在黑名单中，排除全局优化字体')
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

  if (getSettings('FONT_FAMILY_REPLACE', true)) {
    loadStyles(fontfamily)
    GM_registerMenuCommand('[Beta] 不替换系统字体', () => {
      setSettings('FONT_FAMILY_REPLACE', false)
      location.reload()
    })
  } else {
    GM_registerMenuCommand('[Beta] 替换系统字体', () => {
      setSettings('FONT_FAMILY_REPLACE', true)
      location.reload()
    })
  }

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
loadSettingMenus()

GM_registerMenuCommand(`${getDebug() ? '关闭' : '开启'} Debug 模式并刷新页面`, () => {
  toggleDebug()
  location.reload()
})

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches && getSettings('DARK', false)
if (isDark) {
  addRootCSS('color-scheme', 'dark')
}

window.onload = () => {
  setTimeout(() => {
    const list = document.documentElement.classList
    if (isDark && (list.contains('theme-dark') || list.contains('dark'))) {
      addRootCSS('color-scheme', 'dark')
    }
    loadStyles()
    if (!document.querySelector(`.${moduleName}`)) {
      logger.warn('未找到 userscript-mono 标签，重新加载')
      init()
    }
  }, 500)
}
