import { WebLogger } from 'consoloo/web'
import { MONO, MONO_SETTING, SANS } from './_head'
import { sansExcludeSelector } from './constants'
import { GM_getValue, GM_setValue } from '$'

let styleArray: string[] = []
const sans = SANS || 'sans-serif'
const mono = MONO || 'monospace'
const monoSetting = MONO_SETTING || 'calt'
export const logger = new WebLogger({
  logMode: getDebug() ? 'debug' : 'disable',
}).withScope('font changer')

export function loadStyles(style?: string) {
  if (styleArray.length || style) {
    document.documentElement.insertAdjacentHTML(
      'beforeend', `<style>${style || styleArray.join('')}</style>`,
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
  logger.logMode = debug ? 'debug' : 'disable'
  GM_setValue('debug', debug)
}