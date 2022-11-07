<template>
  <div class="m-popup f-pach a-fadeIn">
    <div class="cont f-pach f-dfvh a-pulse">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less">
// 弹窗组件
.m-popup {
  position: fixed;
  background: rgba(0, 0, 0, .8);
  z-index: 99;

  .cont {
    width: 7.5rem;
    margin: 0 auto;
  }
}
</style>