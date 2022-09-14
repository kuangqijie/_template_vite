// 微信jssdk相关接口
// 1.登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
// 2.在需要调用 JS 接口的页面引入 https://res.wx.qq.com/open/js/jweixin-1.6.0.js
// 3.通过 config 接口注入权限验证配置。同一个 url 仅需调用一次，对于变化 url 的SPA的web app可在每次 url 变化时进行调用
// 4.通过 ready 接口处理成功验证。config信息验证后会执行 ready 方法，所有接口调用都必须在 config 接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在 ready 函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在 ready 函数中。
// 5.通过 error 接口处理失败验证

import { ref, watch } from 'vue';
import { ajax } from './axios';
import { isWeiXin, getAssetsUrl } from './index';
import { supplier, actLink } from '../config';

let isConfig = false;
let isReady = ref(false);
let blankImg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC`;

// wx.config
export async function wxConfig() {
  if (!isWeiXin || isConfig) return;
  isConfig = true;

  let ajaxOpts = {
    type: 'wxConfig',
    method: 'get',
    params: {
      url: location.href,
    }
  }
  if (supplier == 'tp') { //图派
    ajaxOpts.url = 'https://h5.toprand.com/tp_wx_thirdparty/index.php?_uri=ShareParam';
    ajaxOpts.params.appid = 'wx1b9ff1efb826794a';
  } else if (supplier == 'bt') { //上策，博图
    ajaxOpts.url = 'https://api.h5kk.cn/init/jssdk.php';
  }

  const wxData = await ajax(ajaxOpts);

  console.log('wx.config', Date.now())

  wx.config({
    debug: false,
    appId: wxData.appId,
    timestamp: wxData.timestamp,
    nonceStr: wxData.nonceStr,
    signature: wxData.signature,
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData', 'hideMenuItems'],
    openTagList: ['wx-open-launch-weapp', 'wx-open-subscribe']
  })

  wx.error(function (res) {
    console.log('wx.error', res);
  })
}

// wx.ready
export async function wxReady() {
  return new Promise((resolve) => {
    wxConfig();
    wx.ready(() => {
      console.log('wx.ready', Date.now())
      isReady.value = true;
      resolve();
    });
  })
}

// 自定义分享配置
export async function wxShareInit(options) {
  if (!isWeiXin) return;

  await wxReady();

  const data = {
    title: options.title, // 分享标题，必填
    desc: options.desc, // 分享描述
    link: options.link || actLink || location.href, // 分享链接，必填，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
    imgUrl: options.imgUrl || getAssetsUrl('images/wx.jpg') || blankImg, // 分享图标，必填
  }

  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
  wx.updateAppMessageShareData({
    ...data,
    success: function () {
      console.log('设置成功updateAppMessageShareData', Date.now())
      // 设置成功
      options.success && options.success();
    }
  })

  // 自定义“分享到朋友圈”及“分享到 QQ 空间”按钮的分享内容（1.4.0）
  wx.updateTimelineShareData({
    ...data,
    success: function () {
      console.log('设置成功updateTimelineShareData', Date.now())
      // 设置成功
      options.success2 && options.success2();
    }
  })

  return;

  // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
  wx.onMenuShareAppMessage({
    ...data,
    success: function () {
      console.log('分享给朋友')
      // 用户点击了分享后执行的回调函数
      options.success && options.success();
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });

  // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
  wx.onMenuShareTimeline({
    ...data,
    success: function () {
      console.log('分享到朋友圈')
      // 用户点击了分享后执行的回调函数
      options.success2 && options.success2();
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });
}

// 监听wx.ready
watch(isReady, (v) => {
  console.log('watch wx.ready', v);

  if (v) {
    wx.hideMenuItems({
      menuList: ["menuItem:copyUrl"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    })
  }
})