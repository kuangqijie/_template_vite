/**
 * 工具类函数
 */

import { queryString } from 'urljs';
import { actLink, localStoragePrefix } from '../config/index.js';

export const isDev = location.host.indexOf('192') === 0;

// 获取动态图片路径（打包解析带hash值）
const images = import.meta.globEager('/src/images/**/*');
// console.log(images)
export function getImageUrl(name) {
  let res = images[`/src/images/${name}`];
  if (!res) return;
  return res.default;
}

const mp3 = import.meta.globEager('/src/mp3/**/*');
export function getMp3Url(name) {
  let res = mp3[`/src/mp3/${name}`];
  if (!res) return;
  return res.default;
}


// 微信音频自动播放（微信已不支持）
export function wxInitAudio(audio) {
  audio.play();
  document.addEventListener('WeixinJSBridgeReady', audio.play, false);
  document.addEventListener('YixinJSBridgeReady', audio.play, false);
}

// 动态插入css
export function createStyle(str) {
  let style = document.createElement('style')
  style.type = 'text/css';
  style.appendChild(document.createTextNode(str))
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(style);
}

export const userAgent = navigator.userAgent;
//ios终端
export const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// 判断是否是微信
export const isWeiXin = userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";


// 生成随机字符串
export function randomString(e = 8) {
  let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

// 加载图片
export function loadImg(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = function () {
      resolve(img);
    }
    img.onerror = () => {
      showToast('网络错误，请重试');
      reject();
    }
    img.src = url;
  })
}

// 从数组随机获取n个元素
export function getRandFromArr(arr, n) {
  let len = arr.length;
  if (n >= len) {
    return arr;
  }
  let s = parseInt(Math.random() * len);
  let e = s + 3;
  let res = [];

  if (e <= len) {
    res = arr.slice(s, s + 3);
  } else {
    let mw = arr.slice(s);
    let n2 = n - mw.length;

    res = [...mw, ...arr.slice(0, n2)];
  }
  return res;
}

// 加延迟
export function delay(t = 10) {
  return new Promise((resolve) => {
    setTimeout(resolve, t);
  })
}

// 跳转微信授权获取code
export function goWxAuth() {
  let param = queryString('test') == 1 ? '?test=1' : '';
  let back_url = encodeURIComponent(actLink + param);
  let paAppid = 'wx5ccd3fb318c8cbe6';
  let oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';

  let code = queryString("code");

  location.replace(`${oauthUrl}?appid=${paAppid}&redirect_uri=${back_url}&response_type=code&scope=snsapi_userinfo&state=step1&component_appid=wxfc54817af0b94bb6#wechat_redirect`)
}

// 获取/设置localStorage 带活动标识前缀
export function getLocalStorage(key) {
  return localStorage[localStoragePrefix + key] || '';
}

export function setLocalStorage(key, value) {
  return localStorage[localStoragePrefix + key] = value;
}