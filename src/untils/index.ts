
export function playCountLabel(playCount:number) {

    let resSt = ''

    if (playCount >= 10000 && playCount < 100000) {
        resSt = Math.floor(playCount / 1000) / 10 + " 万";
    } else if (playCount >= 100000) {
        if (playCount < 100000000) {
            resSt = Math.floor(playCount / 10000) + " 万";
        } else {
            resSt = Math.floor(playCount / 10000000) / 10 + " 亿";
        }
    }

    return resSt;
}