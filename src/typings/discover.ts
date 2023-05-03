export interface songType {
    songId?: number,
    songTitle?: string,
    artists: any,
    image: string,
    category?: string,
    resourceType?: string,
    subtitle: ""
}


export interface CreativesType {
    creativeId?: string,
    creativeTitle?: string,
    uiImage?: string,
    playCount?: number,
    song?: Array<songType>
}

export interface ExInfoType {
    liveId: number,//房间号
    title: string,//标题
    privateTag: string, // 直播副标题
    cover: string,//直播封面
    liveUrl: {
        httpPullUrl: string,
        hlsPullUrl: string,
        rtmpPullUrl: string
    },//直播流
    liveStatus: number// 直播状态

}

export interface BlocksType {
    showType: string,
    subTitle: string,
    button: string,
    creatives?: Array<CreativesType>,
    exInfo?: Array<ExInfoType>
}

export interface BannerType {
    pic: string,
    typeTitle: string
}
