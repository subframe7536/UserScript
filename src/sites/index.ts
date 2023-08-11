import { loadStyles, logger } from '../utils'

export type Site = [pattern: string, callback: () => void]

export function loadSites(current: string, customs: Site[]) {
  const map = new Map()

  const configs = import.meta.glob('./**.ts', { eager: true, import: 'default' }) as Record<string, Site>
  Object.values(configs).forEach(([pattern, callback]) => {
    map.set(pattern, callback)
  })
  customs.forEach(([pattern, callback]) => {
    map.set(pattern, callback)
  })
  if (map.has(current)) {
    logger.info(`[${current}] match current!`)
    map.get(current)?.()
  }
  loadStyles()
}