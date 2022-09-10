<template>
  <PageTest />
</template>

<script setup>
import { reactive } from 'vue';
import { getUserInfo, reportPv, reportDuration } from '../common/serve';
import { wxShareInit, wxReady } from '../common/wxJsSdk';
import { actData } from '../store';
import { soundBgm } from '../common/sound';

init()

wxShareInit({
  title: '分享标题',
  desc: '分享描述',
})

async function init() {
  // await getUserInfo();

  // 微信自动播放音乐
  wxReady().then(() => soundBgm.play())
}
</script>

<style lang="less">

</style>
