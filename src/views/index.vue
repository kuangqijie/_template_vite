<template>
  <PageTest />
</template>

<script setup>
import { reactive } from 'vue';
import { getUserInfo, reportPv, reportDuration } from '../common/serve.js';
import { scene, actData, isShowPop, popZj, isAuth } from '../store/index.js';

async function init() {
  await getUserInfo();
}
</script>

<style lang="less">

</style>
