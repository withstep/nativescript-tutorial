const Vue = require('nativescript-vue');
const router = require('./router');

Vue.config.silent = false;

new Vue({
  router
}).$start();