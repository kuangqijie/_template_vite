var apiUrl = 'https://api.h5kk.cn/ydy/index.php?_uri=';
// 判断是否是微信
var isWeiXin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";


// 按钮active
$('body').on('touchstart', '.btn, .j-act', function () {
  var $this = $(this);
  $this.addClass('f-active');
  setTimeout(function () {
    $this.removeClass('f-active');
  }, 100)
})

// 弹窗关闭
$('body').on('click', '.m-popup .close, .m-popup .j-close', function () {
  $(this).parents('.m-popup').hide();
})
// loading
function showLoading(text) {
  var info = text ? '<p>' + text + '</p>' : '';
  hideLoading();
  $('body').append('<div class="f-loading f-dfvh"><div class="info f-dfvh"><i></i>' + info + '</div></div>');
}
function hideLoading() {
  $('.f-loading').remove();
}


// 消息提示
function showToast(text, duration) {
  hideToast();
  $('body').append('<div class="f-toast"><p>' + text + '</p></div>');

  window.toastTimer = setTimeout(function () {
    $('.f-toast').remove();
  }, duration || 2000)
}
function hideToast() {
  clearTimeout(window.toastTimer);
  $('.f-toast').remove();
}

function ajax(options) {
  var data = {
    type: options.type || 'POST',
    url: apiUrl + (options.url || ''),
    data: options.data || {},
    dataType: 'json',
    success: function (res) {
      if (options.success) {
        options.success(res);
      }
      if (res.ret != 200) {
        showToast(res.message);
      }
    },
    error: function (res, textStatus, errorThrown) {
      console.log(res)
      hideLoading();
      showToast(options.url + ': ' + JSON.stringify(res) + textStatus + ' ' + errorThrown);
    }
  }
  return $.ajax(data)
}

// 音效控制
function playAudio(audio, b) {
  if (!audio || !audio.length) return;

  if (b) {
    audio[0].currentTime = 0;
    audio[0].play();
  } else {
    audio[0].pause();
  }
}

// 微信音频自动播放
function wxInitAudio(audio) {
  audio.play();
  document.addEventListener('WeixinJSBridgeReady', wxInitAudio, false);
  document.addEventListener('YixinJSBridgeReady', wxInitAudio, false);
}