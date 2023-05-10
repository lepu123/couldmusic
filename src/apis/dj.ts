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
    },
    //电台
    getDjHotByType: (params:any):any => {
        return http.request({
            url: '/dj/radio/hot',
            method: 'get',
            params
        })
    },
    getTopPopular:  (params:any):any => {
        return http.request({
            url: '/dj/toplist/popular',
            method: 'get',
            params
        })
    },
    //获取电台详情
    getDjDetail: (params:any):any => {
        return http.request({
            url: '/dj/detail',
            method: 'get',
            params
        })
    },
    //获取电台节目
    getDjProgram: (params:any):any => {
        return http.request({
            url: '/dj/program',
            method: 'get',
            params
        })
    }
}