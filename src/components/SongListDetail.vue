<script setup lang="ts">

import {useRoute} from "vue-router";
import {onActivated, ref} from "vue";
import {Api} from "@/apis";
import type {SongListType} from "@/typings/audio";
import type {PlayListCreate} from "@/typings/playlist";
const router = useRoute();

const songList = ref<Array<SongListType>>();
//创建歌单用户
let detail = ref<PlayListCreate>();

onActivated(async () => {
  let {data} = await Api.getSongListDetail(Number(router.query.id))
  console.log(data.playlist);
  detail.value = {
    name: data.playlist.name,
    id: data.playlist.id,
    description: data.playlist.description,
    tags: data.playlist.tags,
    creator: {
      nickname: data.playlist.creator.nickname,
      imgUrl: data.playlist.creator.avatarUrl
    }
  }
  // songList.value = data.songs.map((song:any) => {
  //   let artists = song.ar.map((ar:any) => {
  //     return {
  //       name: ar.name,
  //       id: ar.id
  //     }
  //   })
  //   return {
  //     id: song.id,
  //     name: song.name,
  //     type: 4,
  //     picUrl: song.al.picUrl,
  //     artists
  //   }
  // })
})
</script>

<template>
  <div class="song_list_detail">
    <van-nav-bar>

    </van-nav-bar>
<!--      <div>{{detail?.name}}</div>-->
<!--      <div>{{detail?.creator.nickname}}</div>-->

<!--    <div v-for="s in songList">{{s.name}}</div>-->
  </div>
</template>


<style scoped lang="scss">
.song_list_detail {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: white;
}
</style>