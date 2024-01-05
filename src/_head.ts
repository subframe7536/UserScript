import type { Site } from './sites'

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
 *   [['yuque.com'], () => {
 *     //...
 *   }],
 * ]
 * ```
 */
export const SITEMAP: Site[] = []
