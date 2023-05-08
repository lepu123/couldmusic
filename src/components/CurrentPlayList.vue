<script setup lang="ts">
import {conSongList} from "@/stores/songlist";
import {conAudio} from "@/stores/audio";
import {storeToRefs} from "pinia";
// import {Api} from "@/apis";
// import {computed} from "vue";
import type {ArtistsType} from "@/typings/audio";
// import {computed} from "vue";


const {songList} = storeToRefs(conSongList());
const {audioPlayState, playingMusic} = storeToRefs(conAudio());

const {setMusicPlay,deleteAudio} = conAudio();
const {deleteSongToList} = conSongList();

function artistsName(artists: Array<ArtistsType>) {
  return "- " + artists.map((a) => a.name).join("/");
}


function deleteSong(index: number, id: number) {
  deleteSongToList(index);
  if (playingMusic.value.id === id) {
    deleteAudio();
  }
}
</script>


<template>
  <div class="current-play-list">
    <p class="play-list-header">
      当前播放 <span>{{ songList.length }}</span>
    </p>
    <div class="icon-bar">
      <span class="loop">列表循环 <i></i></span>
      <div class="icons">
        <van-icon name="down" :size="18"/>
        <van-icon name="plus" :size="18"/>
        <van-icon name="delete-o" :size="18"/>
      </div>
    </div>
    <ul class="play-list" :class="{ playing: audioPlayState }">
      <li
          class="play-list-song"
          v-for="(s, i) in songList"
          :key="s.id"
          :class="{selected: s.id === playingMusic.id}"
      >
        <!--            :class="{selected:}"-->
        <div class="song-name" @click="setMusicPlay(s)">
          <div v-show="s.id === playingMusic.id" class="voice-icon">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <p class="text">
            {{ s.name }}
            <span class="artists">{{ artistsName(s.artists) }}</span>
          </p>
        </div>
        <van-icon class="remove" name="cross" @click.self="deleteSong(i, s.id)"/>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
.current-play-list {
  position: relative;
  margin: 0 auto;
  padding: 5px 15px 8px;
  width: 95vw;
  height: 100%;
  color: #212026;
  background-color: #ffffff;
  border-radius: 10px 10px 0 0;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    height: 4px;
    width: 100%;
    background-color: #32323684;
    backdrop-filter: blur(1px);
    box-shadow: 0 -2px 6px #32323684;
    content: "";
  }

  .play-list-header {
    font-weight: 600;
    letter-spacing: 2px;
    font-family: 幼圆, serif;

    span {
      position: relative;
      left: -4px;
      font-size: 12px;
      font-weight: 100;
      letter-spacing: 0;
      color: #7a7a7a;
    }
  }

  .icon-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .loop {
      font-size: 13px;
      font-weight: 100;
      line-height: 21px;

      i {
        display: inline-block;
        margin-left: 6px;
        width: 21px;
        height: 21px;
        vertical-align: top;
        background-image: url(@/assets/image/loop.png);
        background-size: cover;
      }
    }

    .icons {
      display: flex;
      width: 90px;
      justify-content: space-between;
    }
  }

  .play-list {
    margin-top: 5px;
    max-height: 80%;
    overflow-x: hidden;
    overflow-y: auto;

    &.playing .voice-icon i {
      &:nth-child(1) {
        animation: bySmall 2s linear infinite;
      }

      &:nth-child(2) {
        animation: bySmall 2s linear 0.65s infinite;
      }

      &:nth-child(3) {
        animation: bySmall 2s linear 1.2s infinite;
      }
    }


    &::-webkit-scrollbar {
      display: none;
    }
  }

  .play-list-song {
    margin: 5px;
    padding: 5px 0;
    display: flex;
    font-size: 14px;
    font-weight: 200;

    &.selected {
      .song-name {
        color: red;
        font-weight: 600;

        span {
          color: red;
        }
      }
    }

    .song-name {
      flex: 1;
      display: flex;
      align-items: flex-end;

      .voice-icon {
        display: flex;
        justify-content: space-between;
        flex: 0 0 13px;
        margin-right: 12px;
        padding-bottom: 2px;
        width: 13px;

        i {
          display: block;
          width: 3px;
          height: 8px;
          border-radius: 10px;
          background: red;
          transform-origin: left bottom;

          &:nth-child(1) {
            transform: scaleY(1.8);
          }

          &:nth-child(2) {
            transform: scaleY(0.5);
          }
        }
      }

      .text {
        flex: 1;
        max-width: 280px;
        line-height: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: 幼圆, serif;

        .artists {
          font-size: 12px;
          color: #3e3f4a;
        }
      }
    }
  }
}

@keyframes bySmall {
  0% {
    transform: scaleY(1.8);
  }
  50% {
    transform: scaleY(0.5);
  }
  100% {
    transform: scaleY(1.8);
  }
}
</style>