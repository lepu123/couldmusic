<script setup lang="ts">
import {computed, ref} from "vue";
import {conSongList} from "@/stores/songlist";
import {conAudio} from "@/stores/audio";
import type {SongListType} from "@/typings/audio";

const props = defineProps<{
  id: number,
  title: string,
  image: string,
  subtitle: any,
  artists: any,
  category?: string
}>()

const {addMusicToList} = conSongList();
const {setMusicPlay} = conAudio();

const artistArr = computed(() => {
  return props.artists.map((artist: any) => {
    return {
      name: artist.name,
      id: artist.id,
      imgUrl: artist.picUrl
    }
  })
})

const musicOption = ref<SongListType>({
  id: props.id,
  type: 4,
  picUrl: props.image,
  name: props.title,
  artists: artistArr.value
})

let artistsStr:any = computed(() => {
  return props.artists.map((a:any) => a.name).join("/");
})

function addPlayingMusic () {
  addMusicToList(musicOption.value);
  setMusicPlay(musicOption.value);
}
</script>

<template>
  <div class="song-list-item" @click="addPlayingMusic()">
    <img :src="image" :alt="title" />
    <div class="song-content">
      <div class="title">
        {{ title }}<span class="artists"> - {{ artistsStr }}</span>
      </div>
      <div class="song-desc">
        <span v-if="category" class="category">{{ category }}</span>
      </div>
    </div>
    <div class="play">
    </div>
  </div>
</template>



<style lang="scss" scoped>
.song-list-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 50px;

  img {
    display: block;
    flex: 0 0 42px;
    width: 42px;
    border-radius: 10px;
  }

  .song-content {
    flex: 1;
    margin-left: 12px;
    padding-top: 5px;

    .title {
      margin-bottom: 8px;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 230px;

      .artists {
        //color: rgba(255, 255, 255, 0.4);
        color: black;
        font-size: 12px;
        font-weight: 200;
      }
    }

    .category {
      display: inline-block;
      max-width: 254px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 18px;
      border: 1px solid rgb(255, 136, 0, 0.2);
      color: rgb(255, 136, 0);
      background: rgb(255, 136, 0, 0.1);
      transform-origin: left top;
      transform: scale(0.5);
    }
  }

  .play {
    display: flex;
    flex: 0 0 22px;
    width: 22px;
    height: 20px;
    border: 1px solid rgba(92 84 97);
    border-radius: 7px;
    align-self: center;
    margin-right: 20px;

    &:after {
      display: block;
      margin: auto;
      width: 0;
      height: 0;
      border: 6px solid rgba(92 84 97);
      border-right: 0;
      border-top: solid 4px transparent;
      border-bottom: solid 4px transparent;
      content: '';
    }
  }
}
</style>