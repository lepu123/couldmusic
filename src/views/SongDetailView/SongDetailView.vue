<script setup lang="ts">

import {conAudio} from "@/stores/audio";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";

const router = useRouter();
const {playingMusic, audioPlayState, duration, currentTime } = storeToRefs(conAudio());

let showLyric = ref<boolean>(false);

const emit = defineEmits(['setAudioCurrentTime'])

function back() {
  router.go(-1);
}

let currentTimeStr = computed(() => {
  let m = Math.floor(currentTime.value / 60);
  let s = Math.floor(currentTime.value % 60);
  let min = m >= 10 ? m : "0" + m;
  let sec = s >= 10 ? s : "0" + s;

  return min + ":" + sec;
})

let durationTimeStr = computed(() => {
  let m = Math.floor(duration.value / 60);
  let s = Math.floor(duration.value % 60);
  let min = m >= 10 ? m : "0" + m;
  let sec = s >= 10 ? s : "0" + s;

  return min + ":" + sec;
})

const progressValue = computed({
  get() {
    return (currentTime.value / duration.value) * 100;
  },
  set(value) {
    let current = (value / 100) * duration.value;
    emit('setAudioCurrentTime',current);
  }
})

let artists = computed(() => {
  if (playingMusic.value.artists !== undefined) {
    return playingMusic.value.artists.map((a) => a.name).join("/");
  }
  return "noname";
})
</script>

<template>
  <div class="song-detail-view">
    <div class="nav">
      <van-icon name="arrow-left" @click="back"/>
      <div class="nav-title">
        <h3>{{ playingMusic.name }}</h3>
        <p>{{ artists }}</p>
      </div>
    </div>
    <div class="play-content">
      <div class="disc-container">
        <div v-show="!showLyric" style="overflow: hidden">
          <div class="disc-needle" :class="{ play: audioPlayState}"></div>
          <div class="disc-wrap" :class="{ play: audioPlayState}">
            <img :src="playingMusic.picUrl" :alt="playingMusic.name">
          </div>
        </div>
        <!--歌词解析部分可以用swiper-->
        <!--歌词解析-->
        <div class="lry-list" v-show="showLyric">

        </div>
        <!--控制器-->
        <div class="control-bar">
          <div class="progress">
            <span class="currentTimer">{{ currentTimeStr }}</span>
            <van-slider v-model="progressValue" button-size="12px"/>
            <span>{{ durationTimeStr }}</span>
          </div>
          <div class="btn-wrap">
            <div class="play-btn"></div>
            <div class="list-btn"></div>
          </div>
        </div>
      </div>
      <!--      <div class="bg-img">-->
      <!--        <img :src="playingMusic.picUrl" :alt="playingMusic.name">-->
      <!--      </div>-->
    </div>
  </div>
</template>


<style lang="scss" scoped>
.song-detail-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  z-index: 901;

  .nav {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;

    .nav-title {
      flex: 1;
      text-align: center;
    }
  }

  .play-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 45px;
    width: 100%;
    height: 100vh;
  }

  .disc-container {
    flex: 1 1 auto;
    position: relative;
    padding-top: 130px;
    overflow: auto;

    .disc-needle {
      position: absolute;
      top: 40px;
      left: calc(50% - 19px);
      width: 125.5px;
      aspect-ratio: 251/409;
      background-image: url(@/assets/image/needle-ab.png);
      background-size: cover;
      transform-origin: 19px 19px;
      transform: rotate(-30deg);
      transition: all 0.3s linear;
      z-index: 10;

      &.play {
        transform: rotate(-5deg);
      }
    }

    .disc-wrap {
      display: flex;
      position: relative;
      margin: 0 auto;
      width: 85vw;
      height: 85vw;
      background-image: url(@/assets/image/disc.png);
      background-size: cover;
      animation: rotateAnimate 8s linear infinite;
      animation-play-state: paused;

      &.play {
        animation-play-state: running;
      }

      &::before {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url(@/assets/image/disc_light.png);
        background-size: cover;
        content: "";
      }

      img {
        margin: auto;
        width: 62%;
        border-radius: 999px;
      }
    }
  }
}

@keyframes rotateAnimate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>