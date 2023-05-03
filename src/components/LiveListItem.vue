<script setup lang="ts">
import type {ExInfoType} from "@/typings/discover";


defineProps<{
  extInfo: ExInfoType
}>()
</script>

<template>
  <div class="live-list-item">
    <img :src="extInfo.cover" :alt="extInfo.title">
    <div class="live-content">
      <div class="title">{{ extInfo.title }}</div>
      <div class="title-tag">{{extInfo.privateTag}}</div>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.live-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 49px;

  img {
    display: block;
    flex: 0 0 42px;
    width: 42px;
    border-radius: 10px;
  }

  .live-content{
    flex: 1;
    margin-left: 12px;
    margin-right: 5px;

    .title {
      font-family: 幼圆,serif;
      font-weight: 600;
    }

    .title-tag {
      font-size: 11px;
      margin-top: 10px;
    }
  }
}
</style>