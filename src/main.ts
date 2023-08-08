import { BLOCKLIST, SITEMAP } from './_head'
import { blocklist, debug, monospaceSelectors } from './constants'
import { addCodeFont, addSansFontDefault, isInBlockList, loadStyleAtHTML, loadStyles } from './utils'
import { appendSites } from './sites'
import base from './styles/base.css?inline'
import scrollbar from './styles/scrollbar.css?inline'
import { GM_getValue, GM_registerMenuCommand, GM_setValue } from '$'

const current = window.location.hostname

debug && console.log(current)

function notEdgeOnWindows(): boolean {
  const ua = navigator.userAgent
  return /Edg/.test(ua) && /Windows/.test(ua)
}

function loadCSS() {
  if (isInBlockList(current, [...blocklist, ...BLOCKLIST])) {
    return
  }
  if (isInBlockList(current, GM_getValue('blocklist', []))) {
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
  appendSites(current, SITEMAP)
  if (notEdgeOnWindows()) {
    loadStyles(scrollbar)
  }
  loadStyles()
  loadStyleAtHTML('--d-border-radius', '0.25rem')
  loadStyleAtHTML('--font-mono', 'monospace')
  loadStyleAtHTML('--font-monospace', 'monospace')

  GM_registerMenuCommand('排除当前域名并刷新', () => {
    const stored: string[] = GM_getValue('blocklist', [])
    stored.push(current)
    GM_setValue('blocklist', stored)
    location.reload()
  })
}

loadStyles(base)
loadCSS()