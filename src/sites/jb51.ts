import type { Site } from '../load'
import { addCodeFont } from '../utils'

export default ['www.jb51.net', () => {
  addCodeFont('body div .syntaxhighlighter *')
}] satisfies Site
