<script setup lang="ts">
// import {ref,markRaw} from "vue";
import songList from "@/components/SongList.vue";
import playList from "@/components/PlayList.vue";
import liveList from "@/components/LiveList.vue";
import type {CreativesType,ExInfoType} from "@/typings/discover";
import {computed} from "vue";



const TypeOption:any = {
  HOMEPAGE_SLIDE_PLAYLIST: {
    button: "更多",
    class: "more",
    component: playList
  },
  HOMEPAGE_SLIDE_SONGLIST_ALIGN: {
    button: "播放",
    class: "play",
    component: songList
  },
  HOMEPAGE_SLIDE_LISTEN_LIVE: {
    button: ' ',
    class: "live",
    component: liveList
  },
  HOMEPAGE_NEW_SONG_NEW_ALBUM: {
    button: ' ',
    class: "song",
    component: null
  },
  HOMEPAGE_SLIDE_TOPLIST: {
    button: ' ',
    class: "rank",
    component: null
  }
}

const props = defineProps<{
  subTitle: string,
  showType: string,
  button: string,
  creatives?: Array<CreativesType>
  extInfo?: Array<ExInfoType>
}>()

//计算属性显示动态组件渲染
let currentComponents:any = computed(() => {
  return TypeOption[props.showType].component;
})



</script>

<template>
  <div class="discover-card">
    <div class="card-head">
      <h3 class="subTitle">{{ subTitle }}</h3>
      <i class="btn-more-discover"></i>
    </div>
    <div class="card-list">
      <component :is="currentComponents" :playList="creatives" :extInfo="extInfo"/>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.discover-card {
  border-radius: 10px;
  margin-top: 10px;
  padding: 15px 10px;

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .subTitle {
      flex: 1;
      margin-right: 10px;
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .btn-more-discover {
      display: block;
      height: 24px;
      width: 10px;
      background-image: url("../src/assets/image/more-vertical.png");
      background-position: center;
      background-size: cover;
    }
  }
}
</style>