import { addCodeFont } from '../utils'
import type { Site } from '.'

export default ['www.jb51.net', () => {
  addCodeFont('body div .syntaxhighlighter *')
}] satisfies Site
