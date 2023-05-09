<script setup lang="ts">


import {ref} from "vue";

const menuList = ref([
  {
    name: '每日推荐',
    icon: 'dayTry',
    path: '/daysRecommend'
  },
  {
    name: '私人FM',
    icon: 'fm',
    path: 'personalFm'
  },
  {
    name: '歌单',
    icon: 'songLists',
    path: '/sheetSquare'
  },
  {
    name: '排行榜',
    icon: 'top',
    path: '/topList'
  },
  {
    name: '歌手',
    icon: 'singer',
    path: '/singer'
  },
  {
    name: '数字专辑',
    icon: 'nums',
    path: '/album'
  }
])
</script>

<template>
  <div class="menu_wrapper">
    <div class="menu_list">
      <div class="menu_item" v-for="(item, index) in menuList" :key="index">
        <div class="icon_wrapper"><i :class="item.icon"></i></div>
        <div class="menu_name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.menu_wrapper {
  padding: 20px 0;
  background: rgba(190, 152, 170, 0.18);
  width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .menu_list {
    display: flex;

    .menu_item {
      flex-shrink: 0;
      min-width: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon_wrapper {
        display: flex;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3e3f4a;
        align-items: center;
        justify-content: center;

        i {
          display: block;
          width: 70%;
          height: 70%;
          background-size: cover;
        }

        .dayTry {
          background-image: url("@/assets/image/menu/每日推荐.png");
        }

        .fm {
          background-image: url("@/assets/image/menu/听音乐.png");
        }

        .songLists {
          background-image: url("@/assets/image/menu/歌单.png");
        }

        .top {
          background-image: url("@/assets/image/menu/排行榜.png");
        }

        .singer {
          background-image: url("@/assets/image/menu/歌手.png");
        }

        .nums {
          background-image: url("@/assets/image/menu/专辑.png");
        }
      }

      .menu_name {
        font-size: 15px;
        color: #999;
        margin-top: 10px;
      }
    }
  }
}
</style>