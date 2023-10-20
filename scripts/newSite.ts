import { readdir, writeFile } from 'node:fs/promises'
import { consola } from 'consola'

consola.info('hello world')

const name = await consola.prompt('site name', { type: 'text' })

const existingSites = (await readdir('./src/sites')).map(name => name.slice(0, -3))

if (existingSites.includes(name)) {
  consola.error(`site "${name}" already exists`)
  process.exit(1)
}

await writeFile(`./src/sites/${name}.ts`, `import type { Site } from '.'

export default ['', () => {

}] satisfies Site
`)

consola.success(`site "${name}" created`)
