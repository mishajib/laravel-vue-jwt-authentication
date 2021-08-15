<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Login To Continue</div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="has_error">
                    <p>Error, unable to connect with these credentials.</p>
                </div>
                <div class="alert alert-success alert-dismissible fade show" v-if="reset_password_success_message"
                     role="alert">
                    {{ reset_password_success_message }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                <form autocomplete="off" @submit.prevent="login" method="post">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com"
                               v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="password"
                               placeholder="Enter your password" required>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                        <router-link class="float-right" :to="{ name: 'reset-password' }">
                            Forgot your password?
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name  : "Login",
    props : [
        'reset_password_success_message'
    ],
    data() {
        return {
            email     : 'user@test.com',
            password  : 'password',
            has_error : false
        }
    },
    methods : {
        login() {
            // get the redirect object
            let app = this
            let redirect = app.$auth.redirect();

            app.$auth.login({
                params     : {
                    email    : app.email,
                    password : app.password
                },
                rememberMe : true,
                fetchUser  : true
            })
               .then(res => {
                   const redirectTo = redirect ? redirect.from.name : app.$auth.user().role === 2 ? 'admin.dashboard' : 'dashboard';
                   app.$router.push({name : redirectTo});
               })
               .catch(err => {
                   console.log(err.response);
                   app.has_error = true
               });
        }
    },
    mounted() {
        let self = this;
        if (self.$auth.check()) {
            const redirectTo = redirect ? redirect.from.name : app.$auth.user().role === 2 ? 'admin.dashboard' : 'dashboard';
            app.$router.push({name : redirectTo});
        }
    }
}
</script>
