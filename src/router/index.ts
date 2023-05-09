import { createRouter, createWebHistory } from 'vue-router'
import DiscoverView from '@/views/DiscoverView/DiscoverView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/discover'
    },
    {
      path: '/',
      redirect: '/discover'
    },
    {
      path: '/discover',
      name: 'discover',
      component: DiscoverView
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/UserView/UserView.vue')
    },
    {
      path: '/live',
      name: 'live',
      component: () => import('@/views/LiveAudioView/LiveAudioView.vue')
    },
    {
      path: '/follows',
      name: 'follows',
      component: () => import('@/views/FollowsView/FollowsView.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/CommunityView/CommunityView.vue')
    },
    {
      path: '/song',
      name: 'song',
      component: () => import('@/views/SongDetailView/SongDetailView.vue')
    },
    {
      path: '/songList',
      name: 'songList',
      component: () => import('@/components/SongListDetail.vue')
    }
  ]
})

export default router
