<script setup lang="ts">

import {ref} from "vue";
import type {DjData} from "@/typings/dj";
import DjItem from "@/components/DjItem.vue";
import {Api} from "@/apis/dj";
import {BoxType} from "@/typings/box";
const props = withDefaults(defineProps<{
  cateId: number
}>(), {
  cateId: 0
})

const list = ref<Array<DjData>>([])
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);

let offset = 0 // 页数
const limit = 30 //限制数量

async function getList() {
  const prams = {
    limit,
    offset: offset * limit,
    cateId: props.cateId
  }
  let {data} = await Api.getDjHotByType(prams);
  list.value = list.value.concat(data.djRadios);
  finished.value = !data.hasMore;
  loading.value = false;
}

function onLoad() {
  offset++;
  getList();
}
</script>

<template>
  <van-list :loading="loading" @load="onLoad" :finished="finished">
    <div class="list">
      <DjItem v-for="item in list" :key="item.id" :dj-data="item" :box-type="BoxType.line"/>
      <van-empty v-if="!loading && list.length === 0" description="暂无数据！"/>
    </div>
  </van-list>
</template>


<style scoped>
.list {
  padding: 10px 20px 30px;
  background-color: #be98aa;
}
</style>