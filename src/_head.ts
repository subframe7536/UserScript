import type { Site } from './sites'

/**
 * @preserve
 * 基础配置
 * - SANS: 普通字体，默认 'sans-serif'
 * - MONO: 等宽字体，默认 'monospace'
 * - MONO_SETTING: 等宽字体 font-feature-settings 设置，默认 'calt'
 * - SCROLLBAR_WIDTH: 滚动条宽度，可以是任何 css 的宽度，默认 'max(0.85vw, 10px)'
 */
export const BASE_CONFIG = {
  SANS: '',
  MONO: '',
  MONO_SETTING: '',
  SCROLLBAR_WIDTH: 'max(0.85vw,10px)',
}

/**
 * @preserve
 * 需要修改字体的域名的黑名单
 *
 * @example ['font']
 */
export const BLOCKLIST: string[] = []

/**
 * @preserve
 * 字体修改的规则
 * type: [pattern, callback]
 *
 * @example
 * ```
 * [
 *   ['w3cschools.com', () => {
 *     addCodeFont('.w3-code *')
 *   }],
 *   ['yuque.com', () => {
 *     //...
 *   }],
 * ]
 * ```
 */
export const SITEMAP: Site[] = []