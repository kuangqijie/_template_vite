import { defineAsyncComponent } from 'vue';

// 批量导入组件
// app.use安装
export default {
  install: function (app) {
    // 批量导入文件（同步）构建时不会分包
    const components = import.meta.globEager('/src/components/*.vue');

    // 批量导入文件（异步）
    // 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk
    // const components = import.meta.glob('/src/components/*.vue');

    Object.keys(components).forEach(key => {
      let comp = defineAsyncComponent(() => Promise.resolve(components[key]));
      // let comp = defineAsyncComponent(components[key]);
      let name = key.replace(/(.*\/)*([^.]+).*/ig, "$2");

      // console.log(name, comp);
      // 注册全局组件
      app.component(name, comp);
    })
  }
}