<template>
  <div>
    <div data-tj="1-抽奖" class="btn f-ft40 f-fwb f-p30">按钮</div>
    <p>测试赛撒旦法撒旦法</p>
    <div data-tj="2-规则" class="btn f-ft40 f-fwb f-p30">按钮2</div>
    <p>1112233344</p>

    <button @click="onShare">分享2</button>
  </div>
</template>

<script setup>
import { wxShareInit } from '../common/wxJsSdk';
import { soundBgm } from '../common/sound';

function onShare() {
  wxShareInit({
    title: '更新分享配置',
  })
}
</script>

<style lang="less">

</style>