<script setup lang="ts">
import {conSongList} from "@/stores/songlist";
import {conAudio} from "@/stores/audio";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";

const router = useRouter();
const {playingMusic, audioPlayState, duration, currentTime} = storeToRefs(conAudio());
const {audioPlayToggle} = conAudio();
const {showSongList} = conSongList();

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
    emit('setAudioCurrentTime', current);
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
            <van-slider v-model="progressValue" active-color="#fff" button-size="12px"/>
            <span class="durationTime">{{ durationTimeStr }}</span>
          </div>
          <div class="btn-wrap">
            <div class="loop"></div>
            <div class="prev-btn"></div>
            <div
                class="play-btn"
                @click="audioPlayToggle"
                :class="{pause: audioPlayState}"
            ></div>
            <div class="next-btn"></div>
            <div class="list-btn" @click="showSongList"></div>
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

    .control-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      .progress {
        display: flex;
        align-items: center;
        padding: 0 10px;

        .currentTimer {
          margin-right: 10px;
          color: #d2d2d2;
        }

        .durationTime {
          margin-left: 15px;
          color: #898989
        }
      }

      .btn-wrap {
        display: flex;
        align-items: center;
        background: #3e3f4a;
        padding: 20px 30px;

        .play-btn {
          width: 60px;
          height: 60px;
          background-image: url(@/assets/image/play.png);
          background-size: cover;

          &.pause {
            background-image: url(@/assets/image/pause.png);
          }
        }

        .list-btn {
          width: 30px;
          height: 30px;
          background-image: url(@/assets/image/list.png);
          background-size: cover;
        }

        .prev-btn {
          width: 30px;
          height: 30px;
          background-image: url(@/assets/image/prev.png);
          background-size: cover;
        }

        .next-btn {
          width: 30px;
          height: 30px;
          background-image: url(@/assets/image/next.png);
          background-size: cover;
        }

        .loop {
          width: 30px;
          height: 30px;
          background-image: url(@/assets/image/loop.png);
          background-size: cover;
        }
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