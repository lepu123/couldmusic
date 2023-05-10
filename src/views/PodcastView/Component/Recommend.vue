<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Api} from "@/apis/dj";
import type {DjCategoryRecommend} from "@/typings/dj";
import RecommendItem from "./RecommendItem.vue";
import {BoxType} from "@/typings/box";

const recommendList = ref<Array<DjCategoryRecommend>>([])

const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  let {data} = await Api.getCategoryRecommend();
  recommendList.value = data.data;
  loading.value = false
})
</script>

<template>
  <div>
    <van-skeleton title :row="3" :loading="loading">
      <RecommendItem v-for="item in recommendList"
                     :key="item.categoryId"
                     :list="item"
                     :box-type="Math.random() > 0.5 ? BoxType.box : BoxType.line"
      />
    </van-skeleton>
  </div>
</template>



<style scoped>

</style>