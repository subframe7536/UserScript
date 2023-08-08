import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    legalComments: 'inline',
  },
  plugins: [
    monkey({
      entry: 'src/main.ts',
      build: {
        autoGrant: true,
      },
      userscript: {
        author: 'subframe7536',
        name: '全局滚动条美化 & 字体修改',
        icon: 'https://foruda.gitee.com/avatar/1677064980766394537/5705841_subframe7536_1652618638.png!avatar200',
        namespace: 'http://tampermonkey.net/',
        match: ['*://*/*'],
      },
    }),
  ],
})
