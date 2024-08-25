import { addCodeFont } from '../utils'
import type { Site } from '../load'

export default ['www.jb51.net', () => {
  addCodeFont('body div .syntaxhighlighter *')
}] satisfies Site
