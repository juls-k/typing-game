// template
const gameTemplate = require('./pages/game.hbs');
const resultTemplate = require('./pages/result.hbs');

const Game = gameTemplate();
const Result = resultTemplate();

const routes = {
    '/': Game,
    '/game': Game,
    '/result': Result
};

let route = {route: routes['/'], template: '/'};

// entry point
function initialRoutes(el) {
    renderHTML(el, route);
}

// get hash history route
function getHashRoute() {
    let route = {route: '/', template: '/'}

    Object.keys(routes).forEach(hashRoute => {
        if (window.location.hash.replace('#', '') === hashRoute.replace('/', '')) {
            route.route = routes[hashRoute];
            route.template = hashRoute;
        }
    });

    return route;
}

// set hash history
function hashRouterPush(pathName, el) {
    return renderHTML(el, getHashRoute());
}

// render
function renderHTML(el, route) {
    el.innerHTML = route.route;
    return route;
}

module.exports = {
    initialRoutes,
    hashRouterPush
}