import { ajax } from '../common/axios.js';
import { isIOS } from '../common/index.js';
import { actData, popZj, isShowPop } from '../store/index.js';
import { setLocalStorage, getLocalStorage, randomString } from '../common/index.js';

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

// 抽奖
export async function cj(url, param) {
  showLoading();
  return ajax({
    url,
    data: {
      ...param,
    },
  }).then(data => {
    hideLoading();
    Object.assign(actData, data);

    // 抽奖结果
    if (data.isWon) {
      // 显示中奖弹窗
      Object.assign(popZj, data);
      popZj.show = true;
    } else {
      // 显示未中奖弹窗
      isShowPop.wzj = true;
    }
  })
}

// 生成随机id
let client_id = getLocalStorage('client_id');
if (!client_id) {
  client_id = randomString();
  setLocalStorage('client_id', client_id);
}

// 统计-PV
export function reportPv() {
  ajax({
    url: 'PageView',
    data: {
      client_id,
      system: isIOS ? 1 : 2,
    }
  })
}

// 统计-页面停留时长
export function reportDuration() {
  ajax({
    url: 'PageDuration',
    data: {
      client_id,
      system: isIOS ? 1 : 2,
    }
  })
}