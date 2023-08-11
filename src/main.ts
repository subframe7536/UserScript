import { BASE_CONFIG, BLOCKLIST, SITEMAP } from './_head'
import { blocklist, monospaceSelectors } from './constants'
import { addCodeFont, addRootCSS, addSansFontDefault, getDebug, isInBlockList, loadStyles, logger, toggleDebug } from './utils'
import { loadSites } from './sites'
import base from './styles/base.css?inline'
import scrollbar from './styles/scrollbar.css?inline'
import { GM_getValue, GM_registerMenuCommand, GM_setValue } from '$'

const current = window.location.hostname

logger.info(current)

function onWindowsAndNotOnEdge(): boolean {
  const ua = navigator.userAgent
  return /Windows/.test(ua) && !/Edg/.test(ua)
}

function loadCSS() {
  if (onWindowsAndNotOnEdge()) {
    logger.info('on Windows and not on edge')
    loadStyles(scrollbar)
    if (BASE_CONFIG.SCROLLBAR_WIDTH) {
      document.documentElement.style.setProperty('--scrollbar-width', BASE_CONFIG.SCROLLBAR_WIDTH)
    }
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
  addSansFontDefault()
  addCodeFont(...monospaceSelectors)
  addRootCSS('--d-border-radius', '0.25rem') // for discourse
  addRootCSS('--font-mono', 'monospace')
  addRootCSS('--font-monospace', 'monospace')
  loadStyles()

  GM_registerMenuCommand('排除当前域名并刷新', () => {
    const stored: string[] = GM_getValue('blocklist', [])
    stored.push(current)
    GM_setValue('blocklist', stored)
    location.reload()
  })
  loadStyles(base)
}

GM_registerMenuCommand(`${getDebug() ? '关闭' : '开启'} Debug 模式并刷新`, () => {
  toggleDebug()
  location.reload()
})
loadCSS()
window.onload = () => {
  setTimeout(() => {
    if (!document.querySelector('.scripts-mono')) {
      logger.warn('未找到 userscript-mono 标签，重新加载')
      loadCSS()
    }
  }, 100)
}