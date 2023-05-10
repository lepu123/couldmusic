import http from '@/http';

export const Api = {
    //dj轮播
    getCategoryRecommend: (): any => {
        return http.request({
            url: '/dj/category/recommend',
            method: 'get'
        })
    },
    //电台热门榜
    getTopList: (): any => {
        return http.request({
            url: '/dj/toplist',
            method: 'get'
        })
    }
}