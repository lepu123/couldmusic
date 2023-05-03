<script setup lang="ts">

import {computed} from "vue";

const props = defineProps<{
  title: string,
  image: string,
  playCount: number
}>()

let playCountLabel = computed(() => {
  let res = props.playCount

  let resSt = ''

  if (props.playCount >= 10000 && props.playCount < 100000) {
    resSt = Math.floor(res / 1000) / 10 + " 万";
  } else if (props.playCount >= 100000) {
    if (props.playCount < 100000000) {
      resSt = Math.floor(res / 10000) + " 万";
    } else {
      resSt = Math.floor(res / 10000000) / 10 + " 亿";
    }
  }

  return resSt;
})

</script>


<template>
  <div class="play-list-item">
    <div class="img-wrap">
      <img :src="image" :alt="title">
      <span class="play-count">{{ playCountLabel }}</span>
    </div>
    <h3 class="play-title van-multi-ellipsis--l2">{{ title }}</h3>
  </div>
</template>


<style lang="scss" scoped>
.play-list-item {
  flex: 0 0 30vw;
  margin-right: 8px;
  width: 30vw;

  .img-wrap {
    position: relative;
    border-radius: 10px;
    width: 100%;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }

    .play-count {
      position: absolute;
      top: 2px;
      right: 3px;
      display: block;
      color: white;
      padding: 4px 5px;
      line-height: 20px;
      font-size: 11px;
      white-space: nowrap;
      background-color: transparent;
      transform-origin: right top;
      z-index: 5;
      //backdrop-filter: blur(20px);
      //transform: scale(0.5);

    }

    &::after {
      display: block;
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      height: 45px;
      background: linear-gradient(#000,transparent);
      opacity: .5;
    }
  }

  .play-title {
    font-size: 15px;
    font-family: 幼圆,serif;
    font-weight: 600;
    line-height: 16px;
  }
}
</style>