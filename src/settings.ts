/* eslint-disable no-alert */
import { logger, setCssVariable } from './utils'
import { GM_deleteValue, GM_getValue, GM_registerMenuCommand, GM_setValue } from '$'

type Settings = {
  SANS: string
  MONO: string
  MONO_SETTING: string
  SCROLLBAR: boolean
  SCROLLBAR_WIDTH: string
}

function getSettings<K extends keyof Settings>(key: K, defaultValue: any): Settings[K] {
  return GM_getValue(key) ?? defaultValue
}

export function getSettingsVariable<K extends keyof Settings>(key: K): string {
  switch (key) {
    case 'MONO':
      return `var(--userscript-mono,sans))`
    case 'MONO_SETTING':
      return `var(--userscript-mono-feature,"calt"))`
    case 'SANS':
      return `var(--userscript-sans,sans-serif))`
    case 'SCROLLBAR_WIDTH':
      return `var(--scrollbar-width,max(0.85vw,10px)))`
    default:
      return ''
  }
}

export function setSettings<K extends keyof Settings>(key: K, value: Settings[K]) {
  GM_setValue(key, value)
}

export function delSettings() {
  GM_deleteValue('SANS')
  GM_deleteValue('MONO')
  GM_deleteValue('MONO_SETTING')
  GM_deleteValue('SCROLLBAR')
  GM_deleteValue('SCROLLBAR_WIDTH')
  window.location.reload()
}

export function getSans() {
  return getSettings('SANS', 'sans-serif')
}

export function getMono() {
  return getSettings('MONO', 'monospace')
}

export function getMonoFeature() {
  return getSettings('MONO_SETTING', '"calt"')
}

export function getScrollbar() {
  return getSettings('SCROLLBAR', true)
}

export function getScrollbarWidth() {
  return getSettings('SCROLLBAR_WIDTH', 'max(0.85vw,10px)')
}

export function loadSettingMenus() {
  logger.info(`
Sans-Serif 字体: ${getSans()}
Monospace 字体: ${getMono()}
Monospace 字体特性: ${getMonoFeature()}
滚动条宽度: ${getScrollbarWidth()}
  `)

  GM_registerMenuCommand(`${getScrollbar() ? '关闭' : '开启'}滚动条美化并刷新`, () => {
    setSettings('SCROLLBAR', !getScrollbar())
    logger.info(getScrollbar())
    location.reload()
  })

  GM_registerMenuCommand(`设置 Sans-Serif 字体`, () => {
    const sans = prompt('Sans-Serif 字体', getSans())
    if (sans) {
      setSettings('SANS', sans)
      setCssVariable('userscript-sans', sans)
      logger.info(`Sans-Serif 字体修改为：${sans}`)
    } else {
      logger.info(`取消设置 Sans-Serif 字体`)
    }
  })

  GM_registerMenuCommand(`设置 Monospace 字体`, () => {
    const mono = prompt('Monospace 字体', getMono())
    if (mono) {
      setSettings('MONO', mono)
      setCssVariable('userscript-mono', mono)
      logger.info(`Monospace 字体修改为：${mono}`)
    } else {
      logger.info(`取消设置 Monospace 字体`)
    }
  })

  GM_registerMenuCommand(`设置 Monospace 字体特性`, () => {
    const monoSettings = prompt('Monospace 字体特性 (https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-feature-settings)', getMonoFeature())
    if (monoSettings) {
      const features = monoSettings
      setSettings('MONO_SETTING', features)
      setCssVariable('userscript-mono-feature', features)
      logger.info(`Monospace 字体特性修改为：${monoSettings}`)
    } else {
      logger.info(`取消设置 Monospace 字体特性`)
    }
  })

  getScrollbar() && GM_registerMenuCommand(`设置滚动条宽度`, () => {
    const width = prompt('滚动条宽度，可以是任何 CSS 长度', getScrollbarWidth())
    if (width) {
      setSettings('SCROLLBAR_WIDTH', width)
      setCssVariable('scrollbar-width', width)
      logger.info(`滚动条宽度修改为：${width}`)
    } else {
      logger.info(`取消设置滚动条宽度`)
    }
  })

  GM_registerMenuCommand('重置设置并刷新', delSettings)
}
// #endregion
