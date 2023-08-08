import { debug } from '../constants'

export type Site = [pattern: string, callback: () => void]

export function appendSites(current: string, customs: Site[]) {
  const map = new Map()

  const configs = import.meta.glob('./**.ts', { eager: true, import: 'default' }) as Record<string, Site>
  Object.values(configs).forEach(([pattern, callback]) => {
    map.set(pattern, callback)
  })
  customs.forEach(([pattern, callback]) => {
    map.set(pattern, callback)
  })
  if (map.has(current)) {
    debug && console.log(`[${current}] match current!`)
    map.get(current)?.()
  }
}