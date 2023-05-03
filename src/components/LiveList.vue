<script setup lang="ts">
import type {ExInfoType} from "@/typings/discover";
import LiveListItem from "./LiveListItem.vue"
import {computed} from "vue";

const props = defineProps<{
  extInfo: Array<ExInfoType>
}>()

let extInfoArr = computed(() => {
  let a = [];
  let b = [];
  for (let x = 0; x <= props.extInfo.length; x++) {
    if (x%3 === 0 && x!==0){
      a.push(b);
      b = [];
      b.push(props.extInfo[x]);
    } else {
      b.push(props.extInfo[x]);
    }
  }
  return a
})
</script>

<template>
  <van-swipe lazy-render :show-indicators="false" :loop="false" :width="350" >
    <van-swipe-item v-for="(e,i) in extInfoArr" :key="i">
      <LiveListItem
          v-for="(ext,i) in e"
          :key="i+100"
          :extInfo="ext"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped>

</style>