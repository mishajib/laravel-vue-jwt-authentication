/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue                   from 'vue';
import VueRouter             from "vue-router";
import Index                 from './components/IndexComponent';
import router                from './router';
import auth                  from '@websanova/vue-auth/dist/v2/vue-auth.esm.js';
import driverAuthBearer      from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js';
import driverHttpAxios       from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';


// Set Vue globally
window.Vue = Vue

Vue.router = router;
Vue.use(VueRouter);


Vue.use(auth, {
    plugins : {
        http : axios, // Axios
        // http: Vue.http, // Vue Resource
        router : Vue.router,
    },
    drivers : {
        auth   : driverAuthBearer,
        http   : driverHttpAxios,
        router : driverRouterVueRouter,
    },
    options : {
        rolesKey         : 'role',
        tokenDefaultName : 'laravel-vue-spa',
        tokenStore       : ['localStorage'],
        registerData     : {url : '/auth/register', method : 'POST', redirect : '/login'},
        loginData        : {url : '/auth/login', method : 'POST', redirect : '', fetchUser : true},
        logoutData       : {url : '/auth/logout', method : 'POST', redirect : '/', makeRequest : true},
        fetchData        : {url : '/auth/user', method : 'GET', enabled : true},
        refreshData      : {url : '/auth/refresh', method : 'GET', enabled : true, interval : 30}
    }
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('index', Index)


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el : '#app',
    router,
});
