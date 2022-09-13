
import { actData } from '../store';

// 友盟埋点
$('body').on('touchstart', '[data-tj]', function () {
  if (!window.aplus_queue) return;

  let tj = $(this).attr('data-tj');
  let arr = tj.split('-');

  //点击埋点
  report(arr[0]);
})

// PV埋点
if (window.aplus_queue) {
  report('0');
}

// 自定义事件埋点
export function report(id, params) {
  let data = { ...params }
  aplus_queue.push({
    action: "aplus.record",
    arguments: [id, "CLK", data],
  })
  console.log('友盟埋点：', id, data)
}