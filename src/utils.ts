import { createBrowserLogger } from 'consoloo/browser'
import { moduleName, monospaceSelectors, sansExcludeSelector } from './constants'
import { getMono, getMonoFeature, getSans } from './settings'
import { GM_getValue, GM_setValue } from '$'

let styleArray: string[] = []

export const logger = createBrowserLogger(getDebug() ? 'debug' : 'disable').withScope('scripts-mono')

/**
 * load all cached css if absent, else load param
 * @param style css code
 */
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
  const features = getMonoFeature().map(s => `"${s.trim()}"`).join(',')
  addCSS(
    monospaceSelectors.concat(codeFontSelectors),
    [
      `font-family:${getMono()},${getSans()}!important`,
      `font-feature-settings:${features}!important`,
      'letter-spacing:0px!important',
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
      `font-family:${getSans()}`,
      'letter-spacing:0px!important',
    ],
  )
  addCSS(
    sansFontSelectors,
    [
      `font-family:${getSans()}!important`,
      'letter-spacing:0px!important',
    ],
  )
  sansFontSelectors = []
}
export function addSansFont(...selectors: string[]) {
  sansFontSelectors.push(...selectors)
}

/**
 * ban default css, no affect to site rules
 */
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
