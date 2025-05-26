import type { Site } from '../load'

import { addCSS, addSansFont } from '../utils'

export default [current => current.endsWith('bilibili.com'), () => {
  addSansFont(
    '.bili-comment.browser-pc *',
    '.video-page-card-small .card-box .info .title',
    '.h .h-sign',
    '.video-info-container .video-title',
    '.bili-video-card *',
    '.room-info-ctnr *',
    '.player-and-aside-area *',
  )
  addCSS('.video-share', 'display:none!important')
}] satisfies Site
