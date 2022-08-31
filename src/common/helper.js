/** 
 * DOM相关全局通用方法
*/

import { nextTick } from 'vue';

// 消息提示
window.showToast = function (text, duration) {
  hideToast();
  $('body').append('<div class="f-toast"><p>' + text + '</p></div>');

  window.toastTimer = setTimeout(function () {
    $('.f-toast').remove();
  }, duration || 2000)
}
window.hideToast = function () {
  clearTimeout(window.toastTimer);
  $('.f-toast').remove();
}

// loading
window.showLoading = function (text) {
  var info = text ? '<p>' + text + '</p>' : '';
  hideLoading();
  $('body').append('<div class="f-loading f-dfvh"><div class="info f-dfvh"><i></i>' + info + '</div></div>');
}
window.hideLoading = function () {
  $('.f-loading').remove();
}

// 按钮active
nextTick(() => {
  $('body').on('touchstart', '.btn, .j-act', function () {
    var $this = $(this);
    $this.addClass('f-active');
    setTimeout(function () {
      $this.removeClass('f-active');
    }, 100)
  })
})

