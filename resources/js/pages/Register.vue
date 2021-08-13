<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Register as a new user</div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="has_error && !success">
                    <p v-if="error == 'registration_validation_error'"></p>
                    <p v-else>Validation error (s), please consult the
                        message (s) below.</p>
                </div>
                <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.name }">
                        <label for="name">Name</label>
                        <input type="text" id="name" class="form-control" placeholder="Enter your name"
                               v-model="name">
                        <span class="help-block" v-if="has_error && errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com"
                               v-model="email">
                        <span class="help-block" v-if="has_error && errors.email">{{ errors.email }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="password"
                               placeholder="Enter password">
                        <span class="help-block" v-if="has_error && errors.password">{{ errors.password }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                        <label for="password_confirmation">Confirm Password</label>
                        <input type="password" id="password_confirmation" class="form-control"
                               v-model="password_confirmation" placeholder="Confirm password">
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name                  : '',
            email                 : '',
            password              : '',
            password_confirmation : '',
            has_error             : false,
            error                 : '',
            errors                : {},
            success               : false
        }
    },
    methods : {
        register() {
            let app = this
            this.$auth.register({
                data : {
                    name                  : app.name,
                    email                 : app.email,
                    password              : app.password,
                    password_confirmation : app.password_confirmation
                }
            })
                .then(res => {
                    app.success = true
                    app.$router.push({name : 'login', params : {successRegistrationRedirect : true}}).catch(() => {
                    });
                })
                .catch(err => {
                    console.log(err.response);
                    app.has_error = true
                    app.error = err.response.data.error
                    app.errors = err.response.data.errors || {}
                });
        }
    }
}
</script>
