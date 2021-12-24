function H5share(info, successCircle, successFriend) {

  var ua = navigator.userAgent.toLowerCase();

  if (ua.match(/MicroMessenger/i) == "micromessenger") {

    $.get('//api.h5kk.cn/init/jssdk.php', { url: location.href }, function (wxData) {

      wx.config({
        debug: false,
        appId: wxData.appId,
        timestamp: wxData.timestamp,
        nonceStr: wxData.nonceStr,
        signature: wxData.signature,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'],
        openTagList: ['wx-open-launch-weapp']
      });

      wx.ready(function () {

        wx.hideMenuItems({
          menuList: ["menuItem:copyUrl"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });

        wx.onMenuShareAppMessage({
          title: info.title,
          desc: info.desc,
          link: info.link,
          imgUrl: info.imgUrl,
          type: '',
          dataUrl: '',
          success: function () {
            successCircle()
          },
          cancel: function () {
          }
        });

        wx.onMenuShareTimeline({
          title: info.title,
          link: info.link,
          imgUrl: info.imgUrl,
          success: function () {
            successFriend()
          },
          cancel: function () {
          }
        });

      })

    }, 'json')

  }


}