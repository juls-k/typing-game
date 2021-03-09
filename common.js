let gameResultInfo = {
    score: 0,
    avgTime: 0
}

let gameInfo = {
    stage: 0,
    interval: null,
    sec: null
}

let gameDatas;

function getGameResultInfo() {
    return gameResultInfo;
}

function setScore(pScore) {
    gameResultInfo.score = pScore;
}

function setAvgTime(pAvgTime) {
    gameResultInfo.avgTime = pAvgTime;
}

function getGameInfo() {
    return gameInfo;
}

function setGameInfo(key, value) {
    gameInfo[key] = value;
}

function getDatasFromAPI() {
    // words api 호출
    let request = new XMLHttpRequest();
    request.open('GET', 'https://my-json-server.typicode.com/kakaopay-fe/resources/words');
    request.onload = () => {
        gameDatas = JSON.parse(request.responseText);
        score = gameDatas.length;
        console.log(gameDatas);
    }
    request.send();
}

function getGameData() {
    return gameDatas;
}

function onGameReset() {
    gameResultInfo = {
        score: 0,
        avgTime: 0
    }
    
    gameInfo.stage = 0;
    gameInfo.interval = null;
    gameInfo.sec = null;
}

module.exports = {
    getGameResultInfo,
    setScore,
    setAvgTime,
    getGameInfo,
    setGameInfo,
    getDatasFromAPI,
    gameInfo,
    getGameData,
    onGameReset
}