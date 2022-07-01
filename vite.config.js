import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import autoprefixer from 'autoprefixer'

const config = {
  base: './',
  plugins: [
    vue(),
    legacy({
      targets: ['last 2 versions']
    })
  ],
  server: {
    host: '0.0.0.0',
    port: '6600'
  },
  css: {
    postcss: {
      plugins: [
        // 自动添加前缀
        autoprefixer({
          overrideBrowserslist: ['last 1 versions']
        }),
      ]
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // share: resolve(__dirname, 'share.html')
      }
    },
    //小于此阈值的导入或引用资源将内联为 base64 编码
    assetsInlineLimit: 10000,
  },
}

export default defineConfig(config)
