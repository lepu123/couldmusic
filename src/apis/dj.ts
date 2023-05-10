import http from '@/http';

export const Api = {
//    dj轮播
    getDjBanner: () => {
        return http.request({
            url: '/dj/banner',
            method: 'get'
        })
    }
}