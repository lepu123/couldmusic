export interface PlayListCreate {
    id: number,
    name: string,
    description: string,
    tags: Array<string>,
    creator: {
        nickname: string,
        imgUrl: string
    }
}