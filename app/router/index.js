const Vue = require('nativescript-vue');
const VueRouter = require('vue-router');
const firebase = require('nativescript-plugin-firebase');

Vue.use(VueRouter);

const App = require('../components/App');
const Login = require('../components/Login');
const Account = require('../components/Account');

const router = new VueRouter({
    pageRouting: true,
    routes: [
        {
            path: '/home',
            component: App
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/account',
            component: Account
        }
    ]
});

firebase.getCurrentUser().then(user => {
    router.replace('/home');
}).catch(error => {
    router.replace('/login');
});

module.exports = router;