import axios from 'axios';
import { actData } from '../store/index.js';
import { baseURL } from '../config/index.js';

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
    instance({
      method: 'post',
      ...options,

      url: baseURL + options.url,

      data: {
        ...Object.assign({ uuid: actData.uuid || localStorage.sc_pads_uuid }, options.data)
      },
    }).then(res => {
      // console.log(options.url, res);

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