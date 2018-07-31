const Vue = require('nativescript-vue');
const VueRouter = require('vue-router');
const firebase = require("nativescript-plugin-firebase");
const firebaseWebApi = require("nativescript-plugin-firebase/app");

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

firebase.init({
    onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
        // console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
            // console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
            router.push('/home');
        } else {
            router.push('/login');
        }
    }
});

router.replace('/home');

module.exports = router;