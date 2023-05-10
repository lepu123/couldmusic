<script setup lang="ts">
import {computed, ref, toRefs} from "vue";
import {storeToRefs} from 'pinia'
import {conSongList} from '@/stores/songlist'
import {conAudio} from "@/stores/audio";
import {useRouter} from "vue-router";

// 父组件传递控制全局音乐播放器显示




// 播放歌单列表属性
const useSongList = conSongList()
const {showSongList,hideSongList} = useSongList

const router = useRouter();

const playControl = ref();

// 音乐属性
const useAudio = conAudio();
const {audioPlayState,playingMusic} = storeToRefs(useAudio)
const {audioPlayToggle} = useAudio


function audioToggle() {
  audioPlayToggle();
}

let artists = computed(() => {
  let arr = playingMusic.value.artists;
  if (arr) {
    return "-" + arr.map((a) => a.name).join("/");
  }
  return "当前没有歌曲播放";
})

function gotoSongDetail() {
  router.push("/song");
}

</script>

<template>
  <div class="play-control" ref="playControl">
    <!--控制器唱片-->
    <!--    <div class="song-disc" :style="{opacity: true}" :class="{playing: true}">-->
    <div
        class="song-disc"
        :class="{playing: audioPlayState }"
        @click="gotoSongDetail"
    >
      <img :src="playingMusic.picUrl" :alt="playingMusic.name">
    </div>

    <!--歌曲名-->
    <p class="song-desc" @click="gotoSongDetail">
      {{playingMusic.name}} <span class="artists">{{ artists }}</span>
    </p>

    <div class="icon-bar">
      <van-icon
          id="play"
          :name="audioPlayState ? 'pause' : 'play'"
          @click="audioToggle()"
          size="28"
      />
      <van-icon
          name="bars" size="24" @click="showSongList"
      />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.play-control {
  position: fixed;
  bottom: 49px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px;
  width: 100vw;
  height: 5vh;
  color: #fff;
  z-index: 900;
  background-color: #212026;

  .song-disc {
    position: relative;
    display: flex;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    background-image: url(@/assets/image/disc.png);
    background-size: cover;
    animation: rotateAnimation 5s linear infinite;
    animation-play-state: paused;

    &.playing {
      animation-play-state: running;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      background-image: url(@/assets/image/disc_light.png);
      background-size: cover;
      content: "";
    }

    img {
      margin: auto;
      width: 24px;
      border-radius: 999px;
    }
  }

  .song-desc {
    flex: 1;
    margin-left: 8px;
    //  字间距
    letter-spacing: 14px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .artists {
      color: rgba(255, 255, 255, 0.4);
      font-weight: 200;
    }
  }

  .icon-bar {
    flex: 0 0 62px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@keyframes rotateAnimation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>