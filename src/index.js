// css
require('./assets/css/style.css');

// router
const { initialRoutes } = require('./router');
// common
const { addFunctions } = require('./common');

const AppDiv = document.querySelector('#app');

addFunctions(initialRoutes(AppDiv));