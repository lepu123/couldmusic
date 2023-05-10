<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onActivated, ref} from "vue";
import {Api} from "@/apis";
import type {SongListType} from "@/typings/audio";
import type {PlayListCreate} from "@/typings/playlist";
import DetailComponent from "./DetailComponent.vue";
import PlayControl from "@/components/PlayControl.vue";

const route = useRoute();

const router = useRouter();

const songList = ref<Array<SongListType>>();
//创建歌单用户
let detail = ref<PlayListCreate>();

onActivated(async () => {
  let {data} = await Api.getSongListDetail(Number(route.query.id))
  console.log(data);
  detail.value = {
    name: data.playlist.name,
    id: data.playlist.id,
    description: data.playlist.description,
    coverImg: data.playlist.coverImgUrl,
    playCount: data.playlist.playCount,
    tags: data.playlist.tags,
    creator: {
      nickname: data.playlist.creator.nickname,
      imgUrl: data.playlist.creator.avatarUrl
    }
  }
  songList.value = data.playlist.tracks.map((song:any) => {
    let artists = song.ar.map((ar:any) => {
      return {
        name: ar.name,
        id: ar.id
      }
    })
    return {
      id: song.id,
      name: song.name,
      type: 4,
      picUrl: song.al.picUrl,
      artists
    }
  })
})

function goBack() {
  router.go(-1)
}


</script>

<template>
  <div class="song_list_detail">
    <van-nav-bar fixed safe-area-inset-top placeholder @click-left="goBack">
      <template #left>
        <van-icon name="arrow-left" size="18" color="black"/>
      </template>
      <template #title>
        <div class="bar">
          <van-notice-bar scrollable background="#fff" color="#333" :text="detail?.name"/>
        </div>
      </template>
    </van-nav-bar>
    <DetailComponent
        :img="detail?.coverImg"
        :name="detail?.name"
        :description="detail?.description"
        :tags="detail?.tags"
        :playCount="detail?.playCount"
        :nickname="detail?.creator.nickname"
        :imgUrl="detail?.creator.imgUrl"
        :songList="songList"
    />
<!--      <div>{{detail?.name}}</div>-->
<!--      <div>{{detail?.creator.nickname}}</div>-->

<!--    <div v-for="s in songList">{{s.name}}</div>-->
    <play-control :style="{bottom: 0, zIndex: 902}"/>
  </div>

</template>


<style scoped lang="scss">
.song_list_detail {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 901;
  background: white;

  .bar {
    width: 200px;
  }

}
</style>