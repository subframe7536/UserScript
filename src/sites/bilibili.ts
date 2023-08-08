import { addSansFont } from '../utils'
import type { Site } from '.'

export default ['www.bilibili.com', () => {
  addSansFont(
    '.bili-comment.browser-pc *',
    '.video-page-card-small .card-box .info .title',
  )
}] satisfies Site