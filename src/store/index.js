// 全局响应式数据
import { reactive, ref } from 'vue';

// 活动数据
const actData = reactive({

});
// 控制弹窗显示
const isShowPop = reactive({});

// 控制页面显示
const scene = ref(0);

// 中奖弹窗
const popZj = reactive({});

// 用户是否同意授权
const isAuth = ref(false);

export {
  isAuth,
  scene,
  actData,
  isShowPop,
  popZj,
}