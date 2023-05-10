<script setup lang="ts">

import {ref} from "vue";

const active = ref<number>(1)
</script>
<template>
  <div class="podcast-container">
    <van-tabs v-model:active="active" swipeable sticky>
      <van-tab title="听听">
<!--        <Listen />-->
      </van-tab>
      <van-tab title="推荐">
<!--        <Suggest />-->
      </van-tab>
      <van-tab title="故事">
<!--        <Story :cate-id="10001" />-->
      </van-tab>
    </van-tabs>
  </div>
</template>


<style scoped>

</style>