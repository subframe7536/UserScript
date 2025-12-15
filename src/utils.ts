import { GM_getValue, GM_setValue } from '$'
import { createBrowserLogger } from 'consoloo/browser'

import {
  moduleName,
  monoFeatureVariableName,
  monospaceSelectors,
  monoVariableName,
  sansExcludeSelector,
  sansVariableName,
} from './constants'
import { getMono, getMonoFeature, getSans, getSettingsVariable } from './settings'

let styleArray: string[] = []

export const logger = createBrowserLogger({ logMode: getDebug() ? 'debug' : 'disable' }).withScope('scripts-mono')

/**
 * load all cached css if absent, else load param
 * @param style css code
 */
export function loadStyles(style?: string) {
  if (styleArray.length || style) {
    const targetStyle = style || [...new Set(styleArray)].join('')
    document.documentElement.insertAdjacentHTML(
      'beforeend',
      `<style class="${moduleName}">${targetStyle}</style>`,
    )
    logger.debug(targetStyle)
    if (!style) {
      styleArray = []
    }
  }
}

/**
 * set css variable on root
 * @param name variable name, can absent prefix `--`
 * @param value variable value
 */
export function setCssVariable(name: string, value: string) {
  const variableName = name.startsWith('--') ? name : `--${name}`
  document.body?.style.setProperty(variableName, value)
}

export function addRootCSS(property: string, value: string) {
  styleArray.push(`:root{${property}:${value}}`)
}

export function addBodyAndRootVariable(property: string, value: string) {
  styleArray.push(`:is(:root,body){--${property}:${value}}`)
}

export function addCSS(selectors: string | string[], styles: string | string[]) {
  selectors = Array.isArray(selectors) ? selectors : [selectors]
  styles = Array.isArray(styles) ? styles : [styles]
  styleArray.push(`${selectors.join(',')}{${styles.join(';')}}`)
}

let codeFontSelectors: string[] = []

export function __fontVariable() {
  addBodyAndRootVariable(monoVariableName, `${getMono()},${getSans()}`)
  addBodyAndRootVariable(monoFeatureVariableName, getMonoFeature())
  addBodyAndRootVariable(sansVariableName, getSans())
}

export const codeStyles = [
  `font-family:${getSettingsVariable('MONO')}!important`,
  `font-feature-settings:${getSettingsVariable('MONO_SETTING')}!important`,
  'letter-spacing:0px!important',
]

export function __codeFont() {
  addCSS(monospaceSelectors.concat(codeFontSelectors), codeStyles)
  codeFontSelectors = []
}

export function addCodeFont(...selectors: string[]) {
  codeFontSelectors.push(...selectors)
}

let sansFontSelectors: string[] = []

export const sansStyles = [
  `font-family:${getSettingsVariable('SANS')}`,
  'letter-spacing:0px!important',
]

export const sansStylesImportant = [
  `font-family:${getSettingsVariable('SANS')}!important`,
  'letter-spacing:0px!important',
]

export function __sansFont() {
  addCSS(`body :not(${sansExcludeSelector.join(',')})`, sansStyles)
  addCSS(sansFontSelectors, sansStylesImportant)
  sansFontSelectors = []
}

/**
 * add important sans font style to selector
 */
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
