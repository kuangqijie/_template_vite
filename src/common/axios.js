import axios from 'axios';
import { actData } from '../store/index.js';
import { baseURL } from '../config/index.js';
import { getLocalStorage } from './index.js';

const instance = axios.create({
  // baseURL,  //会在末尾追加斜杠，暂且不用
  timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 发送请求之前
  // console.log(config)
  // config.headers.token = ''
  return config;
}, function (error) {
  showToast(`request请求失败：${error.message}，${error.config.url}`)

  // 请求错误
  return Promise.reject(error);
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 响应数据
  if (response.status == 200) {
    return Promise.resolve(response.data);
  } else {
    showToast(`response请求失败：${response.status}，${response.message}，${response.config.url}`)

    return Promise.reject(response.data);
  }
}, function (error) {
  return Promise.reject(error);
})

// 导出ajax
export function ajax(options) {
  return new Promise((resolve, reject) => {
    const opts = {
      method: 'post',
      ...options,
      url: options.url.startsWith('http') ? options.url : baseURL + options.url,
    }

    if (options.method == 'get') {
      opts.params = { ...options.params };
    } else {
      opts.data = {
        uuid: actData.uuid || getLocalStorage('uuid'),
        ...options.data,
      }
    }

    // console.log(opts)

    instance(opts).then(res => {
      // console.log(options.url, res);

      // 微信jssdk配置信息
      if (options.type == 'wxConfig') {
        resolve(res);
        return;
      }

      if (res.ret == 200) {
        resolve(res.data);
      } else {
        hideLoading();
        showToast(res.message || `${options.url}请求失败`);
        reject(res);
      }
    }).catch(error => {
      hideLoading();
      console.log(error)
      showToast(`请求失败：${error.message}，${error.config.url}`)
    })
  })
}