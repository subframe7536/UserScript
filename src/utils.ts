import { createBrowserLogger } from 'consoloo/browser'
import { moduleName, monospaceSelectors, sansExcludeSelector } from './constants'
import { BASE_CONFIG } from './_head'
import { GM_getValue, GM_setValue } from '$'

let styleArray: string[] = []

export const logger = createBrowserLogger(getDebug() ? 'debug' : 'disable').withScope('scripts-mono')

export function loadStyles(style?: string) {
  if (styleArray.length || style) {
    document.documentElement.insertAdjacentHTML(
      'beforeend',
      `<style class="${moduleName}">${style || [...new Set(styleArray)].join('')}</style>`,
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

let codeFontSelectors: string[] = []

export function __codeFont() {
  addCSS(
    monospaceSelectors.concat(codeFontSelectors),
    [
      `font-family: ${BASE_CONFIG.MONO}, ${BASE_CONFIG.SANS} !important`,
      `font-feature-settings: ${BASE_CONFIG.MONO_SETTING.map(s => `"${s}"`).join(',')} !important`,
      'letter-spacing: 0px !important',
    ],
  )
  codeFontSelectors = []
}

export function addCodeFont(...selectors: string[]) {
  codeFontSelectors.push(...selectors)
}

let sansFontSelectors: string[] = []

export function __sansFont() {
  addCSS(
    `body :not(${sansExcludeSelector.join(',')})`,
    [
      `font-family: ${BASE_CONFIG.SANS}`,
      'letter-spacing: 0px!important',
    ],
  )
  addCSS(
    sansFontSelectors,
    [
      `font-family: ${BASE_CONFIG.SANS}!important`,
      'letter-spacing: 0px!important',
    ],
  )
  sansFontSelectors = []
}
export function addSansFont(...selectors: string[]) {
  sansFontSelectors.push(...selectors)
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
