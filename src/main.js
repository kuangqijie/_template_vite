import './css/base.less';

import { createApp } from 'vue'
import page from './views/index/index.vue'

if ($.url.param("test") == 1) {
  window.vConsole = new window.VConsole();
}

createApp(page).mount('#app')
