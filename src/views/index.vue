<template>

</template>

<script setup>
import { reactive } from 'vue';
import { getUserInfo, reportPv, reportDuration } from '../common/serve.js';
import { scene, actData, isShowPop, popZj, isAuth } from '../store/index.js';


// 保存当前点击的任务标识
let clickTaskType = 0;
// 保存自动弹出的弹窗队列
let popQueue = [];


async function init() {
  await getUserInfo();
}
</script>
<style lang="less">
</style>
