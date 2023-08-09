import { loadStyleAtHTML } from '../utils'
import type { Site } from '.'

export default ['regex101.com', () => {
  loadStyleAtHTML('--code-font', 'monospace,sans-serif!important')
  loadStyleAtHTML('--app-font', 'sans-serif!important')
}] satisfies Site
