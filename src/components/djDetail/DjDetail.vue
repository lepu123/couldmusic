<script setup lang="ts">

import {useRouter, useRoute} from "vue-router";
import {onActivated, ref} from "vue";
import type {SongListType} from "@/typings/audio";
import {Api} from "@/apis/dj";
import DetailComponent from "@/components/DetailComponent.vue";

const router = useRouter();
const route = useRoute();

const list = ref<Array<SongListType>>([])
const id = route.query.id;

const details = ref({
  creator: {
    userId: 0,
    avatarUrl: '',
    nickname: ''
  },
  tags: [],
  shareCount: 0,
  commentCount: 0,
  subscribedCount: 0,
  description: '',
  nickname: '',
  avatarUrl: '',
  coverImgUrl: '',
  name: '',
  playCount: 0,
  subscribed: false
})

onActivated(async () => {
  let {data} = await Api.getDjDetail({rid: id});
  console.log(data.data);
  const res = data.data;
  details.value.avatarUrl = res.dj.avatarUrl
  details.value.creator = res.dj
  details.value.tags = res.category.split(',')
  details.value.shareCount = res.shareCount
  details.value.commentCount = res.commentCount
  details.value.subscribedCount = res.subCount
  details.value.description = res.rcmdText
  details.value.nickname = res.nickname
  // details.value.avatarUrl = res.avatarUrl
  details.value.coverImgUrl = res.picUrl
  details.value.name = res.name
  details.value.playCount = res.playCount
  details.value.subscribed = res.subed

  getDjList();
})

function goBack() {
  router.go(-1)
}

function getDjList() {
  Api.getDjProgram({rid: id, limit: 1000, offset: 0}).then(({data}: any) => {
    // console.log(data);
    list.value = data.programs.map((item: any) => {
      let artists = item.mainSong.artists.map((ar: any) => {
        return {
          name: ar.name,
          id: ar.id
        }
      })
      return {
        id: item.id,
        name: item.name,
        type: 4,
        picUrl: item.coverUrl,
        artists
      }
    })
  })
}


</script>

<template>
  <div class="songSheetDetail">
    <van-nav-bar fixed safe-area-inset-top placeholder @click-left="goBack">
      <template #left>
        <van-icon name="arrow-left" size="18" color="black"/>
      </template>
      <template #title>
        <div class="bar">
          <van-notice-bar scrollable background="#fff" color="#333" :text="details.name"/>
        </div>
      </template>
    </van-nav-bar>
    <DetailComponent
        :img="details.avatarUrl"
        :name="details.name"
        :description="details.description"
        :tags="details.tags"
        :play-count="details.playCount"
        :nickname="details.name"
        :img-url="details.coverImgUrl"
        :song-list="list"
    />
  </div>
</template>


<style scoped lang="scss">
.songSheetDetail {

  .bar {
    width: 200px;
  }
}
</style>