// template
const homeTemplate = require('./pages/home.hbs');
const aboutTemplate = require('./pages/about.hbs');

const Home = homeTemplate();
const About = aboutTemplate();

const routes = {
    '/': Home,
    '/home': Home,
    '/about': About
}
const common = require('./common.js');
let route = {route: routes['/'], template: '/'};
const hashAppDiv = document.querySelector('#hash-app');

let interval;
let sec;

// entry point
function initialRoutes (mode, el) {
    renderHTML(el, route)

    if (mode === 'history') {
        window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
    } else {
        window.addEventListener('hashchange', () => {
            return renderHTML(el, getHashRoute())
        })
    }
}

// set browser history
function historyRouterPush (pathName, el) {
    window.history.pushState({}, pathName, window.location.origin + pathName)
    renderHTML(el, routes[pathName])
}

// get hash history route
function getHashRoute () {
    // let route = '/';

    let route = {route: '/', template: '/'}

    Object.keys(routes).forEach(hashRoute => {
        if (window.location.hash.replace('#', '') === hashRoute.replace('/', '')) {
            // route = routes[hashRoute];
            route.route = routes[hashRoute];
            route.template = hashRoute;
        }
    });

    return route;
}

// set hash history
function hashRouterPush (pathName, el) {
    renderHTML(el, getHashRoute());
}

// render
function renderHTML (el, route) {
    console.log(route);
    console.log(el);
    el.innerHTML = route.route;
    addFunctions(route.template);
}

function addFunctions(template) {
    if (template == '/about') {
        
        let resultScore = document.querySelector('#resultScore');
        resultScore.textContent = common.getGameResultInfo().score;

        let avgTime = document.querySelector('#avgTime');
        avgTime.textContent = common.getGameResultInfo().avgTime;

        let replay = document.querySelector('#replay');
        replay.addEventListener('click', () => {
            clearInterval(interval);
            console.log('reset game data', common.getGameResultInfo());
            console.log('reset game info', common.getGameInfo());
            location.hash = '#home';
            hashRouterPush('/home', document.querySelector('#hash-app'));
        });
    } else {
        common.getDatasFromAPI();
        common.onGameReset();
        
        const starter = document.querySelector('#btnStart');
        const reset = document.querySelector('#btnReset');
        const input = document.querySelector('#inputText');

        starter.addEventListener('click', () => {
            console.log('gamestart stage', common.gameInfo.stage)
            onGameStart(common.gameInfo.stage);
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
    }
}


function onGameStart(stage) {
    const input = document.querySelector('#inputText');
    input.focus();

    const word = document.querySelector('#qWord');
    const time = document.querySelector('#remainTime');
    const scoreEl = document.querySelector('#currentScore');
    word.textContent = common.getGameData()[stage].text;
    time.textContent = common.getGameData()[stage].second;
    scoreEl.textContent = score;

    timer(common.getGameData()[stage].second-1, time, scoreEl);
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
            if (common.getGameData()[common.gameInfo.stage+1]) {
                onGameStart(++common.gameInfo.stage);
            } else {
                common.setScore(score);
                console.log(common.getGameResultInfo());
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
        if (common.getGameData()[common.gameInfo.stage+1]) {
            common.setAvgTime(common.getGameResultInfo().avgTime + (common.getGameData()[common.gameInfo.stage].second - sec));
            console.log('sec', sec)
            console.log('-sec', (common.getGameData()[common.gameInfo.stage].second - sec));
            console.log(common.getGameResultInfo().avgTime);
            clearInterval(interval);
            onGameStart(++common.gameInfo.stage);
        } else {
            clearInterval(interval);
            common.setScore(score);
            common.setAvgTime((common.getGameResultInfo().avgTime + (common.getGameData()[common.gameInfo.stage].second - sec)) / common.getGameResultInfo().score);
            location.hash = '#about';
            hashRouterPush('/about', hashAppDiv);
        }
    } else {
        target.value = '';
    }
}


module.exports = {
    initialRoutes,
    historyRouterPush,
    hashRouterPush
}