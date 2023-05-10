<script setup lang="ts">
import type {PopularData} from "@/typings/dj";

withDefaults(defineProps<{
  popularData: PopularData
}>(), {
  popularData: () => {
    return {
      avatarUrl: '',
      id: 0,
      liveId: 0,
      nickName: '',
      roomNo: 0,
      userFollowedCount: 0
    }
  }
})

</script>

<template>
  <div class="popular">
    <div class="cover">
      <img :src="popularData.avatarUrl + '?param=140y140'" :alt="popularData.nickName">
    </div>
    <div class="name">{{ popularData.nickName }}</div>
  </div>
</template>


<style scoped lang="scss">
.popular {
  margin-bottom: 10px;
  .cover {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .name {
    margin-top: 5px;
    font-size: 20px;
  }
}
</style>