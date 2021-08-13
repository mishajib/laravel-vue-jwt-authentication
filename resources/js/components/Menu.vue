<template>
    <nav id="nav" class="navbar navbar-expand-md navbar-light bg-white shadow-sm mb-5">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name : 'home' }">
                Laravel Vue JWT Auth
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">

                    <!--UNLOGGED-->
                    <li class="nav-item" v-if="!$auth.check()" v-for="(route, key) in routes.unlogged"
                        v-bind:key="route.path">
                        <router-link class="nav-link" active-class="active" :to="{ name : route.path }" :key="key">
                            {{ route.name }}
                        </router-link>
                    </li>
                    <!--LOGGED USER-->
                    <li class="nav-item" v-if="$auth.check()">
                        <router-link class="nav-link" active-class="active"
                                     :to="{ name : $auth.user().role === 2 ? 'admin.dashboard' : 'dashboard' }">
                            {{ $auth.user().name }}
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="$auth.check(1)" v-for="(route, key) in routes.user"
                        v-bind:key="route.path">
                        <router-link class="nav-link" active-class="active" :to="{ name : route.path }" :key="key">
                            {{ route.name }}
                        </router-link>
                    </li>
                    <!--LOGGED ADMIN-->
                    <li class="nav-item" v-if="$auth.check(2)" v-for="(route, key) in routes.admin"
                        v-bind:key="route.path">
                        <router-link class="nav-link" active-class="active" :to="{ name : route.path }" :key="key">
                            {{ route.name }}
                        </router-link>
                    </li>
                    <!--LOGOUT-->
                    <li class="nav-item" v-if="$auth.check()">
                        <a href="#" class="nav-link" @click.prevent="$auth.logout()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name : 'Menu',
    data() {
        return {
            routes : {
                // UNLOGGED
                unlogged : [
                    {
                        name : 'Register',
                        path : 'register'
                    },
                    {
                        name : 'Login',
                        path : 'login'
                    }
                ],
                // LOGGED USER
                user : [
                    {
                        name : 'Dashboard',
                        path : 'dashboard'
                    }
                ],
                // LOGGED ADMIN
                admin : [
                    {
                        name : 'Admin Dashboard',
                        path : 'admin.dashboard'
                    }
                ]
            }
        }
    },
}
</script>
