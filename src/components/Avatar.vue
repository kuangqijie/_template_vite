<template>
  <div class="u-avatar f-dfvh">
    <img :src="url || actData.headImg" class="f-w" />
  </div>
</template>

<script setup>
import { actData } from '../store/index.js';
defineProps(['url'])
</script>

<style lang="less">
.u-avatar {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 50%;
  border: 0.02rem solid #fff;
  overflow: hidden;
  background: #fff;
}
</style>