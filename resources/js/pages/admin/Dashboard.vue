<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Admin Dashboard</div>
            <div class="card-body">
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Welcome Back!</strong> {{ $auth.user().name }} to Admin Dashboard.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>

                <UserList></UserList>
            </div>
        </div>
    </div>
</template>
<script>
import UserList from "../../components/UserList";

export default {
    components : {UserList},
    mounted() {
        //
    }
}
</script>
