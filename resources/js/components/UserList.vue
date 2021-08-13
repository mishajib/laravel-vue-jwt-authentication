<template>
    <div>
        <h3>All Users</h3>
        <div class="alert alert-danger" v-if="has_error">
            <p>Error, unable to retrieve the list of users.</p>
        </div>
        <table class="table">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Added Date</th>
            </tr>
            <tr v-for="user in users" v-bind:key="user.id" style="margin-bottom: 5px;">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ new Date(user.created_at) }}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name : "UserList",
    data() {
        return {
            has_error : false,
            users     : null
        }
    },
    mounted() {
        this.getUsers()
    },
    methods : {
        getUsers() {
            let self = this;
            axios.get('/auth/users', null, {
                headers : {
                    "Content-type"  : "application/json",
                    "Authorization" : `Bearer ${localStorage.getItem('auth_token_default')}`
                }
            })
                 .then(res => {
                     self.users = res.data.users
                 })
                 .catch(err => {
                     self.has_error = true
                 });
        }
    }
}
</script>
