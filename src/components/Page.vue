<template>
  <div class="m-page a-fadeIn">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style lang="less">
// 单页框架
.m-page {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  width: 7.5rem;
  height: 16rem;
  margin: -8rem auto 0;
}
</style>