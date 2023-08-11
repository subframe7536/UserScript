import { createWebLogger } from 'consoloo/web'
import { BASE_CONFIG } from './_head'
import { sansExcludeSelector } from './constants'
import { GM_getValue, GM_setValue } from '$'

let styleArray: string[] = []
const sans = BASE_CONFIG.SANS || 'sans-serif'
const mono = BASE_CONFIG.MONO || 'monospace'
const monoSetting = BASE_CONFIG.MONO_SETTING || 'calt'
export const logger = createWebLogger(getDebug() ? 'debug' : 'disable').withScope('scripts-mono')

export function loadStyles(style?: string) {
  if (styleArray.length || style) {
    document.documentElement.insertAdjacentHTML(
      'beforeend', `<style class="script-mono">${style || styleArray.join('')}</style>`,
    )
    if (!style) {
      styleArray = []
    }
  }
}

export function addRootCSS(property: string, value: string) {
  styleArray.push(`:root{${property}:${value}}`)
}

export function addCSS(selectors: string | string[], styles: string | string[]) {
  selectors = Array.isArray(selectors) ? selectors : [selectors]
  styles = Array.isArray(styles) ? styles : [styles]
  styleArray.push(`${selectors.join(',')}{${styles.join(';')}}`)
}
export function addCodeFont(...selectors: string[]) {
  addCSS(
    selectors,
    [
      `font-family: ${mono}, ${sans} !important`,
      `font-feature-settings: ${monoSetting} !important`,
      'letter-spacing: 0px !important',
    ],
  )
}
export function addSansFontDefault() {
  addCSS(
    `body :not(${sansExcludeSelector.join(',')})`,
    [
      `font-family: ${sans}`,
      'letter-spacing: 0px!important',
    ],
  )
}
export function addSansFont(...selectors: string[]) {
  addCSS(
    selectors,
    [
      `font-family:${sans}!important`,
      'letter-spacing:0px!important',
    ],
  )
}

export function isInBlockList(current: string, blocklist: string[]) {
  return current && blocklist.some(pattern => current.includes(pattern))
}

export function getDebug() {
  return GM_getValue('debug', false)
}
export function toggleDebug() {
  const debug = !getDebug()
  logger.setLogMode(debug ? 'debug' : 'disable')
  GM_setValue('debug', debug)
}