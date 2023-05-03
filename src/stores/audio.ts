import {ref, watch} from "vue";
import {defineStore} from "pinia";
import type {PlayingMusicType} from "@/typings/audio"

export const conAudio = defineStore('audio', () => {
    //歌曲播放状态
    const audioPlayState = ref<boolean>(false)

    //当前播放歌曲信息
    const playingMusic = ref<PlayingMusicType>({})

    //歌曲播放时长
    const currentTime = ref<number>(0)

    //歌曲总时长
    const duration = ref<number>(0)

    //歌曲播放地址url
    function playingMusicUrl() {
        if (playingMusic.value.id !== undefined) {
            return `https://music.163.com/song/media/outer/url?id=${playingMusic.value.id}.mp3`;
        } else {
            return undefined
        }
    }

    function audioPlayToggle() {
        if (playingMusic.value.id !== undefined) {
            // console.log("toggle");
            audioPlayState.value = !audioPlayState.value
        }
    }

    // 点击播放歌曲
    function setMusicPlay(option: PlayingMusicType) {
        playingMusic.value = option
        // console.log(playingMusic.value);
    }

    // 音乐播放器暂停播放
    function pauseAudio() {
        // console.log("pause");
        audioPlayState.value = false
    }

    // 音乐播放器开启播放
    function playAudio() {
        audioPlayState.value = true
    }

    //修改歌曲总时长
    function setDuration(time:number) {
        duration.value = time
    }

    //修改歌曲播放时长
    function setCurrentTime(time:number) {
        currentTime.value = time
    }

    watch(playingMusicUrl, (newU, oldU) => {
        if (newU !== oldU) {
            pauseAudio();
        }
    })

    return {audioPlayState, playingMusic, currentTime, duration, audioPlayToggle, setDuration, setCurrentTime, playAudio, pauseAudio, setMusicPlay, playingMusicUrl}
})