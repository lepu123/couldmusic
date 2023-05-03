//歌手
export interface ArtistsType {
    name: string,
    id: string,
    imgUrl: string
}


//当前正在播放歌曲信息
export interface PlayingMusicType {
    id?: number,
    name?: string,
    artists?: Array<ArtistsType>,
    type?: number,
    picUrl?: string,
}

//歌单列表数据类
export interface SongListType {
    id: number,
    type: number,
    name: string,
    picUrl: string,
    artists: Array<ArtistsType>
}