<script setup lang="ts">

import {ref} from "vue";
import TopList from "./Listen/TopList.vue";
import DjCategory from "./Listen/DjCategory.vue";

const active = ref<number>(0)
</script>

<template>
  <van-tabs v-model:active="active" swipeable sticky background="transparent" line-width="0">
    <van-tab title="热门">
      <template #title>
        <div class="tab_title" :class="{active_tab: active === 0}">
          热门
        </div>
      </template>
      <TopList />
    </van-tab>
    <van-tab title="音乐">
      <template #title>
        <div class="tab_title" :class="{active_tab: active === 1}">
          音乐
        </div>
      </template>
      <DjCategory :cate-id="2"/>
    </van-tab>
    <van-tab title="情感">
      <template #title>
        <div class="tab_title" :class="{active_tab: active === 2}">
          情感
        </div>
      </template>
      <DjCategory :cate-id="3"/>
    </van-tab>
    <van-tab title="二次元">
      <template #title>
        <div class="tab_title" :class="{active_tab: active === 3}">
          二次元
        </div>
      </template>
      <DjCategory :cate-id="3001"/>
    </van-tab><van-tab title="红人馆">
      <template #title>
        <div class="tab_title" :class="{active_tab: active === 4}">
          红人馆
        </div>
      </template>
    </van-tab>
  </van-tabs>
</template>


<style scoped lang="scss">
.tab_title {
  padding: 10px 10px;
  color: black;
}

.active_tab {
  background-color: #3e3f4a;
  color: white;
  border-radius: 30px;
}
</style>