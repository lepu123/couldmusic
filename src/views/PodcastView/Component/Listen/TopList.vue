<script setup lang="ts">


import {onMounted, ref} from "vue";
import type {DjData} from "@/typings/dj";
import DjItem from "@/components/DjItem.vue";
import {Api} from "@/apis/dj";
import {BoxType} from "@/typings/box";

const list = ref<Array<DjData>>([]);

onMounted(async () => {
  let {data} = await Api.getTopList();
  list.value = list.value.concat(data.toplist);
})

</script>

<template>
<div class="list">
  <van-row gutter="10">
    <van-col :span="8" v-for="item in list" :key="item.id">
      <DjItem :dj-data="item" :box-type="BoxType.box"/>
    </van-col>
  </van-row>
</div>
</template>


<style scoped>
.list {
  padding: 20px;
  background-color: #be98aa;
}
</style>