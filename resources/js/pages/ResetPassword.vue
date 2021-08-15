<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Reset Password</div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="has_error">
                    <p>Entered information is wrong!</p>
                </div>
                <div class="alert alert-success alert-dismissible fade show" v-if="success" role="alert">
                    Password reset successfully.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                <form autocomplete="off" @submit.prevent="resetPassword" method="post">
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" placeholder="Enter new password"
                               v-model="password" required>
                    </div>
                    <div class="form-group">
                        <label for="password-confirmation">Confirm Password</label>
                        <input type="password" id="password-confirmation" class="form-control"
                               placeholder="Confirm password"
                               v-model="password_confirmation" required>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            password              : '',
            password_confirmation : '',
            has_error             : false,
            success               : false,
        }
    },
    methods : {
        resetPassword() {
            // get the redirect object
            let self = this;

            axios.post("/auth/reset/password", {
                token                 : self.$route.params.token,
                email                 : self.$route.query.email,
                password              : self.password,
                password_confirmation : self.password_confirmation
            })
                 .then(res => {
                     self.success = true;
                     self.$router.push({
                         name   : 'login',
                         params : {
                             reset_password_success_message : res.data.message,
                         }
                     });
                 })
                 .catch(err => {
                     console.log(err);
                     self.has_error = true;
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
