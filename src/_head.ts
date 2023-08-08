import type { Site } from './sites'

/**
 * @preserve
 * 普通字体
 *
 * @default 'sans-serif'
 */
export const SANS = ''
/**
 * @preserve
 * 等宽字体
 *
 * @default 'monospace'
 */
export const MONO = ''
/**
 * @preserve
 * 等宽字体 font-feature-settings 设置
*
* @default "calt"
 */
export const MONO_SETTING = ''

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