<script setup lang="ts">
import type {SongListType} from "@/typings/audio";
import {computed, ref} from "vue";
import {conAudio} from "@/stores/audio";
import {conSongList} from "@/stores/songlist";


const props = withDefaults(defineProps<{
  name: string,
  img: string,
  description: string,
  tags: Array<string>,
  nickname: string,
  imgUrl: string,
  playCount: number,
  songList: Array<SongListType>
}>(), {
  name: '',
  img: '',
  description: '',
  tags: Array,
  nickname: '',
  imgUrl: '',
  playCount: 0,
  songList: Array
})

const {addMusicToList} = conSongList();
const {setMusicPlay} = conAudio();

const showDescription = ref<boolean>(false)

let playCountLabel = computed(() => {
  let res = props.playCount

  let resSt = ''

  if (props.playCount >= 10000 && props.playCount < 100000) {
    resSt = Math.floor(res / 1000) / 10 + "万";
  } else if (props.playCount >= 100000) {
    if (props.playCount < 100000000) {
      resSt = Math.floor(res / 10000) + "万";
    } else {
      resSt = Math.floor(res / 10000000) / 10 + "亿";
    }
  }
  return resSt;
})

function artistsStr(artists: any) {
  return artists.map((a: any) => a.name).join("/");
}

function addMusic(musicOption: SongListType) {
  addMusicToList(musicOption);
  setMusicPlay(musicOption);
}
</script>

<template>
  <div>

  </div>
  <div class="detailView">
    <div class="img_wrapper">
      <div class="main">
        <div class="data">
          <div class="left">
            <div class="play_count">
              <van-icon name="play-circle-o" color="#fff"/>
              <div>{{ playCountLabel }}</div>
            </div>
            <img :src="props.img" :alt="props.name">
          </div>
          <div class="right">
            <div class="sheet">
              {{ name }}
            </div>
            <div class="creator">
              <img :src="props.imgUrl" :alt="props.nickname">
              <div class="nickname">
                {{ nickname }}
              </div>
            </div>
            <div class="description" @click="showDescription = !showDescription">
              <div class="text">{{ description }}</div>
              <van-icon name="arrow"/>
            </div>
          </div>
        </div>
        <div class="btn_wrapper">
          播放全部
          <van-icon name="play-circle-o" size="20"/>
        </div>
      </div>
      <div class="bg">
        <img class="cover_img" :src="img" :alt="name">
      </div>
    </div>
    <div class="song_list_wrapper">
      <div class="song_item" v-for="s in songList" :key="s.id" @click="addMusic(s)">
        <div class="left"><img :src="s.picUrl" :alt="s.name"></div>
        <div class="center">
          <div class="song_name">{{ s.name }}</div>
          <div class="singer">{{ artistsStr(s.artists) }}</div>
        </div>
        <div class="right">
          <van-icon name="play" size="25" style="margin-left: 10px"/>
          <van-icon name="ellipsis" style="margin-left: 10px" size="25"/>
        </div>
      </div>
    </div>
  </div>
  <van-popup
      v-model:show="showDescription"
      :style="{maxWidth: '100vw'}"
  >
    <div class="tag">
      <div class="tag_bg">
        <img :src="img" :alt="name">
      </div>
      <div class="main">
        <div class="cover_img">
          <img :src="img" :alt="name">
        </div>
        <div class="sheetName">{{ name }}</div>
        <div class="tag_wrap">
          <div>标签:</div>
          <div class="tags" v-for="t in tags" :key="t">{{ t }}</div>
        </div>
        <div class="description">{{ description }}</div>
      </div>
      <van-icon name="cross" size="22" style="position: absolute; top: 20px; right: 20px"
                @click="showDescription = !showDescription"/>
    </div>
  </van-popup>
</template>


<style scoped lang="scss">
.detailView {
  height: 94%;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;

  .img_wrapper {
    position: relative;
    height: 208px;


    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      filter: blur(.533rem);

      .cover_img {
        height: 208px;
        width: 100%;
        object-fit: cover;
      }
    }

    .main {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      padding: 15px;

      .data {
        display: flex;

        .left {
          width: 104px;
          height: 104px;
          position: relative;
          margin-right: 20px;

          .play_count {
            position: absolute;
            top: 5px;
            right: 5px;
            color: white;
            font-size: 14px;
            background: rgba(0, 0, 0, .2);
            border-radius: .1rem;
            display: flex;
            align-items: center;
          }

          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        }

        .right {

          .sheet {
            width: 236px;
            color: white;
            display: -webkit-box;
            font-size: 17px;
            font-family: 幼圆, serif;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .creator {
            margin-top: 10px;
            display: flex;
            align-items: center;

            img {
              width: 26px;
              height: 26px;
              border-radius: 999px;
              margin-right: 5px;
            }

            .nickname {
              color: #c4c3c3;
              font-size: 14px;
            }
          }

          .description {
            display: flex;
            align-items: center;
            margin-top: 20px;

            .text {
              width: 130px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }

      .btn_wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 312px;
        height: 41px;
        margin: 20px auto 0;
        background: white;
        border-radius: 999px;
      }
    }
  }

  .song_list_wrapper {
    flex: 1 1 586px;
    overflow: auto;
    padding: 15px 15px 30px;

    .song_item {
      display: flex;
      width: 100%;
      height: 61px;
      border-bottom: 1px solid #ebedf0;

      .left {
        margin-right: 10px;
        padding: 2px;

        img {
          width: 3rem;
          height: 3rem;
          border-radius: .3rem;
        }
      }

      .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        overflow: hidden;

        .song_name, .singer {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .right {
        display: flex;
        align-items: center;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}


.tag {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .tag_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(4rem);
    z-index: -1;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    padding: 31px;

    .cover_img {
      padding-top: 52px;
      text-align: center;

      img {
        width: 125px;
        height: 125px;
        border-radius: 5px;
      }
    }

    .sheetName {
      margin-top: 10px;
      color: white;
      text-align: center;
      font-size: 18px;
      font-family: 华文中宋, serif;
    }

    .tag_wrap {
      display: flex;
      margin-top: 26px;
      flex-wrap: wrap;
      font-family: 幼圆, serif;
      line-height: 26px;
      color: white;

      .tags {
        margin-left: 10px;
        height: 26px;
        background: #343331;
        padding: 0 10px;
        line-height: 26px;
        border-radius: 13px;
      }
    }

    .description {
      font-size: 14px;
      color: white;
      margin-top: 26px;
      line-height: 26px;
      text-align: justify;
    }
  }
}
</style>