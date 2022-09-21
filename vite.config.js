import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import autoprefixer from 'autoprefixer'
import { createHtmlPlugin } from 'vite-plugin-html'

const config = {
  base: './',
  plugins: [
    vue(),
    legacy({
      targets: ['last 2 versions']
    }),
    // 默认会向 index.html 注入 .env 文件的内容
    createHtmlPlugin({
      minify: false,
      inject: {
        // 注入的数据，可以在 html 中使用 ejs 模版语法获取
        // <%- title %>
        data: {
          title: '测试啊'
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@common': resolve(__dirname, 'src/common'),
      '@comp': resolve(__dirname, 'src/components'),
      '@store': resolve(__dirname, 'src/store'),
      '@config': resolve(__dirname, 'src/config'),
      '@views': resolve(__dirname, 'src/views'),
    }
  },
  server: {
    host: '0.0.0.0',
    port: '20827',
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
        share: resolve(__dirname, 'share.html'),
      }
    },
    //小于此阈值的导入或引用资源将内联为 base64 编码
    assetsInlineLimit: 5000,
  },
}

export default defineConfig(config)
