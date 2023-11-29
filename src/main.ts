import { BASE_CONFIG, BLOCKLIST, SITEMAP } from './_head'
import { blocklist, isDark, moduleName } from './constants'
import {
  __codeFont,
  __sansFont,
  addRootCSS,
  getDebug,
  isInBlockList,
  loadStyles,
  logger,
  toggleDebug,
} from './utils'
import { loadSites } from './sites'
import base from './styles/base.css?inline'
import scrollbar from './styles/scrollbar.css?inline'
import { GM_deleteValue, GM_getValue, GM_registerMenuCommand, GM_setValue } from '$'

const current = window.location.hostname

logger.info(current)

function init() {
  if (BASE_CONFIG.SCROLLBAR) {
    loadStyles(scrollbar)
    document.documentElement.style.setProperty('--scrollbar-width', BASE_CONFIG.SCROLLBAR_WIDTH)
  }
  loadSites(current, SITEMAP)
  if (isInBlockList(current, [...blocklist, ...BLOCKLIST])) {
    return
  }
  if (isInBlockList(current, GM_getValue('blocklist', []))) {
    logger.warn('排除当前域名')
    GM_registerMenuCommand('恢复当前域名并刷新', () => {
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
  addRootCSS('--d-border-radius', '0.25rem') // for discourse
  addRootCSS('--font-mono', 'monospace')
  addRootCSS('--font-monospace', 'monospace')
  addRootCSS('--code-font', 'monospace')
  loadStyles()

  GM_registerMenuCommand('排除当前域名并刷新', () => {
    const stored: string[] = GM_getValue('blocklist', [])
    stored.push(current)
    GM_setValue('blocklist', stored)
    location.reload()
  })
  loadStyles(base)
}

GM_registerMenuCommand(`${BASE_CONFIG.SCROLLBAR ? '关闭' : '开启'}滚动条美化并刷新`, () => {
  GM_setValue('SCROLLBAR', !BASE_CONFIG.SCROLLBAR)
  logger.info(!BASE_CONFIG.SCROLLBAR)
  location.reload()
})

GM_registerMenuCommand('重置设置', () => {
  GM_deleteValue('SANS')
  GM_deleteValue('MONO')
  GM_deleteValue('MONO_SETTING')
  GM_deleteValue('SCROLLBAR')
  GM_deleteValue('SCROLLBAR_WIDTH')
})

GM_registerMenuCommand(`${getDebug() ? '关闭' : '开启'} Debug 模式并刷新`, () => {
  toggleDebug()
  location.reload()
})
init()
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
  }, 100)
}
