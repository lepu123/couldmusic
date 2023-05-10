<script setup lang="ts">

import {Api} from "@/apis/dj";
import PopularItem from "./PopularItem.vue";
import {onMounted, ref} from "vue";
import type {PopularData} from "@/typings/dj";

const list = ref<Array<PopularData>>([])

onMounted(async () => {
  let {data} = await Api.getTopPopular({limit: 30})
  list.value = data.data.list;
})

</script>

<template>
  <div class="list">
    <van-row :gutter="10">
      <van-col :span="8" v-for="item in list" :key="item.id">
        <popular-item :popular-data="item"/>
      </van-col>
    </van-row>
  </div>
</template>


<style scoped>
.list {
  padding: 10px 10px 20px;
  background-color: #be98aa;
}
</style>