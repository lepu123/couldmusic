import http from '@/http';

export const Api = {
    //获取首页推荐
    getMusicHome: () => {
        return http.request({
            url: 'homepage/block/page',
            method: 'get'
        })
    },
    //获取轮播图
    getHomeBanner: (): any => {
        return http.request({
            url: 'banner?type=1',
            method: 'get'
        })
    },
    //获取歌曲列表推荐
    getMusicList: (): any => {
        return http.request({
            url: 'personalized/newsong',
            method: 'get'
        })
    },
}