export interface PlayListCreate {
    id: number,
    name: string,
    description: string,
    coverImg: string,
    playCount: number,
    tags: Array<string>,
    creator: {
        nickname: string,
        imgUrl: string
    }
}