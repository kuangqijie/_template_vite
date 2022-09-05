import './css/base.less';
import './css/app.less';

import './common/helper.js';

import { createApp } from 'vue';
import { queryString } from 'urljs';
import Components from './config/components.js';
import Index from './views/index.vue';


if (queryString('test') == 1) {
  window.vConsole = new window.VConsole();
}

const app = createApp(Index);

app.use(Components);
app.mount('#app');