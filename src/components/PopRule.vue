<template>
  <Popup class="m-popRule">
    <div class="inner f-pr">
      <div class="btn f-pac" @click="isShowPop.rule = false"></div>
    </div>
  </Popup>
</template>

<script setup>
import { isShowPop, } from '../store/index.js';

</script>

<style lang="less">
// 弹窗-规则
.m-popRule {
  .inner {
    width: 7.5rem;
    height: 100%;
    overflow-y: auto;
  }

  .u-close {
    right: 0.6rem;
    top: 1.26rem;
  }
}
</style>