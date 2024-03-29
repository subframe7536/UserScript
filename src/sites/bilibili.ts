import { addCSS, addSansFont } from '../utils'
import type { Site } from '.'

export default [['www.bilibili.com', 't.bilibili.com', 'space.bilibili.com'], () => {
  addSansFont(
    '.bili-comment.browser-pc *',
    '.video-page-card-small .card-box .info .title',
    '.h .h-sign',
    '.video-info-container .video-title',
    '.bili-video-card *',
  )
  addCSS('.video-share', 'display:none!important')
}] satisfies Site
