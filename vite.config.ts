import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

const __dirname = dirname(fileURLToPath(import.meta.url))
// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    legalComments: 'inline',
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
  plugins: [
    monkey({
      entry: join(__dirname, 'src/main.ts'),
      build: {
        autoGrant: true,
      },
      userscript: {
        'run-at': 'document-start',
        'author': 'subframe7536',
        'name': '全局滚动条美化 & 字体修改',
        'icon': 'https://foruda.gitee.com/avatar/1677064980766394537/5705841_subframe7536_1652618638.png!avatar200',
        'namespace': 'http://tampermonkey.net/',
        'description': '全局字体美化，滚动条美化，支持自定义字体、自定义规则',
        'supportURL': 'https://github.com/subframe7536/userscript',
        'license': 'MIT',
        'match': ['*://*/*'],
      },
    }),
  ],
})
