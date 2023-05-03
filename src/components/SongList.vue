<script setup lang="ts">
import SongListItem from "./SongListItem.vue";
import type {CreativesType} from "@/typings/discover"


defineProps<{
  playList: Array<CreativesType>
}>()

</script>

<template>
  <div class="song-list">
    <van-swipe class="swiper" lazy-render :show-indicators="false" :loop="false" :width="350">
      <van-swipe-item v-for="(songs, i) in playList" :key="i" class="swipe-item">
        <div class="song-list-wrap">
          <SongListItem
              v-for="s in songs.song"
              :key="s.songId"
              :id="s.songId"
              :title="s.songTitle"
              :image="s.image"
              :artists="s.artists"
              :subtitle="s.subtitle"
              :category="s.category"
          />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>


<style lang="scss" scoped>
.song-list {
  padding: 25px 0 25px 5px;

  .swiper-container {
    overflow: visible;
  }

  .song-list-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 146px;
  }
}
</style>