<script setup lang="ts">

import {ref} from "vue";
import TopList from "@/views/PodcastView/Component/Listen/TopList.vue";

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
        <div class="tab_title" :class="{active_tab: active === 0}">
          音乐
        </div>
      </template>
    </van-tab>
    <van-tab title="情感">
      <template #title>
        <div class="tab_title" :class="{active_tab: active === 0}">
          情感
        </div>
      </template>
    </van-tab>
    <van-tab title="二次元">
      <template #title>
        <div class="tab_title" :class="{active_tab: active === 0}">
          二次元
        </div>
      </template>
    </van-tab><van-tab title="红人馆">
      <template #title>
        <div class="tab_title" :class="{active_tab: active === 0}">
          红人馆
        </div>
      </template>
    </van-tab>
  </van-tabs>
</template>


<style scoped>

</style>