
import { actData } from '../store';

// 友盟埋点
$('body').on('touchstart', '[data-tj]', function () {
  if (!window.aplus_queue) return;

  let tj = $(this).attr('data-tj');
  let arr = tj.split('-');

  //点击埋点
  aplus_queue.push({
    action: "aplus.record",
    arguments: [arr[0], "CLK", {}],
  })

  console.log('友盟埋点：', arr.join());
})

// PV埋点
if (window.aplus_queue) {
  aplus_queue.push({
    action: "aplus.record",
    arguments: ['0', "CLK", {}],
  })
}