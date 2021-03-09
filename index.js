// css
require('./css/style.css')
const {
    getGameInfo,
    setAvgTime,
    setScore
} = require('./common.js');


// router
const {
    initialRoutes,
    historyRouterPush,
    hashRouterPush
} = require('./router')

// app division
const historyAppDiv = document.querySelector('#history-app')
const hashAppDiv = document.querySelector('#hash-app')

// Browser History
// initialRoutes('history', historyAppDiv)

// Hash History
initialRoutes('hash', hashAppDiv)

let gameDatas;
let stage = 0;
let interval;
let score;
let sec;

window.onload = () => {
    const historyLinker = document.querySelectorAll('span.history')
    const hashLinker = document.querySelectorAll('a.hash')
    const starter = document.querySelector('#btnStart');
    const reset = document.querySelector('#btnReset');
    const input = document.querySelector('#inputText');

    const playAgain = document.querySelector('#playAgain');

    historyLinker.forEach(el => {
        el.addEventListener('click', (evt) => {
            const pathName = evt.target.getAttribute('route')

            historyRouterPush(pathName, historyAppDiv)
        })
    })

    hashLinker.forEach(el => {
        el.addEventListener('click', (evt) => {
            const pathName = evt.target.getAttribute('route')
            console.log(pathName);
            hashRouterPush(pathName, hashAppDiv)
        })
    })

    starter.addEventListener('click', () => {
        onGameStart(stage);
        starter.classList.add('off');
        reset.classList.remove('off');
    });
    reset.addEventListener('click', () => {

        starter.classList.remove('off');
        reset.classList.add('off');
    });
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            isCorrect(e.target);
        }
    });

    // playAgain.addEventListener('click', () => {
    //     hashRouterPush('/history', hashAppDiv);
    // });


    getDatas();
}

function getDatas() {
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
            if (gameDatas[stage+1]) {
                onGameStart(++stage);
            } else {
                setScore(score);
                console.log(getGameInfo());
                location.hash = '#about';
                hashRouterPush('/about', hashAppDiv);
            }
        }
    }, 1000);
}

function isCorrect(target) {
    const word = document.querySelector('#qWord');
    console.log('word', word.textContent);
    console.log('value', target.value);
    if (target.value === word.textContent) {
        target.value = '';
        if (gameDatas[stage+1]) {
            setAvgTime(getGameInfo().avgTime + (gameDatas[stage].second - sec));
            console.log('sec', sec)
            console.log('-sec', (gameDatas[stage].second - sec));
            console.log(getGameInfo().avgTime);
            clearInterval(interval);
            onGameStart(++stage);
        } else {
            clearInterval(interval);
            setScore(score);
            setAvgTime(getGameInfo().avgTime + (gameDatas[stage].second - sec));
            console.log('-sec', (gameDatas[stage].second - sec));
            console.log('final', getGameInfo().avgTime);
            setAvgTime(getGameInfo().avgTime / getGameInfo().score);
            console.log(getGameInfo().avgTime);
            console.log(getGameInfo());
            location.hash = '#about';
            hashRouterPush('/about', hashAppDiv);
        }
    } else {
        target.value = '';
    }
}

function replay() {
    hashRouterPush('/home', hashAppDiv);
}