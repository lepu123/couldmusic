<script setup lang="ts">
import type {DjData} from "@/typings/dj";
import {BoxType} from "@/typings/box";
import {playCountLabel} from "@/untils";
import {useRouter} from "vue-router";
import {Api} from "@/apis/dj";

const props = withDefaults(defineProps<{
  djData: DjData,
  boxType: BoxType
}>(), {
  djData: () => {
    return {
      id: 0,
      rcmdText: '',
      subed: false,
      programCount: 0,
      picUrl: '',
      name: '',
      playCount: 0,
      feeScope: 0
    }
  },
  boxType: BoxType.box
})

const router = useRouter();

function gotoDetail() {
  router.push({
    path: '/djDetail',
    query: {
      id: props.djData.id
    }
  })
}



const box = BoxType.box
</script>

<template>
  <div v-if="boxType === box" class="dj_item" @click="gotoDetail">
    <div class="cover">
      <div class="cover_img"><img :src="djData.picUrl + '?param=140y140'" :alt="djData.name"></div>
      <div class="feeScope" v-if="djData.feeScope === 0">免费</div>
      <div class="play_count">
        <van-icon name="play-circle-o" color="#fff"/>
        <div>{{ playCountLabel(djData.playCount) }}</div>
      </div>
    </div>
    <div class="info"><span class="name">{{ djData.name }}</span></div>
  </div>
  <div v-else class="dj_item_line" @click="gotoDetail">
    <div class="left"><img :src="djData.picUrl" :alt="djData.name"></div>
    <div class="right">
      <div class="dj_name">{{ djData.name }}</div>
      <div class="dj_info">
        <div class="text">{{ djData.rcmdText }}</div>
        <div class="count">
          <van-icon/>
          {{ djData.playCount }}
        </div>
      </div>
    </div>
  </div>

</template>


<style scoped lang="scss">
.dj_item {
  margin-bottom: 20px;
  padding-right: 5px;


  &:active {
    opacity: .8;
  }

  .cover {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    border-radius: 10px;
    overflow: hidden;

    .cover_img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .feeScope {
      position: absolute;
      top: 10px;
      left: 5px;
      font-size: 10px;
      background-color: orange;
      color: white;
      padding: 5px;
      border-radius: 20px;
    }

    .play_count {
      position: absolute;
      top: 12px;
      right: 0;
      color: white;
      font-size: 10px;
      background: rgba(0, 0, 0, 0.2);
      padding: 2px 5px;
      border-radius: 8px;
      display: flex;
      align-items: center;
    }
  }

  .info {
    margin-top: 15px;
    font-size: 14px;
    min-height: 10px;

    .name {
      display: -webkit-box;
      color: white;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.dj_item_line {
  display: flex;
  width: 100%;
  margin-bottom: 20px;

  &:active {
    opacity: 0.8;
  }

  .left {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-right: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    .dj_name {
      color: black;
      font-size: 18px;
      font-weight: bold;
    }

    .dj_info {
      font-size: 12px;
      color: gray;

      .text {
        margin: 10px 0;
      }
    }
  }
}
</style>