<script setup lang="ts">
import Listen from "./Component/Listen.vue";
import Suggest from "./Component/Suggest.vue";
import Story from "./Component/Story.vue";

import {ref} from "vue";

const active = ref<number>(1)
</script>
<template>
  <div class="podcast-container">
    <van-tabs v-model:active="active" title-inactive-color="white" title-active-color="white" background="#3e3f4a" color="#be98aa" swipeable sticky>
      <van-tab title="听听">
        <Listen />
      </van-tab>
      <van-tab title="推荐">
        <Suggest />
      </van-tab>
      <van-tab title="故事">
        <Story :cate-id="10001" />
      </van-tab>
    </van-tabs>
  </div>
</template>


<style scoped lang="scss">
.podcast-container {
  height: 100%;
  width: 100vw;
  overflow: auto;
  padding-bottom: 93px;

  &::-webkit-scrollbar{
    display: none;
  }
}
</style>