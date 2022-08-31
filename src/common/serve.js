import { ajax } from '../common/axios.js';
import { isIOS } from '../common/index.js';
import { actData, popZj, isShowPop } from '../store/index.js';

// 获取用户信息
export async function getUserInfo() {
  showLoading();
  return ajax({
    url: 'UserInfo',
  }).then(data => {
    hideLoading();
    window.uuid = data.uuid;
    Object.assign(actData, data);
  })
}

// 统计-PV
export function reportPv() {
  ajax({
    url: 'PageView',
    data: {
      system: isIOS ? 1 : 2,
    }
  })
}

// 统计-页面停留时长
export function reportDuration() {
  ajax({
    url: 'PageDuration',
    data: {
      system: isIOS ? 1 : 2,
    }
  })
}