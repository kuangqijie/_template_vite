import fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import autoprefixer from 'autoprefixer'
// import postcssSprites from 'postcss-sprites'


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

        // 合成雪碧图
        // postcssSprites({
        //   spritesmith: {
        //     padding: 20,
        //   },
        //   filterBy: function (image) {
        //     // 只允许png图片
        //     if (!/\.png$/.test(image.url)) {
        //       return Promise.reject();
        //     }

        //     // 过滤大于40kb的图片
        //     let file = fs.statSync(image.path);
        //     if (file.size > 1024 * 40) {
        //       return Promise.reject();
        //     }

        //     return Promise.resolve();
        //   },
        //   hooks: {
        //     onUpdateRule: function (rule, token, image) {
        //       const { coords, spriteUrl, spriteWidth, spriteHeight } = image;

        //       var posX = -1 * Math.abs(coords.x / 100);
        //       var posY = -1 * Math.abs(coords.y / 100);
        //       var sizeX = spriteWidth / 100;
        //       var sizeY = spriteHeight / 100;

        //       token.cloneAfter({
        //         type: 'decl',
        //         prop: 'background',
        //         value: `url(${spriteUrl}) no-repeat ${posX}rem ${posY}rem/${sizeX}rem ${sizeY}rem`
        //       })
        //     }
        //   },
        // })
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
