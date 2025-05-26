import type { Arrayable } from '@subframe7536/type-utils'

import { loadStyles, logger } from './utils'

export type Site = [pattern: Arrayable<string> | ((current: string) => boolean), callback: (current: string) => void]

export function loadSites(current: string, customs: Site[]) {
  const globs = import.meta.glob<Site>('./sites/**.ts', { eager: true, import: 'default' })
  for (let [pattern, callback] of Object.values(globs).concat(customs)) {
    if (typeof pattern === 'string') {
      pattern = [pattern]
    }
    const checkString = Array.isArray(pattern) && pattern.includes(current)
    const checkFn = typeof pattern === 'function' && pattern(current)
    if (checkString || checkFn) {
      logger.info(`match current (${current})!`)
      callback(current)
    }
  }

  loadStyles()
}
