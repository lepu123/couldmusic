<script setup lang="ts">
import {ref, onMounted} from "vue";
import {Api} from "@/apis";
import DiscoverCard from "./DiscoverCard.vue";
import Menu from "@/components/Menu.vue";
import type {BlocksType, BannerType} from "@/typings/discover"
// 测试接口数据
const blocks = ref<BlocksType[]>([])
const dataDemo = ref<any>([])
// 轮播列表
const bannersList = ref<Array<BannerType>>([])

onMounted(async () => {
  await getBanner();
  let {data} = await Api.getMusicHome()
  console.log(data);
  dataDemo.value = data
  //将数据解析
  blocks.value = dataDemo.value.data.blocks.map((b: any) => {
    if (b.showType === "HOMEPAGE_SLIDE_PLAYLIST") {
      let creative = b.creatives.map((c: any) => {
        return {
          creativeId: c.creativeId,
          creativeTitle: c.uiElement.mainTitle.title,
          uiImage: c.uiElement.image.imageUrl,
          playCount: c.resources[0].resourceExtInfo.playCount
        }
      });

      return {
        showType: b.showType,
        subTitle: b.uiElement.subTitle.title,
        button: b.uiElement.button.text,
        creatives: creative
      };
    } else if (b.showType === "HOMEPAGE_SLIDE_SONGLIST_ALIGN") {
      let creative = b.creatives.map((c: any) => {
        let songList = c.resources.map((r: any) => {
          return {
            songId: r.resourceExtInfo.songData.id,
            songTitle: r.resourceExtInfo.songData.name,
            image: r.uiElement.image.imageUrl,
            subtitle: "",
            artists: r.resourceExtInfo.artists,
            category: r.uiElement.subTitle?.title
          }
        })
        return {
          // creativeId: c.creativeId,
          // creativeTitle: c.uiElement.mainTitle.title,
          // uiImage: c.uiElement.image.imageUrl,
          // playCount: c.resources[0].resourceExtInfo.playCount,
          song: songList
        }
      });
      return {
        showType: b.showType,
        subTitle: b.uiElement.subTitle.title,
        button: b.uiElement.button.text,
        creatives: creative
      };
    } else if (b.showType === "HOMEPAGE_SLIDE_LISTEN_LIVE") {
      let extInfo = b.extInfo.map((e: any) => {
        return {
          liveId: e.liveId,//房间号
          title: e.title,//标题
          privateTag: e.privateTag, // 直播副标题
          cover: e.cover,//直播封面
          liveUrl: {
            httpPullUrl: e.liveUrl.httpPullUrl,
            hlsPullUrl: e.liveUrl.hlsPullUrl,
            rtmpPullUrl: e.liveUrl.rtmpPullUrl
          },//直播流
          liveStatus: e.liveStatus// 直播状态
        }
      })
      return {
        showType: b.showType,
        subTitle: b.uiElement.subTitle.title,
        button: b.uiElement.button.text,
        exInfo: extInfo
      };
    } else if (b.showType === "HOMEPAGE_NEW_SONG_NEW_ALBUM") {
      let creative = b.creatives.map((c: any) => {
        let newSongList = c.resources.map((s: any) => {
          return {
            songId: s.resourceExtInfo?.songData?.id || s.resourceId || 0,
            songTitle: s.resourceExtInfo?.songData?.name || s.uiElement.mainTitle.title || s.subTitle.title,
            image: s.uiElement.image.imageUrl,
            subtitle: "",
            artists: s.resourceExtInfo?.artists,
            category: s.uiElement.subTitle?.title,
            resourceType: s.resourceType
          }
        })
        return {
          song: newSongList
        }
      });
      return {
        showType: b.showType,
        subTitle: b.uiElement.subTitle.title,
        button: b.uiElement.button.text,
        creatives: creative
      };
    } else if (b.showType === "HOMEPAGE_SLIDE_TOPLIST") {
      let creative = b.creatives.map((m: any) => {
        let songList = m.resources.map((r: any) => {
          return {
            songId: r.resourceExtInfo.songData.id,
            songTitle: r.resourceExtInfo.songData.name,
            image: r.uiElement.image.imageUrl,
            subtitle: "",
            artists: r.resourceExtInfo.artists
          }
        })

        return {
          creativeId: m.creativeId,
          creativeTitle: m.uiElement.mainTitle.title,
          song: songList
        }
      })

      return {
        showType: b.showType,
        subTitle: b.uiElement.subTitle.title,
        button: b.uiElement.button.text,
        creatives: creative
      }
    }
  })
  console.log(blocks.value);

})

async function getBanner() {
  let {data} = await Api.getHomeBanner()
  bannersList.value = data.banners.map((b: any) => {
    return {
      pic: b.pic,
      typeTitle: b.typeTitle
    }
  })
}
</script>
<template>
  <div class="discover">
    <!--顶部搜索栏-->
    <van-nav-bar fixed z-index="10" safe-area-inset-top>
      <template #left>
        <van-icon name="wap-nav" size="18"/>
      </template>
      <template #title>
        <van-search
            class="search-bar"
            shape="round"
            background="0"
            placeholder="推荐搜索关键字"
        />
      </template>
      <template #right>
        <van-icon name="service" size="18"/>
      </template>
    </van-nav-bar>
    <!--首页推荐-->
    <div class="discover-container">
      <!--首页轮播-->
      <div class="discover-banner">
        <van-swipe lazy-render :autoplay="3000">
          <van-swipe-item v-for="(b,i) in bannersList" :key="i">
            <img :src="b.pic" :alt="b.typeTitle">
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--首页分类-->
      <Menu/>
      <DiscoverCard
          v-for="(b, i) in blocks"
          :key="i"
          :subTitle="b.subTitle"
          :showType="b.showType"
          :button="b.button"
          :creatives="b.creatives"
          :extInfo="b.exInfo"
      />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.discover {
  background: linear-gradient(290deg, #be98aa, #3e3f4a);
  height: 94vh;

  .van-nav-bar {
    background: linear-gradient(44deg, #be98aa, #3e3f4a);

    .search-bar {
      height: 46px;
    }
  }

  .discover-container {
    position: fixed;
    top: 0;
    left: 0;
    //padding-top: 46px;
    //padding-bottom: 100px;
    padding: 46px 8px 100px;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;

    .discover-banner {
      width: 100%;

      img {
        width: 100%;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>