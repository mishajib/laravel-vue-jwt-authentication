<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Forgot Your Password</div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="has_error">
                    <p>Entered email doesn't exists!</p>
                </div>
                <div class="alert alert-success alert-dismissible fade show" v-if="success" role="alert">
                    Password Reset Link Sent Successfully.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                <form autocomplete="off" @submit.prevent="sendPasswordResetLink" method="post">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com"
                               v-model="email" required>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Send Reset Password Link
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
            email     : 'user@test.com',
            has_error : false,
            success   : false,
        }
    },
    methods : {
        sendPasswordResetLink() {
            // get the redirect object
            let self = this

            axios.post("/auth/reset-password", {
                email : self.email
            })
                 .then(res => {
                     if (res.data.data === 'passwords.sent') {
                         self.success = true;
                     }
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
