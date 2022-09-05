import { ajax } from '../common/axios.js';
import { isIOS } from '../common/index.js';
import { actData } from '../store/index.js';
import { setLocalStorage } from '../common/index.js';

// 获取用户信息
export async function getUserInfo() {
  showLoading();
  return ajax({
    url: 'UserInfo',
  }).then(data => {
    hideLoading();
    setLocalStorage('uuid', data.uuid);
    Object.assign(actData, data);
  })
}

// 获取微信用户openid
// code：微信跳转授权后取到的code
export function getOpenId(code) {
  showLoading();
  return ajax({
    url: 'CodeUserInfo',
    data: {
      code,
    },
  }).then(data => {
    hideLoading();
    setLocalStorage('uuid', data.uuid);
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