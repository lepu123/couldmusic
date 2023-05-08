import {ref} from 'vue';
import {defineStore} from "pinia";
import {Api} from "@/apis";
import type {SongListType} from "@/typings/audio";


export const conSongList = defineStore('songList', () => {
    //歌单列表
    const songList = ref<Array<SongListType>>([])
    //歌单显示状态
    const songListState = ref<boolean>(false)

    function setMusicList(arr: Array<SongListType>) {
        songList.value = arr
    }

    //给歌单列表添加歌曲
    function addMusicToList(music: SongListType) {
        songList.value.push(music);
        localStorage.songList = JSON.stringify(songList.value);
    }

    //显示歌单
    function showSongList() {
        songListState.value = true;
        // console.log("显示歌单",songListState.value);
    }

    //隐藏歌单
    function hideSongList() {
        songListState.value = false;
        // console.log("隐藏歌单",songListState.value);
    }

    //删除歌曲
    function deleteSongToList(index: number) {
        songList.value.splice(index,1);
        localStorage.songList = JSON.stringify(songList.value);
    }

    async function getNewSong() {
        let songLists = localStorage.songList

        if (songLists) {
            songLists = JSON.parse(songLists)
        } else {
            let {data} = await Api.getMusicList()
            console.log(data.result);
            songLists = data.result.map((music:any) => {
                let artists = music.song.artists.map((artist:any) => {
                    return {
                        name: artist.name,
                        id: artist.id,
                        imgUrl: artist.picUrl
                    }
                })

                return {
                    id: music.id,
                    type: music.type,
                    name: music.name,
                    picUrl: music.picUrl,
                    artists
                }
            })
            localStorage.songList = JSON.stringify(songLists)
        }
        setMusicList(songLists);

    }

    return {songList,songListState, hideSongList, showSongList, addMusicToList, getNewSong, deleteSongToList}
})