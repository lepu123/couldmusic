<script setup lang="ts">
import {RouterView} from 'vue-router';
import {computed, onMounted, ref, watch} from "vue";
import CurrentPlayList from "@/components/CurrentPlayList.vue";
import {conSongList} from "@/stores/songlist";
import {conAudio} from "@/stores/audio";
import PlayControl from "@/components/PlayControl.vue";
import {storeToRefs} from "pinia";

const showPlayControlBall = ref<boolean>(false)
let audio = ref()

const {getNewSong} = conSongList()
const {songListState} = storeToRefs(conSongList())

const { audioPlayState} = storeToRefs(conAudio())
const {playingMusicUrl,playAudio,setCurrentTime,setDuration} = conAudio()

function hideBall() {
  showPlayControlBall.value = true
}

function afterLeave() {
  showPlayControlBall.value = false
}

function audioTimeUpdate() {
  setCurrentTime(audio.value.currentTime);
}

function setDurationPlay() {
  setDuration(audio.value.duration);
  playAudio();
}

function setAudioCurrentTime(time:number) {
  audio.value.currentTime = time;
}

watch(audioPlayState, (newX, oldX) => {
  if (newX !== oldX) {
    if (newX) {
      // 播放歌曲
      audio.value.play();
    } else {
      audio.value.pause();
    }
  }
})


onMounted(() => {
  getNewSong();
})
</script>

<template>

  <router-view v-slot="{ Component }" @setAudioCurrentTime="setAudioCurrentTime">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <play-control
      :showPlayControlBall="showPlayControlBall"
  />
  <van-tabbar fixed route active-color="#be98aa" inactive-color="#3e3f4a">
    <van-tabbar-item to="/discover" icon="home-o">发现</van-tabbar-item>
    <van-tabbar-item to="/live" icon="search">博客</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o">我的</van-tabbar-item>
    <van-tabbar-item to="/follows" icon="setting-o">关注</van-tabbar-item>
    <van-tabbar-item to="/community" icon="chat-o">社区</van-tabbar-item>
  </van-tabbar>
  <van-popup
      v-model:show="songListState"
      position="bottom"
      round
      :overlay-style="{opacity: .5}"
      :style="{height: '40%',background: 'transparent'}"
      lazy-render
  >
    <current-play-list/>
  </van-popup>
  <audio
      ref="audio"
      :src="playingMusicUrl()"
      @canplay="setDurationPlay()"
      @timeupdate="audioTimeUpdate()"
  />
</template>

<style lang="scss" scoped>


</style>
