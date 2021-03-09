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
const {getGameInfo} = require('./common.js');
let route = {route: routes['/'], template: '/'};

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
        resultScore.textContent = getGameInfo().score;

        let avgTime = document.querySelector('#avgTime');
        avgTime.textContent = getGameInfo().avgTime;

        let replay = document.querySelector('#replay');
        replay.addEventListener('click', () => {
            location.hash = '#home';
            hashRouterPush('/home', document.querySelector('#hash-app'));
        });
    } else {
        
        const starter = document.querySelector('#btnStart');
        const reset = document.querySelector('#btnReset');
        const input = document.querySelector('#inputText');
    }
}

module.exports = {
    initialRoutes,
    historyRouterPush,
    hashRouterPush
}