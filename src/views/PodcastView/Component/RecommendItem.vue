<script setup lang="ts">

import type {DjCategoryRecommend} from "@/typings/dj";
import {BoxType} from "@/typings/box";
import DjItem from "@/components/DjItem.vue";


withDefaults(defineProps<{
  list: DjCategoryRecommend
  boxType: BoxType
}>(),{
  list: () => {
    return {
      categoryName: '',
      categoryId: 0,
      radios: []
    }
  },
  boxType: BoxType.box
})

const box = BoxType.box

const line = BoxType.line
</script>
<template>
  <div class="recommend_item">
    <div class="recommend_top">
      <div class="recommend_title">{{list.categoryName}}</div>
      <van-button icon="arrow" round size="mini" icon-position="right">更多</van-button>
    </div>
    <van-row v-if="boxType === box" gutter="10">
      <van-col span="8" v-for="item in list.radios" :key="item.id">
        <DjItem :dj-data="item" :box-type="boxType"/>
      </van-col>
    </van-row>
    <div v-if="boxType === line">
      <DjItem v-for="item in list.radios" :key="item.id" :dj-data="item" :box-type="boxType" />
    </div>
  </div>
</template>


<style scoped lang="scss">
.recommend_item {
  padding: 15px;
  background-color: #685566;
  margin-bottom: 30px;

  .recommend_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .recommend_title {
      font-size: 20px;
      font-family: 幼圆,serif;
      font-weight: bold;
      color: #837ca6;
    }
  }
}
</style>