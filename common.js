let gameInfo = {
    score: 0,
    avgTime: 0
}

function getGameInfo() {
    return gameInfo;
}

function setScore(pScore) {
    gameInfo.score = pScore;
}

function setAvgTime(pAvgTime) {
    gameInfo.avgTime = pAvgTime;
}

module.exports = {
    getGameInfo,
    setScore,
    setAvgTime
}