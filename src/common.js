
const {
    hashRouterPush
} = require('./router');

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
let score;

function getDatasFromAPI() {
    // words api 호출
    let request = new XMLHttpRequest();
    request.open('GET', 'https://my-json-server.typicode.com/kakaopay-fe/resources/words');
    request.onload = () => {
        gameDatas = JSON.parse(request.responseText);
        score = gameDatas.length;
    }
    request.send();
}

// 게임 결과 데이터 초기화
function onGameReset() {
    gameResultInfo = {
        score: 0,
        avgTime: 0
    }
    
    gameInfo.stage = 0;
    gameInfo.interval = null;
    gameInfo.sec = null;
}

// 이벤트 바인딩
function addFunctions(template) {
    if (template == '/result') {    // 결과 페이지로 이동
        let resultScore = document.querySelector('#resultScore');
        resultScore.textContent = gameResultInfo.score;

        let avgTime = document.querySelector('#avgTime');
        avgTime.textContent = gameResultInfo.avgTime;

        let replay = document.querySelector('#replay');

        replay.addEventListener('click', () => {
            clearInterval(interval);
            location.hash = '#game';
            let route = hashRouterPush('/game', document.querySelector('#app'));
            addFunctions(route.template);
        });

    } else {    // 게임 페이지로 이동, 게임 데이터 초기화

        getDatasFromAPI();
        onGameReset();
        
        const starter = document.querySelector('#btnStart');
        const reset = document.querySelector('#btnReset');
        const input = document.querySelector('#inputText');

        starter.addEventListener('click', () => {
            onGameStart(gameInfo.stage);
            starter.classList.add('off');
            reset.classList.remove('off');
        });

        reset.addEventListener('click', () => {
            clearInterval(interval);
    
            starter.classList.remove('off');
            reset.classList.add('off');

            location.hash = '#game';
            let route = hashRouterPush('/game', document.querySelector('#app'));
            addFunctions(route.template);
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                isCorrect(e.target);
            }
        });
    }
}


function onGameStart(stage) {
    const input = document.querySelector('#inputText');
    input.focus();

    const word = document.querySelector('#qWord');
    const time = document.querySelector('#remainTime');
    const scoreEl = document.querySelector('#currentScore');
    
    word.textContent = gameDatas[stage].text;
    time.textContent = gameDatas[stage].second;
    scoreEl.textContent = score;

    timer(gameDatas[stage].second-1, time, scoreEl);
}

function timer(time, timeEl, scoreEl) {
    sec = time % 60;
    interval = setInterval(() => {
        sec = time % 60;
        timeEl.textContent = sec;
        time--;
        if (time < 0) {
            clearInterval(interval);
            --score;
            scoreEl.textContent = score;
            console.log('avgTime', gameResultInfo.avgTime);
            if (gameDatas[gameInfo.stage+1]) {
                onGameStart(++gameInfo.stage);
            } else {        // 스테이지 끝난 경우 결과 페이지로 이동
                gameResultInfo.score = score;
                gameResultInfo.avgTime = gameResultInfo.avgTime / gameResultInfo.score; // 시간 초과로 끝날 경우 평균 시간에서 제외
                
                const appDiv = document.querySelector('#app');
                location.hash = '#result';
                let route = hashRouterPush('/result', appDiv);
                addFunctions(route.template);
            }
        }
    }, 1000);
}

// 평균 시간 계산


// 채점
function isCorrect(target) {
    const word = document.querySelector('#qWord');
    if (target.value === word.textContent) {
        target.value = '';

        if (gameDatas[gameInfo.stage+1]) {  // 다음 게임 존재
            gameResultInfo.avgTime = gameResultInfo.avgTime + (gameDatas[gameInfo.stage].second - sec);
            clearInterval(interval);
            onGameStart(++gameInfo.stage);

        } else {    // 마지막 스테이지가 정답으로 끝나는 케이스
            clearInterval(interval);
            gameResultInfo.score = score;
            gameResultInfo.avgTime = (gameResultInfo.avgTime + (gameDatas[gameInfo.stage].second - sec)) / gameResultInfo.score;
            
            const appDiv = document.querySelector('#app');
            location.hash = '#result';

            let route = hashRouterPush('/result', appDiv);
            addFunctions(route.template);
        }
    } else {
        target.value = '';
    }
}

module.exports = {
    addFunctions
}