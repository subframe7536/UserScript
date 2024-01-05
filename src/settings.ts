/* eslint-disable no-alert */
import { logger } from './utils'
import { GM_deleteValue, GM_getValue, GM_registerMenuCommand, GM_setValue } from '$'

type Settings = {
  SANS: string
  MONO: string
  MONO_SETTING: string[]
  SCROLLBAR: boolean
  SCROLLBAR_WIDTH: string
}

function getSettings<K extends keyof Settings>(key: K, defaultValue: any): Settings[K] {
  return GM_getValue(key) ?? defaultValue
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
}

export function getSans() {
  return getSettings('SANS', 'sans-serif')
}

export function getMono() {
  return getSettings('MONO', 'monospace')
}

export function getMonoFeature() {
  return getSettings('MONO_SETTING', ['calt'])
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
      logger.info(`Sans-Serif 字体修改为：${sans}`)
      location.reload()
    } else {
      logger.info(`取消设置 Sans-Serif 字体`)
    }
  })

  GM_registerMenuCommand(`设置 Monospace 字体`, () => {
    const mono = prompt('Monospace 字体', getMono())
    if (mono) {
      setSettings('MONO', mono)
      logger.info(`Monospace 字体修改为：${mono}`)
      location.reload()
    } else {
      logger.info(`取消设置 Monospace 字体`)
    }
  })

  GM_registerMenuCommand(`设置 Monospace 字体特性`, () => {
    const monoSettings = prompt('Monospace 字体特性，使用 "|" 分隔', getMonoFeature().join('|'))
    if (monoSettings) {
      setSettings('MONO_SETTING', monoSettings.split('|').map(s => s.trim()))
      logger.info(`Monospace 字体特性修改为：${monoSettings}`)
      location.reload()
    } else {
      logger.info(`取消设置 Monospace 字体特性`)
    }
  })

  getScrollbar() && GM_registerMenuCommand(`设置滚动条宽度`, () => {
    const width = prompt('滚动条宽度，可以是任何 CSS 长度', getScrollbarWidth())
    if (width) {
      setSettings('SCROLLBAR_WIDTH', width)
      logger.info(`滚动条宽度修改为：${width}`)
      location.reload()
    } else {
      logger.info(`取消设置滚动条宽度`)
    }
  })

  GM_registerMenuCommand('重置设置', delSettings)
}
// #endregion
