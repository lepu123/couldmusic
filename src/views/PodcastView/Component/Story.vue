<script setup lang="ts">
import {ref} from "vue";
import type {DjData} from "@/typings/dj";
import {Api} from "@/apis/dj";
import {BoxType} from "@/typings/box";
import DjItem from "@/components/DjItem.vue";

const props = withDefaults(defineProps<{
  cateId: number
}>(),{
  cateId: 0
});

const list = ref<Array<DjData>>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);

let offset = 0
const limit = 30
async function getList() {
  const params = {
    limit,
    offset: offset * limit,
    cateId: props.cateId
  }
  loading.value = true
  let {data} = await Api.getDjHotByType(params);
  list.value = list.value.concat(data.djRadios)
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
      <van-row gutter="10">
        <van-col :span="8" v-for="item in list" :key="item.id" >
          <DjItem :dj-data="item" :box-type="BoxType.box"/>
        </van-col>
      </van-row>
      <van-empty v-if="!loading && list.length === 0" description="暂无数据" />
    </div>
  </van-list>
</template>



<style scoped>
.list {
  padding: 10px;
  background-color: #98849d;
}
</style>